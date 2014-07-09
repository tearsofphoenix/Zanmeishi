//
//  VZUserManager.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZDataService.h"
#import "VZViewService.h"
#import "VZFileCacheManager.h"
#import "VZHeaders.h"

@interface VZDataService ()

@property (nonatomic, strong) NSMutableSet *operationsOfGET;

@end

@implementation VZDataService

+ (instancetype)service
{
    static id gsManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, (^
                               {
                                   gsManager = [[self alloc] init];
                               }));
    
    return gsManager;
}

- (instancetype)init
{
    if ((self = [super init]))
    {
        _operationsOfGET = [[NSMutableSet alloc] init];
    }
    
    return self;
}

- (void)_post: (NSString *)URLString
   parameters: (NSDictionary *)args
     callback: (VZCallback)callback
{
#if DEBUG
    NSLog(@"POST-URL: %@ args: %@", URLString, args);
#endif

    [[AFHTTPRequestOperationManager manager] POST: URLString
                                       parameters: args
                                          success: (^(AFHTTPRequestOperation *operation, NSDictionary *result)
                                                    {
//                                                        NSLog(@"%@", result);
                                                        
                                                        if ([result[VZMessageOKKey] integerValue] == 1)
                                                        {
                                                            [self setLoginInfo: result];
                                                            
                                                            if (callback)
                                                            {
                                                                callback(result, nil);
                                                            }
                                                        }else
                                                        {
                                                            [self handleFaultResult: result];
                                                            
                                                            if (callback)
                                                            {
                                                                callback(nil, nil);
                                                            }
                                                        }
                                                    })
                                          failure: (^(AFHTTPRequestOperation *operation, NSError *error)
                                                    {
                                                        NSLog(@"%@", error);
                                                        if (callback)
                                                        {
                                                            callback(nil, error);
                                                        }
                                                    })];
}

- (void)_get: (NSString *)URLString
  parameters: (NSDictionary *)args
    callback: (VZCallback)callback
{
    if ([args count] > 0)
    {
        URLString = [URLString stringByAppendingFormat: @"?%@", [args queryURLString]];
    }
#if DEBUG
    NSLog(@"GET-URL: %@", URLString);
#endif
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL: [NSURL URLWithString: URLString]];
    [request setValue: @"text/html"
   forHTTPHeaderField: @"Accept"];
    [request setHTTPMethod: @"POST"];
    
    AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc] initWithRequest: request];
    [operation setCompletionBlockWithSuccess: (^(AFHTTPRequestOperation *operation, NSData *result)
                                               {
#if DEBUG
//                                                   NSString *str = [[NSString alloc] initWithData: result
//                                                                                         encoding: NSUTF8StringEncoding];
//                                                   NSLog(@"%@",  str);
#endif
                                                   
                                                   [_operationsOfGET removeObject: operation];
                                                   
                                                   if (callback)
                                                   {
                                                       callback(@[URLString, result], nil);
                                                   }
                                               })
                                     failure: (^(AFHTTPRequestOperation *operation, NSError *error)
                                               {
                                                   NSLog(@"%@", error);
                                                   
                                                   [_operationsOfGET removeObject: operation];
                                                   
                                                   if (callback)
                                                   {
                                                       callback(nil, error);
                                                   }
                                               })];
    [_operationsOfGET addObject: operation];
    
    [operation start];
}

- (void)loginUser: (NSString *)userName
         password: (NSString *)password
         callback: (VZCallback)callback
{
    [self _post: [VZURLManager loginURL]
     parameters: (@{
                    @"user" : userName,
                    @"password" : password
                    })
       callback: callback];
}

- (void)searchWithKeyword: (NSString *)keyword
                     type: (NSString *)type
                 callback: (VZCallback)callback
{
    NSDictionary *args = (@{
                            @"keyword": keyword,
                            @"type" : type
                            });
    
    NSString *URLString = [[VZURLManager searchURL] stringByAppendingFormat: @"?%@", [args queryURLString]];
    NSData *cachedData = [[VZFileCacheManager manager] dataForKey: URLString];
    if (cachedData)
    {
        NSLog(@"using cache for url: %@", URLString);
        if (callback)
        {
            callback([cachedData plistObject], nil);
        }
    }else
    {
        
        [self _get: [VZURLManager searchURL]
        parameters: args
          callback: (^(NSArray *result, NSError *error)
                     {
                         if (result && !error)
                         {
                             [self _parseSearchResult: result
                                             callback: callback];
                         }else
                         {
                             if (callback)
                             {
                                 callback(result, error);
                             }
                         }
                     })];
    }
}

- (void)fetchSong: (NSString *)songSubPath
         callback: (VZCallback)callback
{
    NSString *URLString = [[VZURLManager baseURL] stringByAppendingString: songSubPath];
    NSData *cachedData = [[VZFileCacheManager manager] dataForKey: URLString];
    if (cachedData)
    {
        NSLog(@"using cache for url: %@", URLString);
        if (callback)
        {
            callback([cachedData plistObject], nil);
        }
    }else
    {
        [self _get: URLString
        parameters: nil
          callback: (^(NSArray *result, NSError *error)
                     {
                         if (result && !error)
                         {
                             [self _parseSongResult: result
                                           callback: callback];
                         }else
                         {
                             if (callback)
                             {
                                 callback(result, error);
                             }
                         }
                     })];
    }
}

