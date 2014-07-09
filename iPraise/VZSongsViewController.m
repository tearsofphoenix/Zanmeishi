//
//  VZFirstViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-6-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZSongsViewController.h"
#import "VZHeaders.h"
#import "VZDataService.h"

@interface VZSongsViewController ()

@end

@implementation VZSongsViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

//    [[VZUserManager manager] loginUser: @"tearsofphoenix"
//                              password: @"veritasLXM"
//                              callback: (^(id result, NSError *error)
//                                         {
//    
//                                         })];
    [[self view] setBackgroundColor: [UIColor whiteColor]];
    [self setTitle: @"歌曲"];
    
    UITabBarItem *item = [[UITabBarItem alloc] initWithTitle: [self title]
                                                       image: [UIImage imageNamed: @"VZMusic"]
                                               selectedImage: nil];
    [self setTabBarItem: item];
}

@end
