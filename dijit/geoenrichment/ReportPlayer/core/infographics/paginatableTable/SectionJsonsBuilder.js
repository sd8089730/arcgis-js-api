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

define(["dojo/_base/lang","../../sections/SectionTypes","../../grid/coreUtils/GridDataUtil","../../supportClasses/tableJson/TableJsonResizeUtil","../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoFormatUtil","esri/dijit/geoenrichment/utils/DateUtil","esri/dijit/geoenrichment/utils/FieldUtil"],(function(t,e,a,i,n,r,s){var o={};function l(t,e){return s.isNumericField(t)&&"number"==typeof e&&!isNaN(e)}return o.buildSectionJsonsAndStat=function(t){var e=o._collectGridDataObjectsAndStats(t);if(!e)return null;if(e.gridDataObjects.length)var a=o._splitRowsByPages(e.gridDataObjects,t).map((function(e){return o._buildSectionJsonForPage(e,t)}));return{sectionJsons:a,stats:e.stats,unitedSectionJson:o._buildSectionJsonForPage(e.gridDataObjects,t)}},o.buildStats=function(t){var e=o._collectGridDataObjectsAndStats(t,!0);return e&&e.stats},o._collectGridDataObjectsAndStats=function(e,i){var o=e.calculatorDataArray,d=e.searchTextRe;e.sorting;if(!o||!o.length){if(!e.allowNoResults)return null;o=[]}var c,u=e.dataSectionJson.stack[0],g=u.data.data[0],f=u.data.data[1],h={numAttributesTotal:0,numAttributesShown:0,ranges:{}};for(var m in e.filterRanges&&(c={},e.filterRanges.forEach((function(t){c[t.fieldName]=t}))),g.fieldInfos){var b=g.fieldInfos[m];s.isNumericField(b)&&(h.ranges[b.name]={fieldName:b.name,alias:b.alias,min:1/0,max:-1/0,sumTotal:0,sumShown:0,decimals:b.decimals,dataArray:[]})}var v=[];return o.forEach((function(t,s){var o={style:null,fieldInfos:{}};h.numAttributesTotal++;var f=!1,m=!1,b=!1;u.data.columns.forEach((function(e){var i=g.fieldInfos[e.field],u=t[i.name];if(l(i,u)){var v=h.ranges[i.name];v.min=Math.min(v.min,u),v.max=Math.max(v.max,u),v.dataArray.push(u)}var H="esriFieldTypeDate"===i.type;H?o[e.field]=u&&!isNaN(Number(u))?r.formatDateShort(Number(u)):"":void 0===u||"string"==typeof u?o[e.field]=u||"":(o[e.field]=n.formatNumber(u,i),a.setNumericDataValue(u,o,e.field)),o.__attributeIndex=s;var S=c&&c[i.name];S&&(u<S.min||u>S.max)&&(f=!0),d&&"string"==typeof u&&!H&&(m=!0,d.test(u)&&(b=!0))}));var H=f||m&&!b;H||i||(v.push(o),h.numAttributesShown++),u.data.columns.forEach((function(e){var a=g.fieldInfos[e.field],i=t[a.name];if(l(a,i)){var n=h.ranges[a.name];n.sumTotal+=i,H||(n.sumShown+=i)}})),e.setAttributeVisibleAt&&e.setAttributeVisibleAt(s,!H)})),e.sorting&&v.sort((function(t,i){var n=a.getNumericDataValue(t,e.sorting.field);n=void 0!==n?n:t[e.sorting.field];var r=a.getNumericDataValue(i,e.sorting.field);r=void 0!==r?r:i[e.sorting.field];var s="number"==typeof n?n-r:n.localeCompare(r);return"desc"===e.sorting.order?-s:s})),v.forEach((function(e,a){var i=a%2!=0&&f||g;e.style=t.clone(i.style),e.style.height=g.style.height})),h.ranges=Object.keys(h.ranges).map((function(t){return h.ranges[t]})),{stats:h,gridDataObjects:v}},o.getAttributeIndexForGridData=function(t){return t.__attributeIndex},o._splitRowsByPages=function(t,e){var a,i=o._getHeaderHeight(e),n=o._getDataRowHeight(e),r=o._getDataListHeight(t,e),s=[],l=0;return t.forEach((function(t){a||(a=[],s.push(a),l+=i),a.push(t),(l+=n)+n>r&&(a=null,l=0)})),s},o._getHeaderHeight=function(t){return t.scaleToFitHeight?t.minRowHeight:t.headerSectionJson?t.headerSectionJson.stack[0].data.data[0].style.height:0},o._getDataRowHeight=function(t){return t.scaleToFitHeight?t.minRowHeight:t.dataSectionJson.stack[0].data.data[0].style.height},o._getDataListHeight=function(t,e){var a=o._getHeaderHeight(e),i=o._getDataRowHeight(e),n=e.height-(e.hasFooter?e.footerHeight:0)-(e.hasTitle?e.titleHeight:0),r=e.height-e.footerHeight-(e.hasTitle?e.titleHeight:0);return a+i*t.length<=n?n:r},o._buildSectionJsonForPage=function(a,n){var r;if(n.headerSectionJson){var s=n.headerSectionJson.stack[0];r={id:"table",attributes:{},style:{width:n.width},data:{columns:t.clone(s.data.columns),data:[t.clone(s.data.data[0])].concat(t.clone(a))}}}else{var l=n.dataSectionJson.stack[0];r={id:"table",attributes:{},style:{width:n.width},data:{columns:t.clone(l.data.columns),data:t.clone(a)}}}if(r.data.data.forEach((function(t,e){t.style.height=0===e&&n.headerSectionJson?o._getHeaderHeight(n):o._getDataRowHeight(n)})),n.scaleToFitHeight){var d=o._getDataListHeight(a,n);i.resizeTableJsonToFitHeight(r,d)}return i.resizeTableJsonToFitWidth(r,n.width),{type:e.DETAILS,stack:[r]}},o}));