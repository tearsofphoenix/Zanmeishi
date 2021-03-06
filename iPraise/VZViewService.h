//
//  VZViewService.h
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "VZHeaders.h"

@interface VZViewService : NSObject

+ (instancetype)service;

- (void)alertMessage: (NSString *)message;

- (void)showPopoverFromPoint: (CGPoint)point
                  selections: (NSArray *)selections
                    callback: (VZCallback)callback;

@end
