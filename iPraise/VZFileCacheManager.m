//
//  VZFileCacheManager.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZFileCacheManager.h"
#import "VZHeaders.h"

@interface VZFileCacheManager ()

@property (nonatomic, strong) NSString *libraryPath;
@property (nonatomic, strong) NSString *basePath;

@end

@implementation VZFileCacheManager

+ (instancetype)manager
{
    static id gsManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken,
                  (^
                   {
                       gsManager = [[self alloc] init];
                   }));
    
    return gsManager;
}

- (instancetype)init
{
    if ((self = [super init]))
    {
        [self setLibraryPath: NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES)[0]];
        [self setBasePath: [_libraryPath stringByAppendingPathComponent: @"/.ipraise-cache/"]];
        NSFileManager *manager = [NSFileManager defaultManager];
        if (![manager fileExistsAtPath: _basePath])
        {
            NSError *error = nil;
            [manager createDirectoryAtPath: _basePath
               withIntermediateDirectories: YES
                                attributes: nil
                                     error: &error];
            if (error)
            {
                NSLog(@"in func: %s line: %d error: %@", __func__, __LINE__, [error localizedDescription]);
            }
        }
    }
    
    return self;
}

- (void)cacheData: (NSData *)data
           forKey: (NSString *)key
{
    if (data && key)
    {
        @autoreleasepool
        {
            NSString *path = [_basePath stringByAppendingPathComponent: [key MD5]];
            [data writeToFile: path
                   atomically: YES];
        }
    }
}

- (NSData *)dataForKey: (NSString *)key
{
    if (key)
    {
        NSString *path = [_basePath stringByAppendingPathComponent: [key MD5]];
        return [[NSData alloc] initWithContentsOfFile: path];
    }
    
    return nil;
}

@end
