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

define(["require","dojo/aspect","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/on","dojo/_base/fx","dojo/fx/easing","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ToggleButton","dijit/form/ValidationTextBox","dijit/form/NumberTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","dijit/TitlePane","dijit/InlineEditBox","../../kernel","../../lang","./utils","./Card","./MultiVariableForm","./customgp/editors/SelectFeatureSetFromLayer","dojo/i18n!../../nls/jsapi","dojo/i18n!./nls/BuildMultiVariablesList","dojo/text!./templates/BuildMultiVariablesList.html"],(function(e,t,i,a,n,s,r,o,d,l,h,u,c,m,p,_,y,g,f,v,C,b,j,L,M,w,F,B,P,x,N,S,A,V,U,z,I,T,E,k,D,R,W,O,q,H){var G=i([f,v,C,b,j],{declaredClass:"esri.dijit.analysis.BuildMultiVariablesList",templateString:H,widgetsInTemplate:!0,i18n:null,constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),this.variableUIMap=e.variableUIMap||[],this.cards=e.cards||[]},destroy:function(){this.inherited(arguments),n.forEach(this._pbConnects,s.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),this.i18n=a.mixin({},q),a.mixin(this.i18n,O.common)},postCreate:function(){this.inherited(arguments),this._loadConnections(),k.initHelpLinks(this.domNode,!0),this._inputParam=new W({cssClass:{featureSetSelect:"esriTableFixedLayout fullSpread esriLongLabel esriAnalysisSelect",layerChooseCtr:""},param:{},widgetUID:void 0,widget:this,config:{showDrawOption:!1,portalUrl:this.portalUrl,analysisLayers:this.inputLayers,analysisLayer:this.inputLayer,showGeoAnalyticsParams:this.showGeoAnalyticsParams},appConfig:void 0,map:this.map,nls:this.i18n,editorManager:null,style:{width:"100%"}}),this._inputLayerTd.appendChild(this._inputParam.domNode),this.inputLayer||(this.inputLayer=this._inputParam.analysisLayer),this.inputLayer&&this._handleLayerChange({analysisLayer:this.inputLayer}),this.own(this._inputParam.on("analysislayer-change",a.hitch(this,this._handleLayerChange))),this.mode||(this.set("mode","add"),this._handleModeChange())},startup:function(){},reset:function(){this._inputParam.spatialFilterByFeatures.reset(),this._removeCards()},_loadConnections:function(){this.own(_(this._addBtn,"click",a.hitch(this,this._handleAddBtnClick)),this.watch("layerVariables",a.hitch(this,this._handleLayerVariablesChange)),this.watch("mode",a.hitch(this,this._handleModeChange)))},_createCard:function(){var e,t,i,a,n={};return i=this._createCardHeader(n),n.hForm=L.getEnclosingWidget(i),a=this._createCardContent(n),n.vForm=L.getEnclosingWidget(a),e=new D({header:i,content:a}),(t=c.create("div",{style:"padding: 1em;"},this._cardContainer)).appendChild(e.domNode),n.card=e,n.cardDiv=t,n},_removeCard:function(e,t){var i;e&&e.card&&(t&&(i=n.indexOf(this.cards,e),this.cards.splice(i,1)),e.card.destroy(),c.destroy(e.cardDiv),e=null)},_removeCards:function(){n.forEach(this.cards,(function(e){this._removeCard(e)}),this),this.cards=[]},_createCardHeader:function(e){var t=new F({},c.create("div",null)),i=new N({trim:!0,required:!0,class:"longTextInput esriLeadingMargin1"}),n=c.create("a",{title:this.i18n.remove,class:"esriLeadingMargin1 esri-icon-minus-circled addVariableAction"});return e.deleteHandle=_(n,"click",a.hitch(this,this._handleRemoveButtonClick,e)),i.startup(),t.domNode.appendChild(i.domNode),t.domNode.appendChild(n),t.domNode},_createCardContent:function(e){var t=new R({inputLayer:this._inputParam.get("analysisLayer"),outFieldName:e.hForm.domNode.elements[1].value,binSize:this.get("binSize"),binSizeUnit:this.get("binSizeUnit"),portalUrl:this.portalUrl,showGeoAnalyticsParams:this.showGeoAnalyticsParams},c.create("div",null));return t.startup(),t.domNode},_validate:function(){return n.every(this.cards,(function(e){return e&&e.hForm.validate()&&e.vForm.validate()}))},validate:function(e){var t,i={msgRow:this._variableWarnMsgRow,msgNode:this._variableBodyNode,errorPane:this._variableErrorPane},a=!0;return this._handleCloseMsg(null,i),e||this.cards&&0!==this.cards.length?(a=this._validate(),t=this.i18n.validationErrorMsg):(a=!1,t=this.i18n.atleastOneVarMsg),a||this._showMessages(t,i),a},_handleLayerChange:function(e){e&&e.analysisLayer&&this.inputLayer!==e.analysisLayer&&(this.inputLayer=e.analysisLayer,this._removeCards())},_handleAddBtnClick:function(){this.validate(!0)&&this.cards.push(this._createCard())},_handleRemoveButtonClick:function(e,t){t.stopPropagation(),t.preventDefault(),this._removeCard(e,!0)},_handleLayerVariablesChange:function(e,t,i){i&&E.isDefined(i.layer)&&i.variables&&(this.reset(),this._inputParam.spatialFilterByFeatures.set("value",i.layer+1),n.forEach(i.variables,(function(e){var t=this._createCard();t.hForm.domNode.elements[1].value=e.outFieldName,t.vForm.set("variable",e),this.cards.push(t)}),this))},_handleModeChange:function(e,t,i){this._inputParam&&this._inputParam.spatialFilterByFeatures&&this._inputParam.spatialFilterByFeatures.set("disabled","edit"===this.mode),"add"===this.mode?this._showMessages(this.i18n.layerChangeWarnMsg):this._handleCloseMsg()},_showMessages:function(e,t){var i=t&&t.msgRow||this._inputWarnMsgRow,n=t&&t.msgNode||this._bodyNode,s=t&&t.errorPane||this._errorMessagePane;h.set(i,"display","table-row"),u.set(n,"innerHTML",e),y.fadeIn({node:s,easing:g.quadIn,onEnd:a.hitch(this,(function(){h.set(s,{display:""})}))}).play()},_handleCloseMsg:function(e,t){var i=t&&t.msgRow||this._inputWarnMsgRow,n=t&&t.errorPane||this._errorMessagePane;e&&e.preventDefault(),h.set(i,"display","none"),y.fadeOut({node:n,easing:g.quadOut,onEnd:a.hitch(this,(function(){h.set(n,{display:"none"})}))}).play()},_getBinSizeAttr:function(){return this.binSize},_setBinSizeAttr:function(e){this._set("binSize",e)},_getBinSizeUnitAttr:function(){return this.binSizeUnit},_setBinSizeUnitAttr:function(e){this._set("binSizeUnit",e)},_setInputLayerAttr:function(e){this._set("inputLayer",e)},_getInputLayerAttr:function(){return this._inputParam&&(this.inputLayer=this._inputParam.get("analysisLayer")),this.inputLayer},_setModeAttr:function(e){this._set("mode",e)},_getLayerVariablesAttr:function(){var e=n.map(this.cards,(function(e){return e.vForm.set("outFieldName",e.hForm.domNode.elements[1].value),e.vForm.get("variable")})),t=-1,i="";return n.forEach(this.inputLayers,(function(e,a){var n=this.get("inputLayer");(e.name&&n.name&&e.name===n.name||e.url&&n.url&&e.url===n.url)&&(t=a,i=e.name)}),this),{layer:t,variables:e,name:i}},_setLayerVariablesAttr:function(e){e&&E.isDefined(e.layer)&&e.variables&&(this._set("layerVariables",e),this._handleLayerVariablesChange("layerVariables",null,e))}});return o("extend-esri")&&a.setObject("dijit.analysis.BuildMultiVariablesList",G,T),G}));