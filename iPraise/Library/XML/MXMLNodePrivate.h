//
//  MXMLNodePrivate.h
//  CMBXML
//
//  Created by Mac003 on 13-12-6.
//  Copyright (c) 2013年 Mac003. All rights reserved.
//

#import "MXMLNode.h"
#import <libxml/HTMLparser.h>

@interface MXMLNode (Creation)

- (id)initWithXMLNode: (xmlNodePtr)node;

@end
