//
//  NSData+Extensions.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "NSData+Extensions.h"

@implementation NSData (Extensions)

- (id)plistObject
{
    NSError *error = nil;
    id obj = [NSPropertyListSerialization propertyListWithData: self
                                                       options: 0
                                                        format: NULL
                                                         error: &error];
    if (error)
    {
        NSLog(@"in func: %s line: %d error: %@", __func__, __LINE__, [error localizedDescription]);
    }

    return obj;
}

@end
