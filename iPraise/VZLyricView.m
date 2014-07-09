//
//  VZLyricView.m
//  iPraise
//
//  Created by Lei on 14-7-9.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZLyricView.h"

@interface VZLyricView ()

@property (nonatomic, strong) UIView *topGradientView;
@property (nonatomic, strong) UIView *bottomGradientView;
@property (nonatomic, strong) NSMutableAttributedString *lyricString;

@end

@implementation VZLyricView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self)
    {
        CGRect rect = frame;
        rect.origin = CGPointZero;
        
        _textView = [[UITextView alloc] initWithFrame: rect];
        [_textView setBackgroundColor: [UIColor clearColor]];
        [_textView setUserInteractionEnabled: NO];
        [_textView setTextAlignment: NSTextAlignmentCenter];
        [_textView setFont: [UIFont systemFontOfSize: 18]];
        
        [self addSubview: _textView];
        
        UIColor* baseColor = [UIColor colorWithWhite: 0.4
                                               alpha: 1];
        UIColor *fadeColor = [baseColor colorWithAlphaComponent: 0.1];
        
        CAGradientLayer *gradientLayer = [CAGradientLayer layer];
        [gradientLayer setColors: @[ (id)[fadeColor CGColor], (id)[baseColor CGColor]]];
        
        rect.size.height = 20;
        CGRect gradientFrame = rect;
        [gradientLayer setFrame: gradientFrame];
        
        _topGradientView = [[UIView alloc] initWithFrame: rect];
        [[_topGradientView layer] insertSublayer: gradientLayer
                                         atIndex: 0];
        [self addSubview: _topGradientView];
        
        gradientLayer = [CAGradientLayer layer];
        [gradientLayer setColors: @[ (id)[fadeColor CGColor], (id)[baseColor CGColor]]];
        [gradientLayer setFrame: gradientFrame];

        rect.origin.y = frame.size.height - rect.size.height;
        _bottomGradientView = [[UIView alloc] initWithFrame: rect];
        [[_bottomGradientView layer] insertSublayer: gradientLayer
                                            atIndex: 0];
        [self addSubview: _bottomGradientView];
    }
    return self;
}

- (void)setTextColor: (UIColor *)textColor
{
    [_textView setTextColor: textColor];
}

- (UIColor *)textColor
{
    return [_textView textColor];
}

- (void)setText: (NSString *)text
{
    [_textView setText: text];
}

- (NSString *)text
{
    return [_textView text];
}

- (void)appendText: (NSString *)text
{
    if (!_lyricString)
    {
        _lyricString = [[NSMutableAttributedString alloc] init];
    }
    
    [_lyricString appendAttributedString: [[NSAttributedString alloc] initWithString: text]];
    [_textView setAttributedText: _lyricString];
}

@end
