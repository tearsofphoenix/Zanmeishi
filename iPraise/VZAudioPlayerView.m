//
//  VZAudioPlayerView.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZAudioPlayerView.h"
#import "VZHeaders.h"
#import <AVFoundation/AVFoundation.h>

static void _GetMinutesAndSeconds(NSInteger duration, NSInteger *minutes, NSInteger *seconds)
{
    if (minutes)
    {
        *minutes = duration / 60;
    }
    
    if (seconds)
    {
        *seconds = duration % 60;
    }
}

@interface VZAudioPlayerView ()

@property (nonatomic, strong) UILabel *elapseTimeLabel;
@property (nonatomic, strong) UILabel *totalTimeLabel;
@property (nonatomic, strong) UISlider *progressSlider;

@property (nonatomic, strong) UIButton *previousButton;
@property (nonatomic, strong) UIButton *playButton;
@property (nonatomic, strong) UIButton *nextButton;
@property (nonatomic, strong) UIButton *loopStateButton;

@property (nonatomic, strong) id timeObserver;
@property (nonatomic, strong) AVPlayer *player;
@property (nonatomic) Float64 duration;
@property (nonatomic) Float64 elapseTime;
@property (nonatomic) BOOL isPlaying;

@end

@implementation VZAudioPlayerView

- (instancetype)initWithFrame: (CGRect)frame
{
    self = [super initWithFrame: frame];
    if (self)
    {
        //        UIToolbar *backgroundView = [[UIToolbar alloc] initWithFrame: [self bounds]];
        //        [backgroundView setUserInteractionEnabled: NO];
        //        [self addSubview: backgroundView];
        _elapseTime = 0;
        _duration = 0;
        
        _elapseTimeLabel = [[UILabel alloc] initWithFrame: CGRectMake(5, 0, 50, 16)];
        [_elapseTimeLabel setBackgroundColor: [UIColor clearColor]];
        [_elapseTimeLabel setFont: [VZTheme smallNumberFont]];
        [_elapseTimeLabel setTextAlignment: NSTextAlignmentCenter];
        [_elapseTimeLabel setTextColor: [VZTheme textColor]];
        [_elapseTimeLabel setText: @"0:0"];
        
        [self addSubview: _elapseTimeLabel];
        
        _totalTimeLabel = [[UILabel alloc] initWithFrame: CGRectMake(frame.size.width - 55, 0, 50, 16)];
        [_totalTimeLabel setBackgroundColor: [UIColor clearColor]];
        [_totalTimeLabel setFont: [VZTheme smallNumberFont]];
        [_totalTimeLabel setTextAlignment: NSTextAlignmentCenter];
        [_totalTimeLabel setTextColor: [VZTheme textColor]];
        
        [self addSubview: _totalTimeLabel];
        
        _progressSlider = [[UISlider alloc] initWithFrame: CGRectMake(0, 12, frame.size.width, 31)];
//        [_progressSlider setMinimumValue: 0];
//        [_progressSlider setMaximumValue: 1];
        [self addSubview: _progressSlider];
        
        _previousButton = [[UIButton alloc] initWithFrame: CGRectMake(85, 54, 30, 30)];
        [_previousButton setImage: [UIImage imageNamed: @"VZToStart"]
                         forState: UIControlStateNormal];
        [_previousButton setShowsTouchWhenHighlighted: YES];
        [_previousButton addTarget: self
                            action: @selector(_handlePreviousEvent:)
                  forControlEvents: UIControlEventTouchUpInside];
        [self addSubview: _previousButton];
        
        _playButton = [[UIButton alloc] initWithFrame: CGRectMake(145, 54, 30, 30)];
        [_playButton setImage: [UIImage imageNamed: @"VZPlay"]
                     forState: UIControlStateNormal];
        [_playButton setShowsTouchWhenHighlighted: YES];
        [_playButton addTarget: self
                        action: @selector(_handlePlayButtonEvent:)
              forControlEvents: UIControlEventTouchUpInside];
        [self addSubview: _playButton];
        
        _nextButton = [[UIButton alloc] initWithFrame: CGRectMake(200, 54, 30, 30)];
        [_nextButton setImage: [UIImage imageNamed: @"VZToEnd"]
                     forState: UIControlStateNormal];
        [_nextButton setShowsTouchWhenHighlighted: YES];
        [_nextButton addTarget: self
                        action: @selector(_handleNextButtonEvent:)
              forControlEvents: UIControlEventTouchUpInside];
        [self addSubview: _nextButton];
        
        _loopStateButton = [[UIButton alloc] initWithFrame: CGRectMake(260, 54, 30, 30)];
        [_loopStateButton setImage: [UIImage imageNamed: @"VZLoop"]
                          forState: UIControlStateNormal];
        [_loopStateButton setShowsTouchWhenHighlighted: YES];
        [_loopStateButton addTarget: self
                             action: @selector(_handleLoopStateButtonEvent:)
                   forControlEvents: UIControlEventTouchUpInside];
        [self addSubview: _loopStateButton];
        
    }
    return self;
}

