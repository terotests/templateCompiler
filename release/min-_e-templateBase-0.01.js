(function(){var t={},e=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isDataTrait=function(t){return t.__dataTr?!0:void 0},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){var e,a;t.compile=function(t,e){var n,r={tagName:"DIV",tplData:null};if(e){var i=document.createElement(e);i.innerHTML=t,r.tagName=e,a[r.tagName.toLowerCase()]&&(n="svg")}else{var i=document.createElement("DIV");i.innerHTML=t}return r.tplData=this.parseNode(i,n),r},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){e||(e=_e(),a={circle:"true",rect:!0,path:!0,svg:!0,image:!0,line:!0,text:!0,tspan:!0,g:!0,pattern:!0,polygon:!0,polyline:!0,clippath:!0,defs:!0,textpath:!0,feoffset:!0,femerge:!0,femergenode:!0,fegaussianblur:!0,filter:!0})}),t.parseMustache=function(t){var e=t.split("{{"),a=e.length;if(2>a)return[t];for(var n=[],r=0;r<e.length;r++){var i=e[r];if(0!=i.length){var s=i.split("}}");s.length>1?(n.push("{{"+s[0]+"}}"),n.push(s[1])):n.push(i)}}return n},t.parseNode=function(t,e){if(8==t.nodeType)return null;var n={tagName:t.tagName,type:t.nodeType,children:[],attributes:[],classTemplates:{},dataAttrs:{},ns:e};if(n.tagName){var r=n.tagName.toLowerCase();a[r]&&(e="svg","svg"!=r&&(n.ns="svg")),n.tagName=r}var i=!1;t.nodeName&&"input"==t.nodeName.toLowerCase()&&(i=!0);var s;if(i&&(s=t.getAttribute("data-input-value"))&&(n.value=s,n.valueParts=this.parseTemplateParts(s)),t.value&&!s&&(n.value=t.value,n.valueParts=this.parseTemplateParts(n.value)),t.attributes)for(var l=0;l<t.attributes.length;l++){var o=t.attributes[l];if(o.specified){var u=o.name,f=o.value;"data"==u.substring(0,4)&&(n.dataAttrs[u]=f),n.attributes.push([u,f,this.parseTemplateParts(f)])}}t.childNodes&&0!=t.childNodes.length||(n.text=t.textContent,n.txtParts=this.parseTemplateParts(n.text));var p=t.childNodes;if(p)for(var c=p.length,l=0;c>l;l++){var d=p[l],h=this.parseNode(d,e);h&&n.children.push(h)}var m;if(n&&(m=n.dataAttrs["data-class-switch"])){n.useClass=!0,n.classSwitch=m;for(var v=0;v<n.children.length;v++){var g=n.children[v];if(g.dataAttrs){var _=g.dataAttrs["data-class"];_&&(n.classTemplates[_]=g)}}}return n},t.parseTemplateParts=function(t){var e={list:null,tokens:{},hasTokens:!1};if(!t||0==t.length)return null;for(var a=e.list=this.parseMustache(t),n=0;n<a.length;n++){var r=a[n];if(r.length>3&&"{"==r.charAt(0)&&"{"==r.charAt(1)){e.hasTokens=!0;var i=r.substring(2,r.length-2);e.tokens[n]=i}}return e}}(this)},a=function(t,e,n,r,i,s,l,o){var u,f=this;if(!(f instanceof a))return new a(t,e,n,r,i,s,l,o);var p=[t,e,n,r,i,s,l,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){u=t.apply(f,p)}),"function"==typeof u){if(u._classInfo.name!=a._classInfo.name)return new u(t,e,n,r,i,s,l,o)}else if(u)return u;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,p)}):"function"==typeof f.init&&f.init.apply(f,p)};a._classInfo={name:"templateCompiler"},a.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.templateCompiler=a,this.templateCompiler=a):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.templateCompiler=a:this.templateCompiler=a}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());