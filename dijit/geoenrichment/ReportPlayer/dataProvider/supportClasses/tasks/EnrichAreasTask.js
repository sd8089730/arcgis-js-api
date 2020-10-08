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

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/when","esri/dijit/geoenrichment/promise/all","esri/kernel","esri/SpatialReference","esri/tasks/FeatureSet","esri/geometry/Point","../GEUtil","../areas/AnalysisAreaUtil","../attachments/AttributesUtil","../../../core/supportClasses/map/Projector","../../../countryConfig","esri/dijit/geoenrichment/utils/CoordinateUtil"],(function(e,r,t,i,a,n,o,s,u,l,c,f,h,d){function y(e){var r=e&&a.id.findCredential(e)||a.id.credentials[0];return r&&r.token}return e(null,{enrichAreas:function(e){var r={};return t(this._analysisAreasToStudyAreas(e.analysisAreas,e.countryID,e.comparisonLevels),function(t){return r.studyAreas=t,e.report?r.analysisVariables=[{itemid:e.report.reportID,url:e.report.portalUrl,token:y(e.portalUrl),outFields:["*"]}]:e.fields&&(r.analysisVariables=e.fields),this._doRunTask(r,e,"enrich")}.bind(this)).then(this._handleFeatureSetsRequest.bind(this))},createReport:function(e){var r={f:"bin",format:"xml",reportfields:{}};return r.report={itemid:e.report.reportID,url:e.report.portalUrl,token:y(e.portalUrl)},t(this._analysisAreasToStudyAreas(e.analysisAreas,e.countryID,null,e.getAttributes),function(t){return r.studyAreas=t,this._doRunTask(r,e,"createReport")}.bind(this))},_analysisAreasToStudyAreas:function(e,t,a,n){var o=this;return a=a&&a.map((function(e){return{layer:e}})),i(e.map((function(e,s){var u;return e.geographies&&e.geographies.length?(u=o._studyAreaFromGeographies(e.geographies,t,!0),e.feature&&e.feature.attributes&&(u.attributes=r.mixin({},u.attributes,e.feature.attributes))):u={attributes:r.mixin({},e.feature.attributes),geometry:e.feature.geometry.toJson()},a&&(u.comparisonLevels=a),i([o._getStorePointForArea(e),n&&n(e)]).then((function(e){var r=e[0],t=e[1];return u.attributes=u.attributes||{},r&&(u.attributes.STORE_LAT=u.attributes.STORE_LAT||r.STORE_LAT,u.attributes.STORE_LONG=u.attributes.STORE_LONG||r.STORE_LONG),u.attributes.STORE_ID=s+"",t&&t.forEach((function(e){u.attributes[e.name]=c.formatAttributeValueForStudyArea(e)})),u}))})))},_getStorePointForArea:function(e){var r=e.location&&e.location.geometry||e.buffer&&e.buffer.point;if(r){r=r instanceof s?r:new s(r);var i=l.geometryToLatLong(r);return i||t(f.projectGeometries(r,new n(d.WGS_84_WKID)),(function(e){return l.geometryToLatLong(e)}))}},createFeatureForGeographies:function(e,r){return this._createFeaturesForGeographies(e,r,!0).then((function(e){return e[0]}))},createFeaturesForGeographies:function(e,r){return this._createFeaturesForGeographies(e,r,!1)},_createFeaturesForGeographies:function(e,r,t){var i={returnGeometry:!0,outSR:r.outSR||new n(d.WEB_MERCATOR_WKID),studyAreas:t?[this._studyAreaFromGeographies(e,r.countryID,!0,r.generalizationLevel)]:e.map((function(e){return this._studyAreaFromGeographies([e],r.countryID,!1,r.generalizationLevel)}),this),dataCollections:["GlobalIntersect"]};return this._doRunTask(i,r,"enrich").then(this._handleFeatureSetsRequest.bind(this))},_studyAreaFromGeographies:function(e,t,i,a){var n,o={sourceCountry:t,layer:null,ids:null},s=null,u=[];return e.forEach((function(e){if(!e||!e.id)throw new Error("Wrong geography.");var t=e.levelId;if(t)if(s){if(i&&s!==t)throw new Error("Geographies have different level IDs.")}else s=t;u.push(e.id),e.sourceCountry&&(o.sourceCountry=e.sourceCountry),e.hierarchy&&(o.hierarchy=e.hierarchy),e.attributes&&(n=r.mixin(n||{},e.attributes))})),o.layer=s,o.ids=i?[u.join(",")]:u,o.attributes=n,o.generalizationlevel=a,o},createFeaturesForBuffer:function(e,r){r=r||{};var t={bufferUnits:e.units,bufferRadii:e.radii||[e.radius],areaType:e.areaType||"RingBuffer"};"NetworkServiceArea"===t.areaType&&(t.travelMode=e.travelMode,t.networkOptions=e.networkOptions);var i=e.point||e.polyline,a={returnGeometry:!0,outSR:r.outSR||i.spatialReference||new n(d.WEB_MERCATOR_WKID),dataCollections:["GlobalIntersect"],studyAreasOptions:t,studyAreas:[{geometry:i.toJson?i.toJson():i}]};return this._doRunTask(a,r,"enrich").then(this._handleFeatureSetsRequest.bind(this))},createFeaturesForBuffers:function(e,t){var a={},n=[];return e.forEach((function(e){var t=function(e){var r=e.point||e.polyline;return JSON.stringify(r.toJson?r.toJson():r)+";"+e.units+";"+e.areaType+";"+e.travelMode+";"+JSON.stringify(e.networkOptions)}(e),i=a[t],o=!1;if(i){var s=e.radii||[e.radius];i.radii.some((function(e){return-1!==s.indexOf(e)}))&&(i=null,o=!0)}i||(i=r.clone(e),o||(a[t]=i),delete i.radius,i.radii=[],n.push(i)),e.radii?i.radii=i.radii.concat(e.radii):i.radii.push(e.radius)})),i(n.map((function(e){return this.createFeaturesForBuffer(e,t)}),this)).then((function(e){var r=[];return e.forEach((function(e){r=r.concat(e)})),r}))},_doRunTask:function(e,t,i){return e=r.mixin({useData:{sourceCountry:t.countryID,hierarchy:t.hierarchy||h.getHierarchyID()},forStorage:!1},e),u[i](e)},_handleFeatureSetsRequest:function(e){return new o(e[0]).features}})}));