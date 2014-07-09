//
//  NSString+Extensions.h
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (Extensions)

@property (NS_NONATOMIC_IOSONLY, readonly, copy) NSString *MD5;

- (NSArray *)lyricBoundaryTimes;

@end
