//
//  VZSearchViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZSearchViewController.h"
#import "VZDataService.h"
#import "VZViewService.h"
#import "VZHeaders.h"
#import "VZPlayerViewController.h"

static NSArray *gsEntryValues = nil;
static NSArray *gsEntryNames = nil;

@interface VZSearchViewController ()<UISearchBarDelegate, UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, strong) UISearchBar *searchBar;
@property (nonatomic) NSInteger selectedIndex;
@property (nonatomic, strong) UITableView *contentView;
@property (nonatomic, strong) NSArray *searchResult;

@end

@implementation VZSearchViewController

+ (void)initialize
{
    gsEntryValues = @[ @"11", @"12",   @"13",  @"-13",  @"14",   @"18" ];
    gsEntryNames = @[ @"歌手", @"专辑", @"歌曲", @"歌词", @"音乐盒", @"歌谱"];
}

- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {

    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self setTitle: @"搜索"];
    [[self view] setBackgroundColor: [UIColor whiteColor]];
    
    UIBarButtonItem *rightItem = [[UIBarButtonItem alloc] initWithTitle: @"全部"
                                                                  style: UIBarButtonItemStylePlain
                                                                 target: self
                                                                 action: @selector(_handleTypeButtonEvent:)];
    [[self navigationItem] setRightBarButtonItem: rightItem];
    
    UITabBarItem *item = [[UITabBarItem alloc] initWithTitle: [self title]
                                                       image: [UIImage imageNamed: @"VZTabSearch"]
                                               selectedImage: nil];
    [self setTabBarItem: item];
    
    [self setSelectedIndex: 2];

    CGRect bounds = [[self view] bounds];
    CGRect rect = CGRectMake(0, 0, bounds.size.width, 30);
    
     _searchBar = [[UISearchBar alloc] initWithFrame: rect];
    [_searchBar setDelegate: self];
    [_searchBar setPlaceholder: @"歌曲、歌手、专辑、@用户"];
    
    [[self view] addSubview: _searchBar];

    rect.origin.y = CGRectGetMaxY(rect);
    rect.size.height = bounds.size.height - rect.size.height;
    
    _contentView = [[UITableView alloc] initWithFrame: rect];

    [[self view] addSubview: _contentView];
    
    [_contentView setDataSource: self];
    [_contentView setDelegate: self];
}

- (void)viewWillAppear: (BOOL)animated
{
    [super viewWillAppear: animated];
    
    CGRect bounds = [[self view] bounds];
    CGRect rect = [_contentView frame];

    rect.size.height = bounds.size.height - CGRectGetMaxY([_searchBar frame]);

    [_contentView setFrame: rect];
}

- (void)_setSelectedIndex: (NSInteger)idx
{
    _selectedIndex = idx;
    
    [[[self navigationItem] rightBarButtonItem] setTitle: gsEntryNames[_selectedIndex]];
}

- (void)setSelectedIndex: (NSInteger)selectedIndex
{
    if (_selectedIndex != selectedIndex)
    {
        [self _setSelectedIndex: selectedIndex];
    }
}

#pragma mark - search bar delegate

- (void)searchBarTextDidBeginEditing: (UISearchBar *)searchBar
{
    [_searchBar setShowsCancelButton: YES];
}

- (void)searchBar: (UISearchBar *)searchBar
    textDidChange: (NSString *)searchText
{
    
}

- (void)searchBarSearchButtonClicked: (UISearchBar *)searchBar
{
    [_searchBar resignFirstResponder];
    [_searchBar setShowsCancelButton: NO];

    [MBProgressHUD showHUDAddedTo: [self view]
                         animated: YES];
    
    [[VZDataService manager] searchWithKeyword: [_searchBar text]
                                          type: gsEntryValues[_selectedIndex]
                                      callback: (^(id result, NSError *error)
                                                 {
                                                     [MBProgressHUD hideHUDForView: [self view]
                                                                          animated: YES];
                                                     
                                                     if (error)
                                                     {
                                                         [[VZViewService service] alertMessage: [error localizedDescription]];
                                                     }else
                                                     {
                                                         [self setSearchResult: result];
                                                         
                                                         [_contentView reloadData];
                                                     }
                                                 })];
}

- (void)searchBarCancelButtonClicked: (UISearchBar *)searchBar
{
    [_searchBar resignFirstResponder];
    [_searchBar setShowsCancelButton: NO];
}

#pragma mark - actions

- (void)_handleTypeButtonEvent: (id)sender
{
    [[VZViewService service] showPopoverFromPoint: CGPointMake(300, 50)
                                       selections: gsEntryNames
                                         callback: (^(id result, NSError *error)
                                                    {
                                                        NSInteger idx = [result integerValue];
                                                        [self setSelectedIndex: idx];
                                                    })];
}


#pragma mark - tableview

- (NSInteger)tableView: (UITableView *)tableView
 numberOfRowsInSection: (NSInteger)section
{
    return [_searchResult count];
}

- (UITableViewCell *)tableView: (UITableView *)tableView
         cellForRowAtIndexPath: (NSIndexPath *)indexPath
{
    NSDictionary *info = _searchResult[[indexPath row]];
    
    UITableViewCell *cell = [[UITableViewCell alloc] init];
    [[cell textLabel] setText: info[VZSongNameKey]];
    
    return cell;
}

- (CGFloat)   tableView: (UITableView *)tableView
heightForRowAtIndexPath: (NSIndexPath *)indexPath
{
    return 60;
}

- (void)      tableView: (UITableView *)tableView
didSelectRowAtIndexPath: (NSIndexPath *)indexPath
{
    VZPlayerViewController *playerViewController = [[VZPlayerViewController alloc] init];
    [playerViewController setSongInfo: _searchResult[[indexPath row]]];
    
    [[self navigationController] pushViewController: playerViewController
                                           animated: YES];
}

@end
