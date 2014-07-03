//
//  VZViewService.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZViewService.h"

@interface VZViewService ()<UIAlertViewDelegate, UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, strong) UIAlertView *sharedAlertView;

@property (nonatomic, strong) NSArray *popoverSelections;
@property (nonatomic, strong) UITableViewController *popoverController;
@property (nonatomic, strong) FPPopoverController *popover;
@property (nonatomic, copy) VZCallback popoverCallback;

@end

@implementation VZViewService


+ (instancetype)service
{
    static id gsService = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, (^
                               {
                                   gsService = [[self alloc] init];
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

- (void)showPopoverFromPoint: (CGPoint)point
                  selections: (NSArray *)selections
                    callback: (VZCallback)callback
{
    [self setPopoverSelections: selections];
    [self setPopoverCallback: callback];
    
    if (!_popover)
    {
        _popoverController = [[UITableViewController alloc] initWithStyle: UITableViewStylePlain];
        [[_popoverController tableView] setDataSource: self];
        [[_popoverController tableView] setDelegate: self];
        
        _popover = [[FPPopoverController alloc] initWithViewController: _popoverController];
        
        //    [popover setArrowDirection: FPPopoverArrowDirectionUp];
        [_popover setTint: FPPopoverDefaultTint];
    }else
    {
        [[_popoverController tableView] reloadData];
    }
    
    [_popover presentPopoverFromPoint: point];
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [_popoverSelections count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier: CellIdentifier];
    
    if(cell == nil)
    {
        cell = [[UITableViewCell alloc] initWithStyle: UITableViewCellStyleDefault
                                      reuseIdentifier: CellIdentifier];
    }
    
    [[cell textLabel] setText: _popoverSelections[[indexPath row]]];
    
    return cell;
}

- (void)      tableView: (UITableView *)tableView
didSelectRowAtIndexPath: (NSIndexPath *)indexPath
{
    if (_popoverCallback)
    {
        _popoverCallback(@([indexPath row]), nil);
        
        [self setPopoverCallback: nil];
    }
    
    [_popover dismissPopoverAnimated: YES];
}

@end
