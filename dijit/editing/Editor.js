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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/kernel","dojo/has","dojo/query","dojo/DeferredList","dojo/dom-class","dojo/dom-construct","dojo/string","dijit/_Widget","dijit/_Templated","../../domUtils","../../graphicsUtils","../../geometry/Polyline","../../geometry/Polygon","../../graphic","../../undoManager","../../tasks/query","../../layers/FeatureLayer","../../layers/FeatureTemplate","../../toolbars/draw","../../toolbars/edit","../AttributeInspector","./Util","./Add","./Update","./Delete","./Cut","./Union","./toolbars/Drawing","./SelectionHelper","./TemplatePicker","../../kernel","../../config","dojo/i18n!../../nls/jsapi","dojo/text!./templates/Editor.html","dijit/ProgressBar","dojo/NodeList-dom"],(function(t,e,i,s,r,n,a,o,h,l,c,d,_,u,p,g,f,y,m,b,T,E,O,L,v,I,w,R,C,A,P,F,S,G,N,W,k,M){var D=t([d,_],{declaredClass:"esri.dijit.editing.Editor",widgetsInTemplate:!0,templateString:M,onLoad:function(){},constructor:function(t,e){(t=t||{}).settings||console.error("Editor: please provide 'settings' parameter in the constructor"),t.settings.layerInfos||console.error("Editor: please provide 'layerInfos' parameter in the constructor"),this._settings=t.settings,this._eConnects=[]},startup:function(){this.inherited(arguments),this._setDefaultOptions(),this._settings.map.setInfoWindowOnClick(!1);var t=this._settings.layerInfos;if(this.featureReductionEnabledLayers=[],i.forEach(t,(function(t){var e=t.featureLayer;e.isFeatureReductionEnabled()&&(e.disableFeatureReduction(),this.featureReductionEnabledLayers.push(e))}),this),i.every(t,(function(t){return t.featureLayer.loaded})))this._initLayers(),this._connectEvents(),this._createWidgets(),this.onLoad(),this.loaded=!0;else{var e=t.length;i.forEach(t,(function(t){var i=t.featureLayer;if(i.loaded)e--;else var r=s.connect(i,"onLoad",this,(function(t){s.disconnect(r),r=null,--e||(this._initLayers(),this._connectEvents(),this._createWidgets(),this.onLoad(),this.loaded=!0)}))}),this)}this._reset(),this._enableMapClickHandler()},stopEditing:function(t){this._updateCurrentFeature(e.hitch(this,(function(){this._clearSelection(!1),t&&t()})))},destroy:function(){this._settings.map.setInfoWindowOnClick(!0),this.drawingToolbar&&this.drawingToolbar.destroy(),this.attributeInspector&&this.attributeInspector.destroy(),this.templatePicker&&this.templatePicker.destroy(),this._selectionHelper&&this._selectionHelper.destroy(),this._drawToolbar&&this._drawToolbar.deactivate(),this._reset(),this._disableMapClickHandler(),i.forEach(this._eConnects,s.disconnect),s.disconnect(this._dtConnect),s.disconnect(this._templatePickerOnSelectionChangeEvent),this._layer=this._currentGraphic=this._activeType=this._activeTemplate=this._drawingTool=this._drawToolbar=this.editToolbar=this.drawingToolbar=this.attributeInspector=this.templatePicker=this.undoManager=null,this._settings.map.infoWindow&&this._settings.map.infoWindow.clearFeatures&&this._settings.map.infoWindow.clearFeatures(),i.forEach(this.featureReductionEnabledLayers,(function(t){t.enableFeatureReduction()})),this.inherited(arguments)},_setDefaultOptions:function(){this._drawToolbar=this._settings.drawToolbar||new O(this._settings.map),this._settings.drawToolbar=this._drawToolbar,this.editToolbar=this._settings.editToolbar||new L(this._settings.map,{textSymbolEditorHolder:this.domNode}),this._settings.editToolbar=this.editToolbar,this._settings.toolbarVisible=this._settings.toolbarVisible||!1,this._settings.toolbarOptions=e.mixin({reshapeVisible:!1,cutVisible:!1,mergeVisible:!1},this._settings.toolbarOptions),this._settings.createOptions=e.mixin({polylineDrawTools:[D.CREATE_TOOL_POLYLINE],polygonDrawTools:[D.CREATE_TOOL_POLYGON],editAttributesImmediately:!0},this._settings.createOptions),this._settings.singleSelectionTolerance=this._settings.singleSelectionTolerance||3,this._settings.maxUndoRedoOperations=this._settings.maxUndoRedoOperations||10,this._settings.editor=this,this._usePopup=this._settings.usePopup=!!this._settings.map.infoWindow._setPagerCallbacks,this._datePackage=this._settings.datePackage;var t=W.defaults;this._settings.geometryService=this._settings.geometryService||t.geometryService,t.geometryService=t.geometryService||this._settings.geometryService},_initLayers:function(){this._settings.layers=[],this._settings.userIds={},this._settings.createOnlyLayer={};var t=this._settings.layerInfos;i.forEach(t,(function(t){if(t.featureLayer&&t.featureLayer.loaded){this._settings.layers.push(t.featureLayer);var e=t.featureLayer.id;t.featureLayer.credential&&(this._settings.userIds[e]=t.featureLayer.credential.userId),t.userId&&(this._settings.userIds[e]=t.userId);var i=t.featureLayer.getEditCapabilities();i.canCreate&&!i.canUpdate?this._settings.createOnlyLayer[e]=!0:this._settings.createOnlyLayer[e]=!1,this._isTextSymbolPointLayer(t.featureLayer)&&(t.disableAttributeUpdate=!0)}}),this)},_reset:function(){this._hideAttributeInspector(),this.editToolbar.deactivate(),this._editVertices=!0,this._layer=null,this._currentGraphic=null,this._activeType=null,this._activeTemplate=null,this._drawingTool=null,this._attributeChanged=!1},_saveFeatureOnClient:function(t){var i,r=this.templatePicker.getSelected();i=r.template?r.featureLayer.renderer.getSymbol(r.template.prototype):r.symbolInfo.symbol,this._tempGraphic=new y(t,i,null,null),this._tempGraphic.setAttributes(e.mixin({},r.template.prototype.attributes));var n=this._settings.map;n.graphics.add(this._tempGraphic);var a=this._findCenterPoint(t);this._createAttributeInspector(),n.infoWindow.setTitle(r.featureLayer?r.featureLayer.name:k.widgets.attributeInspector.NLS_title),this.attributeInspector.showFeature(this._tempGraphic,r.featureLayer),this._showInfoWindow(a,n.getInfoWindowAnchor(a)),(this._settings.createOnlyLayer[r.featureLayer.id]||this._settings.invalidTemplate)&&(this._infoWindowHideEvent=s.connect(n.infoWindow,"onHide",this,"_infoWindowHide")),s.disconnect(this._templatePickerOnSelectionChangeEvent),this.templatePicker.clearSelection(),this._drawToolbar.deactivate(),this._enableMapClickHandler(),this.drawingToolbar&&this.drawingToolbar.deactivate(),this._templatePickerOnSelectionChangeEvent=s.connect(this.templatePicker,"onSelectionChange",e.hitch(this,"_onCreateFeature"))},_saveAttributesOnClient:function(t,e,i){this._tempGraphic.attributes[e]="number"==typeof i&&isNaN(i)?null:i},_infoWindowHide:function(){this._createFeature(this._tempGraphic.geometry,this._tempGraphic.attributes),s.disconnect(this._infoWindowHideEvent)},_createFeature:function(t,s){this._editClickPoint=this._findCenterPoint(t),t.rings?this._simplify(t,e.hitch(this,(function(t){this._drawingTool!==E.TOOL_AUTO_COMPLETE_POLYGON?this._applyEdits([{layer:this._layer,adds:[this._createGraphic(t,s)]}],e.hitch(this,(function(){this._chainAttachment(this._oEdits[0].adds[0].attributes[this._oEdits[0].layer.objectIdField],this._oEdits[0].layer)}))):this._autoComplete(t,e.hitch(this,(function(t){t&&t.length&&this._applyEdits([{layer:this._layer,adds:i.map(t,e.hitch(this,(function(t){return this._createGraphic(t,s)})))}],(function(){this._chainAttachment(this._oEdits[0].adds[0].attributes[this._oEdits[0].layer.objectIdField],this._oEdits[0].layer)}))})))}))):this._applyEdits([{layer:this._layer,adds:[this._createGraphic(t,s)]}],e.hitch(this,(function(){this._chainAttachment(this._oEdits[0].adds[0].attributes[this._oEdits[0].layer.objectIdField],this._oEdits[0].layer),this._layer&&this._layer.renderer&&"heatmap"===this._layer.renderer.type&&this._layer.refresh()})))},_chainAttachment:function(t,e){this.attributeInspector&&this.attributeInspector._attachmentEditor&&this.attributeInspector._attachmentEditor._tempUpload&&this.attributeInspector._attachmentEditor._chainAttachment(t,e)},_updateCurrentFeature:function(t){var e=this._isModified();e?this._updateFeature(e,t):t&&t(!1)},_updateFeature:function(t,i,s){var r,n=t.geometry,a=t.getLayer();a.hasZ&&!a.enableZDefaults||a.hasM&&!a.allowUpdateWithoutMValues||s&&!this._isModified()?((r=new y).setAttributes(t.attributes),this._applyEdits([{layer:t.getLayer(),updates:[r]}],i)):n.rings?this._simplify(n,e.hitch(this,(function(s){this._applyEdits([{layer:t.getLayer(),updates:[e.mixin(t,{geometry:s})]}],i)}))):this._applyEdits([{layer:t.getLayer(),updates:[t]}],i)},_deleteFeature:function(t,e){if(this._settings.invalidTemplate&&t===this._tempGraphic)return this._settings.map.graphics.remove(this._tempGraphic),void this._hideAttributeInspector();var s=[];if(t)s.push({layer:t.getLayer(),deletes:[t]});else{var r=this._settings.layers;(s=i.map(i.filter(r,(function(t){return t.getSelectedFeatures().length>0})),(function(t){return{layer:t,deletes:t.getSelectedFeatures()}})))&&s.length||!this._currentGraphic||s.push({layer:this._layer,deletes:[this._currentGraphic]})}this._applyEdits(s,e)},_stopEditing:function(t,i,s,r){var n;if(u.hide(this.progressBar.domNode),this._settings.createOnlyLayer[t.id]||this._undoRedoAdd(),!0===t._isSelOnly||1===t.mode||6===t.mode){if(i&&i.length){this.templatePicker.clearSelection();var a=new b;a.objectIds=[i[0].objectId],this._settings.createOnlyLayer[t.id]||this._settings.invalidTemplate?this._settings.map.graphics.remove(this._tempGraphic):this._selectFeatures([t],a,e.hitch(this,"_onEditFeature"))}}else(n=this._selectionHelper.findMapService(this._settings.map,t))&&n.refresh(),i&&i.length&&(this.templatePicker.clearSelection(),this._settings.createOnlyLayer[t.id]||this._settings.invalidTemplate?this._settings.map.graphics.remove(this._tempGraphic):I.findFeatures(i,t,e.hitch(this,"_onEditFeature")));r&&r.length&&(this._clearSelection(!0),this._undoRedo&&(n=this._selectionHelper.findMapService(t,this._settings.map))&&n.refresh()),this._undoRedo&&s&&s.length&&((n=this._selectionHelper.findMapService(t,this._settings.map))&&n.refresh(),this.attributeInspector.refresh(),this._undoRedo=!1),this.drawingToolbar&&this.drawingToolbar._updateUI(),this._undoRedo=!1,this._settings.invalidTemplate=!1},_undoRedoAdd:function(){if(this._settings._isApplyEditsCall=!1,this._settings.undoManager){var t=this._edits&&this._edits.length?this._edits[0]:null;if(t){var i=t.adds||[],s=t.updates||[],r=t.deletes||[],n=t.preUpdates||[],a={featureLayer:t.layer};if("CUT"===this._activeTool)i.length&&s.length&&n.length&&this.undoManager.add(new A(e.mixin(a,{preUpdatedGraphics:n,addedGraphics:i,postUpdatedGraphics:s})));else if("UNION"===this._activeTool)r.length&&s.length&&n.length&&this.undoManager.add(new P(e.mixin(a,{preUpdatedGraphics:n,deletedGraphics:r,postUpdatedGraphics:s})));else if(i.length)this.undoManager.add(new w(e.mixin(a,{addedGraphics:i})));else if(r.length)this.undoManager.add(new C(e.mixin(a,{deletedGraphics:r})));else if(s.length&&(this._rollbackGraphic||n.length)){var o=n.length?n:[this._rollbackGraphic];this.undoManager.add(new R(e.mixin(a,{preUpdatedGraphics:o,postUpdatedGraphics:s})))}this._edits=null,this._rollbackGraphic=null}}},_activateDrawToolbar:function(t){this._layer=t.featureLayer,this._activeType=t.type,this._activeTemplate=t.template,this._drawingTool=this._activeTemplate?this._activeTemplate.drawingTool:null,this._drawTool=this._toDrawTool(this._drawingTool,t.featureLayer),s.disconnect(this._dtConnect);var i=this._layer.fields;if(this._settings.invalidTemplate=!1,this._activeTemplate&&this._activeTemplate.prototype){var r=e.mixin({},this._activeTemplate.prototype.attributes),n=i.filter((function(t){return!1===t.nullable&&!0===t.editable}));this._settings.invalidTemplate=n.some((function(t){var e=r[t.name];return null==e}))}this._settings.createOnlyLayer[t.featureLayer.id]||this._settings.invalidTemplate?this._dtConnect=s.connect(this._drawToolbar,"onDrawEnd",this,"_saveFeatureOnClient"):this._dtConnect=s.connect(this._drawToolbar,"onDrawEnd",this,"_createFeature"),this.editToolbar.deactivate(),this._disableMapClickHandler(),this.drawingToolbar?this.drawingToolbar.activateEditing(this._drawTool,this._layer):this._drawToolbar.activate(this._drawTool)},_activateEditToolbar:function(t,e){var s=t.getLayer(),r=s?s.geometryType:null,n=this._isTextSymbolPoint(t),a=L.MOVE;"esriGeometryPoint"!==r&&!0===this._isNotesFeature(t)?(a=a|L.ROTATE|L.SCALE,this._editVertices=!1):"esriGeometryPoint"!==r&&!0===this._editVertices?(a=a|L.ROTATE|L.SCALE,this._editVertices=!1):n?(a=a|L.ROTATE|L.SCALE|L.EDIT_TEXT,this._editVertices=!1):(a|=L.EDIT_VERTICES,this._editVertices=!0),this._attributeChanged=this._isModified(),this._rollbackGraphic=new y(t.toJson());var o=s.getEditCapabilities({feature:t,userId:this._settings.userIds[s.id]}),h=i.filter(this._settings.layerInfos,(function(t){return t.featureLayer.layerId===s.layerId}))[0];if(o.canUpdate&&!h.disableGeometryUpdate&&o.canUpdateGeometry&&(this.editToolbar.activate(a,t),n&&(this.editToolbar._textEditor._addTextBox(t),this.editToolbar._textSymbolEditor&&this.editToolbar._textSymbolEditor.hide())),!this._settings.map.infoWindow.isShowing&&!this._updateAttributeDisabled(t)){var l=e&&e.screenPoint||this._findCenterPoint(t);this._showInfoWindow(l,this._settings.map.getInfoWindowAnchor(l))}},_createGraphic:function(t,s){var r=this._activeType&&this._activeType.symbol||this._layer.defaultSymbol,n=new y(t,r,s);return this._activeTemplate||s?n.attributes=s||e.mixin({},this._activeTemplate.prototype.attributes):(n.attributes=n.attributes||[],i.forEach(this._layer.fields,(function(t){n.attributes[t.name]=null}),this)),n},_connectEvents:function(){var t=this._settings.layers;i.forEach(t,(function(t){this._connect(t,"onEditsComplete",e.hitch(this,"_stopEditing",t))}),this),i.forEach(t,(function(t){this._connect(t,"onBeforeApplyEdits",e.hitch(this,(function(){u.show(this.progressBar.domNode),this._settings._isApplyEditsCall=!0})))}),this),this._connect(this.editToolbar,"onGraphicClick",e.hitch(this,"_activateEditToolbar")),this._connect(this.editToolbar,"onGraphicFirstMove",e.hitch(this,"_hideAttributeInspector")),this._connect(this.editToolbar,"onVertexFirstMove",e.hitch(this,"_hideAttributeInspector")),this._connect(this.editToolbar,"onScaleStart",e.hitch(this,"_hideAttributeInspector")),this._connect(this.editToolbar,"onRotateStart",e.hitch(this,"_hideAttributeInspector"))},_connect:function(t,e,i){this._eConnects.push(s.connect(t,e,i))},_createWidgets:function(){this._selectionHelper=new S(this._settings),this._createTemplatePicker(),this._createAttributeInspector(),this._createDrawingToolbar(),this._createUndoRedoManager()},_createTemplatePicker:function(){if(this._settings.templatePicker)this.templatePicker=this._settings.templatePicker,u.hide(this.templatePickerDiv);else{var t=i.filter(this._settings.layers,(function(t){return t.getEditCapabilities().canCreate}));this.templatePicker=new G({class:"esriTemplatePicker",featureLayers:t,showTooltip:!0,maxLabelLength:this._settings.typesCharacterLimit,columns:"auto",rows:"auto"},this.templatePickerDiv),this.templatePicker.startup(),this._settings.templatePicker=this.templatePicker}this._templatePickerOnSelectionChangeEvent=s.connect(this.templatePicker,"onSelectionChange",e.hitch(this,"_onCreateFeature"))},_createAttributeInspector:function(){var t=this._settings.map;this._settings.attributeInspector?(this._customAttributeInspector=!0,this.attributeInspector=this._settings.attributeInspector):(this._customAttributeInspector=!1,this.attributeInspector=new v({layerInfos:this._settings.layerInfos,hideNavButtons:this._usePopup,datePackage:this._datePackage},l.create("div")),this.attributeInspector.startup(),t.infoWindow.setContent(this.attributeInspector.domNode),t.infoWindow.setTitle(k.widgets.attributeInspector.NLS_title),t.infoWindow.resize(350,375),r.query(".esriAttributeInspector .atiLayerName").style({display:"none"})),this._connect(this.attributeInspector,"onDelete",e.hitch(this,"_deleteFeature")),this._connect(this.attributeInspector,"onNext",e.hitch(this,(function(t){this._updateCurrentFeature(e.hitch(this,(function(){this._attributeChanged=!1,this._onEditFeature(t)})))}))),this._usePopup&&t.infoWindow._setPagerCallbacks(this.attributeInspector,e.hitch(this.attributeInspector,"previous"),e.hitch(this.attributeInspector,"next")),this._connect(this.attributeInspector,"onAttributeChange",e.hitch(this,(function(t,s,r){if(this._settings.createOnlyLayer[this._layer.id]||this._settings.invalidTemplate)this._saveAttributesOnClient(t,s,r);else{var n=t.getLayer(),a=i.filter(n.fields,(function(t){return t.name===s}))[0];a&&""===r&&(r=null),this._rollbackGraphic=new y(e.clone(t.toJson())),this.attributeInspector._rollbackInfo={field:a,graphic:this._rollbackGraphic},this._currentGraphic.attributes[s]="number"==typeof r&&isNaN(r)?null:r,this._currentGraphic.setAttributes(this._currentGraphic.attributes),this._updateFeature(this._currentGraphic,null,!0),this._attributeChanged=!1}})))},_createDrawingToolbar:function(){!0===this._settings.toolbarVisible&&(this.drawingToolbar=new F({class:"esriDrawingToolbar",drawToolbar:this._drawToolbar,editToolbar:this.editToolbar,settings:this._settings,onDelete:e.hitch(this,"_deleteFeature"),onApplyEdits:e.hitch(this,"_applyEdits"),onShowAttributeInspector:e.hitch(this,"_onEditFeature")},this.drawingToolbarDiv))},_createUndoRedoManager:function(){(this._settings.enableUndoRedo||this._settings.undoManager)&&(this._settings.enableUndoRedo=!0,this.undoManager=this._settings.undoManager,this.undoManager||(this.undoManager=this._settings.undoManager=new m({maxOperations:this._settings.maxUndoRedoOperations})),this._connect(this.undoManager,"onUndoComplete",e.hitch(this,this._updateUndoRedoOperations)),this._connect(this.undoManager,"onRedoComplete",e.hitch(this,this._updateUndoRedoOperations)),this._connect(document,"onkeypress",e.hitch(this,(function(t){(t.metaKey||t.ctrlKey)&&("z"===t.charOrCode&&this._undo(),"y"===t.charOrCode&&this._redo())}))))},_updateUndoRedoOperations:function(t){var e;if(t&&t.addedIds)for(e=0;e<this.undoManager.length;e++){var i=this.undoManager.get(e);i&&t.layer===i._featureLayer&&i.updateObjectIds(t.oldIds,t.addedIds)}t&&"Update Features"===t.operation.label&&this.attributeInspector.refresh()},_enableMapClickHandler:function(){this._mapClickHandler=s.connect(this._settings.map,"onClick",e.hitch(this,(function(t){this._drawToolbar._geometryType||("SELECT"!==this._activeTool?this._updateCurrentFeature(e.hitch(this,(function(){this._reset(),this._updateSelection(t)}))):this._activeTool="")})))},_disableMapClickHandler:function(){s.disconnect(this._mapClickHandler)},_onCreateFeature:function(){var t=this.templatePicker.getSelected();t?this._updateCurrentFeature(e.hitch(this,(function(){this._currentGraphic&&this._clearSelection(!1),this._reset(),this._activateDrawToolbar(t)}))):(this._reset(),s.disconnect(this._dtConnect),this._drawToolbar.deactivate(),this._enableMapClickHandler(),this.drawingToolbar&&this.drawingToolbar.deactivate())},_isTextSymbolPoint:function(t){if("point"===t.geometry.type||"multipoint"===t.geometry.type){var e=t.getLayer(),i=e.renderer,s=t.symbol||e._getSymbol(t);if(!s&&(i.hasVisualVariables("sizeInfo",!1)||i.hasVisualVariables("colorInfo",!1)||i.hasVisualVariables("opacityInfo",!1))&&i.addBreak&&i.infos&&1===i.infos.length&&(s=i.infos[0].symbol||i.defaultSymbol),s&&"textsymbol"===s.type)return!0}return!1},_isTextSymbolPointLayer:function(t){return!!("esriGeometryPoint"===t.geometryType&&t.renderer&&t.renderer._symbols&&t.renderer._symbols[0]&&t.renderer._symbols[0].symbol&&"textsymbol"===t.renderer._symbols[0].symbol.type)},_updateAttributeDisabled:function(t){var e=t.getLayer();if(!e)return!1;var i,s,r=!1;for(i=0;i<this._settings.layerInfos.length;i++)if((s=this._settings.layerInfos[i]).featureLayer==e){r=s.disableAttributeUpdate;break}return r},_onEditFeature:function(t,i){if(t=(e.isArray(t)?t[0]:t)||null){var s;if(this._layer=t.getLayer(),!this._customAttributeInspector&&!this._updateAttributeDisabled(t)){if(i=i||this._editClickPoint||this._findCenterPoint(t),this._currentFeatureCount>1){var r=this._popupFeatures.indexOf(t);s=c.substitute(k.widgets.popup.NLS_pagingInfo,{index:r+1,total:this._currentFeatureCount}),this._settings.map.infoWindow.setTitle(s)}else s=this._layer?this._layer.name:k.widgets.attributeInspector.NLS_title,this._settings.map.infoWindow.setTitle(s);!this.drawingToolbar&&this._settings.map.infoWindow.isShowing||(this.attributeInspector.refresh(),this._showInfoWindow(i,this._settings.map.getInfoWindowAnchor(i))),this._editClickPoint=null}if(t!==this._currentGraphic){this._editVertices=!0,this._currentGraphic=t,t.getDojoShape()&&t.getDojoShape().moveToFront();var n=this._layer.hasM;this._layer.hasZ&&!this._layer.enableZDefaults||n&&!this._layer.allowUpdateWithoutMValues||this._activateEditToolbar(t)}}},_applyEdits:function(t,s){if(!((t=t||[]).length<=0)){this._edits=this._oEdits=t;var r=[];i.forEach(t,(function(t){t.layer&&r.push(t.layer.applyEdits(t.adds,t.updates,t.deletes))})),r.length>0&&(this._deferredsList=new o(r).addCallback(e.hitch(this,(function(){u.hide(this.progressBar.domNode),s&&s();var t=this._settings.map;t&&t.infoWindow.reposition&&t.infoWindow.isShowing&&t.infoWindow.reposition()}))))}},_undo:function(){this._settings.undoManager&&!this._settings._isApplyEditsCall&&(this.editToolbar.deactivate(),this._undoRedo=!0,this._settings.undoManager.undo())},_redo:function(){this._settings.undoManager&&!this._settings._isApplyEditsCall&&(this.editToolbar.deactivate(),this._undoRedo=!0,this._settings.undoManager.redo())},_simplify:function(t,e){f.prototype.isSelfIntersecting(t)?this._settings.geometryService.simplify([t],(function(t){var i=t&&t.length?t[0]:i;e&&e(i)})):e&&e(t)},_autoComplete:function(t,i){var s=this._getLayers("esriGeometryPolygon"),r=new b;r.geometry=t,r.returnGeometry=!0,this._selectFeatures(s,r,e.hitch(this,(function(e){!e||e.length<=0?i&&i([t]):this._settings.geometryService.autoComplete(p.getGeometries(e),this._toPolylines([r.geometry]),(function(t){i&&i(t)}))})))},_getLayers:function(t){var e=this._settings.layers;return i.filter(e,(function(e){return e.geometryType===t}))},_selectFeatures:function(t,e,i,s){this._selectionHelper.selectFeatures(t,e,s||T.SELECTION_NEW,i)},_updateSelection:function(t){var s,r=t.mapPoint,n=t.graphic,a=this._settings.layerInfos;if(this._selectionHelper.selectFeaturesByGeometry(this._settings.layers,r,T.SELECTION_NEW,e.hitch(this,(function(t){var o=i.some(t,e.hitch(this,(function(t){return t==n})));if(n&&!o){var h=n.getLayer();if(this._isValidLayer(h)){var l=new b;l.objectIds=[n.attributes[h.objectIdField]],this._selectionHelper.selectFeatures([h],l,T.SELECTION_ADD,e.hitch(this,(function(e){if(e&&e.length){var i=e.concat(t);s=I.sortFeaturesById(a,i),this._updatePopupButtons(s),this._onEditFeature(s,r)}})))}else t&&t.length?(s=I.sortFeaturesById(a,t),this._updatePopupButtons(s),this._onEditFeature(s,r)):this._clearSelection()}else t&&t.length?(s=I.sortFeaturesById(a,t),this._updatePopupButtons(s),this._onEditFeature(s,r)):this._clearSelection()}))),n&&this._isTextSymbolPoint(n)&&this._isValidLayer(n.getLayer())){var o=0;o=o|L.MOVE|L.ROTATE|L.SCALE|L.EDIT_TEXT,this.editToolbar.activate(o,n)}},_updatePopupButtons:function(t){if(!this._usePopup||!t)return this._popupFeatures=null,void(this._currentFeatureCount=null);var s=t.length,n=[this._settings.map.infoWindow._prevFeatureButton,this._settings.map.infoWindow._nextFeatureButton];i.forEach(n,e.hitch(this,(function(t){s>1?h.remove(t,"hidden"):h.add(t,"hidden")})));var a=s>1?"block":"none";r.query(".esriAttributeInspector .atiLayerName").style({display:a}),this._currentFeatureCount=s,this._popupFeatures=t},_clearSelection:function(t){this._currentFeatureCount=0,this._popupFeatures=null,this._selectionHelper.clearSelection(t||!1),this._reset()},_findCenterPoint:function(t){var e,i=t.geometry||t;switch(i.type){case"point":e=i;break;case"polyline":var s=i.paths[0].length;e=i.getPoint(0,Math.ceil(s/2));break;case"polygon":var r=i.rings.length-1,n=i.rings[r].length-1;e=i.getPoint(r,n)}return this._settings.map.toScreen(e)},_hideAttributeInspector:function(){!this._customAttributeInspector&&this._settings.map.infoWindow&&this._settings.map.infoWindow.hide()},_toPolylines:function(t){return i.map(t,(function(t){var e=new g(t.spatialReference);return i.forEach(t.rings,(function(t){e.addPath(t)})),e}))},_isNotesFeature:function(t){var e=t.getLayer(),s=e&&e.types||null;if(!s)return!1;var r,n=t.attributes[e.typeIdField];if(i.some(s,(function(t){return t.id===n&&(r=t.templates,!0)})),!r)return!1;var a=r[0]||null;return!!a&&!!(this._isShapeTool(a.drawingTool)||null)},_isValidLayer:function(t){var e,i=this._settings.layerInfos;for(e=0;e<i.length;e++){var s=i[e],r=s.featureLayer?s.featureLayer.id:s.layerId;if(t.id==r)return!0}return!1},_isShapeTool:function(t){switch(t){case E.TOOL_ARROW:return O.ARROW;case E.TOOL_LEFT_ARROW:return O.LEFT_ARROW;case E.TOOL_RIGHT_ARROW:return O.RIGHT_ARROW;case E.TOOL_UP_ARROW:return O.UP_ARROW;case E.TOOL_DOWN_ARROW:return O.DOWN_ARROW;case E.TOOL_CIRCLE:return O.CIRCLE;case E.TOOL_ELLIPSE:return O.ELLIPSE;case E.TOOL_TRIANGLE:return O.TRIANGLE;case E.TOOL_RECTANGLE:return O.RECTANGLE;default:return null}},_toDrawTool:function(t,e){var i=e.geometryType;switch(t){case E.TOOL_POINT:return O.POINT;case E.TOOL_ARROW:return O.ARROW;case E.TOOL_LEFT_ARROW:return O.LEFT_ARROW;case E.TOOL_RIGHT_ARROW:return O.RIGHT_ARROW;case E.TOOL_UP_ARROW:return O.UP_ARROW;case E.TOOL_DOWN_ARROW:return O.DOWN_ARROW;case E.TOOL_CIRCLE:return O.CIRCLE;case E.TOOL_ELLIPSE:return O.ELLIPSE;case E.TOOL_TRIANGLE:return O.TRIANGLE;case E.TOOL_RECTANGLE:return O.RECTANGLE;case E.TOOL_LINE:return O.POLYLINE;case E.TOOL_POLYGON:return O.POLYGON;case E.TOOL_FREEHAND:return"esriGeometryPolyline"===i?O.FREEHAND_POLYLINE:O.FREEHAND_POLYGON;default:var s=O.POINT;return"esriGeometryPolyline"===i?(s=O.POLYLINE,this._settings.createOptions.polylineDrawTools[0]===D.CREATE_TOOL_FREEHAND_POLYLINE&&(s=O.FREEHAND_POLYLINE)):"esriGeometryPolygon"===i&&(s=O.POLYGON,this._settings.createOptions.polygonDrawTools[0]===D.CREATE_TOOL_FREEHAND_POLYGON&&(s=O.FREEHAND_POLYGON)),s}},_isModified:function(){var t=this.editToolbar.getCurrentState();return(t.isModified||this._attributeChanged)&&t.graphic?t.graphic:null},_showInfoWindow:function(t,e){this._customAttributeInspector||this._settings.map.infoWindow.show(t,e)}});return e.mixin(D,{CREATE_TOOL_POLYLINE:"polyline",CREATE_TOOL_FREEHAND_POLYLINE:"freehandpolyline",CREATE_TOOL_POLYGON:"polygon",CREATE_TOOL_FREEHAND_POLYGON:"freehandpolygon",CREATE_TOOL_AUTOCOMPLETE:"autocomplete",CREATE_TOOL_RECTANGLE:"rectangle",CREATE_TOOL_TRIANGLE:"triangle",CREATE_TOOL_CIRCLE:"circle",CREATE_TOOL_ELLIPSE:"ellipse",CREATE_TOOL_ARROW:"arrow",CREATE_TOOL_UP_ARROW:"uparrow",CREATE_TOOL_DOWN_ARROW:"downarrow",CREATE_TOOL_RIGHT_ARROW:"rightarrow",CREATE_TOOL_LEFT_ARROW:"leftarrow"}),n("extend-esri")&&e.setObject("dijit.editing.Editor",D,N),D}));