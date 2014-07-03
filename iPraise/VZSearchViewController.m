//
//  VZSearchViewController.m
//  Zanmeishi
//
//  Created by Mac003 on 14-7-2.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "VZSearchViewController.h"
#import "VZDataService.h"

@interface VZSearchViewController ()<UISearchBarDelegate>

@property (nonatomic, strong) UISearchBar *searchBar;

@end

@implementation VZSearchViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self setTitle: @"搜索"];
    [[self view] setBackgroundColor: [UIColor whiteColor]];
    
    UITabBarItem *item = [[UITabBarItem alloc] initWithTitle: [self title]
                                                       image: [UIImage imageNamed: @"VZTabSearch"]
                                               selectedImage: nil];
    [self setTabBarItem: item];
    
    CGRect bounds = [[self view] bounds];
    CGRect rect = CGRectMake(0, 0, bounds.size.width, 30);
    
     _searchBar = [[UISearchBar alloc] initWithFrame: rect];
    [_searchBar setDelegate: self];
    [_searchBar setPlaceholder: @"歌曲、歌手、专辑、@用户"];
    
    [[self view] addSubview: _searchBar];
    
    
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
    [[VZDataService manager] searchWithKeyword: [_searchBar text]
                                      callback: (^(id result, NSError *error)
                                                 {
        
                                                 })];
}

- (void)searchBarCancelButtonClicked: (UISearchBar *)searchBar
{
    [_searchBar resignFirstResponder];
    [_searchBar setShowsCancelButton: NO];
}

@end
