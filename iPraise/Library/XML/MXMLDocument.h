//
//  MXHTMLDocument.h
//  CMBXML
//
//  Created by Mac003 on 13-12-6.
//  Copyright (c) 2013年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>

enum
{
    MXMLContentTypeXML,
    MXMLContentTypeHTML,
};

typedef NSUInteger MXMLContentType;

@class MXMLNode;

@interface MXMLDocument : NSObject

- (id)initWithData: (NSData *)data
       contentType: (MXMLContentType)type;

- (id)initWithString: (NSString *)string
       contentType: (MXMLContentType)type;

- (MXMLNode *)rootNode;

- (NSArray *)nodesWithXPath: (NSString *)XPathString;

@end
