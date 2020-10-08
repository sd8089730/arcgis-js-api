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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/fx/easing","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ToggleButton","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/NumberSpinner","dijit/Dialog","dojox/form/CheckedMultiSelect","../../kernel","../../lang","../../layers/FeatureLayer","./AnalysisBase","./_AnalysisOptions","./utils","./CreditEstimator","./ExpressionForm","../../geometry/Extent","../../geometry/ScreenPoint","../../symbols/CartographicLineSymbol","../../symbols/SimpleMarkerSymbol","../../symbols/SimpleLineSymbol","../../symbols/SimpleFillSymbol","../../tasks/query","dojo/i18n!../../nls/jsapi","dojo/text!./templates/FindSimilarLocations.html"],(function(e,t,s,i,n,a,r,h,l,o,u,c,d,y,p,_,L,m,f,g,b,S,F,x,A,I,C,w,v,O,j,k,R,M,T,E,N,P,D,Q,B,H,G,U,q,J,V,Y,z,W,X,K){var Z=t([m,f,g,b,S,Q,D],{declaredClass:"esri.dijit.analysis.FindSimilarLocations",templateString:K,widgetsInTemplate:!0,i18n:null,returnProcessInfo:!0,toolName:"FindSimilarLocations",helpFileName:"FindSimilarLocations",resultParameter:"similarResultLayer",primaryActionButttonClass:"esriAnalysisSubmitButton",searchLayers:[],analysisFields:[],enableInputSelection:!0,selectionLayer:null,_isAttrFlag:!1,constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),N.isDefined(e.analysisFields)&&"string"==typeof e.analysisFields&&(e.analysisFields=this._stringToArrayFields(e.analysisFields)),N.isDefined(e.appendFields)&&"string"==typeof e.appendFields&&(e.appendFields=this._stringToArrayFields(e.appendFields)),this._expression=null},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects,delete this._mapClickHandle},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,X.findSimilarLocations),s.mixin(this.i18n,X.expressionGrid)},postCreate:function(){this.inherited(arguments),L.add(this._form.domNode,"esriSimpleForm"),c.set(this._attrSelect.selectNode,"width","80%"),this._bigdataUX=[this._matchMethodRowLabel,this._matchMethodRow,this._appendFieldLabelRow,this._appendFieldRow],this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e}),this.selectionLayer&&(this.selectionLayer.clearSelection(),this.map.removeLayer(this.selectionLayer),this.selectionLayer=null),this._mapClickHandle&&delete this._mapClickHandle,this._attrSelect.reset()},clear:function(){this.selectionLayer&&(this.selectionLayer.clearSelection(),this.map.removeLayer(this.selectionLayer),this.selectionLayer=null),this._attrSelect.reset(),this._mapClickHandle&&delete this._mapClickHandle},_buildJobParams:function(){var e,t,s={};return this.showGeoAnalyticsParams?(t=this.constructAnalysisInputLyrObj(this.inputLayer,this.showGeoAnalyticsParams),this.get("inputQuery")&&(t.filter=t.filter?t.filter+" AND "+this.inputQuery:this.inputQuery),s.inputLayer=r.toJson(t),s.searchLayer=r.toJson(this.constructAnalysisInputLyrObj(this.get("searchLayer"),this.showGeoAnalyticsParams)),s.mostOrLeastSimilar=this._mostSimSelect.get("value"),s.numberOfResults=this.get("numberOfResults"),s.analysisFields=this.get("analysisFields").toString(),s.appendFields=this.get("appendFields").toString(),s.matchMethod=this._fieldValueCheck.get("checked")?"AttributeValues":"AttributeProfiles",s.returnProcessInfo=this.returnProcessInfo):(s.inputLayer=r.toJson(this.constructAnalysisInputLyrObj(this.inputLayer)),this.get("inputQuery")&&(s.inputQuery=this.inputQuery),s.searchLayer=r.toJson(this.constructAnalysisInputLyrObj(this.get("searchLayer"))),s.analysisFields=this.get("analysisFields"),s.numberOfResults=this.get("numberOfResults"),s.returnProcessInfo=this.returnProcessInfo),this.inputQuery&&this._expression&&this._expression.expression&&(s.attributeExprObj=r.toJson(this._expression.expression._attributeExprObj)),this.returnFeatureCollection||(s.OutputName=r.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(s.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(e={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.extent=this.map.extent._normalize(!0)),s.context=r.toJson(e)),s},_handleSaveBtnClick:function(){if(this._form.validate()&&this.validate()){this._saveBtn.set("disabled",!0);var e={};e.jobParams=this._buildJobParams(),e.itemParams={description:void 0,tags:u.substitute(this.i18n.itemTags,{analysisLayerName:this.inputLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(e.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&(this.resultParameter="output"),this.execute(e)}},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(s.hitch(this,(function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_save:function(){},_buildUI:function(){var e,t=!0,n=this.inputLayer&&"featureClass"===this.inputLayer.type;this._loadConnections(),this.signInPromise.then(s.hitch(this,B.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(this.inputLayers&&this.inputLayer&&!B.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),B.populateAnalysisLayers(this,"inputLayer","inputLayers")),this.searchLayers&&this.searchLayer&&!B.isLayerInLayers(this.searchLayer,this.searchLayers)&&this.searchLayers.push(this.searchLayer),this.searchLayers&&this.inputLayer&&!B.isLayerInLayers(this.inputLayer,this.searchLayers)&&this.searchLayers.push(this.inputLayer),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),(this.analysisFields&&this.analysisFields.length>0||this.appendFields&&this.appendFields.length>0)&&(t=!1),N.isDefined(this.numberOfResults)&&this.numberOfResults>0&&(this._ranksInput.set("value",this.numberOfResults),this._allRadioBtn.set("checked",!1),this._toprankRadioBtn.set("checked",!0),this._ranksInput.set("disabled",!1)),this.showGeoAnalyticsParams&&(this.inputLayer&&this.inputLayer.filter&&-1!==this.inputLayer.filter.indexOf(" AND ")?(this.set("inputQuery",this.inputLayer.filter.substring(this.inputLayer.filter.indexOf(" AND ")+" AND ".length)),n||this.inputLayer.setDefinitionExpression(this.inputLayer.filter.substring(0,this.inputLayer.filter.indexOf(" AND ")))):this.inputLayer&&this.inputLayer.filter&&-1===this.inputLayer.filter.indexOf(" AND ")&&(this.set("inputQuery",this.inputLayer.filter),n||this.inputLayer.setDefinitionExpression(null)),this.mostOrLeastSimilar&&this._mostSimSelect.set("value",this.mostOrLeastSimilar),this.mathcMethod&&(this._fieldValueCheck.set("checked","AttributeValues"===this.matchMethod),this._fieldProfileCheck.set("checked","AttributeProfiles"===this.matchMethod))),c.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,(function(e){this.folderStore=e,B.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}))),c.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),c.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");var a=[{value:"search",label:this.i18n.selectSearchLayer,selected:!this.searchLayer}];this.searchLayers&&i.forEach(this.searchLayers,(function(e,t){a.push({value:t+1,label:e.name,selected:this.searchLayer&&(e.name===this.searchLayer.name||e.url&&this.searchLayer.url&&e.url===this.searchLayer.url)})}),this),this._candidateSelect.addOption(a),B.addReadyToUseLayerOption(this,[this._analysisSelect,this._candidateSelect]),B.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),this.showGeoAnalyticsParams?(c.set(this._addFieldsSelect.selectNode,"width","80%"),d.set(this._outputLblNum,"innerHTML",this.i18n.eightLabel),d.set(this._topLabel,"innerHTML",this.i18n.theLabel),d.set(this._outputHelp,"esriHelpTopic","outputName"),c.set(this._ranksInput.domNode,"width","22%"),(e=this._ranksInput.get("constraints")).max=1e4,this._ranksInput.set("constraints",e)):(d.set(this._outputLblNum,"innerHTML",this.i18n.sixLabel),c.set(this._mostSimSelect.domNode,"display","none"),c.set(this._mostSimLabel,"display","none"),d.set(this._topLabel,"innerHTML",this.i18n.justShowTop)),this._selectBtn.set("disabled",!this.enableInputSelection||!this.inputLayers||0===this.inputLayers.length),this._queryBtn.set("disabled",!this.enableInputSelection||!this.inputLayers||0===this.inputLayers.length),this.inputLayer&&this._updateAnalysisLayerUI(t),this._expressionForm.on("add-expression",s.hitch(this,this._handleExpressionFormAdd)),this._expressionForm.on("cancel-expression",s.hitch(this,this._handleExpressionFormCancel))},_updateAnalysisLayerUI:function(e){if(this.inputLayer){d.set(this._toolDescription,"innerHTML",u.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name}));var t,s,n=this._candidateSelect.getOptions();this._isAnalysisSelect&&(i.some(n,(function(e,t){return e.label===this.inputLayer.title}),this)||(t=n.splice(n.length-2,2),i.some(this.searchLayers,(function(e){return e&&e.analysisReady&&this.inputLayer.analysisReady&&e.itemId===this.inputLayer.itemId}),this)||this.searchLayers.push(this.inputLayer),t.unshift({value:this.searchLayers.length,label:this.inputLayer.title}),this._candidateSelect.addOption(t))),(s="featureClass"===this.inputLayer.type||"table"===this.inputLayer.type)||this.set("selectionLayer"),s&&!e&&this.inputQuery&&(this._isAttrFlag=!0,d.set(this._filterLabel,"innerHTML",u.trim(this.inputQuery)),this._expression={action:"edit",expression:{layer:0,where:this.inputQuery,_attributeText:this.inputQuery,_attributeExprObj:this.attributeExprObj}}),this._selectBtn.set("disabled",s),this._queryBtn.set("disabled",!(this.enableInputSelection&&N.isDefined(this.inputLayer))),this._expressionForm.set("showUnique",!s),e&&(this.set("analysisFields"),this.set("appendFields")),e&&(this.outputLayerName=u.substitute(this.i18n.outputLayerName,{analysisLayerName:this.inputLayer.name})),this._outputLayerInput.set("value",this.outputLayerName),this._expressionForm.set("showFirstRow",!1),this._expressionForm.set("firstOperands",[this.inputLayer]),this._expressionForm.set("inputOperands",[this.inputLayer]),this._expressionForm.set("selectedFirstOperand",this.inputLayer),this._expressionForm.init()}},_handleAnalysisLayerChange:function(e){this._isAnalysisSelect=!0,"browse"===e||"browselayers"===e?this._createBrowseItems({browseValue:e},{layerTypes:[]},this._analysisSelect):(this.inputLayer=this.inputLayers[e],this.inputQuery&&(this.clear(),this.set("inputQuery",null),this._expression=null,d.set(this._filterLabel,"innerHTML","")),this._updateAnalysisLayerUI(!0))},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&B.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.inputLayers:this.searchLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._candidateSelect,posIncrement:this._isAnalysisSelect?0:1,browseDialog:e.dialog||this._browsedlg,widget:this},t).always(s.hitch(this,(function(){this._isAnalysisSelect&&(this._handleAnalysisLayerChange(this._analysisSelect.get("value")),this._isAnalysisSelect=!1)})))},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setSearchLayersAttr:function(e){this.searchLayers=e},_getSearchLayersAttr:function(){return this.searchLayers},_setSearchLayerAttr:function(e){this.searchLayer=e},_getSearchLayerAttr:function(){if(this._candidateSelect&&this._candidateSelect.getOptions().length>0){var e=this._candidateSelect.get("value");this._candidateSelect&&"search"!==e?this.searchLayer=this.searchLayers[this._candidateSelect.get("value")-1]:"search"!==e&&"browse"!==e||(this.searchLayer=null)}return this.searchLayer},_setInputLayerAttr:function(e){this.inputLayer=e},_getInputLayerAttr:function(){return this.inputLayer},_setInputLayersAttr:function(e){this.inputLayers=e},_setEnableInputSelectionAttr:function(e){this.enableInputSelection=e},_getEnableInputSelectionAttr:function(){return this.enableInputSelection},_setAnalysisFieldsAttr:function(e){var t,s;this.get("inputLayer")&&this.get("searchLayer")&&0!==this.inputLayer.fields.length&&0!==this.searchLayer.fields.length&&(s=this.inputLayer.fields,t=i.map(this.searchLayer.fields,(function(e){return e.name})),s=i.filter(s,(function(e){if(-1!==i.indexOf(t,e.name)&&-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)&&(e.name!==this.inputLayer.objectIdField||e.name!==this.searchLayer.objectIdField))return!0}),this),s=i.map(s,(function(t){return{value:t.name,label:N.isDefined(t.alias)&&""!==t.alias?t.alias:t.name,selected:!(!e||!e.length||-1===i.indexOf(e,t.name))}})),this._attrSelect&&(this._attrSelect.removeOption(this._attrSelect.get("options")),this._attrSelect.addOption(s)),this.analysisFields=s)},_getAnalysisFieldsAttr:function(){return this._attrSelect&&(this.analysisFields=this._attrSelect.get("value")),this.analysisFields},_setAppendFieldsAttr:function(e){var t;this.get("searchLayer")&&0!==this.searchLayer.fields.length&&(t=this.searchLayer.fields,t=i.map(t,(function(t){return{value:t.name,label:N.isDefined(t.alias)&&""!==t.alias?t.alias:t.name,selected:!(!e||!e.length||-1===i.indexOf(e,t.name))}})),this._addFieldsSelect&&(this._addFieldsSelect.removeOption(this._addFieldsSelect.get("options")),this._addFieldsSelect.addOption(t)),this.appendFields=t)},_getAppendFieldsAttr:function(){return this._addFieldsSelect&&(this.appendFields=this._addFieldsSelect.get("value")),this.appendFields},_setInputQueryAttr:function(e){this.inputQuery=e},_getInputQueryAttr:function(){return this.inputQuery},_setNumberOfResultsAttr:function(e){this.numberOfResults=e},_getNumberOfResultsAttr:function(){return this.numberOfResults},_getInputQueryObjAttr:function(){var e=null;return this.get("InputQuery")&&((e={}).operator="",e.layer=0,e.where=this.inputQuery),this.inputQueryObj=e,this.inputQueryObj},_setSelectionLayerAttr:function(){this.get("inputLayer")&&(this.selectionLayer=new P(this.inputLayer.url&&!this.inputLayer._collection?this.inputLayer.url:this.inputLayer.toJson(),{outFields:["*"],mode:this.inputLayer.url&&!this.inputLayer._collection?P.MODE_SELECTION:P.MODE_SNAPSHOT}),this.selectionLayer.setRenderer(null),this.selectionLayer.on("selection-complete",s.hitch(this,this._handleInputLayerSelectionComplete)),this.selectionLayer.loaded?this._onSelectionLayerLoad(this.inputLayer,this.selectionLayer):this.selectionLayer.on("load",s.hitch(this,this._onSelectionLayerLoad,this.inputLayer,this.selectionLayer)))},_onSelectionLayerLoad:function(e,t){var a,r;if(t.setScaleRange(e.minScale,e.maxScale),this._connect(e,"onScaleRangeChange",s.hitch(this,(function(e,t){e.setScaleRange(t.minScale,t.maxScale)}),t,e)),this.map.addLayer(t),"esriGeometryPoint"===t.geometryType||"esriGeometryMultPoint"===t.geometryType?((a=new V).setStyle(V.STYLE_TARGET),a._setDim(16,16,0),a.setOutline(new J(Y.STYLE_SOLID,new n([0,255,255]),2,J.CAP_ROUND,J.JOIN_ROUND)),a.setColor(new n([0,0,0,0])),t.setSelectionSymbol(a)):"esriGeometryPolyline"===t.geometryType?t.setSelectionSymbol(new Y(Y.STYLE_SOLID,new n([0,255,255]),2)):"esriGeometryPolygon"===t.geometryType&&t.setSelectionSymbol(new z(z.STYLE_NULL,new Y(Y.STYLE_SOLID,new n([0,255,255]),2),new n([0,0,0,0]))),this.selectionLayer&&this.inputQuery){this.inputQuery.match(/ OR /g)?this._isAttrFlag=!1:(this._isAttrFlag=!0,d.set(this._filterLabel,"innerHTML",u.trim(this.inputQuery)),this._expression={action:"edit",expression:{layer:0,where:this.inputQuery,_attributeText:this.inputQuery,_attributeExprObj:this.attributeExprObj}});var h=new W;h.returnGeometry=!0,this._isAttrFlag?h.where=this.inputQuery:(r=this.inputQuery.split(" OR "),r=i.map(r,(function(e){return e.split(" = ")[1]})),h.objectIds=r),this.selectionLayer.selectFeatures(h,P.SELECTION_ADD)}},validateServiceName:function(e){return B.validateServiceName(e,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})},_setPrimaryActionButttonClassAttr:function(e){this.primaryActionButttonClass=e},_getPrimaryActionButttonClassAttr:function(){return this.primaryActionButttonClass},_connect:function(e,t,s){this._pbConnects.push(a.connect(e,t,s))},validate:function(){var e=!0;return!this.showGeoAnalyticsParams&&this.get("searchLayer")&&this.get("inputLayer")&&this.get("inputLayer").id===this.get("searchLayer").id&&!this.get("inputQuery")?(this._showMessages(this.i18n.reqSelectionMsg),this.set("disableRunAnalysis",!0),e=!1):this.get("searchLayer")&&0===this._attrSelect.getOptions().length?(this._showMessages(this.i18n.noFieldMatchMsg),this.set("disableRunAnalysis",!0),e=!1):this.showGeoAnalyticsParams&&this._fieldProfileCheck.get("checked")&&this.get("analysisFields").length<2?(this._showMessages(this.i18n.fieldProfilesValidCheck),this.set("disableRunAnalysis",!0),e=!1):(this._handleCloseMsg(),this.set("disableRunAnalysis",!1)),e},_handleCandidateChange:function(e){this._isAnalysisSelect=!1,"browse"===e||"browselayers"===e?this._createBrowseItems({browseValue:e},{},this._candidateSelect):"search"===e?(this._attrSelect&&this._attrSelect.removeOption(this._attrSelect.get("options")),this.analysisFields=[]):(this.set("analysisFields"),this.set("appendFields"),this.validate())},_handleQueryButtonClick:function(){this._expDialog.set("title",this.i18n.query),this._selectBtn.set("checked",!1),this._isAttrFlag=!0;var e=this.inputLayer&&("featureClass"===this.inputLayer.type||"table"===this.inputLayer.type);this._expressionForm.set("showUnique",!e),this._expression?(this._expressionForm.set("action","edit"),this._expressionForm.set("expression",this._expression.expression)):this._expressionForm.set("action","add"),this._expDialog.show()},_handleExpressionFormAdd:function(e){var t;(this.selectionLayer&&this.selectionLayer.clearSelection(),"add"===e.action||"edit"===e.action)&&(d.set(this._filterLabel,"innerHTML",u.trim(e.expression._attributeText)),this._expression=e,(t=new W).returnGeometry=!0,t.where=e.expression.where,this.selectionLayer&&this.selectionLayer.selectFeatures(t,P.SELECTION_ADD));this._expDialog.hide(),this.set("inputQuery",e.expression.where),this.validate()},_handleExpressionFormCancel:function(){this._expDialog.hide()},_handleTopRankRadioChange:function(e){this._ranksInput.set("disabled",!e),e&&this.set("numberOfResults",this._ranksInput.get("value"))},_handleAllRankRadioChange:function(e){e&&this.set("numberOfResults",0)},_handleTopRankInputChange:function(e){this.set("numberOfResults",e)},_handleSelectionButtonClick:function(e){e&&!this._mapClickHandle?(this._mapClickHandle=this.map.on("click",s.hitch(this,this._handleMapClick)),this.emit("selecttool-activate",{}),this._isAttrFlag=!1):(this._mapClickHandle.remove(),this._mapClickHandle=null,this.emit("selecttool-deactivate",{}))},_handleMapClick:function(e){var t,n,a,r,h,l,o,u;!this._isAttrFlag&&this._expression&&this.selectionLayer.clearSelection(),n=6,(o=this.inputLayer.renderer)&&"esri.renderer.SimpleRenderer"===o.declaredClass?((u=o.symbol).xoffset&&(n=Math.max(n,Math.abs(u.xoffset))),u.yoffset&&(n=Math.max(n,Math.abs(u.yoffset)))):!o||"esri.renderer.UniqueValueRenderer"!==o.declaredClass&&"esri.renderer.ClassBreaksRenderer"!==o.declaredClass||i.forEach(o.infos,(function(e){(u=e.symbol).xoffset&&(n=Math.max(n,Math.abs(u.xoffset))),u.yoffset&&(n=Math.max(n,Math.abs(u.yoffset)))})),t=e.screenPoint,a=this.map.toMap(new q(t.x-n,t.y+n)),r=this.map.toMap(new q(t.x+n,t.y-n)),h=new U(a.x,a.y,r.x,r.y,this.map.spatialReference),(l=new W).returnGeometry=!0,l.geometry=h,l.where=this.inputLayer.getDefinitionExpression(),this.inputLayer.queryFeatures(l).then(s.hitch(this,(function(e){var t,s,n,a;e&&(a=[],t=[],this.selectionLayer&&this.selectionLayer.getSelectedFeatures().length>0&&(n=i.map(this.selectionLayer.getSelectedFeatures(),(function(e){return e.attributes[this.selectionLayer.objectIdField]}),this)),i.forEach(e.features,(function(e){n?n&&-1===i.indexOf(n,e.attributes[this.selectionLayer.objectIdField])?t.push(e.attributes[this.selectionLayer.objectIdField]):a.push(e.attributes[this.selectionLayer.objectIdField]):t.push(e.attributes[this.selectionLayer.objectIdField])}),this),t.length>0&&((s=new W).returnGeometry=!0,s.objectIds=t,this.selectionLayer.selectFeatures(s,P.SELECTION_ADD)),a.length>0&&((s=new W).returnGeometry=!0,s.objectIds=a,this.selectionLayer.selectFeatures(s,P.SELECTION_SUBTRACT)))})))},_handleProfileCheckChange:function(e){this.validate()},_handleAnalysisFieldsChange:function(e){e&&this.validate()},_showMessages:function(e){d.set(this._bodyNode,"innerHTML",e),h.fadeIn({node:this._errorMessagePane,easing:_.quadIn,onEnd:s.hitch(this,(function(){c.set(this._errorMessagePane,{display:""})}))}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),h.fadeOut({node:this._errorMessagePane,easing:_.quadOut,onEnd:s.hitch(this,(function(){c.set(this._errorMessagePane,{display:"none"})}))}).play()},_handleInputLayerSelectionComplete:function(e){var t,s=this.selectionLayer.getSelectedFeatures();!this._isAttrFlag&&s.length>0&&(t="",i.map(s,(function(e){return t+=this.selectionLayer.objectIdField+" = "+e.attributes[this.selectionLayer.objectIdField]+" OR ",e.attributes[this.selectionLayer.objectIdField]}),this),t=t.substring(0,t.lastIndexOf(" OR ")),d.set(this._filterLabel,"innerHTML",u.substitute(this.i18n.selectedFeaturesLabel,{total:s.length})),this.set("inputQuery",t),this._expression=null,this.validate()),this._isAttrFlag||0!==s.length||(d.set(this._filterLabel,"innerHTML",""),this.set("inputQuery",null),this._expression=null,this.validate())},_stringToArrayFields:function(e){var t=[];return"string"==typeof e&&""!==e.trim()&&(t=e.split(",")),t}});return l("extend-esri")&&s.setObject("dijit.analysis.FindSimilarLocations",Z,E),Z}));