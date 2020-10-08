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

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","../tasks/QueryTask","../tasks/query","./_EventedWidget","dijit/_Widget","./_ObliqueRotationWidget","dojo/_base/array","../ImageSpatialReference","../tasks/ImageServiceProjectTask","../tasks/ProjectParameters","../layers/MosaicRule","../geometry/Extent","../geometry/Polygon","../lang","../config","./RasterList","dojo/store/Observable","dojo/store/Memory","dojo/date/locale","dojo/json","dojo/number","esri/geometry/geometryEngine","dojo/Deferred"],(function(e,t,i,r,s,a,n,o,h,d,c,l,u,f,m,g,p,x,R,y,_,v,E,I,S,L){var D=e([n,o],{declaredClass:"esri.dijit.ObliqueViewer",azimuthField:"SensorAzimuth",elevationThreshold:70,elevationField:"SensorElevation",snap:!0,_refreshOK:!0,isNadir:!1,showThumbnail:!0,noQueryOnExtentChange:!1,azimuthTolerance:10,rasterListRefresh:!0,extents:[],center:null,searchRadius:0,searchUnit:"meters",maxExtentIdx:5,currentExtentIdx:null,esriDataType:{decimal:{esriFieldTypeDouble:1,esriFieldTypeSingle:1},integer:{esriFieldTypeInteger:1,esriFieldTypeSmallInteger:1},date:{esriFieldTypeDate:1},string:{esriFieldTypeString:1},notRequired:{esriFieldTypeGeometry:1,esriFieldTypeBlob:1}},_dateFormats:{shortDate:{datePattern:"M/d/y",selector:"date"},shortDateLE:{datePattern:"d/M/y",selector:"date"},longMonthDayYear:{datePattern:"MMMM d, y",selector:"date"},dayShortMonthYear:{datePattern:"d MMM y",selector:"date"},longDate:{datePattern:"EEEE, MMMM d, y",selector:"date"},shortDateShortTime:{datePattern:"M/d/y",timePattern:"h:mm a",selector:"date and time"},shortDateLEShortTime:{datePattern:"d/M/y",timePattern:"h:mm a",selector:"date and time"},shortDateShortTime24:{datePattern:"M/d/y",timePattern:"H:mm",selector:"date and time"},shortDateLEShortTime24:{datePattern:"d/M/y",timePattern:"H:mm",selector:"date and time"},shortDateLongTime:{datePattern:"M/d/y",timePattern:"h:mm:ss a",selector:"date and time"},shortDateLELongTime:{datePattern:"d/M/y",timePattern:"h:mm:ss a",selector:"date and time"},shortDateLongTime24:{datePattern:"M/d/y",timePattern:"H:mm:ss",selector:"date and time"},shortDateLELongTime24:{datePattern:"d/M/y",timePattern:"H:mm:ss",selector:"date and time"},longMonthYear:{datePattern:"MMMM y",selector:"date"},shortMonthYear:{datePattern:"MMM y",selector:"date"},year:{datePattern:"y",selector:"date"}},setNextExtent:function(){if(!(this.currentExtentIdx>=this.maxExtentIdx||this.currentExtentIdx>=this.extents.length-1)){var e=this;this.currentExtentIdx++;var t,i=new f;i.method=f.METHOD_LOCKRASTER,i.lockRasterIds=[this.extents[this.currentExtentIdx].spatialReference.icsid],e.imageServiceLayer.setMosaicRule(i,!0),e._refreshOK=!1,e.map.spatialReference=this.extents[this.currentExtentIdx].spatialReference,t=x.defaults.map.zoomDuration,x.defaults.map.zoomDuration=0,e.map.setExtent(this.extents[this.currentExtentIdx]).then((function(){e._refreshOK=!0,x.defaults.map.zoomDuration=t}))}},setPreviousExtent:function(){if(!(this.currentExtentIdx<=0)){var e=this;this.currentExtentIdx--;var t,i=new f;i.method=f.METHOD_LOCKRASTER,i.lockRasterIds=[this.extents[this.currentExtentIdx].spatialReference.icsid],e.imageServiceLayer.setMosaicRule(i,!0),e._refreshOK=!1,e.map.spatialReference=this.extents[this.currentExtentIdx].spatialReference,t=x.defaults.map.zoomDuration,x.defaults.map.zoomDuration=0,e.map.setExtent(this.extents[this.currentExtentIdx]).then((function(){e._refreshOK=!0,x.defaults.map.zoomDuration=t}))}},isPreviousAvailable:function(){},isNextAvailable:function(){},_isICS:function(e){return!(!e.ics&&!e.icsid)},resizeRotationGauge:function(e){this._rotationWidget&&this._rotationWidget.resize(e)},_initializeTasks:function(){this.obliqueRecordsQueryTask=new s(this.imageServiceUrl),this.projectTask=new l},_verifyRasterInfoFields:function(){return this.rasterInfoFields&&this.rasterInfoFields.length},_setupRasterList:function(){var e=this,t=[{name:this.imageServiceLayer.objectIdField,alias:"Object ID",display:!0},{name:this.azimuthField,alias:"Azimuth",display:!0},{name:this.elevationField,alias:this.elevationField,display:!0}];this.rasterInfoFields=this._verifyRasterInfoFields()?this.rasterInfoFields:t,this.rasterList=new R({data:new y(new _),showThumbnail:this.showThumbnail,imageServiceUrl:this.imageServiceLayer.url,fields:this.rasterInfoFields},this.rasterListDiv),this.rasterList.on("raster-select",(function(t){e.selectedRasterId=t[e.imageServiceLayer.objectIdField],e.emit("raster-select",{selectedRasterId:e.selectedRasterId}),e.setImage(e.selectedRasterId,e.map.extent),d.forEach(e.filteredRecords,(function(t){delete t.attributes.selected,t.attributes[e.imageServiceLayer.objectIdField]===e.selectedRasterId&&(t.attributes.selected=!0)})),e._rotationWidget&&e._rotationWidget.setAzimuth(t[e.azimuthField])})),this.rasterList.startup()},_setupRotationWidget:function(){var e=this;this._rotationWidget=new h({snap:this.snap,azimuthAngle:this.azimuthAngle},this.rotationDiv),this._rotationWidget.startup(),this.own(this._rotationWidget.on("azimuth-change",(function(t){var i=t.azimuth;e.currentExtentIdx=0,e.extents=[],e.emit("azimuth-change",t),i?(e.azimuthAngle=i,e._checkExtentOrientation(),e._filterByAzimuth(),e._refreshRotationWidget({features:e.records}),e._refreshListDijit(e.filteredRecords),e._refreshImage(e.map.extent),e._oldAzimuth=i,e.isNadir=!1):e._switchToNadir()})))},_refreshRotationWidget:function(e){this._rotationWidget&&this._rotationWidget.refresh(e)},_checkExtentOrientation:function(){this._oldAzimuth;var e=this._oldAzimuth-this.azimuthAngle,t=Math.abs(e/90%2);this._azimuthExtentChanged=!(t<.25||t>1.75)},_refreshListDijit:function(e){var t=this._prepareListData(e);this.rasterList&&this.rasterListRefresh&&this.rasterList.setData(t),this.emit("records-refresh",{records:this.records,filteredRecords:this.filteredRecords})},_prepareListData:function(e){var i,r=[],s=this.imageServiceLayer.objectIdField,a=this.imageServiceLayer.credential;return d.forEach(e,(function(e){(i=this._fomatAttributes(t.clone(e.attributes))).thumbnailUrl=this.imageServiceUrl+"/"+i[s]+"/thumbnail",a&&a.token&&(i.thumbnailUrl+="?token="+a.token),r.push(i)}),this),new y(new _({data:r,idProperty:this.imageServiceLayer.objectIdField}))},_fomatAttributes:function(e){return this.rasterInfoFields.forEach((function(t){e[t.name]=this._getFormattedValue(t,e[t.name])}),this),e},_getFormattedValue:function(e,t){if(!e.format||!p.isDefined(t))return t;var i=E.parse(e.format),r=e.type;return r in this.esriDataType.date?v.format(new Date(t),this._dateFormats[i.dateFormat]):r in this.esriDataType.integer||r in this.esriDataType.decimal?(t=I.format(t,{places:i.places}),i.digitSeparator||this._i18n.group&&(t=t.replace(new RegExp("\\"+this._i18n.group,"g"),"")),t):void 0},clearSelection:function(){this.rasterList&&this.rasterList.clearSelection(),d.forEach(this.records,(function(e){delete e.attributes.selected})),this._refreshListDijit(this.records)},_switchToNadir:function(){var e=!!this.map.extent.spatialReference.icsid,t=this.defaultNadirMosaicRule||this.imageServiceLayer.mosaicRule||new f;if(this.azimuthAngle=null,this._oldAzimuth=null,this._azimuthExtentChanged=!1,t.method=t.method||f.METHOD_NONE,t.where=this.elevationField+">"+this.elevationThreshold,this.defaultNadirMosaicRule=t,this.imageServiceLayer.setMosaicRule(t,e),this.clearSelection(),e){var i,r=this;this.projectGeometry(this.map.extent,this.nadirSpatialReference).then((function(e){r._verifyExtent(e[0])&&(r._refreshOK=!1,r.map.spatialReference=e[0].spatialReference,r.spatialReferenceChanged(),i=x.defaults.map.zoomDuration,x.defaults.map.zoomDuration=0,r.map.setExtent(new m(e[0]).setSpatialReference(e[0].spatialReference)).then((function(){r._refreshOK=!0,r.isNadir=!0,x.defaults.map.zoomDuration=i,r.selectedRasterId=null,r.selectedRaster=null,r.filteredRecords=null})))}))}},projectGeometry:function(e,t){var i=new u;return t=t||this.map.spatialReference,i.geometries=[e],i.outSR=t,this.projectTask.execute(i)},_verifyExtent:function(e){return!(isNaN(e.xmin)||isNaN(e.xmax)||isNaN(e.ymin)||isNaN(e.ymax))},_verifyPoint:function(e){return!isNaN(e.x)&&!isNaN(e.y)},_refreshRecords:function(e){var t=this,i=this.map.extent;i&&(i.spatialReference.icsid||i.spatialReference.ics);function r(i){t._verifyExtent(i[0].getExtent())?(t.nadirExtent=i[0].getExtent(),t.search(t._trimExtent(t.nadirExtent,.15)).then((function(r){if(!r||!r.features)return t.emit("no-records",{message:"records not provided.",extent:t.nadirExtent}),t._refreshRotationWidget({features:[]}),t._refreshListDijit(t.filteredRecords),console.log("Oblique viewer: no records returned");t.records=r.features,t._refreshRotationWidget({features:t.records}),t.isNadir?(t._refreshListDijit(t.records),t.emit("extent-change",{geometry:t.filteredRecords?t._getIntersectGeometry(i[0]):i[0]})):(t._filterByAzimuth(),t._refreshListDijit(t.filteredRecords),e&&t.filteredRecords&&t.filteredRecords.length&&t._refreshImage(t.map.extent),t.emit("extent-change",{geometry:t.filteredRecords?t._getIntersectGeometry(i[0]):i[0]}))}))):(console.error("Oblique viewer: Project Operation returned invalid extent"),t.search(t._trimExtent(t.map.extent,.15)).then((function(i){if(!i||!i.features)return t.emit("no-records",{message:"records not provided.",extent:t.map.extent}),t._refreshRotationWidget({features:[]}),t._refreshListDijit(t.filteredRecords),console.log("Oblique viewer: no records returned");t.records=i.features,t._refreshRotationWidget({features:t.records}),t.isNadir?t._refreshListDijit(t.records):(t._filterByAzimuth(),t._refreshListDijit(t.filteredRecords),e&&t.filteredRecords&&t.filteredRecords.length&&t._refreshImage(new g(t.filteredRecords[0].geometry).getExtent()))})))}this.nadirSpatialReference.equals(this.map.extent.spatialReference)?r([this.map.extent]):this.projectGeometry(this._convertExtentToPolygon(this.map.extent),this.nadirSpatialReference).then(r)},_convertExtentToPolygon:function(e){var t=new g(e.spatialReference);return t.addRing([[e.xmax,e.ymin],[e.xmax,e.ymax],[e.xmin,e.ymax],[e.xmin,e.ymin],[e.xmax,e.ymin]]),t},postCreate:function(){this.inherited(arguments),this.map&&this.imageServiceLayer||console.error("ObliqueViewer: Map or Image service layer not provided."),this.imageServiceUrl=this.imageServiceLayer.url,this.nadirSpatialReference=this.map.extent.spatialReference,this._initializeTasks(),this.isNadir=!p.isDefined(this.azimuthAngle),this.isNadir&&this._switchToNadir(),this.rotationDiv&&this._setupRotationWidget(),this.rasterListDiv&&(this.imageServiceLayer.loaded?this._setupRasterList():this.imageServiceLayer.on("load",t.hitch(this,this._setupRasterList))),this.sorter||(this.sorter=this._sortSpatially),this.own(this.map.on("extent-change",t.hitch(this,(function(e){this._refreshOK&&!this.noQueryOnExtentChange&&(this._isICS(this.map.extent.spatialReference)||(this.nadirExtent=this.map.extent,this._switchToNadir(),this.emit("extent-change",{geometry:this.filteredRecords?this._getIntersectGeometry(this._convertExtentToPolygon(this.nadirExtent)):this._convertExtentToPolygon(this.nadirExtent)})),this._refreshRecords(!0),this._azimuthExtentChanged=!1)})))),p.isDefined(this.azimuthAngle)&&!this.noQueryOnExtentChange&&this._refreshRecords()},_refreshImage:function(e){this.filteredRecords&&this.filteredRecords.length&&this.selectedRasterId!==this.filteredRecords[0].attributes[this.imageServiceLayer.objectIdField]?this._setSelectedRaster(e):this._refreshSavedExtents()},_refreshSavedExtents:function(){if(this._isICS(this.map.extent.spatialReference)){this.extents&&this.extents.length?(this.extents.length>this.maxExtentIdx&&(this.extents.shift(),this.currentExtentIdx--),this.currentExtentIdx<this.extents.length-1?this.currentExtentIdx=this.extents.length-1:this.currentExtentIdx++):(this.currentExtentIdx=0,this.extents=[]),this.extents.push(this.map.extent)}},_createExtent:function(e,t,i){var r=i.getWidth()/2*1.00001,s=i.getHeight()/2;return new m(e.x-r,e.y-s,e.x+r,e.y+s,t)},spatialReferenceChanged:function(){this.imageServiceLayer.handleSpatialReferenceChange()},setImage:function(e,t){if(!e)return console.error("Object ID of raster to be displayed not provided");var i,r,s,a,n=this,o=t&&(t.spatialReference.icsid||t.spatialReference.ics)?t:null;function h(t){if(o){if(!n._verifyPoint(t[0]))return console.log("Project operation returned invalid result.");a=n._createExtent(t[0],n.imageSpatialReference,o)}else{if(!o&&!n._verifyExtent(t[0]))return console.log("Project operation returned invalid extent.");a=t[0]}(i=new f).method=f.METHOD_LOCKRASTER,i.lockRasterIds=[e],n.imageServiceLayer.setMosaicRule(i,!0),n._refreshOK=!1,n.map.spatialReference=a.spatialReference,n.spatialReferenceChanged(),r=x.defaults.map.zoomDuration,s=x.defaults.map.panDuration=0,x.defaults.map.zoomDuration=0,x.defaults.map.panDuration=0,n.map.setExtent(new m(a).setSpatialReference(a.spatialReference)).then((function(){n._refreshOK=!0,x.defaults.map.zoomDuration=r,x.defaults.map.panDuration=s,n._refreshSavedExtents(),n.projectGeometry(n._convertExtentToPolygon(a),n.nadirSpatialReference).then((function(e){n.emit("extent-change",{geometry:n.filteredRecords?n._getIntersectGeometry(e[0]):e[0]})}))})),n.center&&n.projectGeometry(n.center,n.imageSpatialReference).then((function(e){n.emit("add-point",{point:e[0]})}))}this.imageSpatialReference=new c({icsid:e,url:this.imageServiceUrl}),t&&t.spatialReference&&!t.spatialReference.ics&&!t.spatialReference.icsid?(n.nadirExtent=t.getExtent(),n.projectGeometry(n.nadirExtent,n.imageSpatialReference).then(h)):this.projectGeometry(this._convertExtentToPolygon(t),this.nadirSpatialReference).then((function(e){n.nadirExtent=e[0].getExtent().setSpatialReference(n.nadirSpatialReference),n.projectGeometry(t.getCenter(),n.imageSpatialReference).then(h)}))},locate:function(e){if(!e)return console.error("Geometry not specified.");var t,i,r=this,s=e.type;s&&"extent"===s?t=e:s&&"point"===s?(i=S.buffer(e,100,"meters"),t=i.getExtent()):(i=S.buffer(e.getExtent().getCenter(),100,"meters"),t=i.getExtent()),this.center=t.getCenter(),this.search(e).then((function(e){r.setData(e.features,t)}))},search:function(e){if(!e)return console.error("Oblique viewer: no geometry provided for search.");var t,i=new L,r=this;return(t=new a).geometry=e,t.outFields=this._getQueryFields()||[this.imageServiceLayer.objectIdField,this.azimuthField],t.returnGeometry=!0,t.where=this.elevationField+"<"+this.elevationThreshold,t.outSpatialReference=e.spatialReference,this.obliqueRecordsQueryTask.execute(t).then((function(t){i.resolve({features:r.sorter(r._processRecords(t.features),e)})})),i.promise},_sortSpatially:function(e,t){if(e&&e.length&&this.map.loaded){var i,r,s,a,n,o=0,h=0,c=e[0],l=0,u=this.nadirExtent||this.map.extent;for(t&&"extent"===t.type&&t.spatialReference.equals(e[0].geometry.spatialReference)&&(u=t),n=u.getCenter(),this.selectedRaster&&this._extentContained(this.selectedRaster,u)&&(d.some(e,(function(t,i){if(t.attributes[this.imageServiceLayer.objectIdField]===this.selectedRasterId)return s=e[i],e[i]=c,e[0]=s,!0}),this),l=1),o=l;o<e.length;o++){for(i=Math.sqrt((e[o].center.x-n.x)*(e[o].center.x-n.x)+(e[o].center.y-n.y)*(e[o].center.y-n.y)),a=o,h=o+1;h<e.length;h++)i>(r=Math.sqrt((e[h].center.x-n.x)*(e[h].center.x-n.x)+(e[h].center.y-n.y)*(e[h].center.y-n.y)))&&(c=e[h],i=r,a=h);o!==a&&(s=e[o],e[o]=c,e[a]=s)}}return e},_filterByAzimuth:function(){this.filteredRecords=[],d.forEach(this.records,(function(e){Math.min(Math.abs(e.attributes[this.azimuthField]-this.azimuthAngle),Math.abs(e.attributes[this.azimuthField]-this.azimuthAngle-360))<=this.azimuthTolerance&&this.filteredRecords.push(e)}),this),this.filteredRecords&&this.filteredRecords.length&&!this.isNadir&&(this.filteredRecords[0].attributes.selected=!0)},_processRecords:function(e){var t;return d.forEach(e,(function(e){t=new g(e.geometry).setSpatialReference(this.nadirSpatialReference).getCentroid(),e.center=t}),this),0===e.length?(this.filteredRecords=null,this.selectedRasterId=null,e=null):this.emit("records-found",{message:"records are found."}),e},_computeAzimuthFilter:function(){var e=(this.azimuthAngle+350)%360,t=(this.azimuthAngle+10)%360;return e<t?this.azimuthField+" BETWEEN "+e+" AND "+t:"("+this.azimuthField+" BETWEEN 0 AND "+t+" OR "+this.azimuthField+" BETWEEN "+e+" AND 360)"},_getIds:function(e){var t=[],i=this;return d.forEach(e,(function(e){t.push(e.attributes[i.imageServiceLayer.objectIdField])})),t},_setRasterListRefreshAttr:function(e){if(this._set("rasterListRefresh",e),e){var t=this.isNadir?this.records:this.filteredRecords;this._refreshListDijit(t)}},_extentContained:function(e,t){if(!e||!t)return!1;var i=new g(e.geometry).getExtent();return this._trimExtent(i,.2).contains(t)},setData:function(e,i){if(!e)return this.emit("no-records",{message:"records not provided.",extent:i}),this._refreshRotationWidget({features:[]}),this._refreshListDijit(this.filteredRecords),console.error("Oblique viewer: records not provided.");i=i||this.map.extent,this._set("records",e),this._refreshRotationWidget({features:e}),this._filterByAzimuth(),this.filteredRecords&&this.filteredRecords.length?(this._refreshListDijit(this.filteredRecords),this.imageServiceLayer.loaded?this._setSelectedRaster(i):this.imageServiceLayer.on("load",t.hitch(this,(function(){this._setSelectedRaster(i)})))):(this.selectedRaster=null,this.selectedRasterId=null,this.emit("raster-select",{selectedRasterId:null}))},_setSelectedRaster:function(e){this.selectedRaster=this.filteredRecords[0],this.selectedRasterId=this.selectedRaster.attributes[this.imageServiceLayer.objectIdField],this.setImage(this.selectedRaster.attributes[this.imageServiceLayer.objectIdField],e),this.emit("raster-select",{selectedRasterId:this.selectedRasterId})},setExtent:function(e){var t=new L,i=this;return this.projectGeometry(e,this.map.spatialReference).then((function(e){i._verifyExtent(e[0])&&i.map.setExtent(e[0]).then((function(){t.resolve()}))})),t.promise},zoomToSelectedImage:function(){return p.isDefined(this.selectedRasterId)?this.isNadir?console.log("Viewer in nadir mode, no selected raster."):void this._getImageGeometry(this.selectedRasterId).then(t.hitch(this,(function(e){this.map.setExtent(e.getExtent())}))):console.error("Oblique viewer: no selected raster.")},_getImageGeometry:function(e){var i,r,s=new a,n=new L;return s.objectIds=[e],s.returnGeometry=!0,this.obliqueRecordsQueryTask.execute(s).then(t.hitch(this,(function(e){e.features&&e.features.length&&(r=e.features[0])&&r.geometry&&(i=new g(r.geometry),this.projectGeometry(i,this.map.spatialReference).then(t.hitch(this,(function(e){e&&e.length&&(i=new g(e[0]).setSpatialReference(this.map.spatialReference),n.resolve(i))}))))}))),n.promise},_getQueryFields:function(){var e=[];return d.forEach(this.rasterInfoFields,(function(t){t.name&&e.push(t.name)})),d.indexOf(e,this.azimuthField)<0&&e.push(this.azimuthField),d.indexOf(e,this.imageServiceLayer.objectIdField)<0&&e.push(this.imageServiceLayer.objectIdField),e},_trimExtent:function(e,t){var i,r,s,a;return t=t||.15,i=e.ymax-e.ymin,e.xmax-e.xmin,s=i*(1-t),r=i*(1-t),a=e.getCenter(),new m({xmin:a.x-r/2,ymin:a.y-s/2,xmax:a.x+r/2,ymax:a.y+s/2,spatialReference:e.spatialReference})},_getIntersectGeometry:function(e){var t,i=this;return p.isDefined(this.selectedRasterId)?d.some(this.filteredRecords,(function(e){if(e.attributes[i.imageServiceLayer.objectIdField]==i.selectedRasterId)return t=e.geometry,!0}))?S.intersect(e,t):void 0:e}});return i("extend-esri")&&t.setObject("dijit.ObliqueViewer",D,r),D}));