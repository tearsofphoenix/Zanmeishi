//
//  VZSecondViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-6-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZPreferencesViewController.h"

@interface VZPreferencesViewController ()

@end

@implementation VZPreferencesViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

    [[self view] setBackgroundColor: [UIColor whiteColor]];
    
    UITabBarItem *item = [[UITabBarItem alloc] initWithTitle: @"我"
                                                       image: [UIImage imageNamed: @"VZTabMe"]
                                               selectedImage: nil];
    [self setTabBarItem: item];
    [self setTitle: @"我"];

}
 
@end
