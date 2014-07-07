//
//  VZAudioPlayerView.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZAudioPlayerView.h"
#import "VZHeaders.h"

@interface VZAudioPlayerView ()

@property (nonatomic, strong) UILabel *elapseTimeLabel;
@property (nonatomic, strong) UILabel *totalTimeLabel;
@property (nonatomic, strong) UISlider *progressSlider;

@property (nonatomic, strong) UIButton *previousButton;
@property (nonatomic, strong) UIButton *playButton;
@property (nonatomic, strong) UIButton *nextButton;
@property (nonatomic, strong) UIButton *loopStateButton;

@end

@implementation VZAudioPlayerView

+ (Class)layerClass
{
    return [UIToolbar layerClass];
}

- (instancetype)initWithFrame: (CGRect)frame
{
    self = [super initWithFrame: frame];
    if (self)
    {
//        UIToolbar *backgroundView = [[UIToolbar alloc] initWithFrame: [self bounds]];
//        [backgroundView setUserInteractionEnabled: NO];
//        [self addSubview: backgroundView];
        
        _elapseTimeLabel = [[UILabel alloc] initWithFrame: CGRectMake(5, 0, 50, 16)];
        [_elapseTimeLabel setBackgroundColor: [UIColor clearColor]];
        [_elapseTimeLabel setFont: [VZTheme smallNumberFont]];
        [_elapseTimeLabel setTextAlignment: NSTextAlignmentCenter];
        [_elapseTimeLabel setTextColor: [VZTheme textColor]];
        [_elapseTimeLabel setText: @"1:15"];
        
        [self addSubview: _elapseTimeLabel];
        
        _totalTimeLabel = [[UILabel alloc] initWithFrame: CGRectMake(frame.size.width - 55, 0, 50, 16)];
        [_totalTimeLabel setBackgroundColor: [UIColor clearColor]];
        [_totalTimeLabel setFont: [VZTheme smallNumberFont]];
        [_totalTimeLabel setTextAlignment: NSTextAlignmentCenter];
        [_totalTimeLabel setTextColor: [VZTheme textColor]];
        [_totalTimeLabel setText: @"3:40"];
        
        [self addSubview: _totalTimeLabel];
        
        _progressSlider = [[UISlider alloc] initWithFrame: CGRectMake(0, 12, frame.size.width, 31)];
        
        [self addSubview: _progressSlider];
        
        _previousButton = [[UIButton alloc] initWithFrame: CGRectMake(85, 54, 30, 30)];
        [_previousButton setImage: [UIImage imageNamed: @"VZToStart"]
                         forState: UIControlStateNormal];
        [_previousButton setShowsTouchWhenHighlighted: YES];
        [self addSubview: _previousButton];
        
        _playButton = [[UIButton alloc] initWithFrame: CGRectMake(145, 54, 30, 30)];
        [_playButton setImage: [UIImage imageNamed: @"VZPlay"]
                     forState: UIControlStateNormal];
        [_playButton setShowsTouchWhenHighlighted: YES];
        [self addSubview: _playButton];
        
        _nextButton = [[UIButton alloc] initWithFrame: CGRectMake(200, 54, 30, 30)];
        [_nextButton setImage: [UIImage imageNamed: @"VZToEnd"]
                     forState: UIControlStateNormal];
        [_nextButton setShowsTouchWhenHighlighted: YES];
        [self addSubview: _nextButton];
        
        _loopStateButton = [[UIButton alloc] initWithFrame: CGRectMake(260, 54, 30, 30)];
        [_loopStateButton setImage: [UIImage imageNamed: @"VZLoop"]
                          forState: UIControlStateNormal];
        [_loopStateButton setShowsTouchWhenHighlighted: YES];
        [self addSubview: _loopStateButton];
    }
    return self;
}

@end
