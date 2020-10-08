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

var __extends=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();define(["require","exports","../support/FeatureSet","../support/IdSet","../support/shared","../../polyfill/promiseUtils"],(function(t,e,n,r,o,s){"use strict";var a=function(t){function e(e){var n=t.call(this,e)||this;return n._topnum=0,n.declaredClass="esri.arcade.featureset.actions.Top",n._countedin=0,n._maxProcessing=100,n._topnum=e.topnum,n._parent=e.parentfeatureset,n}return __extends(e,t),e.prototype._getSet=function(t){var e=this;return null===this._wset?this._ensureLoaded().then((function(){return e._parent._getSet(t)})).then((function(t){return e._wset=new r(t._candidates.slice(0),t._known.slice(0),!1,e._clonePageDefinition(t.pagesDefinition)),e._setKnownLength(e._wset)>e._topnum&&(e._wset._known=e._wset._known.slice(0,e._topnum)),e._setKnownLength(e._wset)>=e._topnum&&(e._wset._candidates=[]),e._wset})):s.resolve(this._wset)},e.prototype._setKnownLength=function(t){return t._known.length>0&&"GETPAGES"===t._known[t._known.length-1]?t._known.length-1:t._known.length},e.prototype._isInFeatureSet=function(t){var e=this._parent._isInFeatureSet(t);if(e===o.IdState.NotInFeatureSet)return e;var n=this._idstates[t];return n===o.IdState.InFeatureSet||n===o.IdState.NotInFeatureSet?n:e===o.IdState.InFeatureSet&&void 0===n?this._countedin<this._topnum?(this._idstates[t]=o.IdState.InFeatureSet,this._countedin++,o.IdState.InFeatureSet):(this._idstates[t]=o.IdState.NotInFeatureSet,o.IdState.NotInFeatureSet):o.IdState.Unknown},e.prototype._expandPagedSet=function(t,e,n,r,o){var a=this;if(null===this._parent)return s.reject(new Error("Parent Paging not implemented"));if(e>this._topnum&&(e=this._topnum),this._countedin>=this._topnum&&t.pagesDefinition.internal.set.length<=t.pagesDefinition.resultOffset){var i=t._known.length;return i>0&&"GETPAGES"===t._known[i-1]&&(t._known.length=i-1),(i=t._candidates.length)>0&&"GETPAGES"===t._candidates[i-1]&&(t._candidates.length=i-1),s.resolve("success")}return this._parent._expandPagedSet(t,e,n,r,o).then((function(e){return a._setKnownLength(t)>a._topnum&&(t._known.length=a._topnum),a._setKnownLength(t)>=a._topnum&&(t._candidates.length=0),e}))},e.prototype._getFeatures=function(t,e,n,o){var a=this,i=[],u=this._maxQueryRate();if(!0===this._checkIfNeedToExpandKnownPage(t,u))return this._expandPagedSet(t,u,0,0,o).then((function(){return a._getFeatures(t,e,n,o)}));-1!==e&&void 0===this._featureCache[e]&&i.push(e);for(var _=0,h=t._lastFetchedIndex;h<t._known.length&&(++_<=n&&(t._lastFetchedIndex+=1),!(void 0===this._featureCache[t._known[h]]&&(t._known[h]!==e&&i.push(t._known[h]),i.length>u-1)));h++);if(0===i.length)return s.resolve("success");var c=new r([],i,!1,null),d=Math.min(i.length,n);return this._parent._getFeatures(c,-1,d,o).then((function(){for(var t=0;t<d;t++){var e=a._parent._featureFromCache(i[t]);void 0!==e&&(a._featureCache[i[t]]=e)}return"success"}))},e.prototype._getFilteredSet=function(t,e,n,o,s){var a=this;return this._ensureLoaded().then((function(){return a._getSet(s)})).then((function(t){return new r(t._candidates.slice(0).concat(t._known.slice(0)),[],!1,a._clonePageDefinition(t.pagesDefinition))}))},e.prototype._refineKnowns=function(t,e){for(var n=0,r=null,s=[],a=0;a<t._candidates.length;a++){var i=this._isInFeatureSet(t._candidates[a]);if(i===o.IdState.InFeatureSet){if(t._known.push(t._candidates[a]),n+=1,null===r?r={start:a,end:a}:r.end===a-1?r.end=a:(s.push(r),r={start:a,end:a}),t._known.length>=this._topnum)break}else if(i===o.IdState.NotInFeatureSet)null===r?r={start:a,end:a}:r.end===a-1?r.end=a:(s.push(r),r={start:a,end:a}),n+=1;else if(i===o.IdState.Unknown)break;if(n>=e)break}null!==r&&s.push(r);for(var u=s.length-1;u>=0;u--)t._candidates.splice(s[u].start,s[u].end-s[u].start+1);this._setKnownLength(t)>this._topnum&&(t._known=t._known.slice(0,this._topnum)),this._setKnownLength(t)>=this._topnum&&(t._candidates=[])},e.prototype._stat=function(){return s.resolve({calculated:!1})},e.prototype._canDoAggregates=function(){return s.resolve(!1)},e}(n);return n._featuresetFunctions.top=function(t){return new a({parentfeatureset:this,topnum:t})},a}));