- (void)_parseSearchResult: (NSArray *)args
                  callback: (VZCallback)callback
{
    NSString *originURL = args[0];
    NSMutableArray *result = nil;
    
    NSError *error = nil;
    GDataXMLDocument *document = [[GDataXMLDocument alloc] initWithHTMLData: args[1]
                                                                      error: &error];
    
    NSArray *nodes = [document nodesForXPath: @"//div[@class='songs mt5']/table/tr"
                                       error: &error];
    if ([nodes count] > 0)
    {
        result = [NSMutableArray arrayWithCapacity: [nodes count]];
        
        for (GDataXMLNode *nLooper in nodes)
        {
            @autoreleasepool
            {
                NSMutableDictionary *infoLooper = [NSMutableDictionary dictionary];
                
                NSArray *children = [nLooper children];
                GDataXMLElement *nameNode = children[1][0];
                
                //                NSLog(@"%@ %@", attr[@"name"], attr[@"value"]);
                
                infoLooper[VZNameKey] = [nameNode attributeValueForName: @"name"];
                infoLooper[VZIDKey] = [nameNode attributeValueForName: @"value"];
                
                //children[1]; //index node
                
                {
                    GDataXMLElement *songNode = children[5];
                    NSArray *songChildren = [songNode children];
                    
                    GDataXMLElement *sNode = songChildren[1];
                    NSString *songPath = [sNode attributeValueForName: @"href"];
                    NSString *songName = [sNode stringValue];
                    
                    GDataXMLElement *artistNode = songChildren[3];
                    NSString *artistPath = [artistNode attributeValueForName: @"href"];
                    NSString *artistName = [artistNode stringValue];
                    
                    GDataXMLElement *albumNode = songChildren[5];
                    NSString *albumPath = [albumNode attributeValueForName: @"href"];
                    NSString *albumTitle = [albumNode stringValue];
                    
                    infoLooper[VZSongNameKey] = songName;
                    infoLooper[VZSongInfoPathKey] = songPath;
                    infoLooper[VZArtistPathKey] = artistPath;
                    infoLooper[VZArtistNameKey] = artistName;
                    infoLooper[VZAlbumPathKey] = albumPath;
                    infoLooper[VZAlbumNameKey] = albumTitle;
                    
                    //                     NSLog(@"\t\t\t%@ %@ %@ %@ %@", songPath, artistPath, artistName, albumPath, albumTitle);
                }
                
                //fav node
                {
                    NSString *str = [children[7][0] stringValue];
                    str = [str substringFromIndex: 1];
                    infoLooper[VZPopularityKey] = str;
                }
                
                [result addObject: infoLooper];
            }
        }
        
        //cache data
        [[VZFileCacheManager manager] cacheData: [result plistData]
                                         forKey: originURL];
    }
    
    if (callback)
    {
        callback(result, nil);
    }
}

- (void)_parseSongResult: (NSArray *)args
                callback: (VZCallback)callback
{
    @autoreleasepool
    {
        NSString *originURL = args[0];
        
        NSError *error = nil;
        GDataXMLDocument *parser = [[GDataXMLDocument alloc] initWithHTMLData: args[1]
                                                                        error: &error];

        NSArray *nodes = [parser nodesForXPath: @"//div[@class='main']"
                                         error: &error];
        
        NSMutableDictionary *songDetailInfo = [NSMutableDictionary dictionary];
        
        if ([nodes count] > 0)
        {
            GDataXMLElement *mainNode = nodes[0];
            GDataXMLElement *entityNode = nil;
            {
                entityNode = mainNode[1];
                GDataXMLElement *albumImageNode = entityNode[3][0];
                songDetailInfo[VZAlbumImagePathKey] = [albumImageNode attributeValueForName: @"src"];
                
                GDataXMLElement *extscountNode = entityNode[7][1];
                NSString *favCount = [extscountNode[1][0] stringValue];
                NSString *showCount = [extscountNode[3][0] stringValue];
                NSString *script = [entityNode[11] stringValue];
                NSRange range = [script rangeOfString: @"http://.+mp3"
                                              options: NSRegularExpressionSearch];
                if (range.location != NSNotFound)
                {
                    NSString *path = [script substringWithRange: range];
                    
                    NSLog(@"%@", path);
                    songDetailInfo[VZSongFilePathKey] = path;
                }
                //TODO
                //
                //                NSString *commentCount = [extscountNode[2][0] content];
                
                songDetailInfo[VZSongFavoriteCountKey] = favCount;
                songDetailInfo[VZSongShowCountKey] = showCount;
                
                //                NSLog(@"%@ %@ %@", favCount, showCount, commentCount);
            }
            
            GDataXMLElement *lyricsNode = mainNode[5];

            {
                GDataXMLElement *node = lyricsNode[7][3][0];
                NSString *lyrics = [node stringValue];
                songDetailInfo[VZSongLyricsKey] = lyrics;
                songDetailInfo[VZSongLyricsShowKey] = [lyricsNode[11] stringValue];
            }
            
            //cache data
            [[VZFileCacheManager manager] cacheData: [songDetailInfo plistData]
                                             forKey: originURL];
        }
        
        if (callback)
        {
            callback(songDetailInfo, nil);
        }
    }
}


- (void)handleFaultResult: (NSDictionary *)result
{
    [[VZViewService service] alertMessage: result[VZMessageContentKey]];
}

@end

NSString * const VZUserAvatarKey = @"avatar";
NSString * const VZUserHomePathKey = @"home";
NSString * const VZUserNameKey = @"name";
