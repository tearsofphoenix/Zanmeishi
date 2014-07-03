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

@property (NS_NONATOMIC_IOSONLY, readonly, strong) MXMLNode *firstChild;

@property (NS_NONATOMIC_IOSONLY, readonly, copy) NSArray *children;

- (MXMLNode *)childForName: (NSString *)name;

- (MXMLNode *)childForKeyPath: (NSString *)keyPath;

@property (NS_NONATOMIC_IOSONLY, readonly, strong) MXMLNode *nextSibling;

- (MXMLNode *)nextSiblingNamed: (NSString *)name;

@property (NS_NONATOMIC_IOSONLY, readonly, strong) MXMLNode *previousSibling;

@end

@interface MXMLNode (Properties)

@property (nonatomic, strong, readonly) NSString *className;

@property (NS_NONATOMIC_IOSONLY, readonly, copy) NSString *name;

@property (nonatomic, strong, readonly) NSString *tagName;
@property (nonatomic, strong, readonly) NSString *textContent;

- (NSString *)attributeValueForName: (NSString *)name;

@property (NS_NONATOMIC_IOSONLY, readonly, copy) NSDictionary *attributes;

@property (NS_NONATOMIC_IOSONLY, readonly) MXMLElementType nodeType;

@end
