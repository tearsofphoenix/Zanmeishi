//
//  UIView+Extensions.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "UIView+Extensions.h"
#import <objc/runtime.h>

static const char kUIViewGradientLayerKey;

@implementation UIView(Extensions)

- (void)addGradientFrom: (UIColor *)color1
                     to: (UIColor *)color2
{
    CAGradientLayer *gradient = objc_getAssociatedObject(self, &kUIViewGradientLayerKey);
    if (!gradient)
    {
        gradient = [CAGradientLayer layer];
        objc_setAssociatedObject(self, &kUIViewGradientLayerKey, gradient, OBJC_ASSOCIATION_ASSIGN);
    }
    
    [gradient setColors: @[ (id)[color1 CGColor], (id)[color2 CGColor]]];
    [gradient setFrame: [self bounds]];
    
    [[self layer] insertSublayer: gradient
                         atIndex: 0];
}

@end
