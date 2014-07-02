//
//  VZUserManager.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZUserManager.h"
#import "VZViewService.h"

@implementation VZUserManager

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

- (void)loginUser: (NSString *)userName
         password: (NSString *)password
         callback: (VZCallback)callback
{
    
    [[AFHTTPRequestOperationManager manager] POST: [VZURLManager loginURL]
                                       parameters: (@{
                                                      @"user" : userName,
                                                      @"password" : password
                                                      })
                                          success: (^(AFHTTPRequestOperation *operation, NSDictionary *result)
                                                    {
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

- (void)handleFaultResult: (NSDictionary *)result
{
    [[VZViewService service] alertMessage: result[VZMessageContentKey]];
}

@end

NSString * const VZUserAvatarKey = @"avatar";
NSString * const VZUserHomePathKey = @"home";
NSString * const VZUserNameKey = @"name";
