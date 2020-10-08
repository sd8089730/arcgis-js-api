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

define(["require","exports","tslib","../../../../../core/Error","../enums","../mesh/templates/meshUtils"],(function(t,e,i,r,n,o){"use strict";function a(t,e){void 0===e&&(e=!1);var i=n.WGLVVFlag.SIZE_FIELD_STOPS|n.WGLVVFlag.SIZE_MINMAX_VALUE|n.WGLVVFlag.SIZE_SCALE_STOPS|n.WGLVVFlag.SIZE_UNIT_VALUE,r=(t&(n.WGLVVTarget.FIELD_TARGETS_OUTLINE|n.WGLVVTarget.MINMAX_TARGETS_OUTLINE|n.WGLVVTarget.SCALE_TARGETS_OUTLINE|n.WGLVVTarget.UNIT_TARGETS_OUTLINE))>>>4;return e?i&r:i&~r}function s(t){var e=a(t,!1);return t&(n.WGLVVFlag.COLOR|n.WGLVVFlag.OPACITY|n.WGLVVFlag.ROTATION|e)}Object.defineProperty(e,"__esModule",{value:!0}),e.LabelMaterialKey=e.TextMaterialKey=e.LineMaterialKey=e.MarkerMaterialKey=e.FillMaterialKey=e.MaterialKeyBase=e.hydrateMaterialKey=e.createMaterialKey=e.getLabelVVFlags=e.getTextVVFlags=e.getLineVVFlags=e.getFillVVFlags=e.getMarkerVVFlags=e.getSizeFlagsMask=void 0,e.getSizeFlagsMask=a,e.getMarkerVVFlags=s,e.getFillVVFlags=function(t){return t&(n.WGLVVFlag.COLOR|n.WGLVVFlag.OPACITY)},e.getLineVVFlags=function(t,e){if(e)return t&a(t,!0);var i=a(t,!1);return t&(n.WGLVVFlag.COLOR|n.WGLVVFlag.OPACITY|i)},e.getTextVVFlags=function(t){return s(t)},e.getLabelVVFlags=function(t){return t&a(t,!1)};e.createMaterialKey=function(t,e,i,r,o){switch(t){case n.WGLGeometryType.FILL:return y.from(e,r);case n.WGLGeometryType.LINE:return V.from(e,i);case n.WGLGeometryType.MARKER:return h.from(e);case n.WGLGeometryType.TEXT:return f.from(e);case n.WGLGeometryType.LABEL:return g.from(e,o);default:throw new Error("Unable to createMaterialKey for unknown geometryType "+t)}},e.hydrateMaterialKey=function(t){switch(u.load(t).geometryType){case n.WGLGeometryType.MARKER:return new h(t);case n.WGLGeometryType.FILL:return new y(t);case n.WGLGeometryType.LINE:return new V(t);case n.WGLGeometryType.TEXT:return new f(t);case n.WGLGeometryType.LABEL:return new g(t)}};var u=function(){function t(t){this._data=0,this._data=t}return t.load=function(t){var e=this.shared;return e.data=t,e},Object.defineProperty(t.prototype,"data",{get:function(){return this._data},set:function(t){this._data=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"geometryType",{get:function(){return this.bits(8,11)},set:function(t){this.setBits(t,8,11)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"mapAligned",{get:function(){return!!this.bit(20)},set:function(t){this.setBit(20,t)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"sdf",{get:function(){return!!this.bit(11)},set:function(t){this.setBit(11,t)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"pattern",{get:function(){return!!this.bit(12)},set:function(t){this.setBit(12,t)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"textureBinding",{get:function(){return this.bits(0,8)},set:function(t){this.setBits(t,0,8)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"geometryTypeString",{get:function(){switch(this.geometryType){case n.WGLGeometryType.FILL:return"fill";case n.WGLGeometryType.MARKER:return"marker";case n.WGLGeometryType.LINE:return"line";case n.WGLGeometryType.TEXT:return"text";case n.WGLGeometryType.LABEL:return"label";default:throw new r("Unable to handle unknown geometryType: "+this.geometryType)}},enumerable:!1,configurable:!0}),t.prototype.setBit=function(t,e){var i=1<<t;e?this._data|=i:this._data&=~i},t.prototype.bit=function(t){return(this._data&1<<t)>>t},t.prototype.setBits=function(t,e,i){for(var r=e,n=0;r<i;r++,n++)this.setBit(r,0!=(t&1<<n))},t.prototype.bits=function(t,e){for(var i=0,r=t,n=0;r<e;r++,n++)i|=this.bit(r)<<n;return i},t.prototype.hasVV=function(){return!1},t.prototype.setVV=function(t,e){},t.prototype.getVariation=function(){return{mapAligned:this.mapAligned,pattern:this.pattern,sdf:this.sdf}},t.prototype.getVariationHash=function(){return this._data&~(7&this.textureBinding)},t.shared=new t(0),t}();e.MaterialKeyBase=u;var l=function(t){return function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),Object.defineProperty(e.prototype,"vvSizeMinMaxValue",{get:function(){return 0!==this.bit(16)},set:function(t){this.setBit(16,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"vvSizeScaleStops",{get:function(){return 0!==this.bit(17)},set:function(t){this.setBit(17,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"vvSizeFieldStops",{get:function(){return 0!==this.bit(18)},set:function(t){this.setBit(18,t)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"vvSizeUnitValue",{get:function(){return 0!==this.bit(19)},set:function(t){this.setBit(19,t)},enumerable:!1,configurable:!0}),e.prototype.hasVV=function(){return t.prototype.hasVV.call(this)||this.vvSizeMinMaxValue||this.vvSizeScaleStops||this.vvSizeFieldStops||this.vvSizeUnitValue},e.prototype.setVV=function(e,i){t.prototype.setVV.call(this,e,i);var r=a(e,i)&e;this.vvSizeMinMaxValue=!!(r&n.WGLVVFlag.SIZE_MINMAX_VALUE),this.vvSizeFieldStops=!!(r&n.WGLVVFlag.SIZE_FIELD_STOPS),this.vvSizeUnitValue=!!(r&n.WGLVVFlag.SIZE_UNIT_VALUE),this.vvSizeScaleStops=!!(r&n.WGLVVFlag.SIZE_SCALE_STOPS)},e}(t)},p=function(t){return function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),Object.defineProperty(e.prototype,"vvRotation",{get:function(){return 0!==this.bit(15)},set:function(t){this.setBit(15,t)},enumerable:!1,configurable:!0}),e.prototype.hasVV=function(){return t.prototype.hasVV.call(this)||this.vvRotation},e.prototype.setVV=function(e,i){t.prototype.setVV.call(this,e,i),this.vvRotation=!i&&!!(e&n.WGLVVFlag.ROTATION)},e}(t)},c=function(t){return function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),Object.defineProperty(e.prototype,"vvColor",{get:function(){return 0!==this.bit(13)},set:function(t){this.setBit(13,t)},enumerable:!1,configurable:!0}),e.prototype.hasVV=function(){return t.prototype.hasVV.call(this)||this.vvColor},e.prototype.setVV=function(e,i){t.prototype.setVV.call(this,e,i),this.vvColor=!i&&!!(e&n.WGLVVFlag.COLOR)},e}(t)},v=function(t){return function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),Object.defineProperty(e.prototype,"vvOpacity",{get:function(){return 0!==this.bit(14)},set:function(t){this.setBit(14,t)},enumerable:!1,configurable:!0}),e.prototype.hasVV=function(){return t.prototype.hasVV.call(this)||this.vvOpacity},e.prototype.setVV=function(e,i){t.prototype.setVV.call(this,e,i),this.vvOpacity=!i&&!!(e&n.WGLVVFlag.OPACITY)},e}(t)},y=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t,e){var i=this.load(0);return i.geometryType=n.WGLGeometryType.FILL,e?i.dotDensity=!0:i.setVV(t,!1),i.data},e.prototype.getVariation=function(){return i.__assign(i.__assign({},t.prototype.getVariation.call(this)),{dotDensity:this.dotDensity,vvColor:this.vvColor,vvOpacity:this.vvOpacity})},Object.defineProperty(e.prototype,"dotDensity",{get:function(){return!!this.bit(15)},set:function(t){this.setBit(15,t)},enumerable:!1,configurable:!0}),e.shared=new e(0),e}(c(v(u)));e.FillMaterialKey=y;var h=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t){var e=this.load(0);return e.geometryType=n.WGLGeometryType.MARKER,e.setVV(t,!1),e.data},e.prototype.getVariation=function(){return i.__assign(i.__assign({},t.prototype.getVariation.call(this)),{vvColor:this.vvColor,vvRotation:this.vvRotation,vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue})},e.shared=new e(0),e}(c(v(p(l(u)))));e.MarkerMaterialKey=h;var V=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t,e){var i=this.load(0);return i.geometryType=n.WGLGeometryType.LINE,i.setVV(t,e),i.data},e.prototype.getVariation=function(){return i.__assign(i.__assign({},t.prototype.getVariation.call(this)),{vvColor:this.vvColor,vvOpacity:this.vvOpacity,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue})},e.shared=new e(0),e}(c(v(l(u))));e.LineMaterialKey=V;var f=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t){var e=this.load(t);return e.geometryType=n.WGLGeometryType.TEXT,e.setVV(t,!1),e.data},e.prototype.getVariation=function(){return i.__assign(i.__assign({},t.prototype.getVariation.call(this)),{vvColor:this.vvColor,vvOpacity:this.vvOpacity,vvRotation:this.vvRotation,vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue})},e.shared=new e(0),e}(c(v(p(l(u)))));e.TextMaterialKey=f;var g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i.__extends(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t,e){var i=this.load(0);return i.geometryType=n.WGLGeometryType.LABEL,i.setVV(t,!1),i.mapAligned=!!o.isMapAligned(e),i.data},e.prototype.getVariation=function(){return i.__assign(i.__assign({},t.prototype.getVariation.call(this)),{vvSizeFieldStops:this.vvSizeFieldStops,vvSizeMinMaxValue:this.vvSizeMinMaxValue,vvSizeScaleStops:this.vvSizeScaleStops,vvSizeUnitValue:this.vvSizeUnitValue})},e.shared=new e(0),e}(l(u));e.LabelMaterialKey=g}));