//
//  NSString+Extensions.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "NSString+Extensions.h"
#import <CommonCrypto/CommonCrypto.h>

@implementation NSString (Extensions)

- (NSString *)MD5
{
    const char* input = [self UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(input, (CC_LONG)strlen(input), result);
    
    NSMutableString *digest = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    for (NSInteger i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
    {
        [digest appendFormat: @"%02x", result[i]];
    }
    
    return digest;
}

@end
