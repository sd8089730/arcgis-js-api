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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/promise/all","dojo/Deferred","../request","../tasks/query","../tasks/RelationshipQuery","../dijit/FeatureLayerQueryResult","dojo/i18n!../nls/jsapi"],(function(e,t,r,n,s,a,i,o,u,d,c){var h=e(null,{layer:null,data:null,objectIds:null,idProperty:"id",totalCount:0,batchCount:25,where:null,orderByFields:null,getAttachments:!1,getRelatedRecords:!1,constructor:function(t){if(e.safeMixin(this,t),this.data=[],this.idProperty=this.layer.objectIdField,!this.idProperty){var r=JSON.parse(this.layer._json);r.uniqueIdField&&r.uniqueIdField.name&&(this.idProperty=r.uniqueIdField.name)}},get:function(e){return this.data[e]},getIdentity:function(e){return e[this.idProperty]},query:function(e,n){var i=new a,u=new o,c=n.start||0,h=n.count||this.batchCount,l=this.layer.relationships,f=this.layer.advancedQueryCapabilities,y=n.objectIds||this.objectIds,p={fields:[],features:[],attachmentInfos:{},relatedRecordInfos:{},count:0,total:this.totalCount,exceededTransferLimit:!1};y&&y.length?u.objectIds=y.length>=c+this.batchCount?y.slice(c,c+h):y.slice(c):(u.start=c,u.num=h,u.where=this.where);var m=f&&f.supportsOrderBy&&this.orderByFields&&this.orderByFields.length;return m&&(u.orderByFields=this.orderByFields),f&&f.supportsQueryWithCacheHint&&(u.cacheHint=!0),u.returnGeometry=!1,u.outFields=["*"],this.layer.queryFeatures(u).then(t.hitch(this,(function(e){if(e.features&&e.features.length){var n=e.objectIdFieldName;n||(r.some(e.fields,(function(e,t){if("esriFieldTypeOID"===e.type)return n=e.name,!1})),!n&&e.uniqueIdField&&(n=e.uniqueIdField.name),n||(n=this.idProperty));var a=[],o=[],d={};this.objectIds&&!m&&(r.forEach(e.features,(function(e,t){d[e.attributes[n]]=e})),e.features=r.map(u.objectIds,(function(e){return d[e]})));var c=r.map(e.features,(function(e){var t=e.attributes,r=t[n];return a.push(r),this.data[r]=e,t}),this);p.exceededTransferLimit=!!e.exceededTransferLimit,p.count=e.features.length,p.features=c,p.fields=e.fields,this.getAttachments&&this.getRelatedRecords?(o.push(this._queryAttachments(a)),r.forEach(l,(function(e){o.push(this._queryRelatedRecords(a,e))}),this),s(o).then(t.hitch(this,(function(e){p.attachmentInfos=this._createAttachmentInfoLookup(e.shift()),p.relatedRecordInfos=this._createRelatedRecordInfoLookup(e),i.resolve(p)}))).otherwise((function(){i.resolve(p)}))):this.getRelatedRecords?(r.forEach(l,(function(e){o.push(this._queryRelatedRecords(a,e))}),this),s(o).then(t.hitch(this,(function(e){p.relatedRecordInfos=this._createRelatedRecordInfoLookup(e),i.resolve(p)}))).otherwise((function(){i.resolve(p)}))):this.getAttachments?this._queryAttachments(a).then(t.hitch(this,(function(e){p.attachmentInfos=this._createAttachmentInfoLookup(e),i.resolve(p)}))).otherwise((function(){i.resolve(p)})):i.resolve(p)}else i.resolve(p)}))).otherwise((function(e){i.reject(p)})),new d(i)},_queryRelatedRecords:function(e,t){var r=this.layer,n=r.advancedQueryCapabilities;if(n&&n.supportsAdvancedQueryRelated)return this._queryRelatedRecordCount(e,t);var s=new u;return s.outFields=["*"],s.returnGeometry=!1,s.relationshipId=t.id,s.objectIds=e,r.queryRelatedFeatures(s)},_queryRelatedRecordCount:function(e,t){var r=this.layer._url.path+"/queryRelatedRecords";return i({url:r,content:{f:"json",objectIds:e.toString(),outFields:["*"],returnGeometry:!1,relationshipId:t.id,returnCountOnly:!0},handleAs:"json",callbackParamName:"callback"})},_createRelatedRecordInfoLookup:function(e){var t=this.layer.relationships,n={};return r.forEach(e,(function(e,r){n[t[r].id]=e})),n},_queryAttachments:function(e){var t=this.layer._url.path+"/queryAttachments";return i({url:t,content:{f:"json",objectIds:e.toString()},handleAs:"json",callbackParamName:"callback"})},_createAttachmentInfoLookup:function(e){var t=e.attachmentGroups,n={};return r.forEach(t,(function(e){n[e.parentObjectId]={attachments:e.attachmentInfos}})),n}});return n("extend-esri")&&t.setObject("dijit.FeatureLayerQueryStore",h,c),h}));