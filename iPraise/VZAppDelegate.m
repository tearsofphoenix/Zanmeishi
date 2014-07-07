//
//  VZAppDelegate.m
//  iPraise
//
//  Created by Mac003 on 14-7-3.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZAppDelegate.h"
#import "VZRootViewController.h"
#import "VZHeaders.h"
#import "iOSHierarchyViewer.h"
#import "VZDataService.h"

@implementation VZAppDelegate

- (BOOL)          application: (UIApplication *)application
didFinishLaunchingWithOptions: (NSDictionary *)launchOptions
{
    [iOSHierarchyViewer start];
    
    _window = [[UIWindow alloc] initWithFrame: [[UIScreen mainScreen] bounds]];
    [_window makeKeyAndVisible];
    
    VZRootViewController *rootViewController = [[VZRootViewController alloc] init];
    [_window setRootViewController: rootViewController];
    
//    [self testExample];
    
    return YES;
}


@end
