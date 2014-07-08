//
//  RRSGlowLabel.h
//  TextGlowDemo
//
//  Created by Andrew on 28/04/2010.
//  Copyright 2010 Red Robot Studios. All rights reserved.
//
#import <UIKit/UIKit.h>

@interface RRSGlowLabel : UILabel

@property (nonatomic) CGSize glowOffset;
@property (nonatomic) CGFloat glowAmount;
@property (nonatomic, strong) UIColor *glowColor;

@end
