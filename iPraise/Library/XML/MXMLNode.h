//
//  MXHTMLNode.h
//  CMBXML
//
//  Created by Mac003 on 13-12-6.
//  Copyright (c) 2013年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <libxml/tree.h>

typedef xmlElementType MXMLElementType;

@interface MXMLNode : NSObject

@end

@interface MXMLNode (Hierarchy)

- (MXMLNode *)firstChild;

- (NSArray *)children;

- (MXMLNode *)childForName: (NSString *)name;

- (MXMLNode *)childForKeyPath: (NSString *)keyPath;

- (MXMLNode *)nextSibling;

- (MXMLNode *)nextSiblingNamed: (NSString *)name;

- (MXMLNode *)previousSibling;

@end

@interface MXMLNode (Properties)

@property (nonatomic, strong, readonly) NSString *className;

- (NSString *)name;

@property (nonatomic, strong, readonly) NSString *tagName;
@property (nonatomic, strong, readonly) NSString *textContent;
@property (nonatomic, strong, readonly) NSString *nodeValue;

- (NSString *)attributeValueForName: (NSString *)name;

- (NSDictionary *)attributes;

- (MXMLElementType)nodeType;

@end
