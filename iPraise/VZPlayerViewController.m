//
//  VZPlayerViewController.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZPlayerViewController.h"
#import "VZHeaders.h"
#import "VZDataService.h"
#import "VZAudioPlayerView.h"
#import "VZLyricView.h"

@interface VZPlayerViewController ()

@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UIImageView *imageView;
@property (nonatomic, strong) UILabel *albumLabel;
@property (nonatomic, strong) UILabel *artistLabel;
@property (nonatomic, strong) VZLyricView *lyricView;

@property (nonatomic, strong) VZAudioPlayerView *playerView;
@property (nonatomic, strong) NSDictionary *songDetailInfo;

@end

@implementation VZPlayerViewController

- (instancetype)initWithNibName: (NSString *)nibNameOrNil
                         bundle: (NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        [self setHidesBottomBarWhenPushed: YES];
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [[self navigationController] setNavigationBarHidden: YES];
    [[UIApplication sharedApplication] setStatusBarStyle: UIStatusBarStyleLightContent];
    
//    [[self view] addGradientFrom: [VZTheme purpleStartColor]
//                              to: [VZTheme purpleEndColor]];
    
    CGRect rect = [[self view] bounds];

    UIToolbar *backgroundView = [[UIToolbar alloc] initWithFrame: rect];
    [[self view] addSubview: backgroundView];
    [backgroundView addGradientFrom: [VZTheme purpleEndColor]
                                 to: [VZTheme purpleStartColor]];
    
    _titleLabel = [[UILabel alloc] initWithFrame: CGRectMake(0, 20, rect.size.width, 44)];
    [_titleLabel setBackgroundColor: [UIColor clearColor]];
    [_titleLabel setTextAlignment: NSTextAlignmentCenter];
    [_titleLabel setTextColor: [UIColor whiteColor]];
    
    [[self view] addSubview: _titleLabel];
    
    UIButton *backButton = [[UIButton alloc] initWithFrame: CGRectMake(0, 20, 44, 44)];
    [backButton setImage: [UIImage imageNamed: @"VZBack"]
                forState: UIControlStateNormal];
    [backButton setImageEdgeInsets: UIEdgeInsetsMake(7, 7, 8, 8)];
    [backButton addTarget: self
                   action: @selector(_handleBackEvent:)
         forControlEvents: UIControlEventTouchUpInside];
    
    [[self view] addSubview: backButton];
    
    _imageView = [[UIImageView alloc] initWithFrame: CGRectMake(60, 80, 200, 200)];
    [[_imageView layer] setCornerRadius: 100];
    [_imageView setClipsToBounds: YES];
    [[self view] addSubview: _imageView];
    
    _lyricView = [[VZLyricView alloc] initWithFrame: CGRectMake(0, 300, 320, 100)];
    [_lyricView setTextColor: [UIColor colorWithWhite: 0.9
                                                alpha: 1]];
//    [_lyricView setFadeLength: 10.0f];
//    [_lyricView setNumberOfLines: 2];
//    [_lyricView setShadowOffset: CGSizeMake(0.0, -1.0)];
    [_lyricView setBackgroundColor: [UIColor clearColor]];

    [[self view] addSubview: _lyricView];
    
    _playerView = [[VZAudioPlayerView alloc] initWithFrame: CGRectMake(0, 420, 320, 90)];
    [[self view] addSubview: _playerView];
    
    [self _updateUIForData];
}

- (void)_updateUIForData
{
    [_titleLabel setText: _songInfo[VZSongNameKey]];
    
    [[self view] showLoadingMessage: @"正在载入..."];
    
    [[VZDataService service] fetchSong: _songInfo[VZSongInfoPathKey]
                              callback: (^(id result, NSError *error)
                                         {
                                             [[self view] dismissLoading];
                                             //NSLog(@"%@", result);
                                             [self setSongDetailInfo: result];
                                         })];
}

- (void)setSongDetailInfo: (NSDictionary *)songDetailInfo
{
    if (_songDetailInfo != songDetailInfo)
    {
        _songDetailInfo = songDetailInfo;
        
        NSString *ablumPath = _songDetailInfo[VZAlbumImagePathKey];
        [_imageView setImageURLString: ablumPath];
        
        [_lyricView setText: _songDetailInfo[VZSongLyricsKey]];
        
        [_playerView setRemoteAudioURL: _songDetailInfo[VZSongFilePathKey]];
    }
}

- (void)_handleBackEvent: (id)sender
{
    [[self navigationController] setNavigationBarHidden: NO];
    [[self navigationController] popViewControllerAnimated: YES];
}

@end
