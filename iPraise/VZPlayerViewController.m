//
//  VZPlayerViewController.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZPlayerViewController.h"
#import "VZHeaders.h"

@interface VZPlayerViewController ()

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
    
    [[self view] addGradientFrom: [UIColor colorWithHexNumber: 0x1ad6fd]
                              to: [UIColor colorWithHexNumber: 0x7045DE]];
    
    UIButton *backButton = [[UIButton alloc] initWithFrame: CGRectMake(0, 20, 44, 44)];
    [backButton setBackgroundImage: [UIImage imageNamed: @"VZBack"]
                          forState: UIControlStateNormal];
    [backButton setImageEdgeInsets: UIEdgeInsetsMake(7, 7, 8, 8)];
    [backButton addTarget: self
                   action: @selector(_handleBackEvent:)
         forControlEvents: UIControlEventTouchUpInside];
    [[self view] addSubview: backButton];

}

- (void)_handleBackEvent: (id)sender
{
    [[self navigationController] popViewControllerAnimated: YES];
}

@end
