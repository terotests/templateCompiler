// The code template begins here
'use strict';

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var templateCompiler_prototype = function templateCompiler_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_.guid = function (t) {

        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };

      /**
       * @param float t
       */
      _myTrait_.isArray = function (t) {

        return Object.prototype.toString.call(t) === '[object Array]';
      };

      /**
       * @param object obj
       */
      _myTrait_.isDataTrait = function (obj) {

        if (obj.__dataTr) return true;
      };

      /**
       * @param float fn
       */
      _myTrait_.isFunction = function (fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      };

      /**
       * @param float t
       */
      _myTrait_.isObject = function (t) {

        if (typeof t == 'undefined') return this.__isO;

        return t === Object(t);
      };
    })(this);

    (function (_myTrait_) {
      var domUtil;
      var _svgElems;

      // Initialize static variables here...

      /**
       * @param float html
       * @param float startTag
       */
      _myTrait_.compile = function (html, startTag) {

        // return this.testData();

        // here is the view definition...
        var currentNode = {
          tagName: 'DIV',
          tplData: null
        };

        var ns;

        if (startTag) {
          var dom = document.createElement(startTag);
          dom.innerHTML = html;
          currentNode.tagName = startTag;

          if (_svgElems[currentNode.tagName.toLowerCase()]) {
            ns = 'svg';
          }
        } else {
          var dom = document.createElement('DIV');
          dom.innerHTML = html;
        }

        currentNode.tplData = this.parseNode(dom, ns);

        return currentNode;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (t) {

        if (!domUtil) {
          domUtil = _e();
          _svgElems = {
            'circle': 'true',
            'rect': true,
            'path': true,
            'svg': true,
            'image': true,
            'line': true,
            'text': true,
            'tspan': true,
            'g': true,
            'pattern': true,
            'polygon': true,
            'polyline': true,
            'clippath': true,
            'defs': true,
            'textpath': true,
            'feoffset': true,
            'femerge': true,
            'femergenode': true,
            'fegaussianblur': true,
            'filter': true
          };
        }
      });

      /**
       * @param float str
       */
      _myTrait_.parseMustache = function (str) {
        var parts = str.split('{{'),
            len = parts.length,
            hCnt = 0;

        if (len < 2) {
          return [str];
        }

        var list = [];
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];

          if (part.length == 0) continue;

          var rest = part.split('}}');
          if (rest.length > 1) {
            list.push('{{' + rest[0] + '}}');
            list.push(rest[1]);
          } else {
            list.push(part);
          }
        }
        return list;
      };

      /**
       * @param float dom
       * @param float ns
       */
      _myTrait_.parseNode = function (dom, ns) {

        if (dom.nodeType == 8) return null;

        // here is the view definition...
        var currentNode = {
          tagName: dom.tagName,
          type: dom.nodeType,
          children: [],
          attributes: [],
          classTemplates: {},
          dataAttrs: {},
          ns: ns
        };

        if (currentNode.tagName) {
          var tn = currentNode.tagName.toLowerCase();
          if (_svgElems[tn]) {
            ns = 'svg';
            if (tn != 'svg') {
              currentNode.ns = 'svg';
            }
          }
          currentNode.tagName = tn;
        } else {}

        var bIsInput = false;
        if (dom.nodeName && dom.nodeName.toLowerCase() == 'input') {
          bIsInput = true;
        }

        var vStr, iValue;
        if (bIsInput) {
          if (iValue = dom.getAttribute('data-input-value')) {
            currentNode.value = iValue;
            currentNode.valueParts = this.parseTemplateParts(iValue);
          }
        }
        if (dom.value && !iValue) {
          currentNode.value = dom.value;
          currentNode.valueParts = this.parseTemplateParts(currentNode.value);
        }

        if (dom.attributes) {

          for (var i = 0; i < dom.attributes.length; i++) {
            var attrib = dom.attributes[i];
            if (attrib.specified) {
              var name = attrib.name,
                  value = attrib.value;

              if (name.substring(0, 4) == 'data') {
                currentNode.dataAttrs[name] = value;
              }
              currentNode.attributes.push([name, value, this.parseTemplateParts(value)]);
            }
          }
        }

        if (!dom.childNodes || dom.childNodes.length == 0) {
          currentNode.text = dom.textContent;
          currentNode.txtParts = this.parseTemplateParts(currentNode.text);
        }

        var childNodes = dom.childNodes;
        if (childNodes) {
          var len = childNodes.length;
          for (var i = 0; i < len; i++) {
            var child = childNodes[i];

            var newChild = this.parseNode(child, ns);
            if (newChild) currentNode.children.push(newChild);
          }
        }

        var cs;
        if (currentNode && (cs = currentNode.dataAttrs['data-class-switch'])) {
          currentNode.useClass = true;

          currentNode.classSwitch = cs;

          for (var ii = 0; ii < currentNode.children.length; ii++) {
            var tempCandidate = currentNode.children[ii];
            if (tempCandidate.dataAttrs) {
              var cName = tempCandidate.dataAttrs['data-class'];
              if (cName) {
                currentNode.classTemplates[cName] = tempCandidate;
              }
            }
          }
        }

        return currentNode;
      };

      /**
       * @param string str
       */
      _myTrait_.parseTemplateParts = function (str) {

        var tplParts = {
          list: null,
          tokens: {},
          hasTokens: false
        };

        if (!str || str.length == 0) return null;

        var list = tplParts.list = this.parseMustache(str);
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          if (item.length > 3 && item.charAt(0) == '{' && item.charAt(1) == '{') {
            tplParts.hasTokens = true;
            var vName = item.substring(2, item.length - 2);
            tplParts.tokens[i] = vName;
          }
        }

        return tplParts;
      };
    })(this);
  };

  var templateCompiler = function templateCompiler(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof templateCompiler) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != templateCompiler._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new templateCompiler(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  templateCompiler._classInfo = {
    name: 'templateCompiler'
  };
  templateCompiler.prototype = new templateCompiler_prototype();

  (function () {
    if (typeof define !== 'undefined' && define !== null && define.amd != null) {
      __amdDefs__['templateCompiler'] = templateCompiler;
      this.templateCompiler = templateCompiler;
    } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
      module.exports['templateCompiler'] = templateCompiler;
    } else {
      this.templateCompiler = templateCompiler;
    }
  }).call(new Function('return this')());

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());