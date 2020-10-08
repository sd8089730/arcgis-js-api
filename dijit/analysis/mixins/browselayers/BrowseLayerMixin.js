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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/query","../../../../kernel","../../../../request","../../../../lang","../../../../layers/CSVLayer","../../../../arcgis/Portal","../../../../SpatialReference","../../ProjectExtent","dojo/Deferred","../../ItemTypes","../../utils","./configs/AGOLBrowseItem","./configs/EnterpriseBrowseItem","dojo/i18n!../../nls/BrowseLayerMixin"],(function(e,t,s,i,r,o,n,a,l,c,h,u,d,m,y,g,p,f){var w=e([],{tableSupportedTools:["JoinFeatures","SummarizeAttributes","ExtractData","GeocodeLocationsfromTable","CopyToDataStore","AppendData","CalculateField","MergeLayers","DescribeDataset","DetectIncidents"],allowedItemTypes:[],defaultItemTypes:[m.MS,m.FS],availableItemTypeFilters:["layers","featureLayers"],_createBrowseItems:function(e,t,s){var i=e||{},r=i.browseValue||{},o=t||{},n=this.defaultItemTypes.concat(this.get("allowedItemTypes"));if(this.useArcGISComponents)this.setUpItemBrowser(i,o,s).then(function(){this.map&&this._chopExtentAtDateLine(this.map.extent).then(this._projectExtentAndDispatch.bind(this))}.bind(this));else{var a,l=[];n.forEach((function(e){l.push('type:"'+e+'"')})),"browse"===r?((a=this._browsedlg.browseItems.get("query")).custom=this._queryTagsForLivingAtlasBrowseItems(o),this._browsedlg.browseItems.set("extent",this.get("map").extent),this._browsedlg.browseItems.set("query",a),this._browsedlg.show()):(this.showGeoAnalyticsParams&&l.push('type:"'+m.BIGDATA+'"'),(a=this._browseLyrsdlg.browseItems.get("query")).types=l,this._browseLyrsdlg.browseItems.set("query",a),o.geometryTypes?(this._browseLyrsdlg.browseItems.plugIn.checkGeometryType=!0,o.geometryTypes.length>0&&(this._browseLyrsdlg.browseItems.plugIn.geometryTypes=o.geometryTypes)):this._browseLyrsdlg.browseItems.plugIn.checkGeometryType=!1,o.layerTypes?(this._browseLyrsdlg.browseItems.plugIn.checkLayerType=!0,o.layerTypes.length>0&&(this._browseLyrsdlg.browseItems.plugIn.layerTypes=o.layerTypes)):this._browseLyrsdlg.browseItems.plugIn.checkLayerType=!1,o.customCheck?(this._browseLyrsdlg.browseItems.plugIn.customCheckHandler=o.customCheck.customCheckHandler,this._browseLyrsdlg.browseItems.plugIn.customCheckFailureMessage=o.customCheck.customCheckFailureMessage):this._browseLyrsdlg.browseItems.plugIn.customCheckHandler=void 0,this._browseLyrsdlg.show())}},setUpItemBrowser:function(e,i,r){var o=new d;return window.require(["arcgis-components/wrappers/ItemBrowser","esri/arcgis/Portal"],function(a,l){if(!this.ib){var c=document.createElement("div");!e.isDialog&&document.body.appendChild(c);var h=new l.Portal(this.portalSelf&&this.portalSelf.urlKey&&this.portalSelf.customBaseUrl?location.protocol+"//"+this.portalSelf.urlKey+"."+this.portalSelf.customBaseUrl+"/sharing/rest":(this.portalSelf&&this.portalSelf.portalHostname?location.protocol+"//"+this.portalSelf.portalHostname:this.portalUrl)+"/sharing/rest"),u=this.defaultItemTypes.concat(this.get("allowedItemTypes")),d=function(){this._closeFullScreenBrowser(),e.isDialog&&this._closeDialog(),this._resetSelectBox(r),!e.isDialog&&this._removeDOMfromBody(c)},y=function(t){this._closeFullScreenBrowser(),e.isDialog&&this._closeDialog(),t[0]&&t[0].type===m.RFT?this.onSelectRFTTool.bind(this)(t[0],h):t[0]&&t[0].type===m.DLPK?this.onSelectDLPKTool.bind(this)(t[0],h):this.onBrowseItemSelect.bind(this)(t[0],h,r),!e.isDialog&&this._removeDOMfromBody(c)},f=function(t){this._closeFullScreenBrowser(),e.isDialog&&this._closeDialog(),this.onSelectGPTool.bind(this)(t),!e.isDialog&&this._removeDOMfromBody(c)},w=function(t){this._closeFullScreenBrowser(),e.isDialog&&this._closeDialog(),this.onEditRFTTool.bind(this)(t,h),!e.isDialog&&this._removeDOMfromBody(c)},b=function(t){this._closeFullScreenBrowser(),e.isDialog&&this._closeDialog(),this.onBrowseItemSelect.bind(this)(t,h,r),!e.isDialog&&this._removeDOMfromBody(c)},T=function(t){e.isDialog&&this._closeDialog(),t&&t.type===m.RFT?this.onEditRFTTool.bind(this)(t,h):this.onBrowseItemSelect.bind(this)(t,h,r,!0),!e.isDialog&&this._removeDOMfromBody(c)};this.tableSupportedTools.indexOf(this.helpFileName)>-1&&(u=u.concat([this.showGeoAnalyticsParams?m.TABLE:m.BTABLE])),h.signIn().then(function(){this._fetchGroupForRFT(h).then(function(r){u.indexOf(m.IS)>-1?this.availableItemTypeFilters=["layers","featureLayers","mapImageLayers","imageryLayers"]:-1===u.indexOf(m.GPSERVICE)&&-1===u.indexOf(m.RFT)&&-1===u.indexOf(m.FILE)&&(this.availableItemTypeFilters=this.availableItemTypeFilters.concat(["layers","featureLayers"])),this.tableSupportedTools.indexOf(this.helpFileName)>-1&&(this.availableItemTypeFilters=this.availableItemTypeFilters.concat(["tables"]));var l={allowedItemTypes:this.showGeoAnalyticsParams?[m.BIGDATA].concat(u):u,availableItemTypeFilters:this.showGeoAnalyticsParams?this.availableItemTypeFilters.concat(["bigDataFileShares"]):this.availableItemTypeFilters,customQueryTags:i,addQueryParameters:e.addQueryParameters,portal:h,isPortal:this.isSingleTenant,onSelectSubLayer:b.bind(this),onActionSubLayer:T.bind(this),onSelectGPTool:f.bind(this),onEditRFT:w.bind(this),rftGroupId:r,disableLAAL:e.disableLAAL,disableBoundary:e.disableBoundary,title:e.title,disabledSubResources:this._getDisableResources(e.disabledSubResources),showRFTSystemSection:null==e.showRFTSystemSection||e.showRFTSystemSection,showRFTEditCustomAction:null==e.showRFTEditCustomAction||e.showRFTEditCustomAction},S=t.mixin(a.initialState.settings.config,this.isSingleTenant?p.getConfig(l):g.getConfig(l));if(l.allowedItemTypes.indexOf(m.RFT)>-1&&!this.isSingleTenant&&(S.addQueryParameters=function(e){return"all"===e.parameters.section?"-owner: (esri_*)":""}),l.allowedItemTypes.indexOf(m.RFT)>-1&&l.showRFTSystemSection){var _,I=this.isSingleTenant;S.addQueryParameters=function(e){var t;if(!I&&e.parameters&&"all"===e.parameters.section)return"-owner: (esri_*)";if(e.parameters&&e.parameters.searchString&&e.parameters.searchString.current&&"System"===e.parameters.section){var s=e.parameters.searchString.current;return-1===s.indexOf(":")&&(t="tags: ("+s+")"),t||""}return""},s.some(S.customSections,(function(e){if("System"===e.name)return _=e.baseQuery,!0})),require(["arcgis-raster-function-editor/RFxRegistry"],function(e){e.initialize({sysRFxBaseQuery:_,asRFxEditorBuddy:!1,isMultiTenant:!1===this.isSingleTenant});var t=e.createRequestProxy(n);this._originalRequestModule=n,n=t}.bind(this))}this.ib=new a.ItemBrowserWrapper(c,{apiVersion:3,portal:h,request:n,initialState:t.mixin(a.initialState,{settings:t.mixin(a.initialState.settings,{config:t.mixin(S,{onBack:d.bind(this),onSelect:y.bind(this)})}),ui:t.mixin(a.initialState.ui,{expanded:t.mixin(a.initialState.ui.expanded,{filters:!0})})}),parameters:t.mixin(a.initialState.parameters,{section:"myContent",filter:t.mixin(a.initialState.parameters.filter,{searchMapArea:!1})})}),e.isDialog&&this._createDialog(c,h),o.resolve()}.bind(this))}.bind(this))}}.bind(this)),o},_queryTagsForLivingAtlasBrowseItems:function(e){var t=e&&e.tags;if(t&&0!==t.length)return 1===t.length?['tags:"'+t[0]+'"']:(r=[],t.forEach((function(e){r.push('tags:"'+e+'"')})),r)},onBrowseItemSelect:function(e,t,s,i){var r=this._getPortalItem(e,t),o={selection:r,dialog:this._browseLyrsdlg||this._browsedlg};!e.url||y.isHostedService(e.url)||this.isSingleTenant||r.selectedLayer instanceof l?this._handleBrowseItemsSelect(o,i):this._getProxyServiceInfo(e).then(function(){!!a.isDefined(e.analysisProxyCheck)&&"failure"===e.analysisProxyCheck?this._resetSelectBox(s):this._handleBrowseItemsSelect(o,i)}.bind(this),function(){this._resetSelectBox(s)}.bind(this))},onSelectGPTool:function(e){e.resource.url=e.url,this._handleSelectGpTool(e.resource)},onSelectRFTTool:function(e,t){this._handleSelectRFTTool(this._getPortalItem(e,t))},onSelectDLPKTool:function(e,t){this._handleSelectDLPKTool(this._getPortalItem(e,t))},onEditRFTTool:function(e,t){this._handleEditRFTTool(this._getPortalItem(e,t))},_getPortalItem:function(e,s){var i;return e.resource&&e.item?((i=new c.PortalItem(t.mixin(e.item,{portal:s}))).selectedLayer=e.resource,i.selectedLayer.url=e.url):(i=new c.PortalItem(t.mixin(e,{portal:s})),e.type&&[m.CSV,m.XLS].indexOf(e.type)>-1&&(i.selectedLayer=i)),i},_createDialog:function(e,t){window.require(["dijit/Dialog","esri/dijit/analysis/mixins/browselayers/configs/Common"],function(t,s){this.itemBrowserDialog||(this.itemBrowserDialog=new t({style:"width: 900px; height:900px; overflow: auto",id:"itemBrowserDialog",closable:!1,title:f.customAnalysisLayerTitle})),this.itemBrowserDialog.set("content",e),this.itemBrowserDialog.show()}.bind(this))},_closeDialog:function(){this.itemBrowserDialog.hide(),this.itemBrowserDialog.destroy(),delete this.itemBrowserDialog,delete this.ib},_closeFullScreenBrowser:function(){this._originalRequestModule&&(n=this._originalRequestModule),this.ib.dispatch({type:"CLOSE_FULLSCREEN_BROWSER"})},_setAllowedItemTypesAttr:function(e){this.allowedItemTypes=e},_setAvailableItemTypeFiltersAttr:function(e){this.availableItemTypeFilters=e},_getDisableResources:function(e){var t={};return e&&e.length&&e.forEach((function(e){e&&e.url&&(t[e.url]=!0)}),this),t},_projectExtentAndDispatch:function(e){this.sr||(this.sr=new h(4326)),u(e,this.sr,function(e){var t=e[0];this._dispatchExtentToItemBrowser(t)}.bind(this),function(e){console.error(e)}.bind(this))},_chopExtentAtDateLine:function(e){var t=new d;return window.esri.geometry.normalizeCentralMeridian([e],null,(function(s){if(s[0].rings){var i=new window.esri.geometry.Polygon(e.spatialReference).addRing(s[0].rings[0]).getExtent(),r=new window.esri.geometry.Polygon(e.spatialReference).addRing(s[0].rings[1]).getExtent();t.resolve(i.getWidth()>r.getWidth()?i:r)}else t.resolve(s[0])}),(function(e){t.reject(e)})),t},_dispatchExtentToItemBrowser:function(e){window.require(["arcgis-components/wrappers/ItemBrowser"],function(t){this.ib.dispatch(t.updateExtent({minx:e.xmin,miny:e.ymin,maxx:e.xmax,maxy:e.ymax}))}.bind(this))},_fetchGroupForRFT:function(e){var t=new d;return-1===this.allowedItemTypes.indexOf(m.RFT)&&t.resolve(),this._systemRFTsGroup&&t.resolve(this._systemRFTsGroup),y.fetchGroupForRFT(e).then(function(e){this._systemRFTsGroup=e,t.resolve(e)}.bind(this)),t},_removeDOMfromBody:function(e){setTimeout((function(){document.body.removeChild(e)}),300),delete this.ib},_resetSelectBox:function(e){e&&e.reset()},_getProxyServiceInfo:function(e){var t,i,r,l=new d;a.isDefined(e)&&a.isDefined(e.url)||l.reject({error:"mapLayer is not defined"}),t=e.url+(e.url.indexOf("?")>-1?"&":"?")+"f=json";var c=o.id.findCredential(e.url);return i=e.url,this.proxyCheckedServers||(this.proxyCheckedServers=[]),s.some(this.proxyCheckedServers,(function(t){if(r=i.substring(0,i.indexOf("/",9)),t.server===r)return e.analysisProxyCheck=t.check,!0}),this)?l.resolve({}):(c&&c.token&&(t+="&token="+c.token),(l=n({url:t,content:null},{useProxy:!0})).then(function(){e.analysisProxyCheck="success",this.proxyCheckedServers.push({server:i.substring(0,i.indexOf("/",9)),check:"success"})}.bind(this),function(){e.analysisProxyCheck="failure",this.proxyCheckedServers.push({server:i.substring(0,i.indexOf("/",9)),check:"failure"})}.bind(this))),l.promise}});return i("extend-esri")&&t.setObject("dijit.analysis.mixins.browselayers.BrowseLayerMixin",w,o),w}));