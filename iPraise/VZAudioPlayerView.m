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

- (id)initWithFrame: (CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self)
    {
        _elapseTimeLabel = [[UILabel alloc] initWithFrame: CGRectMake(5, 0, 50, 12)];
        [_elapseTimeLabel setBackgroundColor: [UIColor clearColor]];
        [_elapseTimeLabel setFont: [VZTheme smallNumberFont]];
        [_elapseTimeLabel setTextAlignment: NSTextAlignmentCenter];
        [_elapseTimeLabel setTextColor: [VZTheme textColor]];
        
        [self addSubview: _elapseTimeLabel];
        
        _totalTimeLabel = [[UILabel alloc] initWithFrame: CGRectMake(frame.size.width - 55, 0, 50, 12)];
        [_totalTimeLabel setBackgroundColor: [UIColor clearColor]];
        [_totalTimeLabel setFont: [VZTheme smallNumberFont]];
        [_totalTimeLabel setTextAlignment: NSTextAlignmentCenter];
        [_totalTimeLabel setTextColor: [VZTheme textColor]];
        
        [self addSubview: _totalTimeLabel];
        
        _progressSlider = [[UISlider alloc] initWithFrame: CGRectMake(0, 12, frame.size.width, 4)];
        
        [self addSubview: _progressSlider];
        
        _previousButton = [[UIButton alloc] initWithFrame: CGRectMake(35, 35, <#CGFloat width#>, <#CGFloat height#>)];
        [self addSubview: _previousButton];
    }
    return self;
}

@end
