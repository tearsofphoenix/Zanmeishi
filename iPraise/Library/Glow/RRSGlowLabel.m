//
//  RRSGlowLabel.m
//  TextGlowDemo
//
//  Created by Andrew on 28/04/2010.
//  Red Robot Studios 2010.
//

#import "RRSGlowLabel.h"


@interface RRSGlowLabel()
{
    CGColorSpaceRef _colorSpaceRef;
    CGColorRef _glowColorRef;
}

- (void)_commonInitialize;

@end

@implementation RRSGlowLabel

- (void)setGlowColor:(UIColor *)newGlowColor
{
    if (newGlowColor != _glowColor)
    {
        CGColorRelease(_glowColorRef);

        _glowColor = newGlowColor;
        _glowColorRef = CGColorCreate(_colorSpaceRef, CGColorGetComponents([_glowColor CGColor]));
    }
}

- (void)_commonInitialize
{
    _colorSpaceRef = CGColorSpaceCreateDeviceRGB();
    
    self.glowOffset = CGSizeMake(0.0, 0.0);
    self.glowAmount = 0.0;
    self.glowColor = [UIColor clearColor];
}

- (void)awakeFromNib
{
    [self _commonInitialize];
}

- (id)initWithFrame: (CGRect)frame
{
    if((self = [super initWithFrame: frame]))
    {
        [self _commonInitialize];
    }
    
    return self;
}

- (void)drawTextInRect: (CGRect)rect
{
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSaveGState(context);
    
    CGContextSetShadow(context, _glowOffset, _glowAmount);
    CGContextSetShadowWithColor(context, _glowOffset, _glowAmount, _glowColorRef);
    
    [super drawTextInRect: rect];
    
    CGContextRestoreGState(context);
}

- (void)dealloc
{
    CGColorRelease(_glowColorRef);
    CGColorSpaceRelease(_colorSpaceRef);
}

@end
