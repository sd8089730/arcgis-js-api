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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/NodeList","dojo/NodeList-dom","dojo/_base/fx","dojo/fx/easing","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ToggleButton","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","dijit/form/NumberTextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","../../symbols/SimpleFillSymbol","../../symbols/SimpleLineSymbol","../../toolbars/draw","../PopupTemplate","../../layers/FeatureLayer","../../graphic","./utils","./AnalysisRegistry","./CreditEstimator","dojo/i18n!../../nls/jsapi","dojo/text!./templates/FindHotSpots.html"],(function(e,t,i,s,a,n,o,l,h,r,d,y,u,g,c,_,p,m,b,L,v,S,f,w,P,A,F,T,I,R,D,C,B,x,G,N,O,j,U,M,z,E,k,H,J,q,W,Z,V,X,Y,K,Q){var $=t([L,v,S,f,w,E,z],{declaredClass:"esri.dijit.analysis.FindHotSpots",templateString:Q,widgetsInTemplate:!0,analysisLayer:null,analysisField:null,aggregationPolygonLayer:null,boundingPolygonLayer:null,outputLayerName:null,returnProcessInfo:!0,i18n:null,map:null,toolName:"FindHotSpots",helpFileName:"FindHotSpots",resultParameter:"HotSpotsResultLayer",analysisFieldsToFilter:["GiZScore","GiPValue","Gi_Bin","NNeighbors"],constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),e.showGeoAnalyticsParams&&e.rerun&&(e.analysisLayer=e.pointLayer)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,K.calculateDensityTool),i.mixin(this.i18n,K.findHotSpotsTool),this.set("drawLayerName",this.i18n.blayerName)},postCreate:function(){this.inherited(arguments),c.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._bigdataUX=[this._timeAlignRow,this._timeAlignLabelRow,this._timeStepsLabelRow,this._intervalLabelRow,this._intervalRow,this._repeatLabelRow,this._repeatRow,this._timeRefRow,this._timeRefLabelRow,this._neighborHoodLblRow,this._neighborHoodRow,this._timeStepLabelNo,this._selectDataStore,this._datastoreLabelRow,this._chooseBinSizeLblRow,this._binsTypeRow],this._standardUX=[this._divideByLabelRow,this._divideByRow,this._fieldsLabelRow,this._fieldsSelectRow,this._overideOptionsRow],this.showGeoAnalyticsParams&&(this._timeIntervalInput.set("isInRange",i.hitch(this._timeIntervalInput,V.isGreaterThanZero)),this._timeRepeatInput.set("isInRange",i.hitch(this._timeRepeatInput,V.isGreaterThanZero)),this._binsInput.set("isInRange",i.hitch(this._binsInput,V.isGreaterThanZero)),this._timeIntervalInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._timeRepeatInput.set("rangeMessage",this.i18n.greaterThanZeroMsg),this._neigSizeInput.set("rangeMessage",this.i18n.greaterThanZeroMsg)),this._binsInput.set("required",this.showGeoAnalyticsParams),this._neigSizeInput.set("required",this.showGeoAnalyticsParams),this.filterObjects=[{layer:"pointLayer",layers:this.analysisLayers,select:this._analysisSelect,expressionObj:"attributeExprObj"}],this._buildUI()},startup:function(){},_handleModeCrumbClick:function(e){e.preventDefault(),this._onClose(!0)},_onClose:function(e){e&&this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,(function(e,t){if(e===this._featureLayer)return this._boundingAreaSelect.removeOption({value:t+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(t,1)}),this)),this.showGeoAnalyticsParams&&(this._hasPCSWarnShown=!1),this._handleBoundingBtnClick(!1),this.emit("close",{save:!e})},clear:function(){this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,(function(e,t){if(e===this._featureLayer)return this._boundingAreaSelect.removeOption({value:t+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(t,1)}),this),this._featureLayer=null),this._boundingDrawBtn.reset(),this._handleBoundingBtnClick(!1)},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(i.hitch(this,(function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_handleSaveBtnClick:function(e){var t,i,s={};t=this._buildJobParams(),this._form.validate()&&(i=V.unitConversion(this._binsInput.get("value"),V.UNITSMAP[this._binUnits.get("value")],V.UNITSMAP[this._neigSizeInputUnits.get("value")]),this.showGeoAnalyticsParams&&i>=this._neigSizeInput.get("value")?this._showMessages(this.i18n.smallBinErrorMsg):!this.showGeoAnalyticsParams&&t.cellSize&&V.unitConversion(t.cellSize,V.UNITSMAP[t.cellSizeUnits],V.UNITSMAP[t.distanceBandUnits])>=t.distanceBand?this._showMessages(this.i18n.AO_192):(this._saveBtn.set("disabled",!0),s.jobParams=t,s.itemParams={description:this.i18n.itemDescription,tags:r.substitute(this.i18n.itemTags,{layername:this.analysisLayer.name,fieldname:M.isDefined(t.analysisField)?t.analysisField:""}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(s.itemParams.folder=this.get("folderId")),!this.showGeoAnalyticsParams||(this.resultParameter="output",V.checkPCSforAnalysis({widget:this,jobParams:t,hasPCSWarnShown:this._hasPCSWarnShown})||this._hasPCSWarnShown)?(this.showGeoAnalyticsParams&&(s.isSpatioTemporalDataStore=!0),this.execute(s)):this._hasPCSWarnShown=!0))},_buildJobParams:function(){var e,t,i,s={};return this.showGeoAnalyticsParams?(s.pointLayer=o.toJson(this.constructAnalysisInputLyrObj(this.analysisLayer,this.showGeoAnalyticsParams)),s.binSize=this._binsInput.get("value"),s.binSizeUnit=this._binUnits.get("value"),s.neighborhoodDistance=this._neigSizeInput.get("value"),s.neighborhoodDistanceUnit=this._neigSizeInputUnits.get("value"),this._isTimeInstantLayer&&(s.timeStepAlignment=this._timeAlignmentSelect.get("value"),"ReferenceTime"===s.timeStepAlignment&&(s.timeStepReference=this.get("timeReference")),this._timeIntervalInput.get("value")&&(s.timeStepInterval=this._timeIntervalInput.get("value"),s.timeStepIntervalUnit=this._timeIntervalUnits.get("value")))):(s.analysisLayer=o.toJson(this.constructAnalysisInputLyrObj(this.analysisLayer)),"0"!==this.get("analysisField")&&(s.analysisField=this.get("analysisField")),this._isPoint&&"0"===this._analysFieldSelect.get("value")&&("-1"!==this._boundingAreaSelect.get("value")&&(e=this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1],s.boundingPolygonLayer=o.toJson(this.constructAnalysisInputLyrObj(e))),"fishnet"!==this._aggAreaSelect.get("value")&&"hexagon"!==this._aggAreaSelect.get("value")?(t=this.aggregationPolygonLayers[this._aggAreaSelect.get("value")-1],s.aggregationPolygonLayer=o.toJson(this.constructAnalysisInputLyrObj(t))):"fishnet"!==this._aggAreaSelect.get("value")&&"hexagon"!==this._aggAreaSelect.get("value")||(s.shapeType=this._aggAreaSelect.get("value"))),"0"!==this.get("dividedByField")&&(s.dividedByField=this.get("dividedByField")),s.returnProcessInfo=this.returnProcessInfo,"none"===d.get(this._cellSizeRow,"display")||isNaN(this._cellSizeInput.get("value"))||(s.cellSize=this._cellSizeInput.get("value"),s.cellSizeUnits=this._cellSizeUnits.get("value")),isNaN(this._dbandInput.get("value"))||(s.distanceBand=this._dbandInput.get("value"),s.distanceBandUnits=this._dbandUnits.get("value"))),this.returnFeatureCollection||(s.OutputName=o.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&!this.get("DisableExtent")&&this._useExtentCheck.get("checked")&&(s.context=o.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(i={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.extent=this.map.extent._normalize(!0)),s.context=o.toJson(i)),this.showGeoAnalyticsParams&&(i={},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.extent=this.map.extent._normalize(!0)),s.context=o.toJson(i)),this._updateJobFilterAndSelection(s)},_save:function(){},_buildUI:function(){var e=!0;V.updateDisplay(this._standardUX,!this.get("showGeoAnalyticsParams"),"table-row"),V.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),V.updateDisplay([this._repeatLabelRow,this._repeatRow],!1,"table-row"),V.updateDisplay([this._datastoreLabelRow,this._selectDataStore],!1,"table-row"),this._loadConnections(),this.signInPromise.then(i.hitch(this,V.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(this.analysisLayers&&this.analysisLayer&&!V.isLayerInLayers(this.analysisLayer,this.analysisLayers)&&this.analysisLayers.push(this.analysisLayer),this.get("allowChooseLabel")||this.get("analysisLayer")||!this.get("analysisLayers")||this.rerun||this.set("analysisLayer",this.analysisLayers[0]),V.populateAnalysisLayers(this,"analysisLayer","analysisLayers",{chooseLabel:this.get("allowChooseLabel")})),this.aggregationPolygonLayer&&this.aggregationPolygonLayers&&!V.isLayerInLayers(this.aggregationPolygonLayer,this.aggregationPolygonLayers)&&this.aggregationPolygonLayers.push(this.aggregationPolygonLayer),this.boundingPolygonLayer&&this.boundingPolygonLayers&&!V.isLayerInLayers(this.boundingPolygonLayer,this.boundingPolygonLayers)&&this.boundingPolygonLayers.push(this.boundingPolygonLayer),this.showGeoAnalyticsParams?(y.set(this._binLblNum,"innerHTML",this.i18n.twoLabel),y.set(this._neLblNum,"innerHTML",this.i18n.threeLabel),y.set(this._timeStepLabelNo,"innerHTML",this.i18n.fourLabel),y.set(this._outputNumLabel,"innerHTML",this.i18n.fiveLabel),y.set(this._outputHelpNode,"esriHelpTopic","outputName"),this.distanceDefaultUnits&&(this._binUnits.set("value",this.distanceDefaultUnits),this._neigSizeInputUnits.set("value",this.distanceDefaultUnits)),this.binSize&&this._binsInput.set("value",this.binSize),this.binSizeUnit&&this._binUnits.set("value",this.binSizeUnit),this.neighborhoodDistance&&this._neigSizeInput.set("value",this.neighborhoodDistance),this.neighborhoodDistanceUnit&&this._neigSizeInputUnits.set("value",this.neighborhoodDistanceUnit),this.timeStepInterval&&(this._timeIntervalInput.set("value",this.timeStepInterval),this._timeIntervalUnits.set("value",this.timeStepIntervalUnit)),this.timeStepAlignment&&this._timeAlignmentSelect.set("value",this.timeStepAlignment),this._handleTimeAlignmentChange(this._timeAlignmentSelect.get("value")),this._updateTimeUX()):y.set(this._outputNumLabel,"innerHTML",this.i18n.fourLabel),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1);var t=[{value:"-1",label:this.i18n.defaultBoundingOption,selected:!this.boundingPolygonLayer}];this.boundingPolygonLayers&&(s.forEach(this.boundingPolygonLayers,(function(e,i){e.geometryType===X.GeometryTypes.Polygon&&t.push({value:i+1,label:e.name,selected:!!this.boundingPolygonLayer&&(this.boundingPolygonLayer.url===e.url||e.name===this.boundingPolygonLayer.name)})}),this),this._boundingAreaSelect.addOption(t));var a=[{value:"fishnet",label:this.i18n.defaultAggregationOption,selected:!this.shapeType&&!this.aggregationPolygonLayer||"fishnet"===this.shapeType},{value:"hexagon",label:this.i18n.hexagonGrid,selected:this.shapeType&&"hexagon"===this.shapeType}];this.aggregationPolygonLayers&&s.forEach(this.aggregationPolygonLayers,(function(e,t){e.geometryType===X.GeometryTypes.Polygon&&a.push({value:t+1,label:e.name,selected:!!this.aggregationPolygonLayer&&(this.aggregationPolygonLayer.url===e.url||e.name===this.aggregationPolygonLayer.name)})}),this),this._aggAreaSelect.addOption(a),this.aggregationPolygonLayer&&this._handleAggAreaSelectChange(this._aggAreaSelect.get("value")),V.addReadyToUseLayerOption(this,[this._analysisSelect]),this.distanceBand&&this._dbandInput.set("value",this.distanceBand),this.distanceBandUnits&&this._dbandUnits.set("value",this.distanceBandUnits),this.cellSize&&this._cellSizeInput.set("value",this.cellSize),this.cellSizeUnits&&this._cellSizeUnits.set("value",this.cellSizeUnits),(this.cellSize||this.distanceBand)&&this._handleOptionsBtnClick(),(this.dividedByField||this.shapeType)&&(e=!1),this._updateAnalysisLayerUI(e),d.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,(function(e){this.folderStore=e,V.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}))),d.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),d.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._createFilterAndSelections()},_updateAnalysisLayerUI:function(e){if(this.analysisLayer){this.analysisLayer.geometryType===X.GeometryTypes.Polygon?(this._isPoint=!1,y.set(this._hotspotsToolDescription,"innerHTML",r.substitute(this.i18n.hotspotsPolyDefine,{layername:this.analysisLayer.name})),d.set(this._optionsRow,"display","none")):this.analysisLayer.geometryType!==X.GeometryTypes.Point&&this.analysisLayer.geometryType!==X.GeometryTypes.MultiPoint||(this._isPoint=!0,y.set(this._hotspotsToolDescription,"innerHTML",r.substitute(this.i18n.hotspotsPointDefine,{layername:this.analysisLayer.name})),c.add(this._analysFieldSelect.domNode,"esriLeadingMargin1"),d.set(this._optionsRow,"display",this.showGeoAnalyticsParams?"none":""),e&&(this.outputLayerName=r.substitute(this.i18n.outputLayerName,{layername:this.analysisLayer.name}))),this._updateTimeUX();var t="fishnet"!==this._aggAreaSelect.get("value")&&"hexagon"!==this._aggAreaSelect.get("value");V.updateDisplay([this._cellSizeLabelRow,this._cellSizeRow],"none"!==d.get(this._optionsRow,"display")&&("hexagon"===this._aggAreaSelect.get("value")||"fishnet"===this._aggAreaSelect.get("value"))||!t&&"0"===this.analysisField&&this.analysisLayer&&this.analysisLayer.geometryType!==X.GeometryTypes.Polygon,"table-row")}else d.set(this._optionsRow,"display","none"),d.set(this._optionsRow,"display","none"),e&&(this.outputLayerName=r.substitute(this.i18n.outputLayerName,{layername:""})),this._isPoint=!1;this.set("analysisFields",this.analysisLayer),e||this.analysisField&&this._analysFieldSelect.set("value",this.analysisField),this.set("dividedByFields",this._isPoint?null:this.analysisLayer),this.analysisLayer&&this.analysisLayer.geometryType===X.GeometryTypes.Polygon&&e&&(this.outputLayerName=r.substitute(this.i18n.outputLayerName,{layername:M.isDefined(this._analysFieldSelect.getOptions(0))?this._analysFieldSelect.getOptions(0).label:""})),this._outputLayerInput.set("value",this.outputLayerName)},_updateTimeUX:function(){if(this.showGeoAnalyticsParams){this._isTimeInstantLayer=!!this.analysisLayer&&V.isTimeInstantLayer(this.analysisLayer);var e=new _([this._timeAlignRow,this._timeAlignLabelRow,this._timeStepsLabelRow,this._intervalLabelRow,this._intervalRow,this._repeatLabelRow,this._repeatRow,this._timeRefRow,this._timeRefLabelRow,this._timeStepLabelNo]),t=[this._timeAlignmentSelect,this._timeIntervalInput,this._timeIntervalUnits,this._timeRepeatInput,this._timeRepeatUnits,this._timeRefDay,this._timeRefTime];s.forEach(t,(function(e){e.set("disabled",!this._isTimeInstantLayer)}),this),e.toggleClass("esriAnalysisTextDisabled",!this._isTimeInstantLayer)}},_handleTimeAlignmentChange:function(e){V.updateDisplay([this._timeRefLabelRow,this._timeRefRow],"ReferenceTime"===e,"table-row")},_handleAnalysisLayerChange:function(e){this._selectedwidget=0,"browse"===e||"browselayers"===e?this.showGeoAnalyticsParams?this._createBrowseItems({browseValue:e,disabledSubResources:[this.analysisLayer]},{tags:["point"],geometryTypes:[X.GeometryTypes.Point]},this._analysisSelect):this._createBrowseItems({browseValue:e,disabledSubResources:[this.analysisLayer]},{tags:["point","polygon"],geometryTypes:[X.GeometryTypes.Point,X.GeometryTypes.MultiPoint,X.GeometryTypes.Polygon]},this._analysisSelect):(-1!==e?(this.get("allowChooseLabel")&&(e-=1),this.analysisLayer=this.analysisLayers[e]):this.analysisLayer=null,this._updateAnalysisLayerUI(!0))},_handleFieldChange:function(e){"0"===this._analysFieldSelect.get("value")?(this._outputLayerInput.set("value",r.substitute(this.i18n.outputLayerName,{layername:this.analysisLayer.name})),this._isPoint&&(d.set(this._optionsRow,"display",this.showGeoAnalyticsParams?"none":""),c.remove(this._optionsDiv,"disabled"),c.remove(this._optionsDiv,"optionsClose"),c.add(this._optionsDiv,"optionsOpen"))):(this._outputLayerInput.set("value",r.substitute(this.i18n.outputLayerName,{layername:this._analysFieldSelect.getOptions(e).label})),this._isPoint&&(c.add(this._optionsDiv,"disabled"),d.set(this._optionsRow,"display","none"),this._boundingAreaSelect.set("value","-1"),this.clear(),c.contains(this._optionsDiv,"optionsOpen")&&(c.remove(this._optionsDiv,"optionsOpen"),c.add(this._optionsDiv,"optionsClose")))),this.set("analysisField",this._analysFieldSelect.get("value"));var t="fishnet"!==this._aggAreaSelect.get("value")&&"hexagon"!==this._aggAreaSelect.get("value"),i=null;"0"!==this._analysFieldSelect.get("value")?i=this.analysisLayer:t&&this._isPoint&&this._aggAreaSelect.set("value","fishnet"),this.set("dividedByFields",i),V.updateDisplay([this._cellSizeLabelRow,this._cellSizeRow],this._isPoint&&"0"===e,"table-row")},_handleDividedByFieldChange:function(e){},_handleBoundingSelectChange:function(e){this._selectedwidget=2,"browse"===e||"browselayers"===e?this._createBrowseItems({browseValue:e,disabledSubResources:[this.analysisLayer]},{tags:["polygon"],geometryTypes:[X.GeometryTypes.Polygon]},this._boundingAreaSelect):"-1"!==e?this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1].id!==this.drawLayerName&&this.clear():this.clear(),this._boundingDrawBtn.reset()},_handleAggAreaSelectChange:function(e){var t="fishnet"!==e&&"hexagon"!==e;V.updateDisplay([this._cellSizeLabelRow,this._cellSizeRow],"hexagon"===e||"fishnet"===e||!t&&"0"===this.analysisField,"table-row"),this._selectedwidget=1,"browse"===e||"browselayers"===e?this._createBrowseItems({browseValue:e,disabledSubResources:[this.analysisLayer]},{tags:["polygon"],geometryTypes:[X.GeometryTypes.Polygon]},this._aggAreaSelect):(this._boundingAreaSelect.set("disabled",t),c.toggle(this._boundingAreaSelect.domNode,"esriAnalysisTextDisabled",t),this._boundingDrawBtn.set("disabled",t),t?(this.clear(),d.set(this._boundingAreaLabelRow,"display","none"),d.set(this._boundingAreaSelectRow,"display","none"),this._boundingAreaSelect.set("value","-1")):(d.set(this._boundingAreaLabelRow,"display",""),d.set(this._boundingAreaSelectRow,"display","")),c.toggle(this._boundingDrawBtn.domNode,"esriAnalysisTextDisabled",t),this.set("dividedByFields",t?this.aggregationPolygonLayers[this._aggAreaSelect.get("value")-1]:null))},_handleBoundingBtnClick:function(e){e?(this.emit("drawtool-activate",{}),this._featureLayer||this._createBoundingPolyFeatColl(),this._toolbar.activate(J.POLYGON)):(this._toolbar.deactivate(),this.emit("drawtool-deactivate",{}))},_handleBrowseItemsSelect:function(e,t){var s={};e&&e.selection&&M.isDefined(this._selectedwidget)&&(0===this._selectedwidget?(s.layers=this.analysisLayers,s.layersSelect=this._analysisSelect):1===this._selectedwidget?(s.layers=this.aggregationPolygonLayers,s.layersSelect=this._aggAreaSelect,s.posIncrement=2):2===this._selectedwidget&&(s.layers=this.boundingPolygonLayers,s.layersSelect=this._boundingAreaSelect),s.item=e.selection,s.browseDialog=e.dialog||this._browsedlg,s.widget=this,V.addAnalysisReadyLayer(s,t).always(i.hitch(this,this._updateAnalysisLayerUI,!0)))},_handleRefTimeChange:function(e){this._timeRefDay.set("required",e&&!this._timeRefDay.get("value"))},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!1)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!0))},_createBoundingPolyFeatColl:function(){var e=V.createPolygonFeatureCollection(this.drawLayerName);this._featureLayer=new W(e,{id:this.drawLayerName}),this.map.addLayer(this._featureLayer),a.connect(this._featureLayer,"onClick",i.hitch(this,(function(e){this.map.infoWindow.setFeatures([e.graphic])})))},_addFeatures:function(e){var t=[],i={},a=new Z(e);if(i.description="blayer desc",i.title="blayer",a.setAttributes(i),t.push(a),this._featureLayer.applyEdits(t,null,null),0===this.boundingPolygonLayers.length||this.boundingPolygonLayers[this.boundingPolygonLayers.length-1]!==this._featureLayer){var n=this.boundingPolygonLayers.push(this._featureLayer),o=this._boundingAreaSelect.getOptions();this._boundingAreaSelect.removeOption(o),(o=s.map(o,(function(e){return e.selected=!1,e}))).push({value:n,label:this._featureLayer.name,selected:!0}),this._boundingAreaSelect.addOption(o),this._handleBoundingSelectChange(n)}this._boundingDrawBtn.reset()},_handleOptionsBtnClick:function(){c.contains(this._overideOptionsDiv,"disabled")||(c.contains(this._overideOptionsDiv,"optionsClose")?c.replace(this._overideOptionsDiv,"optionsOpen","optionsClose"):c.contains(this._overideOptionsDiv,"optionsOpen")&&c.replace(this._overideOptionsDiv,"optionsClose","optionsOpen"))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setAnalysisLayerAttr:function(e){var t=this.showGeoAnalyticsParams?[X.GeometryTypes.Point,X.GeometryTypes.MultiPoint]:[X.GeometryTypes.Point,X.GeometryTypes.MultiPoint,X.GeometryTypes.Polygon];e&&-1!==s.indexOf(t,e.geometryType)?this.analysisLayer=e:this.analysisLayer=null},_getAnalysisLayerAttr:function(e){return this.analysisLayer},_getAnalysisFieldAttr:function(){return this._analysFieldSelect&&(this.analysisField=this._analysFieldSelect.get("value")),this.analysisField},_setAnalysisFieldAttr:function(e){this.analysisField=e},_setDividedByFieldAttr:function(e){this.dividedByField=e},_getDividedByFieldAttr:function(){return this._divideFieldSelect&&(this.dividedByField=this._divideFieldSelect.get("value")),this.dividedByField},_setAnalysisFieldsAttr:function(e){var t,i,a=M.isDefined(e)&&M.isDefined(e.fields)?e.fields:[];if(this._analysFieldSelect){this.analysisFieldsToFilter&&this.analysisFieldsToFilter.length&&e&&this.analysisFieldsToFilter.push(e.objectIdField),this._analysFieldSelect.removeOption(this._analysFieldSelect.getOptions()),this._isPoint?this._analysFieldSelect.addOption({value:"0",label:this.i18n.pointCounts}):!this._isPoint&&this.get("allowChooseLabel")&&this._analysFieldSelect.addOption({value:"0",label:this.i18n.chooseLabel});var n=[];s.forEach(a,(function(e,i){-1===s.indexOf(this.analysisFieldsToFilter,e.name)&&-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],e.type)&&(t={value:e.name,label:M.isDefined(e.alias)&&""!==e.alias?e.alias:e.name,selected:this.analysisField&&e.name===this.analysisField},n.push(t))}),this),i=!!(e&&n&&0===n.length&&this._analysFieldSelect&&this._analysFieldSelect.getOptions()&&0===this._analysFieldSelect.getOptions().length),this._analysFieldSelect.set("required",i),i?V.addBlankOption(this._analysFieldSelect,n):this._analysFieldSelect.validate(),this._analysFieldSelect.addOption(n)}},_setAnalysisLayersAttr:function(e){var t=this.showGeoAnalyticsParams?[X.GeometryTypes.Point,X.GeometryTypes.MultiPoint]:[X.GeometryTypes.Point,X.GeometryTypes.MultiPoint,X.GeometryTypes.Polygon];this.analysisLayers=s.filter(e,(function(e){return-1!==s.indexOf(t,e.geometryType)}))},_setDividedByFieldsAttr:function(e){var t,i=M.isDefined(e)&&M.isDefined(e.fields)?e.fields:[];if(this._divideFieldSelect){this._divideFieldSelect.removeOption(this._divideFieldSelect.getOptions());var a=[{value:"0",label:this.i18n.noneLabel}];this._isPoint&&(!this._isPoint||M.isDefined(this.analysisField)&&"0"!==this.analysisField)||V.isCustomGeoEnrichmentServer(this.helperServices.geoenrichment.url,this.isSingleTenant)||a.push({value:"esriPopulation",label:this.i18n.enrichLabel,disabled:!this.get("enableEnrichmentFields"),selected:"esriPopulation"===this.dividedByField}),s.forEach(i,(function(i,n){-1===s.indexOf(["GiZScore","GiPValue","Gi_Bin",e.objectIdField,M.isDefined(this.analysisField)&&this.analysisField],i.name)&&-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],i.type)&&(t={value:i.name,label:M.isDefined(i.alias)&&""!==i.alias?i.alias:i.name,selected:this.dividedByField&&i.name===this.dividedByField},a.push(t))}),this),this._divideFieldSelect.addOption(a)}},_setEnableEnrichmentFieldsAttr:function(e){this.enableEnrichmentFields=e},_getEnableEnrichmentFieldsAttr:function(){return this.enableEnrichmentFields},_setMapAttr:function(e){this.map=e,this._toolbar=new J(this.map),a.connect(this._toolbar,"onDrawEnd",i.hitch(this,this._addFeatures))},_getMapAttr:function(){return this.map},_setDrawLayerNameAttr:function(e){this.drawLayerName=e},_getDrawLayerNameAttr:function(){return this._featureLayer.name},_getDrawLayerAttr:function(){return this._featureLayer},_getDrawToolbarAttr:function(){return this._toolbar},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},validateServiceName:function(e){return V.validateServiceName(e,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})},_setDisableExtentAttr:function(e){this._useExtentCheck.set("checked",!e),this._useExtentCheck.set("disabled",e)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_connect:function(e,t,i){this._pbConnects.push(a.connect(e,t,i))},_showMessages:function(e){y.set(this._bodyNode,"innerHTML",e),m.fadeIn({node:this._errorMessagePane,easing:b.quadIn,onEnd:i.hitch(this,(function(){d.set(this._errorMessagePane,{display:""})}))}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),m.fadeOut({node:this._errorMessagePane,easing:b.quadOut,onEnd:i.hitch(this,(function(){d.set(this._errorMessagePane,{display:"none"})}))}).play()}});return l("extend-esri")&&i.setObject("dijit.analysis.FindHotSpots",$,U),$}));