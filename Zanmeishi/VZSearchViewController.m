//
//  VZSearchViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZSearchViewController.h"

@interface VZSearchViewController ()

@end

@implementation VZSearchViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self setTitle: @"搜索"];
    [[self view] setBackgroundColor: [UIColor whiteColor]];
    
    UITabBarItem *item = [[UITabBarItem alloc] initWithTitle: [self title]
                                                       image: [UIImage imageNamed: @"VZTabSearch"]
                                               selectedImage: nil];
    [self setTabBarItem: item];    
}

@end
