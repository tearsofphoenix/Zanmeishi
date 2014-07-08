//
//  UIImageView+Extensions.m
//  iPraise
//
//  Created by Lei on 14-7-9.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "UIImageView+Extensions.h"
#import "AFNetworking.h"
#import "VZFileCacheManager.h"

@implementation UIImageView (Extensions)

- (void)setImageURLString: (NSString *)URLString
{
    NSData *data = [[VZFileCacheManager manager] dataForKey: URLString];
    if (data)
    {
        [self setImage: [UIImage imageWithData: data]];
    }else
    {
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL: [NSURL URLWithString: URLString]];
        
        AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc] initWithRequest: request];
        [operation setCompletionBlockWithSuccess: (^(AFHTTPRequestOperation *operation, NSData *result)
                                                   {
                                                       [[VZFileCacheManager manager] cacheData: result
                                                                                        forKey: URLString];
                                                       
                                                       [self setImage: [UIImage imageWithData: result]];
                                                   })
                                         failure: (^(AFHTTPRequestOperation *operation, NSError *error)
                                                   {
                                                       NSLog(@"%@", error);
                                                       
                                                   })];
        [operation start];
    }
}

@end
