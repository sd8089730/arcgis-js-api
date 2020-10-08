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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/string","dojo/i18n!../../nls/jsapi","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/store/Memory","dojo/data/ObjectStore","dojo/json","dojo/query","../../lang","../../kernel","../../layers/RasterFunction","dojo/text!../../layers/support/rasterFunctionSchema.json","dojo/text!../../layers/support/rasterFunctionResources.json","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/form/TextBox","dijit/form/CheckBox","dijit/form/NumberTextBox","dijit/form/Select","dijit/TitlePane","dijit/Tooltip","./RFxArgSlider","./RFxBandMatrix","./RFxRasterArrayEditor","./RFxRasterInputArray","./RFxStatisticsGrid","./RFxBandIndexPicker","./RFxRasterInput","./RFxTemplateInput","./RFxFeatureSelect","./RFxFieldSelect","./RFxRasterDimensionSelect","./RFxRasterVariableGrid","./RFxMultidimensionalDefinitionEditor","./RFxAggregationDefinitionEditor","./RFxCellSizeInput","./RFxScalesInput","./RFxFieldNumberSwitchable","./RFxLinearUnit","./RFxPropertySet","./RFxSRPicker","./utils","../ColorRampSelector","../../renderers/colorRampUtils"],(function(e,t,r,i,a,n,s,o,u,l,c,g,d,h,f,p,m,v,y,_,A,x,R,b,F,w,T,S,C,E,N,I,O,k,j,L,D,V,U,W,P,B,z,M,H,q,G,K,$){var J,Q,X,Y,Z,ee="esriRFxArgsEditor__table",te="esriRFxArgsEditor__tr",re="esriRFxArgsEditor__tr--arg-name",ie="esriRFxArgsEditor__tr--arg-widget",ae="esriRFxArgsEditor__label--fx-desc",ne="esriRFxArgsEditor__icon--warning",se="esriRFxArgsEditor__titlePane",oe="RasterFunctionTemplate",ue="RasterFunctionVariable",le=[38,39,40,41,42,43,47,54,55,58,66,67,68,69,70,71,72,73,74,75],ce=e([y,_],{declaredClass:"esri.dijit.RasterFunctionEditor.RFxArgsEditor",widgetsInTemplate:!0,templateString:"<div class='esriRFxArgsEditor'><div data-dojo-attach-point='_argsContainterNode'></div></div>",showVariableNames:!0,_inputWidgets:[],_supportedDataTypes:["raster","long","double","string","longarray","stringarray","doublearray","rasterarray","colorramp","boolean","rasterstatisticsarray","arrayofrasterstatistics","cellsize","featureclass","rasterinfo","table","propertyset","spatialReference","rfxtemplate"],constructor:function(r){e.safeMixin(this,r),this._i18n=n.widgets.rasterFunctionEditor.rfxArgsEditor,this._rfxTemplate=t.clone(this.rfxTemplate),J=g.parse(a.substitute(m,n,t.hitch(this,this._substituteString))),Q=g.parse(a.substitute(v,n,t.hitch(this,this._substituteString))),X=Q&&Q.enums,Y=Q&&Q.dataTypes,Z=Q&&Q.domainTypes},startup:function(e){this.inherited(arguments)},postCreate:function(e){this.inherited(arguments),this.rfxTemplate&&(this._honorIsPublic=this._getHonorIsPublic(this.rfxTemplate),this._populateUI())},destroy:function(){this._destroyInputWidgets(),this.inherited(arguments)},reset:function(){},getName:function(){return this._rfxTemplate&&this._rfxTemplate.name},getUpdatedRFTWithValues:function(){var e=this._getUpdatedRFTWithValues(this._rfxTemplate);return this._cloneRFT(e,["input","uxBlocks"])},_getUpdatedRFTWithValues:function(e){if(e){var t=e.arguments,r=this._getFunctionSchema(e);return t&&(this._isRFxArg(t)?e.arguments=this._getUpdatedRFxArg(t,"Raster",r):Object.keys(t).forEach((function(e){if("type"!==e){var i=t[e];i&&(t[e]=this._getUpdatedRFxArg(i,e,r))}}),this)),e}},_getRFT:function(e){if(e){var t=e.arguments,r=this._getFunctionSchema(e);return t&&(this._isRFxArg(t)?e.arguments=this._getUpdatedRFxArg(t,"Raster",r):Object.keys(t).forEach((function(e){if("type"!==e){var i=t[e];i&&(t[e]=this._getUpdatedRFxArg(i,e,r))}}),this)),e}},_isRFxArg:function(e){if(e){var t=e.type;return[oe,ue].indexOf(t)>=0||this._isColorRamp(e)||this._isRecordSet(e)}},_getUpdatedRFxArg:function(e,t,i){if(!e||!this._isRFxArg(e))return e;var a=G.getArgRFT(e),n=i&&i.rasterFunctionArguments,s=this._getCaseInsenstitiveArg(t,n);if(s&&(s.key=t),a)return e.type===ue?(e.value=this._getUpdatedRFTWithValues(a),e):this._getUpdatedRFTWithValues(a);if(this._hasRFTElements(e)&&!this._isShown(e)){var o=e.value&&e.value.elements?e.value.elements:e.value;return r.forEach(o,(function(e,t){e&&(G.isReferencedObject(e)||((a=G.getArgRFT(e))?o[t]=this._getUpdatedRFTWithValues(a):e.type===ue?e.value=this._getArgumentValue(e,s):o[t]=this._getArgumentValue(e,s)))}),this),e}return s&&s.dataType===Y.rfxtemplate?e=this._getArgumentValue(e,s):e.type===ue?(e.value=this._getArgumentValue(e,s),e):this._isRecordSet(e)?e:void 0},_substituteString:function(e,t){if(void 0===e)throw new Error(" RFxArgsEditor: "+t);return null===e?"":this._escapeValue(String(e))},_getHonorIsPublic:function(e){var i=e&&e.arguments;if(!e||!i)return!1;if(e.aliases)return!0;var a=t.hitch(this,(function(e){if(!e)return!1;if(e.isPublic)return!0;if(this._hasRasterElements(e)){var t=e.value&&e.value.elements?e.value.elements:e.value;return r.some(t,(function(e){return a(e)}),this)}return this._getHonorIsPublic(G.getArgRFT(e))}));return this._isRFxArg(i)?a(i):r.some(Object.keys(i),(function(e){var t=i[e];if(this._isRFxArg(t))return a(t)}),this)},_hasRFTElements:function(e){if(!e||!e.value)return!1;var t=e.value.elements?e.value.elements:e.value;return Array.isArray(t)?t.some((function(e){return e&&e.type===oe})):void 0},_hasRasterElements:function(e){if(!e||!e.value)return!1;var t=(e.value.elements?e.value.elements:e.value)[0];return t&&(t.isDataset||t.type===oe)},_isRecordSet:function(e){return e.type&&e.type.toLowerCase().indexOf("recordset")>=0},_isColorRamp:function(e){return!!e&&(!!(e.type&&e.type.toLowerCase().indexOf("colorramp")>=0)||(!!(e.value&&e.value.type&&e.value.type.toLowerCase().indexOf("colorramp")>=0)||void 0))},_cloneRFT:function(e,i){var a={};if("object"==typeof e&&null!==e&&!Array.isArray(e)){for(var n in e)e.hasOwnProperty(n)&&r.indexOf(i,n)<0&&(a[n]=this._cloneRFT(e[n],i));return a}return Array.isArray(e)?e.map(t.hitch(this,(function(e){return this._cloneRFT(e,i)}))):t.clone(e)},_populateUI:function(){this._destroyInputWidgets(),u.empty(this._argsContainterNode),this._buildRFxTemplateUI(this._rfxTemplate)},_buildRFxTemplateUI:function(e,t){var r,i=e.arguments;if(e.function&&e.name&&i&&(r=this._buildRFxUI(e,t)),i)if(this._isRFxArg(i))this._buildArgRFTUI(i);else{var a,n=this._getFunctionSchema(e),s={};n&&Object.keys(n.rasterFunctionArguments).forEach((function(e){var t=this._getCaseInsenstitiveArg(e,i),r=n.rasterFunctionArguments[e];a=this._buildArgRFTUI(t,a,r)||a,s[e.toLowerCase()]=!0}),this),Object.keys(i).forEach((function(e){if(!s[e.toLowerCase()]&&"type"!==e){var t=i[e];a=this._buildArgRFTUI(t,a)||a}}),this)}return r},_buildArgRFTUI:function(e,t,i){if(this._isRFxArg(e)&&(!i||"rfxtemplate"!==i.dataType)){var a=G.getArgRFT(e);if(a)return this._buildRFxTemplateUI(a,t);if(this._hasRasterElements(e)){var n=e&&e.value.elements?e.value.elements:e.value,s=t;return r.forEach(n,(function(e){(a=G.getArgRFT(e))&&(s=this._buildRFxTemplateUI(a,s)||s)}),this),s}}},_getFunctionSchema:function(e){if(e&&e.function&&e.function.type){var t,r,i=e.function.type,a=G.functionTypes;if(i.toLowerCase()===a.local.toLowerCase()){var n=e&&e.arguments&&e.arguments.Operation,s=n&&n.value;if(le.indexOf(s)>=0)return J.CellStatisticsFunction}return i.toLowerCase()===a.gpAdapter.toLowerCase()?(t=(t=e&&e.arguments&&e.arguments.ToolName).value&&t.value.replace("_sa",""),J[t]):i.toLowerCase()===a.pythonAdapter.toLowerCase()?"object"==typeof(r=e&&e.arguments&&e.arguments.ClassName)?J[r.value]:J[r]:J[i]}},_getSchemaArgKey:function(e,t){if(e){var i,a=Object.keys(e);return void 0===t&&1===a.length?a[0]:(r.some(a,(function(e){e.toLowerCase()===(t&&t.toLowerCase())&&(i=e)})),i)}},_buildRFxArgUI:function(e){var t,i,a=[],n=(e=e||{}).rfxArg,s=e.rfxArgName,o=e.functionSchemaArgs,u=e.schemaEditorOverrides,l=e.rfxArgs,c=e.container,g=e.overriddenArgNames,d=e.triggerArgs;if(n)return o&&(t=this._getSchemaArgKey(o,s),(i=o[t])&&(i.key=t)),i&&i.categoryRefId&&(c=this._createCategoryDiv(c,i.categoryRefId)),u&&r.some(u,(function(e){r.indexOf(e.argumentNames,t)>=0&&this._isOverrideWidgetShown(e.argumentNames,l)&&r.indexOf(g,t)<0&&(g=g.concat(e.argumentNames),this._buildOverrideWidgetLayout(e,l,c,o))}),this),r.indexOf(g,t)<0&&(i&&"rfxtemplate"===i.dataType||n.type&&n.type!==oe)&&this._isShown(n,i)&&(i&&r.indexOf(this._supportedDataTypes,i.dataType)<0?a.push(n.name||i.displayName):this._buildRFxArgLayout(n,c,i,l)),i&&i.editorStateTrigger&&i.editorStateTrigger.active&&d.push({rfxArg:n,schemaArgDef:i}),{overriddenArgNames:g,unsupportedDataTypeArgs:a}},_createCategoryDiv:function(e,t){if(s=d("."+t+"-table-body",e)[0])return s;var r=u.create("tr",{class:se},e),i=u.create("td",null,r),a=u.create("div",{class:t},i),n=u.create("table",{class:t+"-table"}),s=u.create("tbody",{class:t+"-table-body"},n),o=Q.categoryReference&&Q.categoryReference[t];new F({title:o.title,content:n,open:o.visible},a);return s},_buildRFxUI:function(e,i){i=i||this._argsContainterNode;var a=e.arguments,n=[],s=[],o=[],l=this._getFunctionSchema(e),c=l&&l.rasterFunctionArguments,g=l&&l.editorArgumentOverride&&l.editorArgumentOverride.active?l.editorArgumentOverride.overrides:null,d=u.create("table",{class:ee}),h=u.create("tbody",null,d),f=i===this._argsContainterNode?"first":"after",p=u.create("div",null,i,f),m={functionSchema:l,functionSchemaArgs:c,schemaEditorOverrides:g,rfxArgs:a,container:h,triggerArgs:o,overriddenArgNames:n};function v(e){if(e){var t=e.overriddenArgNames,r=e.unsupportedDataTypeArgs;t&&(n=n.concat(t),m.overriddenArgNames=n),r&&(s=s.concat(r),m.unsupportedDataTypeArgs=s)}}function y(e){Object.keys(e).forEach((function(e){var r=this._getCaseInsenstitiveArg(e,a);r&&this._isRFxArg(r)&&!r.uxBlocks&&v(this._buildRFxArgUI(t.mixin({rfxArg:r,rfxArgName:e},m)))}),this)}if(a&&(this._isRFxArg(a)?v(this._buildRFxArgUI(t.mixin({rfxArg:a},m))):(c&&t.hitch(this,y)(c),t.hitch(this,y)(a)),Object.keys(a).forEach((function(e){var t=a[e];t&&t.input&&t.input.declaredClass.indexOf("RFxFieldSelect")>0&&t.input.setFieldOptions()})),r.forEach(o,(function(e){var t=e.rfxArg,r=t&&t.value;this._handleEditorStateTriggers(a,r,e.schemaArgDef)}),this)),h.childNodes&&h.childNodes.length)return this._buildTitlePane(d,p,e.function,s)},_isOverrideWidgetShown:function(e,t){var i;return r.some(e,(function(e){if(i=this._getCaseInsenstitiveArg(e,t),this._isShown(i))return!0}),this)},_hasVisibleElements:function(e){if(e&&!G.isReferencedObject(e)){var t=e.value&&e.value.elements;return t&&r.some(t,(function(e){return this._isShown(e)}),this)}},_isShown:function(e,t){return!!e&&(this._honorIsPublic?!!e.isPublic||!!this._hasVisibleElements(e):!t||!t.hidden)},_buildTitlePane:function(e,r,i,a){var n=new F({title:i&&i.name,content:e},r);n.startup();var s=t.hitch(this,(function(e,t){this.own(new w({connectId:[e],label:"<div class='"+ae+"'>"+t+"</div>"})),e.onclick=function(e){e.stopPropagation()}}));n.titleNode&&(s(u.create("a",{class:"esriFloatTrailing helpIcon",style:"float: right; margin-right: -6px;"},n.titleNode),i&&i.description),a&&a.length&&s(u.create("a",{class:ne},n.titleNode),this._i18n.unsupportedDataTypeWarning+"<br><br><strong>"+a.join(", ")+"</strong>"));return n.domNode},_buildRFxArgLayout:function(e,t,r,i){var a,n,s,o;return n=(r&&r.dataType)===Y.boolean,s=this._useRFxArgWidget(r),o=r&&r.domain,(s||n)&&(a=u.create("tr",{class:te},t),e.uxBlocks=[a]),s?this._buildRFxWidgetLayout(a,e,r,i):n&&!o?this._buildBooleanLayout(a,e,r,i):this._buildStdTwoRowLayout(t,e,r,i)},_useRFxArgWidget:function(e){return e&&(e.domain&&e.domain.type===Z.range||e.elementInfos&&e.dataType===Y.rasterArray||e.dataType===Y.table)},_createInputWidget:function(e,t,r,i){var a=this._getWidget(e,t,r,i);a.startup(),e.input=a,this._inputWidgets.push(a)},_createOverrideWidget:function(e,i,a){var n=new e(i,a),s=i&&i.inputArgs;n.startup(),this._inputWidgets.push(n),n.on("drawtool-activate",t.hitch(this,(function(e){this.emit("drawtool-activate",e)}))),n.on("drawtool-deactivate",t.hitch(this,(function(e){this.emit("drawtool-deactivate",e)}))),n.on("add-layer",t.hitch(this,(function(e){this.emit("add-ready-to-use-layer",e)}))),n.on("zoom-to-extent",t.hitch(this,(function(e){this.emit("zoom-to-extent",e)}))),n.domNode&&s&&r.forEach(Object.keys(s),(function(e){var t=s[e];t&&(t.uxBlocks=[n.domNode])}))},_buildOverrideWidgetLayout:function(e,i,a,n){if(e){var s,o,l={},c={},g={};r.forEach(e.argumentNames,(function(e){s=this._getCaseInsenstitiveArg(e,i);var t=n[e];t&&(t.key=e),s&&(s.displayName=this._getArgDisplayName(s.name,t),(!s.value||Array.isArray(s.value)&&0===s.value.length)&&t.defaultValue&&(s.value=t.defaultValue),c[e]=s)}),this),r.forEach(e.triggerArguments,(function(e){s=this._getCaseInsenstitiveArg(e,i);var t=n[e];t&&(t.key=e),s&&(s.displayName=this._getArgDisplayName(s.name,t),g[e]=s)}),this),r.forEach(Object.keys(n),(function(e){(o=n[e]).dataType===Y.raster&&(s=this._getCaseInsenstitiveArg(e,i))&&(l[e]=s)}),this);try{require([e.widget.path],t.hitch(this,(function(e){var r,n,s=u.create("tr",{class:te},a);r=u.create("td",null,s),n=u.create("div",null,r),this._createOverrideWidget(e,{rasterFunctionEnums:X,rasterFunctions:J,rasterArgs:l,rfxArgs:i,inputArgs:c,triggerArgs:g,inputLayers:this.inputLayers,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf},allowScalar:!1,isShownFx:t.hitch(this,this._isShown)},n)})))}catch(e){console.error(e),r.forEach(Object.keys(c),(function(e){s=c[e],o=this._getCaseInsenstitiveArg(e,n),this._buildRFxArgLayout(s,a,o,i)}),this)}}},_buildBooleanLayout:function(e,t,r,i){var a,n;a=u.create("td",{innerHTML:this._getArgDisplayName(t.name,r)},e),n=u.create("div",null,a,"first"),this._createInputWidget(t,n,r,i)},_buildStdTwoRowLayout:function(e,t,r,i){var a,n,s,o;a=u.create("tr",{class:re},e),u.create("td",{innerHTML:this._getArgDisplayName(t.name,r)},a),n=u.create("tr",{class:ie},e),o=u.create("td",null,n),s=u.create("div",null,o),t.uxBlocks=[a,n],this._createInputWidget(t,s,r,i)},_getArgDisplayName:function(e,t){if(!t||!t.displayName)return e;if(this.showVariableNames){var r=t.key;return h.isDefined(e)&&""!==e&&e.toLowerCase()!==r.toLowerCase()?e:t.displayName}return t.displayName},_buildRFxWidgetLayout:function(e,t,r,i){var a,n;a=u.create("td",null,e),n=u.create("div",null,a),this._createInputWidget(t,n,r,i)},_getDatasetOptions:function(){if(this.inputLayers)return this._inputLayerStore=new c(new l({data:this.inputLayers})),this._inputLayerStore},_destroyInputWidgets:function(){var e=this._inputWidgets;r.forEach(e,(function(e){if(e&&e.destroy)try{e.destroy()}catch(e){console.log(e)}})),this._inputWidgets=[]},_getWidget:function(e,r,i,a){if(e){var n,s=i&&i.dataType,o=h.isDefined(e.value)?e.value:i&&i.defaultValue,u=i&&i.domain,l=i&&i.dataTypeAttributes;return e.isDataset&&!n&&(n=new O({inputLayers:this.inputLayers,value:o,allowScalar:!i||i.allowScalar,selectDefault:i&&i.required,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},r)),n||(n=u?this._getDomainBasedWidget(u,e,a,r,o):this._getDataTypeBasedWidget(s,l,e,a,r,i)),n&&(n.on("change",t.partial(t.hitch(this,this._onArgumentValueChange),e,i,a)),n.on("add-layer",t.hitch(this,(function(e){this.emit("add-ready-to-use-layer",e)}))),n.on("zoom-to-extent",t.hitch(this,(function(e){this.emit("zoom-to-extent",e)})))),n}},_getDataTypeBasedWidget:function(e,r,i,a,n,s){var o,u=i.value;if(r&&"bandmatrix"===r.type)return this._getDataTypeAttributeBasedWidget(e,r,i,a,n);switch(e){case Y.raster:i.isDataset||(o=new R({value:u&&u.length?u[0]:void 0},n));break;case Y.rasterArray:var l;s&&s.elementInfos&&(l=this._getRasterArrayInputArgs(s,a)),o=l?new E({inputLayers:this.inputLayers,value:u,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),allowScalar:s.allowScalar,schemaElementInfos:l,isShown:t.hitch(this,this._isShown),browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n):new C({inputLayers:this.inputLayers,value:u,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),allowScalar:s.allowScalar,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;case Y.string:o=new A({value:u},n);break;case Y.double:o=new R({value:u},n);break;case Y.long:o=new R({constraints:{places:0},value:u},n);break;case Y.colorRamp:var c=G.getColorRampFromArg(i);o=new K({style:"text-indent: 0; height: 2.2em;",maxHeight:200,includeDefault:!1,colorRamp:c},n);break;case Y.boolean:o=new x({checked:u},n);break;case Y.stringArray:case Y.doubleArray:case Y.longArray:u&&u.length&&(u=u.join(",")),o=new A({value:u},n);break;case Y.rasterStatisticsArray:case Y.arrayOfRasterStatistics:o=new N({value:u},n);break;case Y.cellSize:o=new P({value:u},n);break;case void 0:o=new A({},n);try{"string"==typeof u?o.set("value",u):o.set("value",g.stringify(u))}catch(e){o.set("value",u)}break;case Y.featureClass:o=new j({inputLayers:this.featureLayers,geometryType:r?r.type:null,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;case Y.propertySet:o=new H({value:u},n);break;case Y.spatialReference:o=new q({value:u,category:1},n);break;case Y.rfxtemplate:o=new k({inputLayers:this.inputLayers,value:i,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;default:o=new A({value:String(u)},n)}return o},_getDomainBasedWidget:function(e,t,r,i,a){if(e&&t){var n,s=e&&e.type;if(s===Z.numList){var o=new c(new l({idProperty:"key",data:this._getNumListData(e)}));n=new b({store:o,labelAttr:"key"},i),h.isDefined(a)&&n.set("value",a.toString())}else if(s===Z.list){var u=G.getEnumData(X[e.enum]),g=new c(new l({idProperty:"key",data:u}));n=new b({store:g,labelAttr:"label",maxHeight:200},i),h.isDefined(a)&&n.set("value",a.toString())}else if(s===Z.range)n=new T({min:e.min,max:e.max,label:t.name,value:a},i);else if(s===Z.bandIndex){var d=this._getCaseInsenstitiveArg(e.argumentName,r);n=new I({nBandsArg:d,value:a},i)}else if(s===Z.fields){var f=this._getCaseInsenstitiveArg(e.argumentName,r);n=new L({layerArg:f,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Z.switchable){f=this._getCaseInsenstitiveArg(e.argumentName,r);var p=this._parseSwitchableDomainArguments(e.attributes,r);n=new z({attributes:p,value:a},i)}else if(s===Z.linearUnit)u=G.getEnumData(X[e.enum]),g=new c(new l({idProperty:"key",data:u})),n=new M({enumStore:g,value:a},i);else if(s===Z.rasterDimensions){f=this._getCaseInsenstitiveArg(e.argumentName,r);n=new D({layerArg:f,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Z.rasterVariables){f=this._getCaseInsenstitiveArg(e.argumentName,r);n=new V({layerArg:f,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Z.mdimdef){f=this._getCaseInsenstitiveArg(e.argumentName,r);n=new U({layerArg:f,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Z.aggregationdef){f=this._getCaseInsenstitiveArg(e.argumentName,r);n=new W({layerArg:f,otherOptions:e.otherOptions,defaultValue:a},i)}return n}},_parseSwitchableDomainArguments:function(e,t){return e.forEach((function(e){if("field"===e.type)e.argumentName=this._getCaseInsenstitiveArg(e.argumentName,t);else if(e.type===Z.list||e.type===Z.linearUnit){var r=G.getEnumData(X[e.enum]);e.enumStore=new c(new l({idProperty:"key",data:r}))}}),this),e},_getDataTypeAttributeBasedWidget:function(e,t,r,i,a){var n=this._getCaseInsenstitiveArg(t.nBands,i);return new S({nBandsArg:n,nCols:t.cols,displayNames:t.displayNames,value:r.value},a)},_getFormattedValueFromVariable:function(e){if(e){var t=G.getArgRFT(e);return t?"<"+(t.function&&t.function.name)+"."+this._i18n.outputRaster+">":"<"+n.widgets.rasterFunctionEditor.rfxRasterInput.rfxVariable+": "+e.name+">"}},_getRasterArrayInputArgs:function(e,t){var i,a=this._getCaseInsenstitiveArg(e.nElementsArgument,t),n=a&&a.value,s=e.elementInfos;return void 0!==a&&void 0!==n||1!==s.length?(r.some(s,(function(e){var t=e.values;if(r.indexOf(t,n)>-1)return i=e.inputArgs,!0}),this),i):s[0].inputArgs},_getNumListData:function(e){if(e){for(var t=[],r=e.start,i=0;i<e.count;r+=e.inc,i++)t.push({key:r.toString()});return t}},_onArgumentValueChange:function(e,r,i,a){var n=e&&e.input;n instanceof b&&r&&r.dataType===Y.long&&(a=parseInt(a,10)),n instanceof b&&r&&r.dataType===Y.boolean&&(a="true"===a),n.declaredClass.indexOf("RFxRasterInput")>=0&&this._handleRasterValueChange(e,i),n.declaredClass.indexOf("RFxFeatureSelect")>=0&&this._handleFeatureValueChange(e,i),this._handleEditorStateTriggers(i,a,r),this._handleEditorValueTriggers(i,a,r),setTimeout(t.hitch(this,(function(){this._started=!0,this.emit("update-preview")})),1e3)},_handleRasterValueChange:function(e,t){var r=["RFxAggregationDefinitionEditor","RFxMultidimensionalDefinitionEditor","RFxRasterVariableGrid","RFxRasterDimensionSelect","RFxFieldSelect","RFxFieldNumberSwitchable"];Object.keys(t).forEach((function(i){var a,n=t[i]&&t[i].input;n&&(a=n,r.some((function(e){return a.declaredClass.indexOf(e)>-1})))&&n.layerArg&&n.layerArg.name===e.name&&n.onRasterChange()}))},_handleFeatureValueChange:function(e,t){Object.keys(t).forEach((function(r){var i=t[r]&&t[r].input;i&&i.layerArg&&i.layerArg.name===e.name&&i.onFeatureChange()}))},_getActiveStateTriggers:function(e,t,i){var a;a=e.ToolName?e.ToolName.value.replace("_sa",""):e.type.replace("Arguments","");var n=[];return r.forEach(Object.keys(e),(function(s){var o=J[a].rasterFunctionArguments[s],u=e[s].value||e[s].input&&e[s].input.value,l=i.key===s?t:u;("boolean"==typeof l||isNaN(l)||(l=Number(l)),o&&o.editorStateTrigger&&o.editorStateTrigger.active&&e)&&(Array.isArray(o.editorStateTrigger.triggers)&&r.forEach(o.editorStateTrigger.triggers,(function(t){var i,a,o,u,c,g,d,h=t.autoRevert||!1;((a=t.checkValuePresent?!!l:Array.isArray(t.values)&&r.indexOf(t.values,l)>=0)||h)&&r.forEach(Object.keys(e),(function(r){r!==s&&(i=e[r],c=i.uxBlocks,i.input,c&&Array.isArray(c)&&(o=this._containsArgName(t.active,r),u=this._containsArgName(t.inactive,r),g=u&&a||o&&!a&&h,(o&&a||u&&!a&&h)&&(d=c&&c[0]&&"TR"===c[0].tagName?"table-row":"block",n.push({state:"active",rfxArgName:r,display:d})),g&&(d="none",n.push({state:"inactive",rfxArgName:r,display:d}))))}),this)}),this))}),this),n},_handleEditorStateTriggers:function(e,t,i){if(i&&i.editorStateTrigger&&i.editorStateTrigger.active&&e){var a,n,o,u,l=this._getActiveStateTriggers(e,t,i);l=r.filter(l,(function(e,t,i){return!r.some(i,(function(r,i){return i>t&&r.rfxArgName===e.rfxArgName&&r.state===e.state}))&&(!r.some(i,(function(r,i){return i!==t&&r.rfxArgName===e.rfxArgName&&r.state!==e.state}))||"active"!==e.state)}),this),r.forEach(l,(function(t){a=t.rfxArgName,n=e[a],o=n.uxBlocks,u=n.input,"active"===t.state&&u&&u.onChange&&i.key&&i.key.toLowerCase()!==a.toLowerCase()&&u.onChange(u.value),r.forEach(o,(function(e){e&&t.display&&s.set(e,"display",t.display)}),this)}),this)}},_handleEditorValueTriggers:function(e,t,i){i&&i.editorValueTrigger&&i.editorValueTrigger.active&&e&&r.forEach(i.editorValueTrigger.triggers,(function(i){var a,n,s;r.indexOf(i.values,t)>=0&&Object.keys(e).forEach((function(t){a=e[t],(n=a.input)&&(s=this._getTriggerArgValue(i.changedArgs,t),h.isDefined(s)&&n.set("value",s))}),this)}),this)},_getTriggerArgValue:function(e,t){var i;return r.some(e,(function(e){for(var r in e)if(e.hasOwnProperty(r)&&r.toLowerCase()===t.toLowerCase())return i=e[r],!0})),i},_containsArgName:function(e,t){if(!e||!t)return!1;var i=t.toLowerCase();return r.some(e,(function(e){return e.toLowerCase()===i}))},_getArgumentValue:function(e,t){if(e){var i,a,n,s=[],o=e.input,u=t&&t.dataType;if(!o)return e.value;var l=[R,b,A],c=[x],d=[T,S,C,N,O,I,j,E,P,B,z,L,D,V,U,W,M,H,q,k];if(h([K]))return G.getRFxArgColorRampValue(o.colorRamp);if(h(d))return o.get("value");if(h(l))switch(i=o.value,u&&u.indexOf("array")>=0&&i&&"string"==typeof i&&(i=i.trim(),s=i.indexOf(",")>=0?i.split(","):i.split(" ")),u&&u===Y.boolean&&"string"==typeof i&&(i="true"===o.value),u){case Y.raster:if(!e.isDataset)return{value:i,type:"Scalar"};break;case Y.longArray:return r.forEach(s,(function(e,t){s[t]=parseInt(e,10)})),s;case Y.doubleArray:return r.forEach(s,(function(e,t){s[t]=parseFloat(e)})),s;case Y.stringArray:case Y.rasterArray:return r.forEach(s,(function(e,t){s[t]=e.trim()})),s;case Y.long:return parseInt(i,10);case Y.cellSize:try{return g.parse(i)}catch(e){return i}return i;case void 0:return i=i&&i.trim(),a=/^[+-]?(\d+)?(\.\d+)?$/.test(i),n=r.indexOf(["true","false"],i)>=0,a?parseFloat(i):n?"true"===i:i;default:return i}else if(h(c))return o.checked}function h(e){return r.some(e,(function(e){if(o instanceof e)return!0}))}},_getCaseInsenstitiveArg:function(e,t){if(e&&t)return r.some(Object.keys(t),(function(t){if(t.toLowerCase()===e.toLowerCase())return e=t,!0})),t[e]},_selectInputDataset:function(e,t){if(e&&e.options.length&&t){var i=t,a=null;"object"==typeof t&&(i=t.url,a=t.name);var n=h.isDefined(a);r.forEach(e.options,(function(e){e.selected=e.item.url===i&&(!n||n&&a===e.item.name)}),this)}}});return i("extend-esri")&&t.setObject("dijit.RasterFunctionEditor.RFxArgsEditor",ce,f),ce}));