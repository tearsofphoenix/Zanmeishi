//
//  MXHTMLNode.m
//  CMBXML
//
//  Created by Mac003 on 13-12-6.
//  Copyright (c) 2013年 Mac003. All rights reserved.
//

#import "MXMLNode.h"
#import "MXMLNodePrivate.h"
#import "MXMLDocument.h"


#import <UIKit/UIKit.h>

@interface MXMLNode ()
{
    xmlNodePtr  _node;
    
    NSArray *_children;
    
    NSString *_className;
    NSString *_tagName;
    NSString *_content;
    NSString *_nodeValue;
    
    NSDictionary *_attributes;
}

@end

static NSString *_MXHTMLNodeGetAttributeForName(xmlNodePtr node, const char *name)
{
    if (node && name)
    {
        
        for(xmlAttrPtr attr = node->properties; NULL != attr; attr = attr->next)
        {            
            if (strcmp((const char*)attr->name, name) == 0)
            {
                return @((const char *)attr->children->content);
            }
        }
    }
    
	return nil;
}

@implementation MXMLNode

- (id)init
{
    [self doesNotRecognizeSelector: _cmd];
    return nil;
}

- (id)initWithXMLNode: (xmlNodePtr)node
{
    if (node)
    {
        
        if ((self = [super init]))
        {
            _node = node;
        }
    }
    
    return self;
}

- (BOOL)isEqual: (id)object
{
    if ([object isKindOfClass: [self class]])
    {
        MXMLNode *node = object;
        return _node == node->_node;
    }
    
    return NO;
}


- (NSString *)description
{
    return [NSString stringWithFormat: @"%p %@ %@ %@ %@ %d", self, [self name], [self nodeValue], [self textContent], [self attributes], [self nodeType]];
}

@end

@implementation MXMLNode (Hierarchy)

static MXMLNode *_NextNormalNodeFrom(xmlNodePtr nLooper)
{
    while (nLooper)
    {
        //ignore text node
        //
        if (nLooper->type != XML_TEXT_NODE)
        {
            return [[MXMLNode alloc] initWithXMLNode: nLooper];
        }
        
        nLooper = nLooper->next;
    }
    
    return nil;
}

- (MXMLNode *)firstChild
{
    return _NextNormalNodeFrom(_node->children);
}

- (NSArray *)children
{
    if (!_children)
    {
        NSMutableArray *result = [[NSMutableArray alloc] init];
        xmlNodePtr nLooper = _node->children;
        
        while (nLooper)
        {
            //ignore text node
            //
            if (nLooper->type != XML_TEXT_NODE)
            {
                MXMLNode *subNode = [[MXMLNode alloc] initWithXMLNode: nLooper];
                [result addObject: subNode];
            }
            
            nLooper = nLooper->next;
        }
        
        _children = [[NSArray alloc] initWithArray: result];
    }
    
    return _children;
}

- (MXMLNode *)childForName: (NSString *)name
{
    if (name)
    {
        NSArray *children = [self children];
        
        for (MXMLNode *nLooper in children)
        {
            if ([[nLooper name] isEqualToString: name])
            {
                return nLooper;
            }
        }
    }
    
    return nil;
}

- (MXMLNode *)childForKeyPath: (NSString *)keyPath
{
    if (keyPath)
    {
        NSArray *names = [keyPath componentsSeparatedByString: @"."];
        MXMLNode *node = self;
        
        for (NSString *keyLooper in names)
        {
            node = [node childForName: keyLooper];
            
            if (!node)
            {
                return nil;
            }
        }
        
        return node;
    }
    
    return nil;
}

- (MXMLNode *)nextSibling
{
    return _NextNormalNodeFrom(_node->next);
}

- (MXMLNode *)nextSiblingNamed: (NSString *)name
{
    if (name)
    {
        xmlNodePtr nodeLooper = _node->next;
        const char *targetName = [name UTF8String];
        while (nodeLooper)
        {
            if (0 == strcmp((const char *)nodeLooper->name, targetName))
            {
                return [[MXMLNode alloc] initWithXMLNode: nodeLooper];
            }
            
            nodeLooper = nodeLooper->next;
        }
    }
    
    return nil;
}

- (MXMLNode *)previousSibling
{
    xmlNodePtr nLooper = _node->prev;
    
    while (nLooper)
    {
        //ignore text node
        //
        if (nLooper->type != XML_TEXT_NODE)
        {
            return [[MXMLNode alloc] initWithXMLNode: nLooper];
        }
        
        nLooper = nLooper->prev;
    }
    
    return nil;
}

- (NSArray *)childrenForRecusiveEnumerate
{
    return [self children];
}

@end


@implementation MXMLNode (Properties)

@dynamic className;
@dynamic nodeValue;
@dynamic textContent;
@dynamic tagName;

- (NSString *)className
{
    if (!_className)
    {
        _className = _MXHTMLNodeGetAttributeForName(_node, "class");
    }
    
    return _className;
}

- (NSString *)name
{
    return [self tagName];
}

- (NSString *)tagName
{
    if (!_tagName)
    {
        if (_node->name)
        {
            _tagName = @((const char *)_node->name);
        }else
        {
            _tagName = @"";
        }
    }
    
    return _tagName;
}

- (NSString *)textContent
{
    if (!_content)
    {
        if (_node->children && _node->children->content)
        {
            _content = @((const char *)_node->children->content);
        }
    }
    
    return _content;
}

- (NSString *)nodeValue
{
    if (!_nodeValue)
    {
        if (_node->content)
        {
            _nodeValue = @((const char *)_node->content);
        }
    }
    
    return _nodeValue;
}

- (NSDictionary *)attributes
{
    if (!_attributes)
    {
        xmlAttrPtr aLooper = _node->properties;
        NSMutableDictionary *attributes = [[NSMutableDictionary alloc] init];
        
        while (aLooper)
        {
            if (aLooper->name && aLooper->children->content)
            {
                [attributes setObject: @((const char *)aLooper->children->content)
                               forKey: @((const char *)aLooper->name)];
            }
            
            aLooper = aLooper->next;
        }

        _attributes = [[NSDictionary alloc] initWithDictionary: attributes];
    }

    return _attributes;
}

- (NSString *)attributeValueForName: (NSString *)nameString
{
    return [self attributes][nameString];
}

- (MXMLElementType)nodeType
{
    return _node->type;
}

@end
