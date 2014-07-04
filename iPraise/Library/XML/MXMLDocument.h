//
//  MXHTMLDocument.h
//  CMBXML
//
//  Created by Mac003 on 13-12-6.
//  Copyright (c) 2013年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>


typedef NS_ENUM(NSUInteger, MXMLContentType)
{
    MXMLContentTypeXML,
    MXMLContentTypeHTML,
};

@class MXMLNode;

@interface MXMLDocument : NSObject

- (instancetype)initWithData: (NSData *)data
                 contentType: (MXMLContentType)type;

- (instancetype)initWithString: (NSString *)string
                   contentType: (MXMLContentType)type;

@property (NS_NONATOMIC_IOSONLY, readonly, strong) MXMLNode *rootNode;

- (NSArray *)nodesWithXPath: (NSString *)XPathString;

@end
