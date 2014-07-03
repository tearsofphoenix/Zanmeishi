//
//  VZUserManager.h
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "VZHeaders.h"

@interface VZDataService : NSObject

+ (instancetype)manager;

@property (nonatomic, strong) NSDictionary *loginInfo;

- (void)loginUser: (NSString *)userName
         password: (NSString *)password
         callback: (VZCallback)callback;

- (void)searchWithKeyword: (NSString *)keyword
                 callback: (VZCallback)callback;

@end

extern NSString * const VZUserAvatarKey;
extern NSString * const VZUserHomePathKey;
extern NSString * const VZUserNameKey;
