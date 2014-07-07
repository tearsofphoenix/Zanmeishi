//
//  TFHppleElement.m
//  Hpple
//
//  Created by Geoffrey Grosenbach on 1/31/09.
//
//  Copyright (c) 2009 Topfunky Corporation, http://topfunky.com
//
//  MIT LICENSE
//
//  Permission is hereby granted, free of charge, to any person obtaining
//  a copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to
//  permit persons to whom the Software is furnished to do so, subject to
//  the following conditions:
//
//  The above copyright notice and this permission notice shall be
//  included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


#import "TFHppleElement.h"
#import "XPathQuery.h"

NSString * const TFHppleNodeContentKey           = @"content";
NSString * const TFHppleNodeNameKey              = @"name";
NSString * const TFHppleNodeChildrenKey          = @"children";
NSString * const TFHppleNodeAttributeArrayKey    = @"attributes";
NSString * const TFHppleNodeAttributeNameKey     = @"attribute.name";
NSString * const TFHppleTextNodeName             = @"text";

@interface TFHppleElement ()
{
    BOOL isXML;
    NSString *encoding;
}

@property (nonatomic, strong)    NSDictionary * node;
@property (nonatomic, unsafe_unretained, readwrite) TFHppleElement *parent;
@property (nonatomic, strong) NSArray *children;
@property (nonatomic, strong) NSDictionary *attributes;

@end

@implementation TFHppleElement


- (instancetype) initWithNode: (NSDictionary *) theNode
                        isXML: (BOOL)isDataXML
                 withEncoding: (NSString *)theEncoding
{
    if (!(self = [super init]))
        return nil;
    
    isXML = isDataXML;
    _node = theNode;
    encoding = theEncoding;
    
    return self;
}

+ (TFHppleElement *) hppleElementWithNode:(NSDictionary *) theNode isXML:(BOOL)isDataXML withEncoding:(NSString *)theEncoding
{
    return [[[self class] alloc] initWithNode:theNode isXML:isDataXML withEncoding:theEncoding];
}

#pragma mark -

- (NSString *)raw
{
    return _node[@"raw"];
}

- (NSString *) content
{
    return _node[TFHppleNodeContentKey];
}


- (NSString *) tagName
{
    return _node[TFHppleNodeNameKey];
}

- (NSArray *) children
{
    if (!_children)
    {
        
        NSMutableArray *children = [NSMutableArray array];
        
        for (NSDictionary *child in _node[TFHppleNodeChildrenKey])
        {
            TFHppleElement *element = [TFHppleElement hppleElementWithNode: child
                                                                     isXML: isXML
                                                              withEncoding: encoding];
            element.parent = self;
            [children addObject: element];
        }
        _children = children;
    }
    return _children;
}

- (TFHppleElement *) firstChild
{
    NSArray * children = self.children;
    if ([children count] > 0)
    {
        return children[0];
    }
    
    return nil;
}


- (NSDictionary *) attributes
{
    if (!_attributes)
    {
        NSMutableDictionary * translatedAttributes = [NSMutableDictionary dictionary];
        NSArray *array = _node[TFHppleNodeAttributeArrayKey];
        for (NSDictionary * attributeDict in array)
        {
            id key = attributeDict[TFHppleNodeAttributeNameKey];
            id value = attributeDict[TFHppleNodeContentKey];
            if (key && value)
            {
                translatedAttributes[key] = value;
            }
        }
        _attributes = translatedAttributes;
    }
    return _attributes;
}

- (NSString *) objectForKey: (NSString *) theKey
{
    return [self attributes][theKey];
}

- (id) description
{
    return [_node description];
}

- (BOOL)hasChildren
{
    return _node[TFHppleNodeChildrenKey] != nil;
}

- (BOOL)isTextNode
{
    // we must distinguish between real text nodes and standard nodes with tha name "text" (<text>)
    // real text nodes must have content
    return ([self.tagName isEqualToString:TFHppleTextNodeName] && (self.content));
}

- (NSArray*) childrenWithTagName:(NSString*)tagName
{
    NSMutableArray* matches = [NSMutableArray array];
    
    for (TFHppleElement* child in self.children)
    {
        if ([child.tagName isEqualToString:tagName])
            [matches addObject:child];
    }
    
    return matches;
}

- (TFHppleElement *) firstChildWithTagName:(NSString*)tagName
{
    return [self firstChildWithBlock: (^BOOL(TFHppleElement *element)
                                       {
                                           return [[element tagName] isEqualToString: tagName];
                                       })];
}

- (TFHppleElement *)firstChildWithBlock: (TFHppleElementBlock)block
{
    if (block)
    {
        for (TFHppleElement* child in [self children])
        {
            if (block(child))
            {
                return child;
            }
        }
    }
    
    return nil;
}

- (NSArray*)childrenWithClassName: (NSString*)className
{
    NSMutableArray* matches = [NSMutableArray array];
    
    for (TFHppleElement* child in self.children)
    {
        if ([child[@"class"] isEqualToString:className])
        {
            [matches addObject: child];
        }
    }
    
    return matches;
}

- (TFHppleElement *) firstChildWithClassName:(NSString*)className
{
    return [self firstChildWithBlock: (^BOOL(TFHppleElement *element)
                                       {
                                           return [element[@"class"] isEqualToString: className];
                                       })];
}

- (TFHppleElement *) firstTextChild
{
    id result = [self firstChildWithBlock: (^BOOL(TFHppleElement *element)
                                            {
                                                return [element isTextNode];
                                            })];
    
    if (!result)
    {
        result = [self firstChildWithTagName:TFHppleTextNodeName];
    }
    
    return result;
}

- (id)objectAtIndexedSubscript: (NSUInteger)idx
{
    return [self children][idx];
}

- (NSString *) text
{
    return _node[@"text"];
}

// Returns all elements at xPath.
- (NSArray *) searchWithXPathQuery: (NSString *)xPathOrCSS
{
    
    NSData *data = [[self raw] dataUsingEncoding: NSUTF8StringEncoding];
    
    NSArray * detailNodes = nil;
    if (isXML)
    {
        detailNodes = PerformXMLXPathQueryWithEncoding(data, xPathOrCSS, encoding);
    } else
    {
        detailNodes = PerformHTMLXPathQueryWithEncoding(data, xPathOrCSS, encoding);
    }
    
    NSMutableArray * hppleElements = [NSMutableArray array];
    for (id newNode in detailNodes)
    {
        [hppleElements addObject: [TFHppleElement hppleElementWithNode: newNode
                                                                 isXML: isXML
                                                          withEncoding: encoding]];
    }
    return hppleElements;
}

// Custom keyed subscripting
- (id)objectForKeyedSubscript: (id)key
{
    return [self objectForKey: key];
}

@end
