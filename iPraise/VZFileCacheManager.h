//
//  VZFileCacheManager.h
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface VZFileCacheManager : NSObject

+ (instancetype)manager;

- (void)cacheData: (NSData *)data
           forKey: (NSString *)key;

- (NSData *)dataForKey: (NSString *)key;

@end
