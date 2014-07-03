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

- (instancetype)init
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
//                                                   NSLog(@"%@",  str);
                                                   
                                                   [_operationsOfGET removeObject: operation];
                                                   
                                                   if (callback)
                                                   {
                                                       callback(str, nil);
                                                   }
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
                     type: (NSString *)type
                 callback: (VZCallback)callback
{
    [self _get: [VZURLManager searchURL]
    parameters:(@{
                  @"keyword": keyword,
                  @"type" : type
                  })
      callback: (^(NSString *result, NSError *error)
                 {
                     if (result && !error)
                     {
                         [self _parseSearchResult: result
                                         callback: callback];
                     }else
                     {
                         if (callback)
                         {
                             callback(result, error);
                         }
                     }
                 })];
}

- (void)_parseSearchResult: (NSString *)str
                  callback: (VZCallback)callback
{
    NSMutableArray *result = nil;
    
    MXMLDocument *document = [[MXMLDocument alloc] initWithString: str
                                                      contentType: MXMLContentTypeHTML];
    
    NSArray *nodes = [document nodesWithXPath: @"//div[@class='songs mt5']/table/tr"];
    if ([nodes count] > 0)
    {
        result = [NSMutableArray arrayWithCapacity: [nodes count]];
        
        for (MXMLNode *nLooper in nodes)
        {
            @autoreleasepool
            {
                NSMutableDictionary *infoLooper = [NSMutableDictionary dictionary];
                
                NSArray *children = [nLooper children];
                NSDictionary *attr = [[children[0] firstChild] attributes];
                
                //                NSLog(@"%@ %@", attr[@"name"], attr[@"value"]);
                
                infoLooper[VZNameKey] = attr[@"name"];
                infoLooper[VZIDKey] = attr[@"value"];
                
                //children[1]; //index node
                
                {
                    MXMLNode *songNode = children[2];
                    NSArray *songChildren = [songNode children];
                    
                    MXMLNode *sNode = songChildren[0];
                    NSString *songPath = [sNode attributes][@"href"];
                    NSString *songName = [sNode textContent];
                    
                    MXMLNode *artistNode = songChildren[2];
                    NSString *artistPath = [artistNode attributes][@"href"];
                    NSString *artistName = [artistNode textContent];
                    
                    MXMLNode *albumNode = songChildren[4];
                    NSString *albumPath = [albumNode attributes][@"href"];
                    NSString *albumTitle = [albumNode textContent];
                    
                    infoLooper[VZSongNameKey] = songName;
                    infoLooper[VZSongPathKey] = songPath;
                    infoLooper[VZArtistPathKey] = artistPath;
                    infoLooper[VZArtistNameKey] = artistName;
                    infoLooper[VZAlbumPathKey] = albumPath;
                    infoLooper[VZAlbumNameKey] = albumTitle;
                    
                    //                     NSLog(@"\t\t\t%@ %@ %@ %@ %@", songPath, artistPath, artistName, albumPath, albumTitle);
                }
                
                //fav node
                {
                    MXMLNode *node = children[3];
                    infoLooper[VZPopularityKey] = [[node firstChild] textContent];
                }
                
                [result addObject: infoLooper];
            }
            //                break;
        }
        
    }
    
    if (callback)
    {
        callback(result, nil);
    }
}


- (void)handleFaultResult: (NSDictionary *)result
{
    [[VZViewService service] alertMessage: result[VZMessageContentKey]];
}

@end

NSString * const VZUserAvatarKey = @"avatar";
NSString * const VZUserHomePathKey = @"home";
NSString * const VZUserNameKey = @"name";
