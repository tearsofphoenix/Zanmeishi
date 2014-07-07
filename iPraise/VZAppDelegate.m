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
    
    [self testExample];
    
    return YES;
}

- (void)testExample
{
    @autoreleasepool
    {
        NSString *path = [[NSBundle bundleForClass: [self class]] pathForResource: @"love"
                                                                           ofType: @"html"];
        
        //        NSString *str = [[NSString alloc] initWithContentsOfFile: path
        //                                                        encoding: NSUTF8StringEncoding
        //                                                           error: NULL];
        TFHpple *parser = [[TFHpple alloc] initWithHTMLData: [[NSData alloc] initWithContentsOfFile: path]];
        NSArray *nodes = [parser searchWithXPathQuery: @"//div[@class='main']"];
        NSMutableDictionary *songDetailInfo = [NSMutableDictionary dictionary];
        
        if ([nodes count] > 0)
        {
            TFHppleElement *mainNode = nodes[0];
            TFHppleElement *entityNode = nil;
            {
                entityNode = [mainNode firstChildWithClassName: @"entity"];
                TFHppleElement *albumImageNode = entityNode[3][0];
                songDetailInfo[@"album.image"] = albumImageNode[@"src"];
                
                TFHppleElement *extscountNode = entityNode[7][1];
                NSString *favCount = [extscountNode[1][0] content];
                NSString *showCount = [extscountNode[3][0] content];
                
                //TODO
                //
                //                NSString *commentCount = [extscountNode[2][0] content];
                
                songDetailInfo[@"fav.count"] = favCount;
                songDetailInfo[@"show.count"] = showCount;
                
                //                NSLog(@"%@ %@ %@", favCount, showCount, commentCount);
            }
            
            TFHppleElement *lyricsNode = [mainNode firstChildWithBlock: (^BOOL(TFHppleElement *element)
                                                                         {
                                                                             return [element[@"id"] isEqualToString: @"lyrics"];
                                                                         })];
            
            {
                TFHppleElement *node = lyricsNode[7][3][0];
                NSString *lyrics = [node content];
                songDetailInfo[@"lyrics"] = lyrics;
                
                NSLog(@"%@", lyrics);
            }
        }
    }
}

@end
