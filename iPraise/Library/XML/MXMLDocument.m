//
//  MXHTMLDocument.m
//  CMBXML
//
//  Created by Mac003 on 13-12-6.
//  Copyright (c) 2013年 Mac003. All rights reserved.
//

#import "MXMLDocument.h"
#import "MXMLNode.h"
#import "MXMLNodePrivate.h"

#import <libxml/HTMLparser.h>
#import <libxml/xpath.h>
#import <UIKit/UIKit.h>

@interface MXMLDocument ()
{
    htmlDocPtr _document;
    MXMLNode *_rootNode;
    MXMLContentType _type;
}
@end

@implementation MXMLDocument

- (instancetype)init
{
    [self doesNotRecognizeSelector: _cmd];
    return nil;
}

- (instancetype)initWithData: (NSData *)data
       contentType: (MXMLContentType)type
{
    if ((self = [super init]))
    {
        if (data)
        {
            _type = type;
            
            if (type == MXMLContentTypeXML)
            {
                _document = xmlReadDoc((const xmlChar *)[data bytes], "", "utf-8", (XML_PARSE_RECOVER
                                                                                    | XML_PARSE_NOBLANKS
                                                                                    ));
            }else
            {
                _document = htmlReadDoc((const xmlChar *)[data bytes], "", "utf-8", (HTML_PARSE_RECOVER
                                                                                     | HTML_PARSE_NOBLANKS
                                                                                     | HTML_PARSE_NODEFDTD
                                                                                     | HTML_PARSE_NOERROR
                                                                                     | HTML_PARSE_COMPACT
                                                                                     ));
            }
        }
    }
    
    return self;
}

- (instancetype)initWithString: (NSString *)string
         contentType: (MXMLContentType)type
{
    if ((self = [super init]))
    {
        if (string)
        {
            _type = type;
            
            if (type == MXMLContentTypeXML)
            {
                _document = xmlReadDoc((const xmlChar *)[string UTF8String], "", "utf-8", (XML_PARSE_RECOVER
                                                                                           | XML_PARSE_NOBLANKS
                                                                                           ));
            }else
            {
                _document = htmlReadDoc((const xmlChar *)[string UTF8String], "", "utf-8", (HTML_PARSE_RECOVER
                                                                                            | HTML_PARSE_NOBLANKS
                                                                                            | HTML_PARSE_NODEFDTD
                                                                                            | HTML_PARSE_NOERROR
                                                                                            | HTML_PARSE_COMPACT
                                                                                            ));
            }
        }
    }
    
    return self;
}

- (void)dealloc
{
    if (_document)
    {
        xmlFreeDoc(_document);
    }
}

- (MXMLNode *)rootNode
{
    if (!_rootNode)
    {
        if (_document)
        {
            _rootNode = [[MXMLNode alloc] initWithXMLNode: xmlDocGetRootElement(_document)];
        }
    }
    
    return _rootNode;
}

- (NSArray *)nodesWithXPath: (NSString *)XPathString
{
    if (XPathString)
    {
        xmlXPathContextPtr context = xmlXPathNewContext(_document);
        
        if (context)
        {
            xmlXPathObjectPtr result = xmlXPathEvalExpression((const xmlChar *)[XPathString UTF8String], context);
            NSMutableArray *nodes = nil;
            
            if (!xmlXPathNodeSetIsEmpty(result->nodesetval))
            {
                NSInteger count = result->nodesetval->nodeNr;
                
                nodes = [NSMutableArray arrayWithCapacity: count];
                
                for (NSInteger iLooper = 0; iLooper < count; ++iLooper)
                {
                    MXMLNode *nodeLooper = [[MXMLNode alloc] initWithXMLNode: result->nodesetval->nodeTab[iLooper]];
                    [nodes addObject: nodeLooper];
                }
                
            }
            
            xmlXPathFreeObject(result);
            xmlXPathFreeContext(context);
            
            return nodes;
        }
    }
    
    return nil;
}

@end

