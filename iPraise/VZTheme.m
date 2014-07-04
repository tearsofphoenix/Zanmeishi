//
//  VZTheme.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZTheme.h"
#import "VZHeaders.h"

@implementation VZTheme

+ (UIFont *)smallNumberFont
{
    return [UIFont fontWithName: @"HelveticaNeue-Light"
                           size: 12];
}

+ (UIColor *)textColor
{
    return [UIColor colorWithWhite: 0.9
                             alpha: 0.9];
}

#pragma mark - purple
+ (UIColor *)purpleStartColor
{
    return [UIColor colorWithHexNumber: 0x7045DE];
}

+ (UIColor *)purpleEndColor
{
    return [UIColor colorWithHexNumber: 0x1AD6FD];
}

#pragma mark - blue
+ (UIColor *)blueStartColor
{
    return [UIColor colorWithHexNumber: 0x1D77EF];
}

+ (UIColor *)blueEndColor
{
    return [UIColor colorWithHexNumber: 0x81F3FD];
}

@end
