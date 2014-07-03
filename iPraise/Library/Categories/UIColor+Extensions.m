//
//  Extensions.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "UIColor+Extensions.h"

@implementation UIColor(Extensions)

#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
                                    green:((float)((rgbValue & 0xFF00) >> 8))/255.0 \
                                    blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

+ (instancetype)colorWithHexNumber: (NSInteger)number
{
    return UIColorFromRGB(number);
}

@end
