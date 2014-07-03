//
//  VZUserManager.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZDataService.h"
#import "VZViewService.h"

@interface VZDataService ()

@property (nonatomic, strong) NSMutableSet *operationsOfGET;

@end

@implementation VZDataService

+ (instancetype)manager
{
    static id gsManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, (^
                               {
                                   gsManager = [[self alloc] init];
                               }));
    
    return gsManager;
}

- (id)init
{
    if ((self = [super init]))
    {
        _operationsOfGET = [[NSMutableSet alloc] init];
    }
    
    return self;
}

- (void)_post: (NSString *)URLString
   parameters: (NSDictionary *)args
     callback: (VZCallback)callback
{
    [[AFHTTPRequestOperationManager manager] POST: URLString
                                       parameters: args
                                          success: (^(AFHTTPRequestOperation *operation, NSDictionary *result)
                                                    {
                                                        NSLog(@"%@", result);

                                                        if ([result[VZMessageOKKey] integerValue] == 1)
                                                        {
                                                            [self setLoginInfo: result];
                                                            
                                                            if (callback)
                                                            {
                                                                callback(result, nil);
                                                            }
                                                        }else
                                                        {
                                                            [self handleFaultResult: result];
                                                            
                                                            if (callback)
                                                            {
                                                                callback(nil, nil);
                                                            }
                                                        }
                                                    })
                                          failure: (^(AFHTTPRequestOperation *operation, NSError *error)
                                                    {
                                                        NSLog(@"%@", error);
                                                        if (callback)
                                                        {
                                                            callback(nil, error);
                                                        }
                                                    })];
}

- (void)_get: (NSString *)URLString
  parameters: (NSDictionary *)args
    callback: (VZCallback)callback
{
    if ([args count] > 0)
    {
        URLString = [URLString stringByAppendingFormat: @"?%@", [args queryURLString]];
    }
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL: [NSURL URLWithString: URLString]];
    [request setValue: @"text/html"
   forHTTPHeaderField: @"Accept"];
    
    AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc] initWithRequest: request];
    [operation setCompletionBlockWithSuccess: (^(AFHTTPRequestOperation *operation, NSData *result)
                                               {
                                                   NSString *str = [[NSString alloc] initWithData: result
                                                                                         encoding: NSUTF8StringEncoding];
                                                   NSLog(@"%@",  str);
                                                   MXMLDocument *document = [[MXMLDocument alloc] initWithData: result
                                                                                                   contentType: MXMLContentTypeHTML];
                                                   [document nodesWithXPath: @""];
                                                   
                                                   [_operationsOfGET removeObject: operation];
//                                                   
//                                                   if ([result[VZMessageOKKey] integerValue] == 1)
//                                                   {
//                                                       [self setLoginInfo: result];
//                                                       
//                                                       if (callback)
//                                                       {
//                                                           callback(result, nil);
//                                                       }
//                                                   }else
//                                                   {
//                                                       [self handleFaultResult: result];
//                                                       
//                                                       if (callback)
//                                                       {
//                                                           callback(nil, nil);
//                                                       }
//                                                   }
                                               })
                                     failure: (^(AFHTTPRequestOperation *operation, NSError *error)
                                               {
                                                   NSLog(@"%@", error);
                                                   
                                                   [_operationsOfGET removeObject: operation];

                                                   if (callback)
                                                   {
                                                       callback(nil, error);
                                                   }
                                               })];
    [_operationsOfGET addObject: operation];
    
    [operation start];
}

- (void)loginUser: (NSString *)userName
         password: (NSString *)password
         callback: (VZCallback)callback
{
    [self _post: [VZURLManager loginURL]
     parameters: (@{
                    @"user" : userName,
                    @"password" : password
                    })
       callback: callback];
}

- (void)searchWithKeyword: (NSString *)keyword
                 callback: (VZCallback)callback
{
    [self _get: [VZURLManager searchURL]
    parameters:(@{
                  @"keyword": keyword,
                  @"type" : @"13"
                  })
      callback: callback];
}

- (void)handleFaultResult: (NSDictionary *)result
{
    [[VZViewService service] alertMessage: result[VZMessageContentKey]];
}

@end

NSString * const VZUserAvatarKey = @"avatar";
NSString * const VZUserHomePathKey = @"home";
NSString * const VZUserNameKey = @"name";
