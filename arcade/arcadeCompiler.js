// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.34/esri/copyright.txt for details.

define(["require","exports","./ArcadePortal","./Attachment","./Dictionary","./Feature","./ImmutablePathArray","./ImmutablePointArray","./languageUtils","./treeAnalysis","./functions/date","./functions/geometry","./functions/geomsync","./functions/maths","./functions/stats","./functions/string","./polyfill/promiseUtils","../geometry/Extent","../geometry/Geometry","../geometry/Multipoint","../geometry/Point","../geometry/Polygon","../geometry/Polyline","../SpatialReference"],(function(e,r,t,n,o,a,i,l,s,c,u,p,f,g,m,h,d,y,b,S,v,E,w,N){"use strict";function M(e,r,t){try{return t(e,null,r)}catch(e){throw e}}function O(e){return e instanceof Error?d.reject(e):d.reject(new Error(e))}function I(e,r){try{switch(r.type){case"EmptyStatement":return"lc.voidOperation";case"VariableDeclarator":return function(e,r){var t=null===r.init?null:I(e,r.init);t===s.voidOperation&&(t=null);var n=r.id.name.toLowerCase();if(null!==e.localScope){if(void 0!==e.localScope[n])return"lscope['"+n+"']="+t+"; ";if(void 0!==e.localScope._SymbolsMap[n])return"lscope['"+e.localScope._SymbolsMap[n]+"']="+t+"; ";var o=U(e);return e.localScope._SymbolsMap[n]=o,e.mangleMap[n]=o,"lscope['"+o+"']="+t+"; "}if(void 0!==e.globalScope[n])return"gscope['"+n+"']="+t+"; ";if(void 0!==e.globalScope._SymbolsMap[n])return"gscope['"+e.globalScope._SymbolsMap[n]+"']="+t+"; ";o=U(e);return e.globalScope._SymbolsMap[n]=o,e.mangleMap[n]=o,"gscope['"+o+"']="+t+"; "}(e,r);case"VariableDeclaration":return function(e,r){for(var t=[],n=0;n<r.declarations.length;n++)t.push(I(e,r.declarations[n]));return t.join("\n")+" \n lastStatement=  lc.voidOperation; \n"}(e,r);case"BlockStatement":return T(e,r);case"FunctionDeclaration":return function(e,r){var t=r.id.name.toLowerCase(),n={isAsync:e.isAsync,spatialReference:e.spatialReference,console:e.console,lrucache:e.lrucache,services:e.services,symbols:e.symbols,mangleMap:e.mangleMap,localScope:{_SymbolsMap:{}},depthCounter:e.depthCounter+1,globalScope:e.globalScope};if(n.depthCounter>64)throw new Error("Exceeded maximum function depth");for(var o="new lc.SizzleFunction( lang.functionDepthchecker(function() { var lastStatement = lc.voidOperation; \n   var lscope = runtimeCtx.localStack[runtimeCtx.localStack.length-1];\n",a=0;a<r.params.length;a++){var i=r.params[a].name.toLowerCase(),l=U(e);n.localScope._SymbolsMap[i]=l,n.mangleMap[i]=l,o+="lscope['"+l+"']=arguments["+a.toString()+"];\n"}!0===e.isAsync?(o+="return lang.__awaiter(this, void 0, void 0, function* () {\n",o+=T(n,r.body)+"\n return lastStatement; ",o+="});  }",o+=", runtimeCtx))",o+="\n lastStatement = lc.voidOperation; \n"):(o+=T(n,r.body)+"\n return lastStatement; }, runtimeCtx))",o+="\n lastStatement = lc.voidOperation; \n");if(void 0!==e.globalScope[t])return"gscope['"+t+"']="+o;if(void 0!==e.globalScope._SymbolsMap[t])return"gscope['"+e.globalScope._SymbolsMap[t]+"']="+o;l=U(e);return e.globalScope._SymbolsMap[t]=l,e.mangleMap[t]=l,"gscope['"+l+"']="+o}(e,r);case"ReturnStatement":return function(e,r){if(null===r.argument)return"return lc.voidOperation";return"return "+I(e,r.argument)}(e,r);case"IfStatement":return function(e,r){if("AssignmentExpression"===r.test.type||"UpdateExpression"===r.test.type)throw new Error(c.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var t=I(e,r.test),n=P(e),o="var "+n+" = "+t+";\n if ("+n+" === true) {\n"+x(e,r.consequent)+"\n }\n";null!==r.alternate?o+="else if ("+n+"===false)   { \n"+x(e,r.alternate)+"}\n":o+="else if ("+n+"===false) { \n lastStatement = lc.voidOperation;\n }\n";return o+="else { lang.error({type: '"+r.type+"'},'RUNTIME','CANNOT_USE_NONBOOLEAN_IN_CONDITION'); \n}\n"}(e,r);case"ExpressionStatement":return function(e,r){if("AssignmentExpression"===r.expression.type)return"lastStatement = lc.voidOperation; "+I(e,r.expression)+"; \n ";if("CallExpression"===r.expression.type)return"lastStatement = "+I(e,r.expression)+"; ";return"lastStatement = "+I(e,r.expression)+"; "}(e,r);case"AssignmentExpression":return function(e,r){var t=I(e,r.right),n=null,o="";if("MemberExpression"===r.left.type)return n=I(e,r.left.object),o=!0===r.left.computed?I(e,r.left.property):"'"+r.left.property.name+"'","lang.assignmember("+n+","+o+",'"+r.operator+"',"+t+")";if(n=r.left.name.toLowerCase(),null!==e.localScope){if(void 0!==e.localScope[n])return"lscope['"+n+"']=lang.assign("+t+",'"+r.operator+"', lscope['"+n+"'])";if(void 0!==e.localScope._SymbolsMap[n])return"lscope['"+e.localScope._SymbolsMap[n]+"']=lang.assign("+t+",'"+r.operator+"', lscope['"+e.localScope._SymbolsMap[n]+"'])"}if(void 0!==e.globalScope[n])return"gscope['"+n+"']=lang.assign("+t+",'"+r.operator+"', gscope['"+n+"'])";if(void 0!==e.globalScope._SymbolsMap[n])return"gscope['"+e.globalScope._SymbolsMap[n]+"']=lang.assign("+t+",'"+r.operator+"', gscope['"+e.globalScope._SymbolsMap[n]+"'])";throw new Error("Variable not recognised")}(e,r);case"UpdateExpression":return function(e,r){var t=null,n="";if("MemberExpression"===r.argument.type)return t=I(e,r.argument.object),n=!0===r.argument.computed?I(e,r.argument.property):"'"+r.argument.property.name+"'","lang.memberupdate("+t+","+n+",'"+r.operator+"',"+r.prefix+")";if(t=r.argument.name.toLowerCase(),null!==e.localScope){if(void 0!==e.localScope[t])return"lang.update(lscope, '"+t+"','"+r.operator+"',"+r.prefix+")";if(void 0!==e.localScope._SymbolsMap[t])return"lang.update(lscope, '"+e.localScope._SymbolsMap[t]+"','"+r.operator+"',"+r.prefix+")"}if(void 0!==e.globalScope[t])return"lang.update(gscope, '"+t+"','"+r.operator+"',"+r.prefix+")";if(void 0!==e.globalScope._SymbolsMap[t])return"lang.update(gscope, '"+e.globalScope._SymbolsMap[t]+"','"+r.operator+"',"+r.prefix+")";throw new Error("Variable not recognised")}(e,r);case"BreakStatement":return"break";case"ContinueStatement":return"continue";case"TemplateLiteral":return function(e,r){try{for(var t=[],n=0,o=0,a=r.quasis;o<a.length;o++){var i=a[o];t.push(i.value?JSON.stringify(i.value.cooked):JSON.stringify("")),!1===i.tail&&(t.push(r.expressions[n]?"lang.castString(lang.aCheck("+I(e,r.expressions[n])+", 'TemplateLiteral'))":""),n++)}return"(["+t.join(",")+"]).join('')"}catch(e){throw e}}(e,r);case"TemplateElement":return JSON.stringify(r.value?r.value.cooked:"");case"ForStatement":return function(e,r){var t="lastStatement = lc.voidOperation; \n";null!==r.init&&(t+=I(e,r.init)+"; ");var n=P(e),o=P(e);t+="var "+n+" = true; ",t+="\n do { ",null!==r.update&&(t+=" if ("+n+"===false) {\n "+I(e,r.update)+"  \n}\n "+n+"=false; \n");null!==r.test&&(t+="var "+o+" = "+I(e,r.test)+"; ",t+="if ("+o+"===false) { break; } else if ("+o+"!==true) { lang.error({type: '"+r.type+"'},'RUNTIME','CANNOT_USE_NONBOOLEAN_IN_CONDITION');   }\n");t+=I(e,r.body),null!==r.update&&(t+="\n "+I(e,r.update));return t+="\n"+n+" = true; \n} while(true);  lastStatement = lc.voidOperation; "}(e,r);case"ForInStatement":return function(e,r){var t=P(e),n=P(e),o=P(e),a="var "+t+" = "+I(e,r.right)+";\n";"VariableDeclaration"===r.left.type&&(a+=I(e,r.left));var i="VariableDeclaration"===r.left.type?r.left.declarations[0].id.name:r.left.name;i=i.toLowerCase();var l="";null!==e.localScope&&(void 0!==e.localScope[i]?l="lscope['"+i+"']":void 0!==e.localScope._SymbolsMap[i]&&(l="lscope['"+e.localScope._SymbolsMap[i]+"']"));""===l&&(void 0!==e.globalScope[i]?l="gscope['"+i+"']":void 0!==e.globalScope._SymbolsMap[i]&&(l="gscope['"+e.globalScope._SymbolsMap[i]+"']"));a+="if ("+t+"===null) {  lastStatement = lc.voidOperation; }\n ",a+="else if (lc.isArray("+t+") || lc.isString("+t+")) {",a+="var "+n+"="+t+".length; \n",a+="for(var "+o+"=0; "+o+"<"+n+"; "+o+"++) {\n",a+=l+"="+o+";\n",a+=I(e,r.body),a+="\n}\n",a+=" lastStatement = lc.voidOperation; \n",a+=" \n}\n",a+="else if (lc.isImmutableArray("+t+")) {",a+="var "+n+"="+t+".length(); \n",a+="for(var "+o+"=0; "+o+"<"+n+"; "+o+"++) {\n",a+=l+"="+o+";\n",a+=I(e,r.body),a+="\n}\n",a+=" lastStatement = lc.voidOperation; \n",a+=" \n}\n",a+="else if (( "+t+" instanceof lang.Dictionary) || ( "+t+" instanceof lang.Feature)) {",a+="var "+n+"="+t+".keys(); \n",a+="for(var "+o+"=0; "+o+"<"+n+".length; "+o+"++) {\n",a+=l+"="+n+"["+o+"];\n",a+=I(e,r.body),a+="\n}\n",a+=" lastStatement = lc.voidOperation; \n",a+=" \n}\n",e.isAsync&&(a+="else if (lc.isFeatureSet("+t+")) {",a+="var "+n+"="+t+".iterator(runtimeCtx.abortSignal); \n",a+="for(var "+o+"=lang. graphicToFeature( yield "+n+".next(),"+t+"); "+o+"!=null; "+o+"=lang. graphicToFeature( yield "+n+".next(),"+t+")) {\n",a+=l+"="+o+";\n",a+=I(e,r.body),a+="\n}\n",a+=" lastStatement = lc.voidOperation; \n",a+=" \n}\n");return a+="else { lastStatement = lc.voidOperation; } \n"}(e,r);case"Identifier":return function(e,r){try{var t=r.name.toLowerCase();if(null!==e.localScope){if(void 0!==e.localScope[t])return"lscope['"+t+"']";if(void 0!==e.localScope._SymbolsMap[t])return"lscope['"+e.localScope._SymbolsMap[t]+"']"}if(void 0!==e.globalScope[t])return"gscope['"+t+"']";if(void 0!==e.globalScope._SymbolsMap[t])return"gscope['"+e.globalScope._SymbolsMap[t]+"']";throw new Error(c.nodeErrorMessage(r,"RUNTIME","VARIABLENOTFOUND"))}catch(e){throw e}}(e,r);case"MemberExpression":return function(e,r){try{var t=void 0;return t=!0===r.computed?I(e,r.property):"'"+r.property.name+"'","lang.member("+I(e,r.object)+","+t+")"}catch(e){throw e}}(e,r);case"Literal":return null===r.value||void 0===r.value?"null":JSON.stringify(r.value);case"ThisExpression":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"CallExpression":return function(e,r){try{if("Identifier"!==r.callee.type)throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYNODESSUPPORTED"));var t=r.callee.name.toLowerCase(),n="";if(null!==e.localScope&&(void 0!==e.localScope[t]?n="lscope['"+t+"']":void 0!==e.localScope._SymbolsMap[t]&&(n="lscope['"+e.localScope._SymbolsMap[t]+"']")),""===n&&(void 0!==e.globalScope[t]?n="gscope['"+t+"']":void 0!==e.globalScope._SymbolsMap[t]&&(n="gscope['"+e.globalScope._SymbolsMap[t]+"']")),""!==n){for(var o="[",a=0;a<r.arguments.length;a++)a>0&&(o+=", "),o+=I(e,r.arguments[a]);return o+="]",e.isAsync?"(yield lang.callfunc("+n+","+o+",runtimeCtx) )":"lang.callfunc("+n+","+o+",runtimeCtx)"}throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))}catch(e){throw e}}(e,r);case"UnaryExpression":return function(e,r){try{return"lang.unary("+I(e,r.argument)+",'"+r.operator+"')"}catch(e){throw e}}(e,r);case"BinaryExpression":return function(e,r){try{return"lang.binary("+I(e,r.left)+","+I(e,r.right)+",'"+r.operator+"')"}catch(e){throw e}}(e,r);case"LogicalExpression":return function(e,r){try{if("AssignmentExpression"===r.left.type||"UpdateExpression"===r.left.type)throw new Error(c.nodeErrorMessage(r.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("AssignmentExpression"===r.right.type||"UpdateExpression"===r.right.type)throw new Error(c.nodeErrorMessage(r.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("&&"===r.operator||"||"===r.operator)return"(lang.logicalCheck("+I(e,r.left)+") "+r.operator+" lang.logicalCheck("+I(e,r.right)+"))";throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"))}catch(e){throw e}}(e,r);case"ConditionalExpression":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"ArrayExpression":return function(e,r){try{for(var t=[],n=0;n<r.elements.length;n++)"Literal"===r.elements[n].type?t.push(I(e,r.elements[n])):t.push("lang.aCheck("+I(e,r.elements[n])+",'ArrayExpression')");return"["+t.join(",")+"]"}catch(e){throw e}}(e,r);case"ObjectExpression":return function(e,r){for(var t="lang.dictionary([",n=0;n<r.properties.length;n++){var o=r.properties[n],a="Identifier"===o.key.type?"'"+o.key.name+"'":I(e,o.key),i=I(e,o.value);n>0&&(t+=","),t+="lang.strCheck("+a+",'ObjectExpression'),lang.aCheck("+i+", 'ObjectExpression')"}return t+="])"}(e,r);case"Property":return function(e,r){throw new Error("Should not get here")}();case"Array":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","UNREOGNISED"))}}catch(e){throw e}}function x(e,r){return"BlockStatement"===r.type?I(e,r):"ReturnStatement"===r.type?I(e,r)+"; ":"BreakStatement"===r.type?I(e,r)+"; ":"ContinueStatement"===r.type?I(e,r)+"; ":"UpdateExpression"===r.type?"lastStatement = "+I(e,r)+"; ":"ExpressionStatement"===r.type?I(e,r):"ObjectExpression"===r.type?"lastStatement = "+I(e,r)+"; ":I(e,r)+"; "}function T(e,r){for(var t="",n=0;n<r.body.length;n++)"ReturnStatement"===r.body[n].type?t+=I(e,r.body[n])+"; \n":"BreakStatement"===r.body[n].type?t+=I(e,r.body[n])+"; \n":"ContinueStatement"===r.body[n].type?t+=I(e,r.body[n])+"; \n":"UpdateExpression"===r.body[n].type?t+="lastStatement = "+I(e,r.body[n])+"; \n":"ObjectExpression"===r.body[n].type?t+="lastStatement = "+I(e,r.body[n])+"; \n":t+=I(e,r.body[n])+" \n";return t}Object.defineProperty(r,"__esModule",{value:!0});var C=0;var R={};function A(e){return null===e?"":s.isArray(e)?"Array":s.isImmutableArray(e)?"Array":s.isDate(e)?"Date":s.isString(e)?"String":s.isBoolean(e)?"Boolean":s.isNumber(e)?"Number":e instanceof n?"Attachment":e instanceof t?"Portal":e instanceof o?"Dictionary":e instanceof a?"Feature":e instanceof v?"Point":e instanceof E?"Polygon":e instanceof w?"Polyline":e instanceof S?"Multipoint":e instanceof y?"Extent":s.isFunctionParameter(e)?"Function":s.isFeatureSet(e)?"FeatureSet":s.isFeatureSetCollection(e)?"FeatureSetCollection":e===s.voidOperation?"":"number"==typeof e&&isNaN(e)?"Number":"Unrecognised Type"}function _(e,r){var t=e.length,n=Math.floor(t/2);return 0===t?[]:1===t?[e[0]]:function(e,r,t){var n=[];for(;e.length>0||r.length>0;)if(e.length>0&&r.length>0){var o=t(e[0],r[0]);isNaN(o)&&(o=0),o<=0?(n.push(e[0]),e=e.slice(1)):(n.push(r[0]),r=r.slice(1))}else e.length>0?(n.push(e[0]),e=e.slice(1)):r.length>0&&(n.push(r[0]),r=r.slice(1));return n}(_(e.slice(0,n),r),_(e.slice(n,t),r),r)}function F(e,r){try{var t=e.length,n=Math.floor(t/2);if(0===t)return d.resolve([]);if(1===t)return d.resolve([e[0]]);var o=[F(e.slice(0,n),r),F(e.slice(n,t),r)];return d.all(o).then((function(e){return function e(r,t,n,o){return d.create((function(a,i){var l=o;r.length>0||t.length>0?r.length>0&&t.length>0?n(r[0],t[0]).then((function(s){try{isNaN(s)&&(s=1),s<=0?(l.push(r[0]),r=r.slice(1)):(l.push(t[0]),t=t.slice(1)),e(r,t,n,o).then((function(e){a(e)}),i)}catch(e){i(e)}}),i):r.length>0?(l.push(r[0]),r=r.slice(1),e(r,t,n,o).then((function(e){a(e)}),i)):t.length>0&&(l.push(t[0]),t=t.slice(1),e(r,t,n,o).then((function(e){a(e)}),i)):a(o)}))}(e[0],e[1],r,[])}))}catch(e){return d.reject(e)}}function U(e){return e.symbols.symbolCounter++,"_T"+e.symbols.symbolCounter.toString()}function P(e){return e.symbols.symbolCounter++,"_Tvar"+e.symbols.symbolCounter.toString()}u.registerFunctions(R,M),h.registerFunctions(R,M),g.registerFunctions(R,M),p.registerFunctions(R,M),m.registerFunctions(R,M),R.typeof=function(e,r){return M(e,r,(function(e,r,t){s.pcCheck(t,1,1);var n=A(t[0]);if("Unrecognised Type"===n)throw new Error("Unrecognised Type");return n}))},R.iif=function(e,r){try{return M(e,r,(function(e,r,t){if(s.pcCheck(t,3,3),!1===s.isBoolean(t[0]))throw new Error("IF Function must have a boolean test condition");return t[0]?t[1]:t[2]}))}catch(e){throw e}},R.decode=function(e,r){try{return M(e,r,(function(r,t,n){if(n.length<2)throw new Error("Missing Parameters");if(2===n.length)return n[1];if((n.length-1)%2==0)throw new Error("Must have a default value result.");var o=n[0];return function e(r,t,n,o){try{var a=t[n];if(s.equalityTest(a,o))return t[n+1];var i=t.length-n;return 1===i?t[n]:2===i?null:3===i?t[n+2]:e(r,t,n+2,o)}catch(e){throw e}}(e,n,1,o)}))}catch(e){throw e}},R.when=function(e,r){try{return M(e,r,(function(r,t,n){if(n.length<3)throw new Error("Missing Parameters");if(n.length%2==0)throw new Error("Must have a default value result.");var o=n[0];if(!1===s.isBoolean(o))throw new Error("WHEN needs boolean test conditions");return function e(r,t,n,o){try{if(!0===o)return t[n+1];if(3===t.length-n)return t[n+2];var a=t[n+2];if(!1===s.isBoolean(a))throw new Error("WHEN needs boolean test conditions");return e(r,t,n+2,a)}catch(e){throw e}}(e,n,0,o)}))}catch(e){throw e}},R.top=function(e,r){return M(e,r,(function(e,r,t){if(s.pcCheck(t,2,2),s.isArray(t[0]))return s.toNumber(t[1])>=t[0].length?t[0].slice(0):t[0].slice(0,s.toNumber(t[1]));if(s.isImmutableArray(t[0]))return s.toNumber(t[1])>=t[0].length()?t[0].slice(0):t[0].slice(0,s.toNumber(t[1]));throw new Error("Top cannot accept this parameter type")}))},R.first=function(e,r){return M(e,r,(function(e,r,t){return s.pcCheck(t,1,1),s.isArray(t[0])?0===t[0].length?null:t[0][0]:s.isImmutableArray(t[0])?0===t[0].length()?null:t[0].get(0):null}))},R.sort=function(e,r){return M(e,r,(function(r,t,n){s.pcCheck(n,1,2);var o=n[0];if(s.isImmutableArray(o)&&(o=o.toArray()),!1===s.isArray(o))throw new Error("Illegal Argument");if(n.length>1){if(!1===s.isFunctionParameter(n[1]))throw new Error("Illegal Argument");var a=o,i=function(e,t){return q.callfunc(n[1],[e,t],r)};return e.isAsync?F(a,i):a=_(a,(function(e,r){return i(e,r)}))}if(0===(a=o).length)return[];for(var l={},c=0;c<a.length;c++){var u=A(a[c]);""!==u&&(l[u]=!0)}if(!0===l.Array||!0===l.Dictionary||!0===l.Feature||!0===l.Point||!0===l.Polygon||!0===l.Polyline||!0===l.Multipoint||!0===l.Extent||!0===l.Function)return a.slice(0);var p=0,f="";for(var g in l)p++,f=g;return a=p>1||"String"===f?_(a,(function(e,r){if(null==e||e===s.voidOperation)return null==r||r===s.voidOperation?0:1;if(null==r||r===s.voidOperation)return-1;var t=s.toString(e),n=s.toString(r);return t<n?-1:t===n?0:1})):"Number"===f?_(a,(function(e,r){return e-r})):"Boolean"===f?_(a,(function(e,r){return e===r?0:r?-1:1})):"Date"===f?_(a,(function(e,r){return r-e})):a.slice(0)}))};var k={};for(var D in R)k[D]=new s.NativeFunction(R[D]);for(var D in f.registerFunctions(R,M),R)R[D]=new s.NativeFunction(R[D]);var L=function(){};L.prototype=R;var j=function(){};function B(e,r,t){var n={};for(var o in e||(e={}),t||(t={}),n._SymbolsMap={},n.textformatting=1,n.infinity=1,n.pi=1,r)n[o]=1;for(var o in t)n[o]=1;for(var o in e)n[o]=1;return n}j.prototype=k;var V={fixSpatialReference:s.fixSpatialReference,parseArguments:function(e,r){for(var t=[],n=0;n<r.arguments.length;n++)t.push(I(e,r.arguments[n]));return t},standardFunction:M};function Y(e,r){for(var t={mode:r,compiled:!0,functions:{},signatures:[],failDefferred:O,standardFunction:M,standardFunctionAsync:M,evaluateIdentifier:G},n=0;n<e.length;n++)e[n].registerFunctions(t);if("sync"===r){for(var o in t.functions)R[o]=new s.NativeFunction(t.functions[o]),L.prototype[o]=R[o];for(n=0;n<t.signatures.length;n++)c.addFunctionDeclaration(t.signatures[n],"sync")}else{for(var o in t.functions)k[o]=new s.NativeFunction(t.functions[o]),j.prototype[o]=k[o];for(n=0;n<t.signatures.length;n++)c.addFunctionDeclaration(t.signatures[n],"async")}}function G(e,r){var t=r.name;if("_SymbolsMap"===t)throw"Illegal";if(e.localStack.length>0){if("_t"!==t.substr(0,2).toLowerCase()&&void 0!==e.localStack[e.localStack.length-1][t])return e.localStack[e.localStack.length-1][t];var n=e.mangleMap[t];if(void 0!==n&&void 0!==e.localStack[e.localStack.length-1][n])return e.localStack[e.localStack.length-1][n]}if("_t"!==t.substr(0,2).toLowerCase()&&void 0!==e.globalScope[t])return e.globalScope[t];if(1===e.globalScope._SymbolsMap[t])return e.globalScope[t];var o=e.mangleMap[t];return void 0!==o?e.globalScope[o]:void 0}r.functionHelper=V,r.extend=Y,r.executeScript=function(e,r){return e(r)},r.extractFieldLiterals=function(e,r){return void 0===r&&(r=!1),c.findFieldLiterals(e)},r.validateScript=function(e,r){return c.validateScript(e,r,"sync")},r.referencesMember=function(e,r){return c.referencesMember(e,r)},r.referencesFunction=function(e,r){return c.referencesFunction(e,r)};var z=0,q={error:function(e,r,t){throw new Error(c.nodeErrorMessage(e,r,t))},__awaiter:function(e,r,t,n){return d.create((function(t,o){function a(e){try{l(n.next(e))}catch(e){o(e)}}function i(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){e.done?t(e.value):e.value&&e.value.then?e.value.then(a,i):++z%100==0?setTimeout((function(){z=0,a(e.value)}),0):a(e.value)}l((n=n.apply(e,r||[])).next())}))},functionDepthchecker:function(e,r){return function(){if(r.depthCounter++,r.localStack.push([]),r.depthCounter>64)throw new Error("Exceeded maximum function depth");var t=e.apply(this,arguments);return d.isPromiseLike(t)?t.then((function(e){return r.depthCounter--,r.localStack.length=r.localStack.length-1,e})):(r.depthCounter--,r.localStack.length=r.localStack.length-1,t)}},castString:function(e){return s.toString(e)},aCheck:function(e,r){if(s.isFunctionParameter(e))throw new Error(c.nodeErrorMessage({type:r},"RUNTIME","FUNCTIONCONTEXTILLEGAL"));return e===s.voidOperation?null:e},Dictionary:o,Feature:a,dictionary:function(e){for(var r={},t=0;t<e.length;t+=2){if(s.isFunctionParameter(e[t+1]))throw new Error("Illegal Argument");if(!1===s.isString(e[t]))throw new Error("Illegal Argument");e[t+1]===s.voidOperation?r[e[t].toString()]=null:r[e[t].toString()]=e[t+1]}var n=new o(r);return n.immutable=!1,n},strCheck:function(e){if(!1===s.isString(e))throw new Error("Illegal Argument");return e},unary:function(e,r){if(s.isBoolean(e)){if("!"===r)return!e;if("-"===r)return-1*s.toNumber(e);if("+"===r)return 1*s.toNumber(e);if("~"===r)return~s.toNumber(e);var t={type:"UnaryExpression",operator:r,prefix:null,argument:null};throw new Error(c.nodeErrorMessage(t,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))}if("-"===r)return-1*s.toNumber(e);if("+"===r)return 1*s.toNumber(e);if("~"===r)return~s.toNumber(e);var n={type:"UnaryExpression",operator:r,prefix:null,argument:null};throw new Error(c.nodeErrorMessage(n,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))},logicalCheck:function(e){if(!1===s.isBoolean(e)){throw new Error(c.nodeErrorMessage({type:"LogicalExpression",operator:null,left:null,right:null},"RUNTIME","ONLYORORAND"))}return e},logical:function(e,r,t){if(s.isBoolean(e)&&s.isBoolean(r))switch(t){case"||":return e||r;case"&&":return e&&r;default:throw new Error(c.nodeErrorMessage({type:"LogicalExpression",operator:null,left:null,right:null},"RUNTIME","ONLYORORAND"))}throw new Error(c.nodeErrorMessage({type:"LogicalExpression",operator:null,left:null,right:null},"RUNTIME","ONLYORORAND"))},binary:function(e,r,t){switch(t){case"|":case"<<":case">>":case">>>":case"^":case"&":return s.binaryOperator(s.toNumber(e),s.toNumber(r),t);case"==":case"=":return s.equalityTest(e,r);case"!=":return!s.equalityTest(e,r);case"<":case">":case"<=":case">=":return s.greaterThanLessThan(e,r,t);case"+":return s.isString(e)||s.isString(r)?s.toString(e)+s.toString(r):s.toNumber(e)+s.toNumber(r);case"-":return s.toNumber(e)-s.toNumber(r);case"*":return s.toNumber(e)*s.toNumber(r);case"/":return s.toNumber(e)/s.toNumber(r);case"%":return s.toNumber(e)%s.toNumber(r);default:var n={type:"BinaryExpression",operator:t,left:e,right:r};throw new Error(c.nodeErrorMessage(n,"RUNTIME","OPERATORNOTRECOGNISED"))}},assign:function(e,r,t){switch(r){case"=":return e===s.voidOperation?null:e;case"/=":return s.toNumber(t)/s.toNumber(e);case"*=":return s.toNumber(t)*s.toNumber(e);case"-=":return s.toNumber(t)-s.toNumber(e);case"+=":return s.isString(t)||s.isString(e)?s.toString(t)+s.toString(e):s.toNumber(t)+s.toNumber(e);case"%=":return s.toNumber(t)%s.toNumber(e);default:var n={type:"AssignmentExpression",operator:r,left:null,right:null};throw new Error(c.nodeErrorMessage(n,"RUNTIME","OPERATORNOTRECOGNISED"))}},update:function(e,r,t,n){var o=s.toNumber(e[r]);return e[r]="++"===t?o+1:o-1,!1===n?o:"++"===t?o+1:o-1},graphicToFeature:function(e,r){return null===e?null:a.createFromGraphicLikeObject(e.geometry,e.attributes,r)},memberupdate:function(e,r,t,n){var i;if(s.isArray(e)){if(!s.isNumber(r))throw new Error("Invalid Parameter");if(r<0&&(r=e.length+r),r<0||r>=e.length)throw new Error("Assignment outside of array bounds");i=s.toNumber(e[r]),e[r]="++"===t?i+1:i-1}else if(e instanceof o){if(!1===s.isString(r))throw new Error("Dictionary accessor must be a string");if(!0!==e.hasField(r))throw new Error("Invalid Parameter");i=s.toNumber(e.field(r)),e.setField(r,"++"===t?i+1:i-1)}else{if(!(e instanceof a))throw s.isImmutableArray(e)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===s.isString(r))throw new Error("Feature accessor must be a string");if(!0!==e.hasField(r))throw new Error("Invalid Parameter");i=s.toNumber(e.field(r)),e.setField(r,"++"===t?i+1:i-1)}return!1===n?i:"++"===t?i+1:i-1},assignmember:function(e,r,t,n){if(s.isArray(e)){if(!s.isNumber(r))throw new Error("Invalid Parameter");if(r<0&&(r=e.length+r),r<0||r>e.length)throw new Error("Assignment outside of array bounds");if(r===e.length){if("="!==t)throw new Error("Invalid Parameter");e[r]=this.assign(n,t,e[r])}else e[r]=this.assign(n,t,e[r])}else if(e instanceof o){if(!1===s.isString(r))throw new Error("Dictionary accessor must be a string");if(!0===e.hasField(r))e.setField(r,this.assign(n,t,e.field(r)));else{if("="!==t)throw new Error("Invalid Parameter");e.setField(r,this.assign(n,t,null))}}else{if(!(e instanceof a))throw s.isImmutableArray(e)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===s.isString(r))throw new Error("Feature accessor must be a string");if(!0===e.hasField(r))e.setField(r,this.assign(n,t,e.field(r)));else{if("="!==t)throw new Error("Invalid Parameter");e.setField(r,this.assign(n,t,null))}}},member:function(e,r){if(null===e){throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","NOTFOUND"))}if(e instanceof o||e instanceof a){if(s.isString(r))return e.field(r);throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","INVALIDTYPE"))}if(e instanceof b){if(s.isString(r))return function(e,r,t){var n;switch(r=r.toLowerCase()){case"hasz":var a=e.hasZ;return void 0!==a&&a;case"hasm":var s=e.hasM;return void 0!==s&&s;case"spatialreference":var u=e.spatialReference._arcadeCacheId;if(void 0===u){var p=!0;Object.freeze&&Object.isFrozen(e.spatialReference)&&(p=!1),p&&(C++,e.spatialReference._arcadeCacheId=C,u=C)}var f=new o({wkt:e.spatialReference.wkt,wkid:e.spatialReference.wkid});return void 0!==u&&(f._arcadeCacheId="SPREF"+u.toString()),f}switch(e.type){case"extent":switch(r){case"xmin":case"xmax":case"ymin":case"ymax":case"zmin":case"zmax":case"mmin":case"mmax":var g=e[r];return void 0!==g?g:null;case"type":return"Extent"}break;case"polygon":switch(r){case"rings":return void 0===(n=e.getCacheValue("_arcadeCacheId"))&&(n=++C,e.setCacheValue("_arcadeCacheId",n)),new i(e.rings,e.spatialReference,!0===e.hasZ,!0===e.hasM,n);case"type":return"Polygon"}break;case"point":switch(r){case"x":case"y":case"z":case"m":return void 0!==e[r]?e[r]:null;case"type":return"Point"}break;case"polyline":switch(r){case"paths":return void 0===(n=e.getCacheValue("_arcadeCacheId"))&&(n=++C,e.setCacheValue("_arcadeCacheId",n)),new i(e.paths,e.spatialReference,!0===e.hasZ,!0===e.hasM,n);case"type":return"Polyline"}break;case"multipoint":switch(r){case"points":return void 0===(n=e.getCacheValue("_arcadeCacheId"))&&(n=++C,e.setCacheValue("_arcadeCacheId",n)),new l(e.points,e.spatialReference,!0===e.hasZ,!0===e.hasM,n,1);case"type":return"Multipoint"}}throw new Error(c.nodeErrorMessage(t,"RUNTIME","PROPERTYNOTFOUND"))}(e,r,"MemberExpression");throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","INVALIDTYPE"))}if(s.isArray(e)){if(s.isNumber(r)&&isFinite(r)&&Math.floor(r)===r){if(r<0&&(r=e.length+r),r>=e.length||r<0){throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","OUTOFBOUNDS"))}return e[r]}throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","INVALIDTYPE"))}if(s.isString(e)){if(s.isNumber(r)&&isFinite(r)&&Math.floor(r)===r){if(r<0&&(r=e.length+r),r>=e.length||r<0){throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","OUTOFBOUNDS"))}return e[r]}throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","INVALIDTYPE"))}if(s.isImmutableArray(e)){if(s.isNumber(r)&&isFinite(r)&&Math.floor(r)===r){if(r<0&&(r=e.length()+r),r>=e.length()||r<0){throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","OUTOFBOUNDS"))}return e.get(r)}throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","INVALIDTYPE"))}throw new Error(c.nodeErrorMessage({type:"MemberExpression",object:null,property:null,computed:null},"RUNTIME","INVALIDTYPE"))},callfunc:function(e,r,t){return e instanceof s.NativeFunction?e.fn(t,r):e instanceof s.SizzleFunction?e.fn.apply(this,r):e.apply(this,r)}};function J(e){console.log(e)}r.compileScript=function(e,r,t){void 0===r&&(r=null),void 0===t&&(t=!1),null===r&&(r={vars:{},customfunctions:{}});var n={isAsync:t,globalScope:B(r.vars,t?k:R,r.customfunctions),localScope:null,mangleMap:{},console:J,lrucache:r.lrucache,services:r.services,symbols:{symbolCounter:0}},i=I(n,e.body[0].body);""===i&&(i="lc.voidOperation; ");var l="";l=t?"var runtimeCtx=this.prepare(context, true);\n var lc = this.lc;  var lang = this.lang; var gscope=runtimeCtx.globalScope; \nreturn lang.__awaiter(this, void 0, void 0, function* () {\n\n function mainBody() {\n var lastStatement=lc.voidOperation;\n return lang.__awaiter(this, void 0, void 0, function* () {\n"+i+"\n return lastStatement; }); } \n return this.postProcess(yield mainBody()); }); ":"var runtimeCtx=this.prepare(context, false);\n var lc = this.lc;  var lang = this.lang; var gscope=runtimeCtx.globalScope; \n function mainBody() {\n var lastStatement=lc.voidOperation;\n "+i+"\n return lastStatement; } \n return this.postProcess(mainBody()); ";var c={lc:s,lang:q,mangles:n.mangleMap,postProcess:function(e){if(e instanceof s.ReturnResult&&(e=e.value),e instanceof s.ImplicitResult&&(e=e.value),e===s.voidOperation&&(e=null),e===s.breakResult)throw new Error("Cannot return BREAK");if(e===s.continueResult)throw new Error("Cannot return CONTINUE");if(s.isFunctionParameter(e))throw new Error("Cannot return FUNCTION");return e},prepare:function(e,r){var t=e.spatialReference;null==t&&(t=new N({wkid:102100}));var n=function(e,r,t){var n=t?new j:new L;e||(e={}),r||(r={});var i=new o({newline:"\n",tab:"\t",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});for(var l in i.immutable=!1,n._SymbolsMap={textformatting:1,infinity:1,pi:1},n.textformatting=i,n.infinity=Number.POSITIVE_INFINITY,n.pi=Math.PI,r)n[l]=r[l],n._SymbolsMap[l]=1;for(var l in e)n._SymbolsMap[l]=1,e[l]&&"esri.Graphic"===e[l].declaredClass?n[l]=a.createFromGraphic(e[l]):n[l]=e[l];return n}(e.vars,e.customfunctions,r);return{localStack:[],isAsync:r,mangleMap:this.mangles,spatialReference:t,globalScope:n,abortSignal:void 0===e.abortSignal||null===e.abortSignal?{aborted:!1}:e.abortSignal,localScope:null,services:e.services,console:e.console?e.console:J,lrucache:e.lrucache,symbols:{symbolCounter:0},depthCounter:1}}};return new Function("context","spatialReference",l).bind(c)},r.enableAsyncSupport=function(){return d.create((function(r,t){e(["./functions/geomasync"],(function(e){Y([e],"async"),r(!0)}),(function(e){t(e)}))}))}}));