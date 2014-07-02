//
//  VZRootViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZRootViewController.h"
#import "VZSongsViewController.h"
#import "VZPreferencesViewController.h"

@interface VZRootViewController ()

@end

@implementation VZRootViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName: nibNameOrNil
                           bundle: nibBundleOrNil];
    if (self)
    {
        VZSongsViewController *songsViewController = [[VZSongsViewController alloc] init];
        UINavigationController *snavController = [[UINavigationController alloc] initWithRootViewController: songsViewController];
        
        VZPreferencesViewController *preferencesViewController = [[VZPreferencesViewController alloc] init];
        UINavigationController *pnavController = [[UINavigationController alloc] initWithRootViewController: preferencesViewController];
        
        [self setViewControllers: @[ snavController, pnavController]];
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

@end
