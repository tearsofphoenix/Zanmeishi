//
//  UIView+Extensions.h
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIView (Extensions)

- (void)addGradientFrom: (UIColor *)color1
                     to: (UIColor *)color2;

- (void)showLoadingMessage: (NSString *)message;

- (void)dismissLoading;

@end
