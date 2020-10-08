// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","tslib","../../../../core/has","./BaseBucket","../webgl/TurboLine","../webgl/mesh/templates/util"],(function(e,t,r,n,i,l,s){"use strict";var x=0,a=0,d=0;n("esri-tiles-performance")&&setInterval((function(){console.log("New (VTL)","feat="+d,"secs="+x,"tris="+a,"tris/sec="+Math.round(a/x))}),1e4);var u=function(e){function t(t,r,n,i){var l=e.call(this,t,r)||this;if(l.type=2,l._tessellationOptions={},l.tessellationProperties={_lineVertexBuffer:null,_lineIndexBuffer:null,_hasPattern:null,_ddValues:null,_capType:null,_joinType:null,_miterLimitCosine:null,_roundLimitCosine:null},t.hasDataDrivenLine!==n.isDataDriven())throw new Error("incompatible line buffer");return l.tessellationProperties._lineVertexBuffer=n,l.tessellationProperties._lineIndexBuffer=i,l.tessellationProperties._hasPattern=t.getPaintValue("line-pattern",l.zoom)||t.getPaintValue("line-dasharray",l.zoom).length>0,l._isThinLine=t.isThinLine,l._isThinLine?l._tessellationCallbacks={vertex:o(l.tessellationProperties),bridge:f(l.tessellationProperties)}:l._tessellationCallbacks={vertex:c(l.tessellationProperties),bridge:V(l.tessellationProperties)},l}return r.__extends(t,e),Object.defineProperty(t.prototype,"lineIndexStart",{get:function(){return this._lineIndexStart},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lineIndexCount",{get:function(){return this._lineIndexCount},enumerable:!1,configurable:!0}),t.prototype.processFeatures=function(e){this._lineIndexStart=3*this.tessellationProperties._lineIndexBuffer.index,this._lineIndexCount=0;var t=this.layer,r=this.zoom,n=t.hasDataDrivenLine;e&&e.setExtent(this.layerExtent);for(var i=[1,1,1,1],x=1,a=1,d=0,u=this._features;d<u.length;d++){var o=u[d];!this.tessellationProperties._hasPattern&&t.hasDataDrivenColor&&(i=t.getPaintValue("line-color",r,o)),t.hasDataDrivenOpacity&&(x=t.getPaintValue("line-opacity",r,o)),t.hasDataDrivenWidth&&(a=t.getPaintValue("line-width",r,o));var f=void 0;if(!n||!((f={color:i,opacity:x,size:Math.max(Math.min(a,256),0)}).size<=0||f.opacity<=0||f.color[3]<=0)){this.tessellationProperties._capType=t.getLayoutValue("line-cap",r,o),this.tessellationProperties._joinType=t.getLayoutValue("line-join",r,o),this.tessellationProperties._miterLimitCosine=s.getLimitCosine(t.getLayoutValue("line-miter-limit",r,o)),this.tessellationProperties._roundLimitCosine=s.getLimitCosine(t.getLayoutValue("line-round-limit",r,o));var c=o.getGeometry(e);this._processFeature(c,f)}}l.cleanup()},t.prototype.serialize=function(){var e=7;e+=this.layerIndices.length,e+=this.tessellationProperties._lineVertexBuffer.array.length,e+=this.tessellationProperties._lineIndexBuffer.array.length;var t=0,r=new Uint32Array(e),n=new Int32Array(r.buffer);r[t++]=this.type,r[t++]=this.layerIndices.length;for(var i=0;i<this.layerIndices.length;i++)r[t++]=this.layerIndices[i];r[t++]=this._lineIndexStart,r[t++]=this._lineIndexCount,r[t++]=this.tessellationProperties._lineVertexBuffer.isDataDriven()?1:0,r[t++]=this.tessellationProperties._lineVertexBuffer.array.length;for(var l=0;l<this.tessellationProperties._lineVertexBuffer.array.length;l++)n[t++]=this.tessellationProperties._lineVertexBuffer.array[l];r[t++]=this.tessellationProperties._lineIndexBuffer.array.length;for(var s=0;s<this.tessellationProperties._lineIndexBuffer.array.length;s++)r[t++]=this.tessellationProperties._lineIndexBuffer.array[s];return r.buffer},t.prototype._processFeature=function(e,t){if(e)for(var r=e.length,n=0;n<r;n++)this._processGeometry(e[n],t)},t.prototype._processGeometry=function(e,t){var r;if(n("esri-tiles-performance")&&(r=performance.now()),!(e.length<2)){for(var i,s,u=e[0],o=1;o<e.length;)(i=e[o].x-u.x)*i+(s=e[o].y-u.y)*s<1e-6?e.splice(o,1):(u=e[o],++o);if(!(e.length<2)){var f=3*this.tessellationProperties._lineIndexBuffer.index;this._tessellationOptions.trackDistance=this.tessellationProperties._hasPattern,this._tessellationOptions.initialDistance=0,this._tessellationOptions.thin=this._isThinLine,this._tessellationOptions.wrapDistance=65535,this._tessellationOptions.outerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableOuterBisectorSplit=this.tessellationProperties._hasPattern,this._tessellationOptions.innerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableInnerBisectorSplit=this.tessellationProperties._hasPattern,this.tessellationProperties._ddValues=t,l.tessellate(e,this._tessellationOptions,this._tessellationCallbacks),this._lineIndexCount+=3*this.tessellationProperties._lineIndexBuffer.index-f,n("esri-tiles-performance")&&(x+=(performance.now()-r)/1e3,a+=this.tessellationProperties._lineIndexBuffer.index-f/3,d++)}}},t}(i),o=function(e){return function(t){t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)}},f=function(e){return function(t){e._lineIndexBuffer.add(t.leftExit0,t.rightEntry0,t.leftExit2),e._lineIndexBuffer.add(t.rightEntry0,t.rightEntry2,t.leftExit2)}},c=function(e){return function(t){var r,n=2===e._joinType?e._miterLimitCosine:e._roundLimitCosine,i=t.isCap&&0!==e._capType,s=!1;if(t.cosine>.97?(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues),t.exit2=t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues)):t.cosine<1-.97?(t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)):t.canSplit?(l.splitVertex(),t.sign>0?(t.splitInner?(t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.leftInner.x,t.leftInner.y,0,-1,t.distance,e._ddValues),t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.rightInner.x,t.rightInner.y,0,-1,t.distance,e._ddValues)):(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues)),t.cosine<n?(s=!t.isCap,t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)):t.splitOuter?(s=s||t.gapOuter,t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.leftOuter.x,-t.leftOuter.y,0,1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.rightOuter.x,-t.rightOuter.y,0,1,t.distance,e._ddValues)):(t.entry2=t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues))):(t.splitInner?(t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.leftInner.x,-t.leftInner.y,0,1,t.distance,e._ddValues),t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.rightInner.x,-t.rightInner.y,0,1,t.distance,e._ddValues)):(t.exit2=t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues)),t.cosine<n?(s=!t.isCap,t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues)):t.splitOuter?(s=s||t.gapOuter,t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.leftOuter.x,t.leftOuter.y,0,-1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.rightOuter.x,t.rightOuter.y,0,-1,t.distance,e._ddValues)):(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues)))):t.sign>0?(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues),t.cosine<n?(s=!t.isCap,t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)):(t.entry2=t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues))):(t.exit2=t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues),t.cosine<n?(s=!t.isCap,t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues)):(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues))),t.canSplit&&(t.splitInner||t.splitOuter)||s||i?(r=t.entry1=t.exit1=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,0,0,0,0,t.distance,e._ddValues)):r=t.entry1=t.exit1=null,s&&1!==e._joinType)e._lineIndexBuffer.add(r,t.sign>0?t.exit2:t.entry0,t.sign>0?t.entry2:t.exit0);else if(i&&1===e._capType||s&&1===e._joinType){var x,a=void 0,d=void 0,u=void 0,o=void 0,f=void 0,c=void 0;if(t.isCap)c=(x=Math.PI)/(f=Math.ceil(x/.8)),t.isFirstVertex?(a=t.prevNormal.x,d=t.prevNormal.y,u=t.entry0,o=t.entry2):t.isLastVertex&&(a=-t.nextNormal.x,d=-t.nextNormal.y,u=t.exit2,o=t.exit0);else c=(x=2*Math.acos(t.cosine))/(f=Math.ceil(x/.8)),a=t.sign>0?-t.prevNormal.x:t.nextNormal.x,d=t.sign>0?-t.prevNormal.y:t.nextNormal.y,u=t.sign>0?t.entry2:t.exit0,o=t.sign>0?t.exit2:t.entry0;var V=Math.cos(c),_=Math.sin(c),y=_*a+V*d;a=V*a-_*d,d=y;for(var p=void 0,h=void 0,B=0;B<f;++B){if(p=h,B<f-1)if(t.isCap){var m=t.isFirstVertex?-1:1;h=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,a,d,m,0,t.distance,e._ddValues)}else h=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,a,d,0,t.sign,t.distance,e._ddValues);e._lineIndexBuffer.add(0===B?u:p,r,B===f-1?o:h);var v=_*a+V*d;a=V*a-_*d,d=v}}else if(i&&2===e._capType){var g=t.isFirstVertex?1:-1,I=void 0,b=void 0;e._hasPattern?(I=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x-g*t.inbound.x,t.prevNormal.y-g*t.inbound.y,-g,-1,t.distance,e._ddValues),b=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x-g*t.inbound.x,-t.prevNormal.y-g*t.inbound.y,-g,1,t.distance,e._ddValues)):(I=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x-g*t.inbound.x,t.prevNormal.y-g*t.inbound.y,0,-1,t.distance,e._ddValues),b=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x-g*t.inbound.x,-t.prevNormal.y-g*t.inbound.y,0,1,t.distance,e._ddValues)),g>0?(e._lineIndexBuffer.add(r,t.entry2,b),e._lineIndexBuffer.add(r,b,I),e._lineIndexBuffer.add(r,I,t.entry0)):(e._lineIndexBuffer.add(r,b,t.exit2),e._lineIndexBuffer.add(r,I,b),e._lineIndexBuffer.add(r,t.exit0,I))}}},V=function(e){return function(t){e._lineIndexBuffer.add(t.leftExit0,t.rightEntry0,null!=t.leftExit1?t.leftExit1:t.leftExit2),e._lineIndexBuffer.add(t.rightEntry0,null!=t.rightEntry1?t.rightEntry1:t.rightEntry2,null!=t.leftExit1?t.leftExit1:t.leftExit2),null!=t.leftExit1&&null!=t.rightEntry1?(e._lineIndexBuffer.add(t.leftExit1,t.rightEntry1,t.leftExit2),e._lineIndexBuffer.add(t.rightEntry1,t.rightEntry2,t.leftExit2)):null!=t.leftExit1?e._lineIndexBuffer.add(t.leftExit1,t.rightEntry2,t.leftExit2):null!=t.rightEntry1&&e._lineIndexBuffer.add(t.rightEntry1,t.rightEntry2,t.leftExit2)}};return u}));