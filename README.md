# Template Compiler

Usage:

```javascript
var cc = templateCompiler();
cc.compile("<h1>Moro {{name}}</h1>")
```

















   

 


   
#### Class templateCompiler


- [compile](README.md#templateCompiler_compile)
- [parseMustache](README.md#templateCompiler_parseMustache)
- [parseNode](README.md#templateCompiler_parseNode)
- [parseTemplateParts](README.md#templateCompiler_parseTemplateParts)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isDataTrait](README.md#_dataTrait_isDataTrait)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    





   
# Class templateCompiler


The class has following internal singleton variables:
        
* domUtil
        
* _svgElems
        
        
### <a name="templateCompiler_compile"></a>templateCompiler::compile(html, startTag)


*The source code for the function*:
```javascript

// return this.testData();

// here is the view definition...
var currentNode = {
    tagName : "DIV",
    tplData : null
};

var ns;

if(startTag) {
    var dom = document.createElement(startTag);
    dom.innerHTML = html;     
    currentNode.tagName = startTag;
    
    if(_svgElems[currentNode.tagName.toLowerCase()]) {
        ns = "svg";
    }
    
} else {
    var dom = document.createElement("DIV");
    dom.innerHTML = html;    
}

currentNode.tplData = this.parseNode(dom, ns);

return currentNode;

```

### templateCompiler::constructor( t )

```javascript


if(!domUtil) {
    domUtil = _e();
    _svgElems = {
        "circle" : "true",
        "rect" : true,
        "path" : true,
        "svg" : true,
        "image" : true,
        "line" : true,
        "text" : true,
        "tspan" : true,
        "g" : true,
        "pattern" : true,
        "polygon" : true,
        "polyline" : true,
        "clippath" : true,
        "defs" : true,
        "textpath" : true,
        "feoffset" : true,
        "femerge":true,
        "femergenode":true,
        "fegaussianblur" : true,
        "filter" : true
    };    
}
```
        
### <a name="templateCompiler_parseMustache"></a>templateCompiler::parseMustache(str)


*The source code for the function*:
```javascript
var parts = str.split("{{"),
    len = parts.length,
    hCnt = 0;
    
if(len<2) {
    return [str];
}

var list = [];
for(var i=0; i<parts.length; i++) {
    var part = parts[i];
    
    if(part.length==0) continue;
    
    var rest = part.split("}}");
    if(rest.length>1) {
        list.push("{{"+rest[0]+"}}");
        list.push( rest[1]);
    } else {
        list.push(part);
    }
}
return list;
```

### <a name="templateCompiler_parseNode"></a>templateCompiler::parseNode(dom, ns)


*The source code for the function*:
```javascript

if(dom.nodeType==8) return null;


// here is the view definition...
var currentNode = {
    tagName : dom.tagName,
    type : dom.nodeType,
    children : [],
    attributes : [],
    classTemplates : {},
    dataAttrs : {},
    ns : ns
};


if(currentNode.tagName) {
    var tn = currentNode.tagName.toLowerCase();
    if(_svgElems[tn]) {
        ns = "svg";
        if(tn!="svg") {
            currentNode.ns = "svg";
        }
        
    }
    currentNode.tagName = tn;
} else {
    
}


var bIsInput = false;
if(dom.nodeName && dom.nodeName.toLowerCase()=="input") {
    bIsInput = true;
}

var vStr, iValue;
if(bIsInput) {
    if(iValue = dom.getAttribute("data-input-value")) {
        currentNode.value = iValue;
        currentNode.valueParts = this.parseTemplateParts( iValue );
    }
}
if(dom.value && (!iValue)) {
    currentNode.value = dom.value;
    currentNode.valueParts = this.parseTemplateParts( currentNode.value );
}

if(dom.attributes) {

    for (var i = 0; i < dom.attributes.length; i++) {
      var attrib = dom.attributes[i];
      if (attrib.specified) {
          var name = attrib.name,
              value = attrib.value;
              
          if( name.substring(0,4) == "data") {
              currentNode.dataAttrs[name] = value;
          }
          currentNode.attributes.push([name, value, this.parseTemplateParts( value )]);
      }
    }
}




if(!dom.childNodes || dom.childNodes.length==0) {
    currentNode.text = dom.textContent;
    currentNode.txtParts = this.parseTemplateParts( currentNode.text );
}

var childNodes = dom.childNodes;
if(childNodes) {
  var len = childNodes.length;
  for (var i = 0; i < len ; i++) {
     var child = childNodes[i];
     
     var newChild = this.parseNode( child, ns );
     if(newChild) currentNode.children.push( newChild );

  }    
}

var cs;
if(currentNode && (cs=currentNode.dataAttrs["data-class-switch"])) {
    currentNode.useClass = true;

    currentNode.classSwitch = cs;

    for( var ii=0; ii<currentNode.children.length; ii++) {
        var tempCandidate = currentNode.children[ii];
        if(tempCandidate.dataAttrs) {
            var cName = tempCandidate.dataAttrs["data-class"];
            if(cName) {
                currentNode.classTemplates[cName] = tempCandidate;
            }
        }
    }                
}

return currentNode;
```

### <a name="templateCompiler_parseTemplateParts"></a>templateCompiler::parseTemplateParts(str)


*The source code for the function*:
```javascript

var tplParts = {
    list : null,
    tokens : {},
    hasTokens : false
}

if(!str || str.length == 0) return null;


var list = tplParts.list = this.parseMustache( str );
for( var i=0; i<list.length; i++) {
    var item = list[i];
    if( item.length>3 && (item.charAt(0)=="{") && (item.charAt(1)=="{") ) {
        tplParts.hasTokens = true;
        var vName = item.substring(2, item.length-2);
        tplParts.tokens[i] = vName;
    } 
}  

return tplParts;
            
            
```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


*The source code for the function*:
```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


*The source code for the function*:
```javascript

return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isDataTrait"></a>_dataTrait::isDataTrait(obj)


*The source code for the function*:
```javascript

if(obj.__dataTr) return true;
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


*The source code for the function*:
```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


*The source code for the function*:
```javascript

if(typeof(t)=="undefined") return this.__isO;

return t === Object(t);
```


    
    


   
      
    




