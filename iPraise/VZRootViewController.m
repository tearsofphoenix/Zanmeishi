//
//  VZRootViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZRootViewController.h"
#import "VZSongsViewController.h"
#import "VZSearchViewController.h"
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
        //    UINavigationController *snavController = [[UINavigationController alloc] initWithRootViewController: songsViewController];
        
        VZSearchViewController *searchViewController = [[VZSearchViewController alloc] init];
        //    UINavigationController *searchNavController = [[UINavigationController alloc] initWithRootViewController: searchViewController];
        
        VZPreferencesViewController *preferencesViewController = [[VZPreferencesViewController alloc] init];
        //    UINavigationController *pnavController = [[UINavigationController alloc] initWithRootViewController: preferencesViewController];
        
        UITabBarController *tabBarController = [[UITabBarController alloc] init];
        [tabBarController setViewControllers: @[songsViewController, searchViewController, preferencesViewController]];
        [tabBarController setSelectedIndex: 0];
        [self pushViewController: tabBarController
                        animated: NO];    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];


}

@end
