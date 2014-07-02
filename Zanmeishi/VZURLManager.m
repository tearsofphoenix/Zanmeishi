//
//  VZURLManager.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZURLManager.h"

@implementation VZURLManager

+ (NSString *)baseURL
{
    return @"http://www.zanmeishi.com";
}

+ (NSString *)loginURL
{
    return [[self baseURL] stringByAppendingString: @"/ajax/login"];
}

@end
