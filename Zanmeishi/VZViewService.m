//
//  VZViewService.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZViewService.h"

@interface VZViewService ()<UIAlertViewDelegate>

@property (nonatomic, strong) UIAlertView *sharedAlertView;

@end

@implementation VZViewService


+ (instancetype)service
{
    static id gsService = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, (^
    {
        
    }));
    
    return gsService;
}

- (void)alertMessage: (NSString *)message
{
    if (!_sharedAlertView)
    {
        _sharedAlertView = [[UIAlertView alloc] initWithTitle: @"提示"
                                                      message: message
                                                     delegate: self
                                            cancelButtonTitle: @"好"
                                            otherButtonTitles: nil];
        [_sharedAlertView show];
    }
}

- (void)        alertView: (UIAlertView *)alertView
didDismissWithButtonIndex: (NSInteger)buttonIndex
{
    [self setSharedAlertView: nil];
}

@end
