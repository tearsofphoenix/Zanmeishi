//
//  iPraiseTests.m
//  iPraiseTests
//
//  Created by Mac003 on 14-7-3.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "VZHeaders.h"

@interface iPraiseTests : XCTestCase

@end

@implementation iPraiseTests

- (void)setUp
{
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown
{
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample
{
    NSString *path = [[NSBundle bundleForClass: [self class]] pathForResource: @"search"
                                                                       ofType: @"html"];

    NSString *str = [[NSString alloc] initWithContentsOfFile: path
                                                    encoding: NSUTF8StringEncoding
                                                       error: NULL];
    
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

            infoLooper[@"name"] = attr[@"name"];
            infoLooper[@"id"] = attr[@"value"];
            
            //children[1]; //index node
            
            {
                MXMLNode *songNode = children[2];
                NSArray *songChildren = [songNode children];
                
                NSString *songPath = [(MXMLNode *)songChildren[0] attributes][@"href"];
                
                MXMLNode *artistNode = songChildren[1];
                NSString *artistPath = [artistNode attributes][@"href"];
                NSString *artistName = [artistNode textContent];
                
                MXMLNode *albumNode = songChildren[2];
                NSString *albumPath = [albumNode attributes][@"href"];
                NSString *albumTitle = [albumNode textContent];
                
                infoLooper[@"song.path"] = songPath;
                infoLooper[@"artist.path"] = artistPath;
                infoLooper[@"artist.name"] = artistName;
                infoLooper[@"album.path"] = albumPath;
                infoLooper[@"album.name"] = albumTitle;
                
               // NSLog(@"\t\t\t%@ %@ %@ %@ %@", songPath, artistPath, artistName, albumPath, albumTitle);                
            }
            
            //fav node
            {
                MXMLNode *node = children[3];
                
                infoLooper[@"popularity"] = [[node firstChild] textContent];
            }
            
            [result addObject: infoLooper];
         
            //break;
        }
        
        NSLog(@"%@", result);
    }    
}

@end