- (void)setRemoteAudioURL: (NSString *)remoteAudioURL
{
    if (![_remoteAudioURL isEqualToString: remoteAudioURL])
    {
        _remoteAudioURL = remoteAudioURL;
        
        [_player removeTimeObserver: _timeObserver];
        _player = nil;
        
        AVPlayerItem *item = [[AVPlayerItem alloc] initWithURL: [NSURL URLWithString: remoteAudioURL]];
        
        _player = [[AVPlayer alloc] initWithPlayerItem: item];
        
        [_player addObserver: self
                  forKeyPath: @"currentItem.duration"
                     options: 0
                     context: NULL];
        CMTime time = CMTimeMakeWithSeconds(1, 1);
        CMTimeShow(time);

        __block VZAudioPlayerView *dummySelf = self;
        _timeObserver = [_player addPeriodicTimeObserverForInterval: time
                                                              queue: dispatch_get_main_queue()
                                                         usingBlock: (^(CMTime time)
                                                                      {
                                                                          double sec = CMTimeGetSeconds(time);
                                                                          [dummySelf setElapseTime: sec];
                                                                      })];
        _isPlaying = NO;
    }
}

#pragma mark - KVO

- (void)observeValueForKeyPath: (NSString *)keyPath
                      ofObject: (id)object
                        change: (NSDictionary *)change
                       context: (void *)context
{
    if ([keyPath isEqualToString: @"currentItem.duration"])
    {
        [self setDuration: CMTimeGetSeconds([_player currentItem].duration)];
        
    }else
    {
        return [super observeValueForKeyPath: keyPath
                                    ofObject: object
                                      change: change
                                     context: context];
    }
}

- (void)setDuration: (Float64)duration
{
    if (fabs(duration - _duration) > DBL_EPSILON)
    {
        _duration = duration;
        
        NSInteger minutes = 0;
        NSInteger seconds = 0;
        
        _GetMinutesAndSeconds(_duration, &minutes, &seconds);
        
        [_totalTimeLabel setText: [NSString stringWithFormat: @"%02d:%02d", minutes, seconds]];
    }
}

- (void)setElapseTime: (Float64)elapseTime
{
    if (fabs(elapseTime - _elapseTime) > DBL_EPSILON)
    {
        _elapseTime = elapseTime;
        
        [_progressSlider setValue: _elapseTime / _duration
                         animated: YES];
        
        NSInteger minutes = 0;
        NSInteger seconds = 0;
        
        _GetMinutesAndSeconds(_elapseTime, &minutes, &seconds);
        
        [_elapseTimeLabel setText: [NSString stringWithFormat: @"%02d:%02d", minutes, seconds]];

    }
}

#pragma mark - actions

- (void)_handlePreviousEvent: (id)sender
{
    
}

- (void)_handlePlayButtonEvent: (id)sender
{
    if (_isPlaying)
    {
        _isPlaying = NO;
        [_player pause];
    }else
    {
        _isPlaying = YES;
        [_player play];
    }
}

- (void)_handleNextButtonEvent: (id)sender
{
    
}

- (void)_handleLoopStateButtonEvent: (id)sender
{
    
}

@end
