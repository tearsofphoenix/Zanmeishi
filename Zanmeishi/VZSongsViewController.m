//
//  VZFirstViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-6-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZSongsViewController.h"
#import "VZHeaders.h"
#import "VZUserManager.h"

@interface VZSongsViewController ()

@end

@implementation VZSongsViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

    [[VZUserManager manager] loginUser: @"tearsofphoenix"
                              password: @"xx"
                              callback: (^(id result, NSError *error)
                                         {
    
                                         })];
    
    UITabBarItem *item = [[UITabBarItem alloc] initWithTitle: @"歌曲"
                                                       image: [UIImage imageNamed: @""]
                                               selectedImage: [UIImage imageNamed: @""]];
    [self setTabBarItem: item];
}

@end
