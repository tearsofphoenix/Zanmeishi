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

+ (instancetype)manager
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
    [[AFHTTPRequestOperationManager manager] POST: URLString
                                       parameters: args
                                          success: (^(AFHTTPRequestOperation *operation, NSDictionary *result)
                                                    {
                                                        NSLog(@"%@", result);
                                                        
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
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL: [NSURL URLWithString: URLString]];
    [request setValue: @"text/html"
   forHTTPHeaderField: @"Accept"];
    
    AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc] initWithRequest: request];
    [operation setCompletionBlockWithSuccess: (^(AFHTTPRequestOperation *operation, NSData *result)
                                               {
#if DEBUG
                                                   NSString *str = [[NSString alloc] initWithData: result
                                                                                         encoding: NSUTF8StringEncoding];
                                                   
                                                   NSLog(@"%@",  str);
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

- (void)_parseSearchResult: (NSArray *)args
                  callback: (VZCallback)callback
{
    NSString *originURL = args[0];
    NSMutableArray *result = nil;
    
    TFHpple *document = [[TFHpple alloc] initWithHTMLData: args[1]];
    
    NSArray *nodes = [document searchWithXPathQuery: @"//div[@class='songs mt5']/table/tr"];
    if ([nodes count] > 0)
    {
        result = [NSMutableArray arrayWithCapacity: [nodes count]];
        
        for (TFHppleElement *nLooper in nodes)
        {
            @autoreleasepool
            {
                NSMutableDictionary *infoLooper = [NSMutableDictionary dictionary];
                
                NSArray *children = [nLooper children];
                NSDictionary *attr = [(TFHppleElement *)children[0][0] attributes];
                
                //                NSLog(@"%@ %@", attr[@"name"], attr[@"value"]);
                
                infoLooper[VZNameKey] = attr[@"name"];
                infoLooper[VZIDKey] = attr[@"value"];
                
                //children[1]; //index node
                
                {
                    TFHppleElement *songNode = children[4];
                    NSArray *songChildren = [songNode children];
                    
                    TFHppleElement *sNode = songChildren[1];
                    NSString *songPath = [sNode attributes][@"href"];
                    NSString *songName = [sNode text];
                    
                    TFHppleElement *artistNode = songChildren[3];
                    NSString *artistPath = [artistNode attributes][@"href"];
                    NSString *artistName = [artistNode text];
                    
                    TFHppleElement *albumNode = songChildren[5];
                    NSString *albumPath = [albumNode attributes][@"href"];
                    NSString *albumTitle = [albumNode text];
                    
                    infoLooper[VZSongNameKey] = songName;
                    infoLooper[VZSongPathKey] = songPath;
                    infoLooper[VZArtistPathKey] = artistPath;
                    infoLooper[VZArtistNameKey] = artistName;
                    infoLooper[VZAlbumPathKey] = albumPath;
                    infoLooper[VZAlbumNameKey] = albumTitle;
                    
                    //                     NSLog(@"\t\t\t%@ %@ %@ %@ %@", songPath, artistPath, artistName, albumPath, albumTitle);
                }
                
                //fav node
                {
                    NSString *str = [children[6][0] text];
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
        NSMutableArray *result = nil;
        
        TFHpple *parser = [[TFHpple alloc] initWithHTMLData: args[1]];

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
                NSString *favCount = [extscountNode[0][0] content];
                NSString *showCount = [extscountNode[2][0] content];
                
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
}


- (void)handleFaultResult: (NSDictionary *)result
{
    [[VZViewService service] alertMessage: result[VZMessageContentKey]];
}

@end

NSString * const VZUserAvatarKey = @"avatar";
NSString * const VZUserHomePathKey = @"home";
NSString * const VZUserNameKey = @"name";
