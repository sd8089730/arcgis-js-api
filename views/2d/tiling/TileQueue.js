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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/Accessor","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/vec2","../../support/QueueProcessor"],function(e,t,r,o,n,i,s,u,p,a){function c(e,t){return e.length=0,t.forEach(function(t){return e.push(t)}),e}var h=new Set,y=[],l=new Map,f=[0,0];return function(e){function t(t){var r=e.call(this,t)||this;return r._keyToItem=new Map,r.concurrency=6,r.strategy="scale-first",r.tileInfoView=null,r}return r(t,e),t.prototype.initialize=function(){var e=this,t=this,r=t.concurrency,o=t.process,n=t.strategy,i="scale-first"===n?this._peekByScaleFirst.bind(this):this._peekByCenterFirst.bind(this);this._queue=new a.QueueProcessor({concurrency:r,process:function(t,r){var n=e._keyToItem.get(t);return o(n,{signal:r})},peeker:i})},t.prototype.destroy=function(){this.clear(),this._queue.destroy(),this._queue=null},Object.defineProperty(t.prototype,"length",{get:function(){return this._queue?this._queue.length:0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onGoingCount",{get:function(){return this._keyToItem.size},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this.length>0||this.onGoingCount>0},enumerable:!0,configurable:!0}),t.prototype.abort=function(e){var t="string"==typeof e?e:e.id;this._queue.abort(t)},t.prototype.clear=function(){this._queue.clear(),this._keyToItem.clear(),this.notifyChange("updating")},t.prototype.get=function(e){var t="string"==typeof e?e:e.id;return this._queue.get(t)},t.prototype.has=function(e){return"string"==typeof e?this._keyToItem.has(e):this._keyToItem.has(e.id)},t.prototype.isOngoing=function(e){var t="string"==typeof e?e:e.id;return this.has(t)&&this._queue.isOngoing(t)},t.prototype.pause=function(){this._queue.pause()},t.prototype.push=function(e){return i(this,void 0,void 0,function(){var t,r,o,i=this;return n(this,function(n){return t=e.key.id,this.has(t)?[2,this.get(t)]:(r=this._queue.push(t),o=function(){i._keyToItem.delete(t),i.notifyChange("updating")},this._keyToItem.set(t,e),r.then(o,o),this.notifyChange("updating"),[2,r])})})},t.prototype.reset=function(){this._queue.reset(),this.notifyChange("updating")},t.prototype.resume=function(){this._queue.resume()},t.prototype._peekByScaleFirst=function(e){if(!this.state)return e[0];for(var t=this.tileInfoView,r=Number.NEGATIVE_INFINITY,o=Number.POSITIVE_INFINITY,n=0,i=e;n<i.length;n++){var s=i[n],u=this._keyToItem.get(s),p=this.tileInfoView.getTileScale(u.key);l.has(p)||(l.set(p,[]),r=Math.max(p,r),o=Math.min(p,o)),l.get(p).push(u.key),h.add(p)}var a=this.state.scale;l.has(a)||(c(y,h),y.sort(),a=y.reduce(function(e,t,r,o){return Math.abs(t-a)<Math.abs(e-a)?t:e},y[0])),a=Math.min(a,r),a=Math.max(a,o);var f=l.get(a),g=t.getClosestInfoForScale(a),d=g.getColumnForX(this.state.center[0]),I=g.getRowForY(this.state.center[1]);return f.sort(function(e,t){var r=g.denormalizeCol(e.col,e.world),o=g.denormalizeCol(t.col,t.world);return Math.sqrt((d-r)*(d-r)+(I-e.row)*(I-e.row))-Math.sqrt((d-o)*(d-o)+(I-t.row)*(I-t.row))}),h.clear(),l.clear(),f[0].id},t.prototype._peekByCenterFirst=function(e){if(!this.state)return e[0];for(var t=this.tileInfoView,r=this.state.center,o=Number.POSITIVE_INFINITY,n=null,i=0,s=e;i<s.length;i++){var u=s[i],a=this._keyToItem.get(u);t.getTileCoords(f,a.key);var c=p.vec2.distance(f,r);c<o&&(o=c,n=a.key)}return n.id},o([u.property({constructOnly:!0})],t.prototype,"concurrency",void 0),o([u.property({constructOnly:!0})],t.prototype,"process",void 0),o([u.property()],t.prototype,"state",void 0),o([u.property({constructOnly:!0})],t.prototype,"strategy",void 0),o([u.property({constructOnly:!0})],t.prototype,"tileInfoView",void 0),o([u.property({readOnly:!0})],t.prototype,"updating",null),t=o([u.subclass("esri.views.2d.tiling.TileQueue")],t)}(u.declared(s))});