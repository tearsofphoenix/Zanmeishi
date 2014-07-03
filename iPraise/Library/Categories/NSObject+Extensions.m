//
//  NSObject+Extensions.m
//  Zanmeishi
//
//  Created by Lei on 14-7-4.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "NSObject+Extensions.h"

@implementation NSObject (Extensions)


- (NSData *)plistData
{
    NSError *error = nil;
    
    NSData *data = [NSPropertyListSerialization dataWithPropertyList: self
                                                      format: NSPropertyListXMLFormat_v1_0
                                                     options: 0
                                                       error: &error];
    if (error)
    {
        NSLog(@"in func: %s line: %d error: %@", __func__, __LINE__, [error localizedDescription]);
    }
    
    return data;
}

@end
