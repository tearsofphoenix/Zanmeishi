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

- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

- (void)testExample
{
    @autoreleasepool
    {
        NSString *path = [[NSBundle bundleForClass: [self class]] pathForResource: @"search"
                                                                           ofType: @"html"];
        
        NSString *str = [[NSString alloc] initWithContentsOfFile: path
                                                        encoding: NSUTF8StringEncoding
                                                           error: NULL];
//        str = [str stringByReplacingOccurrencesOfString: @"<sont style=\"color: rgba(255,0,0, 0.99);\">"
//                                             withString: @""];
//        str = [str stringByReplacingOccurrencesOfString: @"</sont>"
//                                             withString: @""];
        
        MXMLDocument *document = [[MXMLDocument alloc] initWithString: str
                                                          contentType: MXMLContentTypeHTML];
        
        NSArray *nodes = [document nodesWithXPath: @"//div[@class='songs mt5']/table/tr"];
        if ([nodes count] > 0)
        {
            NSMutableArray *result = [NSMutableArray arrayWithCapacity: [nodes count]];
            
            for (MXMLNode *nLooper in nodes)
            {
                NSMutableDictionary *infoLooper = [NSMutableDictionary dictionary];
                
                NSArray *children = [nLooper children];
                NSDictionary *attr = [[children[0] firstChild] attributes];
                
//                NSLog(@"%@ %@", attr[@"name"], attr[@"value"]);
                
                infoLooper[@"name"] = attr[@"name"];
                infoLooper[@"id"] = attr[@"value"];
                
                //children[1]; //index node
                
                {
                    MXMLNode *songNode = children[2];
                    NSArray *songChildren = [songNode children];
                    
                    MXMLNode *sNode = songChildren[0];
                    NSString *songPath = [sNode attributes][@"href"];
                    NSString *songName = [sNode textContent];
                    
                    MXMLNode *artistNode = songChildren[2];
                    NSString *artistPath = [artistNode attributes][@"href"];
                    NSString *artistName = [artistNode textContent];
                    
                    MXMLNode *albumNode = songChildren[4];
                    NSString *albumPath = [albumNode attributes][@"href"];
                    NSString *albumTitle = [albumNode textContent];
                    
                    infoLooper[@"song.name"] = songName;
                    infoLooper[@"song.path"] = songPath;
                    infoLooper[@"artist.path"] = artistPath;
                    infoLooper[@"artist.name"] = artistName;
                    infoLooper[@"album.path"] = albumPath;
                    infoLooper[@"album.name"] = albumTitle;
                    
//                     NSLog(@"\t\t\t%@ %@ %@ %@ %@", songPath, artistPath, artistName, albumPath, albumTitle);
                }
                
                //fav node
                {
                    MXMLNode *node = children[3];                    
                    infoLooper[@"popularity"] = [[node firstChild] textContent];
                }
                
                [result addObject: infoLooper];
                
//                break;
            }
            
            NSLog(@"%@", result);
        }
    }
}

@end
