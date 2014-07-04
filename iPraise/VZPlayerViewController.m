//
//  VZPlayerViewController.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZPlayerViewController.h"
#import "VZHeaders.h"
#import "VZAudioPlayerView.h"

@interface VZPlayerViewController ()

@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UIImageView *imageView;
@property (nonatomic, strong) UILabel *albumLabel;
@property (nonatomic, strong) UILabel *artistLabel;

@property (nonatomic, strong) VZAudioPlayerView *playerView;

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
    
    [[self view] addGradientFrom: [VZTheme blueStartColor]
                              to: [VZTheme blueEndColor]];
    
    CGRect rect = [[self view] bounds];

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
    
    _playerView = [[VZAudioPlayerView alloc] initWithFrame: CGRectMake(0, 300, 320, 90)];
    [[self view] addSubview: _playerView];
    
    [self _updateUIForData];
}

- (void)_updateUIForData
{
    [_titleLabel setText: _songInfo[VZSongNameKey]];
}

- (void)_handleBackEvent: (id)sender
{
    [[self navigationController] setNavigationBarHidden: NO];
    [[self navigationController] popViewControllerAnimated: YES];
}

@end
