//
//  VZBaseViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZBaseViewController.h"

@interface VZBaseViewController ()

@end

@implementation VZBaseViewController

- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    if ([self respondsToSelector: @selector(setExtendedLayoutIncludesOpaqueBars:)])
    {
        [self setExtendedLayoutIncludesOpaqueBars: NO];
    }
    
    if ([self respondsToSelector: @selector(setEdgesForExtendedLayout:)])
    {
        [self setEdgesForExtendedLayout: UIRectEdgeNone];
    }
    
    if ([self respondsToSelector: @selector(setAutomaticallyAdjustsScrollViewInsets:)])
    {
        [self setAutomaticallyAdjustsScrollViewInsets: NO];
    }
}

@end
