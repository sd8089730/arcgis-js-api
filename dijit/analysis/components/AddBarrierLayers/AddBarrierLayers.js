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

define(["../../../../kernel","../../AnalysisRegistry","../../utils","dijit/form/Select","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/has","dojo/on","dojo/Evented","../../mixins/browselayers/BrowseLayerMixin","dojo/i18n!../../../../nls/jsapi","dojo/i18n!../../nls/AddBarrierLayers","dojo/text!./AddBarrierLayers.html"],(function(r,e,i,t,s,a,o,n,l,y,h,p,B,d,L,c,g){var u=n([s,a,o,B,d],{declaredClass:"esri.dijit.analysis.components.AddBarrierLayers.AddBarrierLayers",templateString:g,i18n:{},pointBarrierLayer:null,pointBarriers:[],lineBarrierLayer:null,lineBarriers:[],polygonBarrierLayer:null,polygonBarriers:[],showGeoAnalyticsParams:!1,forbiddenLayers:[],showBrowseLayers:!1,portalUrl:"",portalSelf:{},map:{},useArcGISComponents:!0,_hidden:!0,_currentSelectBox:null,_currentLayersArray:[],constructor:function(r){},postMixInProperties:function(){this.inherited(arguments),l.mixin(this.i18n,L.common),l.mixin(this.i18n,c),this.showGeoAnalyticsParams&&(this.showBrowseLayers=!0)},postCreate:function(){this.inherited(arguments)},destroy:function(){this.inherited(arguments)},startup:function(){this.inherited(arguments)},enable:function(){this._hidden=!1,y.remove(this._optionsDiv,"disabled")},disable:function(){this._hidden=!0,y.remove(this._optionsDiv,"optionsOpen"),y.add(this._optionsDiv,"optionsClose"),y.add(this._optionsDiv,"disabled")},updateOptions:function(r){this.set("forbiddenLayers",r),this._populateLayersSelect({inLayer:this.pointBarrierLayer,inLayerList:this.pointBarriers,selectWidget:this._pointBarrierSelect,forbiddenLayers:r,options:[{value:"",label:this.i18n.selectPointBarrier},{type:"separator"}]}),this._populateLayersSelect({inLayer:this.lineBarrierLayer,inLayerList:this.lineBarriers,selectWidget:this._lineBarrierSelect,forbiddenLayers:r,options:[{value:"",label:this.i18n.selectLineBarrier},{type:"separator"}]}),this._populateLayersSelect({inLayer:this.polygonBarrierLayer,inLayerList:this.polygonBarriers,selectWidget:this._polygonBarrierSelect,forbiddenLayers:r,options:[{value:"",label:this.i18n.selectPolygonBarrier},{type:"separator"}]}),this._addBrowseLayersOption(),this._handlePointBarrierChange(this._pointBarrierSelect.get("value")),this._handleLineBarrierChange(this._lineBarrierSelect.get("value")),this._handlePolygonBarrierChange(this._polygonBarrierSelect.get("value"))},_addBrowseLayersOption:function(){this.showBrowseLayers&&(this._browseLyrsdlg||this._initializeBrowseLyrDialog(),[this._pointBarrierSelect,this._lineBarrierSelect,this._polygonBarrierSelect].forEach((function(r){var e=r.get("options");e&&e.length>=1&&("separator"!==e[e.length-1].type&&r.addOption([{type:"separator"}]),i.addBrowseOptionForTool({select:r,disableLAAL:!0},this))}),this))},_initializeBrowseLyrDialog:function(){var r=[this._pointBarrierSelect,this._lineBarrierSelect,this._polygonBarrierSelect];this._browseLyrsdlg=i.addBrowseAnalysisDialog({widget:this,browseType:1}),this.own(this._browseLyrsdlg.on("browseitems-close",l.hitch(this,(function(r){"add-layer"===r.action&&(this._browseLyrsdlg.browseItems.plugIn._grid&&(r.selection.selectedLayer=this._browseLyrsdlg.browseItems.plugIn._selectedLayer,this._handleBrowseItemsSelect({dialog:this._browseLyrsdlg,selection:r.selection})),this._browseLyrsdlg.browseItems.closeInfoPanel())})))),this.own(this._browseLyrsdlg.on("hide",l.hitch(this,(function(){r.forEach((function(r){"browselayers"===r.get("value")&&r.reset()}))}))))},_populateLayersSelect:function(r){r.inLayerList&&r.forbiddenLayers&&r.selectWidget&&r.options&&(r.selectWidget.removeOption(r.selectWidget.getOptions()),r.inLayerList.length>0&&r.inLayerList.forEach((function(e,t){var s,a,o=!1;for(s=!!i.isSameLayer(e,r.inLayer),a=0;a<r.forbiddenLayers.length;a++)if(i.isSameLayer(e,r.forbiddenLayers[a])){o=!0;break}!1===o&&r.options.push({value:t.toString(),label:e.name,selected:s})}),this),r.selectWidget.addOption(r.options))},addNewBarrier:function(r){var t=r&&r.geometryType;t&&(t!==e.GeometryTypes.Point||i.isLayerInLayers(r,this.pointBarriers)?t!==e.GeometryTypes.Line||i.isLayerInLayers(r,this.lineBarriers)?t!==e.GeometryTypes.Polygon||i.isLayerInLayers(r,this.polygonBarriers)||this.polygonBarriers.push(r):this.lineBarriers.push(r):this.pointBarriers.push(r))},buildUI:function(r){this._setupPointBarrierParams({pointBarrierLayer:r.pointBarrierLayer,pointBarriers:r.pointBarriers}),this._setupLineBarrierParams({lineBarrierLayer:r.lineBarrierLayer,lineBarriers:r.lineBarriers}),this._setupPolygonBarrierParams({polygonBarrierLayer:r.polygonBarrierLayer,polygonBarriers:r.polygonBarriers}),this._setUpAddBrowseLayerOption({showBrowseLayers:r.showBrowseLayers,map:r.map,portalSelf:r.portalSelf,portalUrl:r.portalUrl}),this.updateOptions(r.forbiddenLayers),(r.pointBarrierLayer||r.lineBarrierLayer||r.polygonBarrierLayer)&&this._handleOptionsBtnClick(),this.useArcGISComponents=r.useArcGISComponents,this.isSingleTenant=r.isSingleTenant},_setupPointBarrierParams:function(r){this.set("pointBarrierLayer",r.pointBarrierLayer),r.pointBarriers||(r.pointBarriers=[]),this.set("pointBarriers",r.pointBarriers),this.pointBarrierLayer&&!i.isLayerInLayers(this.pointBarrierLayer,this.pointBarriers)&&this.pointBarriers.push(this.pointBarrierLayer)},_setupLineBarrierParams:function(r){this.set("lineBarrierLayer",r.lineBarrierLayer),r.lineBarriers||(r.lineBarriers=[]),this.set("lineBarriers",r.lineBarriers),this.lineBarrierLayer&&!i.isLayerInLayers(this.lineBarrierLayer,this.lineBarriers)&&this.lineBarriers.push(this.lineBarrierLayer)},_setupPolygonBarrierParams:function(r){this.set("polygonBarrierLayer",r.polygonBarrierLayer),r.polygonBarriers||(r.polygonBarriers=[]),this.set("polygonBarriers",r.polygonBarriers),this.polygonBarrierLayer&&!i.isLayerInLayers(this.polygonBarrierLayer,this.polygonBarriers)&&this.polygonBarriers.push(this.polygonBarrierLayer)},_setUpAddBrowseLayerOption:function(r){this.showBrowseLayers=r.showBrowseLayers,this.map=r.map,this.portalSelf=r.portalSelf,this.portalUrl=r.portalUrl},_setPointBarrierLayerAttr:function(r){this.pointBarrierLayer=r,this.emit("update-layer-options",{pointBarrierLayer:this.pointBarrierLayer})},_setPointBarriersAttr:function(r){this.pointBarriers=r.filter((function(r){return i.isPoint(r)}))},_setLineBarrierLayerAttr:function(r){this.lineBarrierLayer=r,this.emit("update-layer-options",{lineBarrierLayer:this.lineBarrierLayer})},_setLineBarriersAttr:function(r){this.lineBarriers=r.filter((function(r){return i.isLine(r)}))},_setPolygonBarrierLayerAttr:function(r){this.polygonBarrierLayer=r,this.emit("update-layer-options",{polygonBarrierLayer:this.polygonBarrierLayer})},_setPolygonBarriersAttr:function(r){this.polygonBarriers=r.filter((function(r){return i.isPolygon(r)}))},_getBarrierLayersAttr:function(){var r={};return!1===this._hidden&&(this.pointBarrierLayer&&(r.pointBarrierLayer=this.pointBarrierLayer),this.lineBarrierLayer&&(r.lineBarrierLayer=this.lineBarrierLayer),this.polygonBarrierLayer&&(r.polygonBarrierLayer=this.polygonBarrierLayer)),r},_getBarrierTagsAttr:function(){var r,e="";return(r=this.get("barrierLayers")).pointBarrierLayer&&(e=e+", "+this.i18n.pointBarrier+", "+this.pointBarrierLayer.name),r.lineBarrierLayer&&(e=e+", "+this.i18n.lineBarrier+", "+this.lineBarrierLayer.name),r.polygonBarrierLayer&&(e=e+", "+this.i18n.polygonBarrier+", "+this.polygonBarrierLayer.name),e},_handleOptionsBtnClick:function(){this._hidden=!1,y.contains(this._optionsDiv,"disabled")?this._hidden=!0:y.contains(this._optionsDiv,"optionsClose")?(y.remove(this._optionsDiv,"optionsClose"),y.add(this._optionsDiv,"optionsOpen")):y.contains(this._optionsDiv,"optionsOpen")&&(y.remove(this._optionsDiv,"optionsOpen"),y.add(this._optionsDiv,"optionsClose"))},_handlePointBarrierChange:function(r){this._currentSelectBox=this._pointBarrierSelect,this._currentLayersArray=this.pointBarriers,"browselayers"===r?this._createBrowseItems({browseValue:r,disabledSubResources:this.forbiddenLayers},{tags:["point"],geometryTypes:[e.GeometryTypes.Point]},this._pointBarrierSelect):this.set("pointBarrierLayer",this.pointBarriers[r])},_handleLineBarrierChange:function(r){this._currentSelectBox=this._lineBarrierSelect,this._currentLayersArray=this.lineBarriers,"browselayers"===r?this._createBrowseItems({browseValue:r,disabledSubResources:this.forbiddenLayers},{tags:["line"],geometryTypes:[e.GeometryTypes.Line]},this._lineBarrierSelect):this.set("lineBarrierLayer",this.lineBarriers[r])},_handlePolygonBarrierChange:function(r){this._currentSelectBox=this._polygonBarrierSelect,this._currentLayersArray=this.polygonBarriers,"browselayers"===r?this._createBrowseItems({browseValue:r,disabledSubResources:this.forbiddenLayers},{tags:["polygon"],geometryTypes:[e.GeometryTypes.Polygon]},this._polygonBarrierSelect):this.set("polygonBarrierLayer",this.polygonBarriers[r])},_handleBrowseItemsSelect:function(r,e){r&&r.selection&&i.addAnalysisReadyLayer({item:r.selection,layers:this._currentLayersArray,layersSelect:this._currentSelectBox,browseDialog:r.dialog,widget:this},e).then(l.hitch(this,(function(r){var e=[];r&&(e=this._currentSelectBox.get("options"),this._currentSelectBox.removeOption(e),e.splice(1,0,{type:"separator"}),this._currentSelectBox.addOption(e))})))}});return h("extend-esri")&&l.setObject("esri.dijit.analysis.components.AddBarrierLayers.AddBarrierLayers",u,r),u}));