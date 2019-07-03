// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../core/tsSupport/assignHelper","../Camera","../geometry","../Graphic","../Ground","../Viewpoint","../core/asyncUtils","../core/Collection","../core/domUtils","../core/Error","../core/events","../core/Handles","../core/has","../core/Logger","../core/maybe","../core/promiseUtils","../core/scheduling","../core/watchUtils","./../core/screenUtils","../core/accessorSupport/decorators","../core/accessorSupport/ensureType","../core/libs/gl-matrix-2/vec3f64","../geometry/HeightModelInfo","../geometry/support/aaBoundingRect","../geometry/support/scaleUtils","../geometry/support/webMercatorUtils","./BreakpointsOwner","./DOMContainer","./GroundView","./PopupView","./View","./ViewAnimation","./3d/constraints/Constraints","./3d/environment/SceneViewEnvironment","./3d/environment/SceneViewEnvironmentManager","./3d/input/SceneInputManager","./3d/layers/graphics/Deconflictor","./3d/layers/graphics/Labeler","./3d/layers/support/FeatureTileTree3D","./3d/layers/support/FeatureTileTree3DDebugger","./3d/layers/support/MemoryManagedLayerView","./3d/state/ViewState","./3d/state/ViewStateManager","./3d/state/helpers/SceneIntersectionHelper","./3d/support/CombinedElevationProvider","./3d/support/debugFlags","./3d/support/DisplayQualityProfile","./3d/support/geometryUtils","./3d/support/HighlightOptions","./3d/support/index","./3d/support/MapCoordsHelper","./3d/support/projectionUtils","./3d/support/PropertiesPool","./3d/support/QualitySettings","./3d/support/RenderCoordsHelper","./3d/support/SharedSymbolResources","./3d/support/geometryUtils/boundedPlane","./3d/support/pointsOfInterest/PointsOfInterest","./3d/terrain/TerrainSurface","./3d/terrain/terrainUtils","./3d/webgl-engine/Stage","./3d/webgl-engine/lib/Intersector","./3d/webgl-engine/lib/intersectorUtils","./support/screenshotUtils","./support/spatialReferenceSupport","./support/WebGLRequirements","./ui/3d/DefaultUI3D","../webscene/Environment"],function(e,t,i,r,n,a,o,s,l,p,d,u,c,h,g,y,f,m,v,w,_,b,S,R,M,x,T,O,P,V,E,I,C,H,U,L,D,G,A,F,j,N,W,q,z,B,k,Q,K,Z,J,X,Y,$,ee,te,ie,re,ne,ae,oe,se,le,pe,de,ue,ce,he,ge,ye,fe,me,ve,we){function _e(e,t){e.layerUids||(e.layerUids=new Set),e.layerUids.add(t)}function be(e,t){e.graphicUids||(e.graphicUids=new Set),e.graphicUids.add(t)}function Se(e){return e>=1099511627776?Math.round(e/1099511627776)+"TB":e>=1073741824?Math.round(e/1073741824)+"GB":e>=1048576?Math.round(e/1048576)+"MB":e>=1024?Math.round(e/1024)+"KB":e.toFixed(0)+"B"}var Re=w.getLogger("esri.views.SceneView"),Me=function(t){function o(e){var i=t.call(this)||this;i._clippingArea=null,i._userClippingArea=null,i._initialDefaultSpatialReference=null,i._defaults={},i._externallySet={environment:!1},i._handles=new m,i._createGraphicsViewController=null,i._updateDrawingOrderHandle=null,i.onViewExtentUpdateHandle=null,i._resolveWhenReady=[],i.propertiesPool=new ne.default({slicePlane:le.BoundedPlaneClass},i),i._resourceController=te.newResourceController(i),i._defaultToMapOptions={include:new Set},i._defaultHitTestOptions={exclude:new Set},i.deconflictor=new W.Deconflictor({view:i}),i.labeler=new q.Labeler({view:i}),i.renderSpatialReference=null,i.sharedSymbolResources=null,i.basemapTerrain=null,i.elevationProvider=null,i.camera=null,i.canvas=null,i.center=null,i.constraints=new A.default,i.extent=null,i.fullOpacity=1,i.graphicsView=null,i.groundView=null,i.map=null,i.screenSizePerspectiveEnabled=!0,i.state=null,i.scale=null,i.spatialReference=null,i.isHeightModelInfoRequired=!0,i.alphaCompositingEnabled=!1,i.supersampleScreenhotsEnabled=!0,i.type="3d",i.ui=new ve,i.updating=!1,i.updatingPercentage=0,i.viewpoint=null,i.zoom=null,i.highlightOptions=new ee,e&&e.environment||(i._defaults.environment=new F,i.environment=i._defaults.environment);var r=function(){i.notifyChange("dataExtent"),i._evaluateUpdating()};i._handles.add([R.when(i,"ready",function(e,t){return i._viewReadyHandler(t)}),R.on(i,"map.allLayers","change",r,r,r,!0),i.allLayerViews.on("change",function(e){return i._updateUpdatingMonitors(e)}),i.watch("map",function(e){e&&e.load&&e.load()})]),i.inputManager=new N({view:i});var n=function(){return i.notifyChange("pixelRatio")};return i.stateManager=new K.ViewStateManager({view:i,updateDevicePixelRatio:n}),i}return i(o,t),o.prototype.initialize=function(){var e=this;this.groundView=new U({view:this}),this.environmentManager=new j.default({view:this}),this._updateUpdatingMonitors({added:this.allLayerViews.toArray(),removed:[]});var t=function(){return e._updateDefaultToMapOptions()};this._handles.add([this.watch("stationary",function(){return e._evaluateUpdating()}),this.layerViewManager.watch("updating",function(){return e._evaluateUpdating()}),this.resourceController.memoryController.events.on("updating-changed",function(){return e._evaluateUpdating()}),this.labeler.watch("updating",function(){return e._evaluateUpdating()}),this.deconflictor.watch("updating",function(){return e._evaluateUpdating()}),this.environmentManager.watch("updating",function(){return e._evaluateUpdating()}),this.inputManager.watch("hasPendingInputs",function(){return e._evaluateUpdating()}),R.whenNot(this,"ready",function(t,i){return e._viewUnreadyHandler(i)}),R.init(this.qualitySettings,"memoryLimit",function(t){e.resourceController&&(e.resourceController.memoryController.maxMemory=t)}),R.init(this.qualitySettings,"additionalCacheMemory",function(t){e.resourceController&&(e.resourceController.memoryController.additionalCacheMemory=t)}),R.init(this.qualitySettings,"frameRate",function(e){return S.setFrameDuration(e>0?1e3/Math.ceil(e):0)}),R.init(X,"SCENEVIEW_LOCKING_LOG",function(t){return e.defaultsFromMap.logDebugInformation=t}),R.on(this,"map.allLayers","after-changes",t,t,t),R.init(this,"map.ground",t,!0),R.init(this,"map.ground.opacity",function(){return e._updateDefaultHitTestOptions()},!0)])},o.prototype.destroy=function(){this.activeTool=null,this.layerViewManager.clear(),this.stateManager.deinit(),this.groundView.destroy(),this.groundView=null,this.destroyViewData(),this._disposeSurface(),this._disposeGraphicsView(),this.sharedSymbolResources&&(this.sharedSymbolResources.destroy(),this.sharedSymbolResources=null),this._lostWebGLContextHandle&&(this._lostWebGLContextHandle.remove(),this._lostWebGLContextHandle=null),this._stage&&(this._stage.dispose(),this._stage=null,this._handles.remove("stage")),this.state&&this.state.destroy(),this._set("canvas",null),this.labeler.destroy(),this.labeler=null,this.deconflictor.destroy(),this.deconflictor=null,this._resourceController.destroy(),this._resourceController=null,this.environmentManager.destroy(),this._set("environmentManager",null),this.stateManager.destroy(),this._set("stateManager",null),this.inputManager.destroy(),this._set("inputManager",null),this._handles.destroy(),this.propertiesPool.destroy(),this.propertiesPool=null},Object.defineProperty(o.prototype,"clippingArea",{get:function(){if("global"===this.viewingMode)return null;if(this._userClippingArea)return this._userClippingArea;var e=this.get("map.clippingEnabled"),t=this.get("map.clippingArea");return e&&t?t instanceof l.Extent?I.canProject(t.spatialReference,this.spatialReference)?(t=I.project(t,this.spatialReference),this._clippingArea&&t&&this._clippingArea.equals(t)?this._clippingArea:(this._clippingArea=t,t)):(Re.error("#clippingArea","setting clippingArea with incompatible SpatialReference"),this._clippingArea):(Re.error("#clippingArea","only clippingArea geometries of type Extent are supported"),this._clippingArea):(this._clippingArea=null,null)},set:function(e){this.ready&&"global"===this.viewingMode&&e?Re.error("#clippingArea=","Clipping area is only supported in local viewingMode"):(this._userClippingArea=e,this.notifyChange("clippingArea"))},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"dataExtent",{get:function(){var e=[],t=this.spatialReference||l.SpatialReference.WGS84,i=this.clippingArea;i&&(i=I.project(i,t));var r=function(r){if(r){var n=I.project(r,t);n&&(i&&(n=n.intersection(i)),n&&e.push(n))}},n=this._get("basemapTerrain");if(n&&n.spatialReference&&r(new l.Extent({xmin:n.extent[0],ymin:n.extent[1],zmin:0,xmax:n.extent[2],ymax:n.extent[3],zmax:0,spatialReference:n.spatialReference})),this.map&&this.map.allLayers.forEach(function(e){return r(e.fullExtent)}),e.length>0){var a=e.reduce(function(e,t){return e.union(t)});return a.hasZ?(a.zmin=Math.min(0,a.zmin),a.zmax=Math.max(0,a.zmax)):(a.zmin=0,a.zmax=0),a}return new l.Extent({xmin:0,ymin:0,zmin:0,xmax:0,ymax:0,zmax:0,spatialReference:t})},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"environment",{set:function(e){e!==this._defaults.environment&&(this._externallySet.environment=!0),this._set("environment",e)},enumerable:!0,configurable:!0}),o.prototype.castEnvironment=function(e){return e?e instanceof F?e:e instanceof we?F.fromWebsceneEnvironment(e):T.ensureType(F,e):new F},Object.defineProperty(o.prototype,"pixelRatio",{get:function(){return Math.min(window.devicePixelRatio,this.maximumPixelRatio)},set:function(e){_.isSome(e)?this._override("pixelRatio",e):this._clearOverride("pixelRatio")},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"maximumPixelRatio",{get:function(){var e=1/0,t=this.qualitySettings,i=t.maximumPixelRatio,r=t.maximumRenderResolution;if(null!=i&&(e=Math.min(e,i)),null!=r){var n=Math.max(this.width,this.height),a=r/n;e=Math.min(e,a)}return e},set:function(e){_.isSome(e)?this._override("maximumPixelRatio",e):this._clearOverride("maximumPixelRatio")},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"groundExtent",{get:function(){var e=this._get("basemapTerrain");if(e&&e.spatialReference){var t=e.extent;return new l.Extent({xmin:t[0],ymin:t[1],xmax:t[2],ymax:t[3],spatialReference:e.spatialReference})}var i=this.spatialReference||l.SpatialReference.WGS84;return new l.Extent({spatialReference:i})},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"initialExtentRequired",{get:function(){return this.stateManager&&!this.stateManager.hasInitialView},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"interacting",{get:function(){return!!this.state&&this.state.interacting},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"qualityProfile",{get:function(){return this._get("qualityProfile")||Y.getDefaultProfile()},set:function(e){Y.isValidProfile(e)&&(Y.apply(e,this.qualitySettings),this._set("qualityProfile",e))},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"slicePlane",{set:function(e){if(this._stage.renderView.setRenderParameters({slicePlane:e}),!e)return void this._set("slicePlane",null);var t=this.propertiesPool.get("slicePlane");$.boundedPlane.copy(e,t),this._set("slicePlane",t)},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"resolution",{get:function(){return null!=this.spatialReference?E.getResolutionForScale(this.scale,this.spatialReference):0},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"heightModelInfo",{get:function(){var e=this.getDefaultHeightModelInfo();return null!=e?P.deriveUnitFromSR(e,this.spatialReference):null},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"viewingMode",{get:function(){var e=this.get("map.initialViewProperties.viewingMode"),t=this.spatialReference;return e||(e=!t||fe.isSpatialReferenceSupported(t,"global")?"global":"local"),e},set:function(e){if(this.internallyReady)Re.error("#viewingMode","viewingMode cannot be set once view is ready");else{["local","global"].indexOf(e)>=0?this._override("viewingMode",e):void 0===e&&this._clearOverride("viewingMode")}},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"resourceController",{get:function(){return this._resourceController},enumerable:!0,configurable:!0}),o.prototype.on=function(e,t,i){var r=this.inputManager.viewEvents.register(e,t,i);return r||this.inherited(arguments)},o.prototype.hasEventListener=function(e){return this.inherited(arguments)||this.inputManager&&this.inputManager.viewEvents.hasHandler(e)},o.prototype.toMap=function(e,t){if(!this.ready)return Re.error("#toMap()","Scene view cannot be used before it is ready"),null;var i=t?this._externalToInternalIntersectOptions(t):this._defaultToMapOptions,r=_.isSome(i.graphics)&&(_.isSome(i.graphics.include)||_.isSome(i.graphics.exclude));i.allEnabled=r;var n=M.isSupportedScreenPointEvent(e)?M.createScreenPointFromSupportedEvent(this,e):e,a=M.screenPointObjectToArray(n),o=i.include&&!i.include.has(ge.TERRAIN_ID)||i.exclude&&i.exclude.has(ge.TERRAIN_ID),s=this.sceneIntersectionHelper,l=s.intersectIntersectorScreen(a,null,i,!0,o).results;if(r){for(var p=0,d=l.all;p<d.length;p++){var u=d[p],c=u.toGraphic(this);if(_.isNone(c))return this._intersectResultToMapPoint(u);if(this._testGraphicUidFilter(i.graphics,c))return this._intersectResultToMapPoint(u)}return null}return this._intersectResultToMapPoint(l.min)},o.prototype.toScreen=function(e){if(!this.ready)return Re.error("#toScreen()","Scene view cannot be used before it is ready"),null;var t=null==e.z&&this.basemapTerrain.getElevation(e)||0;return re.pointToVector(e,xe,this.renderSpatialReference,t),this.engineToScreen(xe)},o.prototype.pixelSizeAt=function(e,t){if(!this.ready)return Re.error("#pixelSizeAt()","Scene view cannot be used before it is ready"),null;if("number"==typeof e){var i=this.sceneIntersectionHelper.intersectIntersectorScreen(M.createScreenPointArray(e,t)).results.min;if(!i.getIntersectionPoint(xe))return 0}else if(e instanceof l.Point)re.pointToVector(e,xe,this.renderSpatialReference);else{var i=this.sceneIntersectionHelper.intersectIntersectorScreen(M.createScreenPointArray(e.x,e.y)).results.min;if(!i.getIntersectionPoint(xe))return 0}return this.state.camera.computeScreenPixelSizeAt(xe)},o.prototype.hitTest=function(e,t){if(!this.ready)return Re.error("#hitTest()","Scene view cannot be used before it is ready"),null;var i=M.isSupportedScreenPointEvent(e)?M.createScreenPointFromSupportedEvent(this,e):e,r=M.createScreenPointArray(i.x,i.y),n=t?this._externalToInternalIntersectOptions(t):this._defaultHitTestOptions;n.allEnabled=!0,n.terrainLocationFeedbackEnabled=!0;var a=this.sceneIntersectionHelper.intersectIntersectorScreen(r,null,n,!0,!0),o=a.results.all,s=this._intersectResultsToHits(o,n.graphics),l=a.results.terrain,p={screenPoint:i,results:s,ground:{mapPoint:this._intersectResultToMapPoint(l),distance:l.hasIntersectionPoint?l.distanceInRenderSpace:0}};return X.SCENEVIEW_HITTEST_RETURN_INTERSECTOR&&(p.intersector=a),b.resolve(p)},o.prototype.popupHitTest=function(e){return this.hitTest(e).then(function(t){for(var i=[],r=t.results.length?t.results[0].distance:0,n=0,a=t.results;n<a.length;n++){var o=a[n];if(o.distance!==r)break;i.push(o)}var s=null;return(0===i.length||Math.abs(r-t.ground.distance)<1e-5)&&(s=t.ground.mapPoint),{results:i,screenPoint:e,mapPoint:s}})},o.prototype.goTo=function(e,t){return c.safeCast(this.stateManager.goTo(e,t))},o.prototype.takeScreenshot=function(e){var t=this;return this.whenReady().then(function(){var i=ye.toRenderSettings(e,t);return i.pixelRatio/=t.pixelRatio,t._stage.renderView.takeScreenshot(ye.screenshotSuperSampleSettings(i,t.supersampleScreenhotsEnabled))})},o.prototype.forceDOMReadyCycle=function(){this.forceReadyCycle()},o.prototype.getDefaultSpatialReference=function(){return this.get("map.initialViewProperties.spatialReference")||this.get("defaultsFromMap.spatialReference")||this.get("defaultsFromMap.isSpatialReferenceDone")&&this._initialDefaultSpatialReference||null},o.prototype.validate=function(){var e=me.check();return v("safari")&&v("safari")<9&&(e=new y("sceneview:browser-not-supported","This browser is not supported by SceneView (Safari < 9)",{type:"safari",requiredVersion:9,detectedVersion:v("safari")})),e?(Re.warn("#validate()",e.message),b.reject(e)):b.resolve()},o.prototype.isSpatialReferenceSupported=function(e,t,i){var r=e.isGeographic,n=e.isWebMercator,a=fe.isSpatialReferenceSupported(e,"global"),o="local"===this.viewingMode,s=!(!this._isOverridden("viewingMode")&&!this.get("map.initialViewProperties.viewingMode"));if(s){if(o&&r)return i&&i("Layer "+t.id+" is ignored because it is GCS and viewing mode is local"),!1;if(!o&&!a)return i&&i("Layer "+t.id+" is ignored because its spatial reference is not supported in global viewing mode"),!1}else if(r&&!a)return i&&i("Layer "+t.id+" is ignored because its spatial reference is geographic but unsupported"),!1;if(t)if(ue.isTiledLayer(t)){var l=void 0;if(s){var p=ue.getTiledLayerInfo(t,e,this.viewingMode);l=null!=p.tileInfo}else{var p=ue.getTiledLayerInfo(t,e,"global");null==p.tileInfo&&(p=ue.getTiledLayerInfo(t,e,"local")),l=null!=p.tileInfo}if(!l)return i&&i("Layer "+t.id+" is ignored because it is tiled but\n            its tiling scheme is not supported or compatible with the viewing mode"),!1}else if((e.isWGS84||n)&&!o)return null==this._initialDefaultSpatialReference&&(this._initialDefaultSpatialReference=e),s||this.internallyReady||(this.viewingMode="global",i&&i("Viewing mode locked to global due to reprojectable layer "+t.id)),i&&i("Layer "+t.id+" is ignored because it supports server-side reprojection"),!1;return!0},o.prototype.whenReady=function(){var e=this;return b.create(function(t){e.internallyReady?t(e):e._resolveWhenReady.push(t)})},o.prototype.computeMapPointFromVec3d=function(e,t){var i=this.spatialReference||l.SpatialReference.WGS84;return re.vectorToVector(e,this.renderSpatialReference,e,i)||(i=l.SpatialReference.WGS84,re.vectorToVector(e,this.renderSpatialReference,e,i)),t?(t.x=e[0],t.y=e[1],t.z=e[2],t.spatialReference=i):t=new l.Point(e,i),t},o.prototype.engineToScreen=function(e,t){var i=M.createRenderScreenPointArray3();this.state.camera.projectPoint(e,i);var r=M.screenPointArrayToObject(i);return M.renderToScreen(this,r,t)},o.prototype.flushDisplayModifications=function(){this._stage.processDirty()},o.prototype.getDrawingOrder=function(e){return this.allLayerViews.findIndex(function(t){return t.layer&&t.layer.uid===e})},o.prototype.getViewForGraphic=function(e){return e.layer===this.graphics?this.graphicsView:e.layer?this.allLayerViews.find(function(t){return t.layer===e.layer}):null},o.prototype.graphicChanged=function(e){_.isSome(this.graphicsView)&&this.graphicsView.graphicChanged(e)},o.prototype.whenViewForGraphic=function(e){var t=this;return e.layer===this?R.whenOnce(this,"graphicsView").then(function(){return t.graphicsView}):e.layer?this.whenLayerView(e.layer):b.reject()},o.prototype.getStats=function(){var e=this.resourceController.memoryController,t=this.resourceController.scheduler,i={Memory:e.maxMemory.toFixed(0)+"MB","Memory Used":Math.round(100*e.usedMemory)+"%",Quality:Math.round(100*e.memoryFactor)+"%",Load:t.load.toFixed(1)};this.basemapTerrain&&(i.Terrain=Se(this.basemapTerrain.getUsedMemory())),this.allLayerViews.items.forEach(function(e){k.isMemoryManagedLayerView(e)&&(i[e.layer.title]=Se(e.getUsedMemory()))});var r=this._stage&&this._stage.renderView&&this._stage.renderView.edgeView;if(r){var n=r.getUsedMemory();n>1024&&(i.Edges=Se(n))}return i},o.prototype._intersectResultToMapPoint=function(e,t){if(e.getIntersectionPoint(xe)){t=this.computeMapPointFromVec3d(xe,t);var i=this.basemapTerrain;return"TerrainRenderer"===e.intersector&&i&&(t.z=i.getElevation(t)||0),t}return null},o.prototype._intersectResultsToHits=function(e,t){for(var i=[],r=null,n=0;n<e.length;n++){var a=e[n],o=a.toOwner(this);if(_.isSome(o)&&(o===this.map.ground||"type"in o&&"integrated-mesh"===o.type))break;var s=a.toGraphic(this);if(_.isSome(s)){if(_.isNone(r)&&n!==e.length-1&&(r=new Set),_.isSome(r)){var l=this._getGraphicFilterUid(s);if(r.has(l))continue;r.add(l)}if(this._testGraphicUidFilter(t,s)){var p=this._intersectResultToMapPoint(a),d=a.distanceInRenderSpace;i.push({graphic:s,mapPoint:p,distance:d})}}}return i},o.prototype._getGraphicFilterUid=function(e){if(e.layer&&"objectIdField"in e.layer){var t=e.attributes[e.layer.objectIdField];if(t)return"o-"+e.layer.id+"-"+t}return"u-"+e.uid},o.prototype._testGraphicUidFilter=function(e,t){var i=this._getGraphicFilterUid(t);return _.isNone(e)||(_.isNone(e.include)||e.include.has(i))&&(_.isNone(e.exclude)||!e.exclude.has(i))},o.prototype._externalToInternalRenderItems=function(e,t,i){var r=this;return void 0===i&&(i={layerUids:null,graphicUids:null}),e?(e instanceof p?(be(i,this._getGraphicFilterUid(e)),0===t&&(_.isSome(this.graphicsView)&&e.layer===this.graphicsView?_e(i,this.graphicsView.mockLayerId):e.layer&&_e(i,e.layer.uid))):"forEach"in e?e.forEach(function(e){Array.isArray(e)?r._externalToInternalRenderItems(e,t,i):h.isCollection(e)?e===r.graphics&&_.isSome(r.graphicsView)?_e(i,r.graphicsView.mockLayerId):r._externalToInternalRenderItems(e,t,i):e instanceof d?e===r.map.ground&&_e(i,ge.TERRAIN_ID):r._externalToInternalRenderItems(e,t,i)}):_e(i,e.uid),i):i},o.prototype._externalToInternalIntersectOptions=function(e){var t=this._externalToInternalRenderItems(e.include,0),i=this._externalToInternalRenderItems(e.exclude,1);return{include:t.layerUids,exclude:i.layerUids,graphics:{include:t.graphicUids,exclude:i.graphicUids}}},o.prototype._viewingModeToManifold=function(e){switch(e){case"global":return"spherical";case"local":return"planar"}},o.prototype._initBasemapTerrain=function(e){var t=this;this._disposeBasemapTerrain(),this._set("basemapTerrain",new de(this,this._viewingModeToManifold(e))),this._set("elevationProvider",new J({view:this})),this.elevationProvider.register("ground",this.basemapTerrain),this._handles.add([R.init(this,"map.ground.opacity",function(e){return t.basemapTerrain.baseOpacity=null==e?1:e},!0),R.init(this,"map.ground.surfaceColor",function(e){t.basemapTerrain.backgroundColor=e})],"basemapTerrain")},o.prototype._initGlobe=function(e){var t=this;this._initCoordinateSystem(),this._initState(),this._initBasemapTerrain(e),this._set("pointsOfInterest",new pe.default({view:this})),this._set("featureTiles",new z.default({renderCoordsHelper:this.renderCoordsHelper,cameraOnSurface:this.pointsOfInterest.cameraOnSurface,focus:this.pointsOfInterest.focus,tilingSchemeOwner:this.basemapTerrain,viewState:this.state,scheduler:this._resourceController.scheduler})),this._handles.add([this.featureTiles.watch("updating",function(){return t._evaluateUpdating()}),this.pointsOfInterest.watch("updating",function(){return t._evaluateUpdating()})]),this._handles.add(R.init(X,"FEATURE_TILE_TREE_SHOW_TILES",function(e){e&&t.featureTiles&&!t.featureTilesDebugger?t.featureTilesDebugger=new B.FeatureTileTree3DDebugger(t):!e&&t.featureTilesDebugger&&(t.featureTilesDebugger.destroy(),t.featureTilesDebugger=null)}),"feature-tiles"),this._handles.add(R.init(this,["clippingArea","basemapTerrain.extent"],function(){var e=t.basemapTerrain&&t.basemapTerrain.extent;if(t.clippingArea||e)if(e&&t.basemapTerrain.spatialReference){var i=V.toExtent(t.basemapTerrain.extent,t.basemapTerrain.spatialReference);t.clippingArea?t.featureTiles.filterExtent=i.intersection(t.clippingArea):t.featureTiles.filterExtent=i}else t.featureTiles.filterExtent=t.clippingArea;else t.featureTiles.filterExtent=null},!0),"feature-tiles"),this.stateManager.init()},o.prototype._initCoordinateSystem=function(){var e=this;if(this.spatialReference){var t=this.spatialReference;this.mapCoordsHelper&&this.mapCoordsHelper.spatialReference.equals(t)||this._set("mapCoordsHelper",new ie.default(this.map,t));var i="global"===this.viewingMode,r=i?re.SphericalECEFSpatialReference:t;r!==this.renderSpatialReference&&(this.renderSpatialReference=r,this._set("renderCoordsHelper",oe.RenderCoordsHelper.createMode(this.viewingMode,r)),i||this._handles.add(this.watch("basemapTerrain.extent",function(t){0===t[0]&&0===t[1]&&0===t[2]&&0===t[3]||(e.renderCoordsHelper.extent=t)},!0),"render-coords-helper"),this.sceneIntersectionHelper&&this.sceneIntersectionHelper.setTolerance(he.DEFAULT_TOLERANCE/this.renderCoordsHelper.unitInMeters))}else this._set("mapCoordsHelper",null),this._set("renderCoordsHelper",null),this.renderSpatialReference=null},o.prototype._evaluateUpdating=function(){var e=0,t=0,i=!1;this.allLayerViews.forEach(function(r){if(r.isFulfilled()){if(r.updating){i=!0;var n="updatingPercentage"in r?r.updatingPercentage:null;null!=n&&(++t,e+=n)}}else i=!0}),i=!!(i||!this.stationary||this._createGraphicsViewController||_.isSome(this.graphicsView)&&this.graphicsView.updating||this.layerViewManager&&this.layerViewManager.updating||this._resourceController&&this._resourceController.updating||this.featureTiles&&this.featureTiles.updating||this.pointsOfInterest&&this.pointsOfInterest.updating||this.labeler&&this.labeler.updating||this.deconflictor&&this.deconflictor.updating||this.environmentManager&&this.environmentManager.updating||this.inputManager&&this.inputManager.hasPendingInputs||this.map&&this.map.allLayers&&this.map.allLayers.some(function(e){return!e.isFulfilled()})),i!==this.updating&&this._set("updating",i),0!==t?e/=t:e=i?100:0,this.updatingPercentage!==e&&this._set("updatingPercentage",e)},o.prototype._updateUpdatingMonitors=function(e){for(var t=this,i=0,r=e.removed;i<r.length;i++){var n=r[i];this._handles.remove(n.uid)}for(var a=0,o=e.added;a<o.length;a++){var n=o[a];n.destroyed||this._handles.add([n.watch(["updating","updatingPercentage"],function(){return t._evaluateUpdating()})],n.uid)}this._evaluateUpdating()},o.prototype._disposeSurface=function(){var e=function(e){return e&&e.remove(),null};this._updateDrawingOrderHandle=e(this._updateDrawingOrderHandle),this.onViewExtentUpdateHandle=e(this.onViewExtentUpdateHandle),this.pointsOfInterest&&(this.pointsOfInterest.destroy(),this._set("pointsOfInterest",null)),this.featureTiles&&(this.featureTiles.destroy(),this._set("featureTiles",null)),this._handles.remove("feature-tiles"),this._handles.remove("render-coords-helper"),this._disposeBasemapTerrain(),this.environmentManager&&this.environmentManager.disposeRendering()},o.prototype._disposeBasemapTerrain=function(){var e=this._get("basemapTerrain");e&&(this._handles.remove("basemapTerrain"),e.destroy(),this._set("basemapTerrain",null))},o.prototype._renderScreenshotOverlay=function(e,t){if(this.overlay&&this.overlay.hasVisibleItems){var i=e.getContext("2d");i.putImageData(t,0,0),this.overlay.renderCanvas(e);for(var r=i.getImageData(0,0,t.width,t.height),n=0;n<r.data.length;n++)t.data[n]=r.data[n]}},o.prototype._initStage=function(){var e=this,t={renderContext:this.renderContext,deactivatedWebGLExtensions:this.deactivatedWebGLExtensions,debugWebGLExtensions:this.debugWebGLExtensions,viewingMode:this.viewingMode,alpha:this.alphaCompositingEnabled,canvas:this.renderCanvas,screenshot:{renderOverlay:function(t,i){return e._renderScreenshotOverlay(t,i)}}},i=new Z.SceneIntersectionHelper(this.viewingMode,{forEachLayer:function(t){var i=e._stage.getLayers();Object.keys(i).forEach(function(e){t(i[e])})}},this);this._set("sceneIntersectionHelper",i);var r=g.byId(this.surface);this._stage=new ce(this.viewingMode,r,t,i),this._lostWebGLContextHandle=f.on(this._stage.renderView.getCanvas(),"webglcontextlost",function(){return e.fatalError=new y("webgl-context-lost")}),this._handles.add(R.init(this.qualitySettings,"antialiasingEnabled",function(){e._stage.renderView.setRenderParameters({antialiasingEnabled:e.qualitySettings.antialiasingEnabled})}),"stage");var n=function(){e._stage.renderView.setRenderParameters({defaultHighlightOptions:ee.toEngineOptions(e.highlightOptions)})};this._handles.add(this.watch(["highlightOptions","highlightOptions.color","highlightOptions.haloOpacity","highlightOptions.fillOpacity"],n),"stage"),n(),this.renderCoordsHelper&&this.sceneIntersectionHelper.setTolerance(he.DEFAULT_TOLERANCE/this.renderCoordsHelper.unitInMeters),this._set("canvas",this._stage.renderView.getCanvas())},o.prototype._initSurface=function(){this._initStage(),this._initGlobe(this.viewingMode),this.sharedSymbolResources=new se.default({stage:this._stage,viewingMode:this.viewingMode,resourceController:this._resourceController,pointsOfInterest:this.pointsOfInterest,viewState:this.state})},o.prototype._createGraphicsViewIfNeeded=function(){var e=this;if(!this.graphicsView&&!this._createGraphicsViewController&&0!==this.graphics.length){this._handles.remove("graphics-view"),this._createGraphicsViewController=b.createAbortController();var t=function(){e._createGraphicsViewController=null,e._evaluateUpdating()};this._createGraphicsViewAsync(this._createGraphicsViewController.signal).then(t,t),this._evaluateUpdating()}},o.prototype._createGraphicsViewAsync=function(t){return a(this,void 0,void 0,function(){var i,r,a=this;return n(this,function(n){switch(n.label){case 0:return[4,b.create(function(t){return e(["./3d/layers/GraphicsView3D"],t)})];case 1:return i=n.sent(),b.throwIfAborted(t),[4,R.whenTrueOnce(this.basemapTerrain,"ready",t)];case 2:return n.sent(),r=new i({view:this}),this._set("graphicsView",r),this._handles.add([R.init(r,"updating",function(){return a._evaluateUpdating()})],r.mockLayerId),[2]}})})},o.prototype._disposeGraphicsView=function(){this._createGraphicsViewController&&(this._createGraphicsViewController.abort(),this._createGraphicsViewController=null),this._handles.remove("graphics-view"),_.isSome(this.graphicsView)&&(this._handles.remove(this.graphicsView.mockLayerId),this.graphicsView.destroy(),this._set("graphicsView",null))},o.prototype._initState=function(){this._set("state",new Q.default({viewingMode:this.viewingMode,spatialReference:this.spatialReference}))},o.prototype._viewReadyHandler=function(e){var t=this;if(!e){if("global"===this.viewingMode&&(this._clippingArea=null),this.internallyReady=!0,this._initSurface(),this._handles.add(R.on(this,"graphics","change",function(){return t._createGraphicsViewIfNeeded()}),"graphics-view"),this._createGraphicsViewIfNeeded(),this._evaluateUpdating(),!this._externallySet.environment){var i=this.get("map.initialViewProperties.environment");i&&(this.environment=i)}this._updateDrawingOrderHandle=this.allLayerViews.on("change",function(){return t._updateDrawingOrder()}),this._updateDrawingOrder(),this.labeler.setup(),this.environmentManager.updateReadyChange(!0),this.inputManager.connect();var r=this._resolveWhenReady;this._resolveWhenReady=[],r.forEach(function(e){return e(t)})}},o.prototype._viewUnreadyHandler=function(e){e&&(_.isSome(this.activeTool)&&(this.activeTool.deactivate&&this.activeTool.deactivate(),this._set("activeTool",null)),this._initialDefaultSpatialReference=null,this.inputManager.disconnect(),this.environmentManager.updateReadyChange(!1),this._disposeGraphicsView(),this.internallyReady=!1,this.stateManager.deinit(),this._disposeSurface(),this.state.destroy(),this._set("state",null),this.sharedSymbolResources&&(this.sharedSymbolResources.destroy(),this.sharedSymbolResources=null),this.labeler&&this.labeler.dispose(),this._lostWebGLContextHandle&&(this._lostWebGLContextHandle.remove(),this._lostWebGLContextHandle=null),this._stage&&(this._stage.dispose(),this._stage=null),this._handles.remove("stage"),this._set("canvas",null))},o.prototype._updateDrawingOrder=function(){var e=this.allLayerViews.length-1;this.allLayerViews.forEach(function(t,i){"drawingOrder"in t&&(t.drawingOrder=e-i)})},o.prototype._updateDefaultToMapOptions=function(){if(this._defaultToMapOptions.include.clear(),this.map){this.map.ground&&this._defaultToMapOptions.include.add(ge.TERRAIN_ID);for(var e=0,t=this.map.allLayers.items;e<t.length;e++){var i=t[e];"integrated-mesh"===i.type&&this._defaultToMapOptions.include.add(i.uid)}}},o.prototype._updateDefaultHitTestOptions=function(){if(this._defaultHitTestOptions.exclude.clear(),this.map){this.map.ground&&this.map.ground.opacity<1&&this._defaultHitTestOptions.exclude.add(ge.TERRAIN_ID);for(var e=0,t=this.map.allLayers.items;e<t.length;e++){var i=t[e]
;"integrated-mesh"===i.type&&i.opacity<1&&this._defaultToMapOptions.exclude.add(i.uid)}}},r([x.property({type:G,readOnly:!0,aliasOf:"state.animation"})],o.prototype,"animation",void 0),r([x.property({readOnly:!0})],o.prototype,"basemapTerrain",void 0),r([x.property({readOnly:!0})],o.prototype,"elevationProvider",void 0),r([x.property({type:s,aliasOf:"stateManager.camera"})],o.prototype,"camera",void 0),r([x.property({readOnly:!0})],o.prototype,"canvas",void 0),r([x.property({type:l.Point,aliasOf:"stateManager.center"})],o.prototype,"center",void 0),r([x.property({type:l.Extent,dependsOn:["map.clippingArea?","map.clippingEnabled?","viewingMode"]})],o.prototype,"clippingArea",null),r([x.property({type:A.default})],o.prototype,"constraints",void 0),r([x.property({type:l.Extent,dependsOn:["basemapTerrain.extent","clippingArea","map"],readOnly:!0})],o.prototype,"dataExtent",null),r([x.property({value:null,type:F})],o.prototype,"environment",null),r([x.cast("environment")],o.prototype,"castEnvironment",null),r([x.property()],o.prototype,"environmentManager",void 0),r([x.property({type:l.Extent,aliasOf:"stateManager.extent"})],o.prototype,"extent",void 0),r([x.property({readOnly:!0,aliasOf:"stateManager.screenCenter"})],o.prototype,"screenCenter",void 0),r([x.property({type:Number,dependsOn:["maximumPixelRatio"]})],o.prototype,"pixelRatio",null),r([x.property({type:Number,dependsOn:["qualitySettings.maximumPixelRatio","qualitySettings.maximumRenderResolution","size"]})],o.prototype,"maximumPixelRatio",null),r([x.property({aliasOf:"stateManager.frustum"})],o.prototype,"frustum",void 0),r([x.property({type:Number,readOnly:!0})],o.prototype,"fullOpacity",void 0),r([x.property({readOnly:!0})],o.prototype,"graphicsView",void 0),r([x.property({type:l.Extent,dependsOn:["basemapTerrain.extent"],readOnly:!0})],o.prototype,"groundExtent",null),r([x.property()],o.prototype,"groundView",void 0),r([x.property({type:Boolean,dependsOn:["stateManager.hasInitialView"]})],o.prototype,"initialExtentRequired",null),r([x.property({type:Boolean,dependsOn:["state.interacting"],readOnly:!0})],o.prototype,"interacting",null),r([x.property()],o.prototype,"map",void 0),r([x.property({readOnly:!0})],o.prototype,"mapCoordsHelper",void 0),r([x.property({aliasOf:"stateManager.padding"})],o.prototype,"padding",void 0),r([x.property({type:pe.default,readOnly:!0})],o.prototype,"pointsOfInterest",void 0),r([x.property({type:z.default,readOnly:!0})],o.prototype,"featureTiles",void 0),r([x.property({type:B.FeatureTileTree3DDebugger})],o.prototype,"featureTilesDebugger",void 0),r([x.property({type:Boolean})],o.prototype,"screenSizePerspectiveEnabled",void 0),r([x.property({constructOnly:!0})],o.prototype,"deactivatedWebGLExtensions",void 0),r([x.property({constructOnly:!0})],o.prototype,"debugWebGLExtensions",void 0),r([x.property({constructOnly:!0})],o.prototype,"renderCanvas",void 0),r([x.property({readOnly:!0})],o.prototype,"state",void 0),r([x.property({readOnly:!0})],o.prototype,"inputManager",void 0),r([x.property({readOnly:!0})],o.prototype,"stateManager",void 0),r([x.property({type:["low","medium","high"]})],o.prototype,"qualityProfile",null),r([x.property({type:ae,get:function(){var e=this._get("qualitySettings");return e||(e=new ae,Y.apply(this.qualityProfile,e)),e}})],o.prototype,"qualitySettings",void 0),r([x.property()],o.prototype,"slicePlane",null),r([x.property({dependsOn:["viewingMode"]})],o.prototype,"ready",void 0),r([x.property({readOnly:!0})],o.prototype,"renderCoordsHelper",void 0),r([x.property({readOnly:!0})],o.prototype,"sceneIntersectionHelper",void 0),r([x.property({type:Number,dependsOn:["scale","spatialReference"],readOnly:!0})],o.prototype,"resolution",null),r([x.property({type:Number,aliasOf:"stateManager.scale"})],o.prototype,"scale",void 0),r([x.property()],o.prototype,"heightModelInfo",null),r([x.property({dependsOn:["map.initialViewProperties?.spatialReference","defaultsFromMap.isSpatialReferenceDone"]})],o.prototype,"spatialReference",void 0),r([x.property({type:Boolean,constructOnly:!0})],o.prototype,"alphaCompositingEnabled",void 0),r([x.property({type:Boolean})],o.prototype,"supersampleScreenhotsEnabled",void 0),r([x.property({readOnly:!0})],o.prototype,"type",void 0),r([x.property({type:ve})],o.prototype,"ui",void 0),r([x.property({type:Boolean,readOnly:!0})],o.prototype,"updating",void 0),r([x.property({type:Number,readOnly:!0})],o.prototype,"updatingPercentage",void 0),r([x.property({type:["global","local"],dependsOn:["map.initialViewProperties?.viewingMode","spatialReference"]})],o.prototype,"viewingMode",null),r([x.property({type:u,aliasOf:"stateManager.viewpoint"})],o.prototype,"viewpoint",void 0),r([x.property({type:Number,aliasOf:"stateManager.zoom"})],o.prototype,"zoom",void 0),r([x.property({type:ee})],o.prototype,"highlightOptions",void 0),o=r([x.subclass("esri.views.SceneView")],o)}(x.declared(H,D,C,L)),xe=O.vec3f64.create();return Me});