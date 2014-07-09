//
//  NSString+Extensions.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "NSString+Extensions.h"
#import <CommonCrypto/CommonCrypto.h>
#import <objc/runtime.h>
#import <CoreMedia/CoreMedia.h>

static const char kNSStringLyricBoundaryTimesKey;

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

- (NSArray *)lyricBoundaryTimes
{
    NSArray *times = objc_getAssociatedObject(self, &kNSStringLyricBoundaryTimesKey);
    if (!times)
    {
        NSArray *lines = [self componentsSeparatedByCharactersInSet: [NSCharacterSet newlineCharacterSet]];
        NSMutableArray *collectedTimes = [NSMutableArray array];
        
        for (NSString *lLooper in lines)
        {
            NSInteger length = [lLooper length];
            NSInteger startIdx = 0;
            NSInteger endIdx = 0;
            
            for (NSInteger iLooper = 0; iLooper < length; ++iLooper)
            {
                unichar charLooper = [lLooper characterAtIndex: iLooper];
                if (charLooper == '[')
                {
                    startIdx = iLooper + 1;
                    
                }else if (charLooper == ']')
                {
                    endIdx = iLooper - 1;
                    
                    //deal one range
                    NSString *timeString = [lLooper substringWithRange: NSMakeRange(startIdx, endIdx - startIdx)];
                    NSString *minute = [timeString substringToIndex: 1];
                    NSString *second = [timeString substringWithRange: NSMakeRange(3, 2)];
                    NSString *microSecond = [timeString substringWithRange: NSMakeRange(6, 2)];
                    
                    NSLog(@"%@ %@ %@ %@", timeString, minute, second, microSecond);
                    
                    NSTimeInterval seconds = [minute integerValue] * 60 + [second integerValue] + [microSecond integerValue] / 60.0;
                    CMTime mediaTime = CMTimeMakeWithSeconds(seconds, 1);
                    NSValue *value = [NSValue value: &mediaTime
                                       withObjCType: @encode(CMTime)];
                    
                    [collectedTimes addObject: value];
                }
            }
        }
    }
    
    return times;
}


@end
