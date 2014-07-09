//
//  VZLyricView.h
//  iPraise
//
//  Created by Lei on 14-7-9.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface VZLyricView : UIView

@property (nonatomic, strong) UITextView *textView;
@property (nonatomic, strong) UIColor *textColor;
@property (nonatomic, strong) NSString *text;

- (void)appendText: (NSString *)text;

@end
