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

define(["dojo/_base/declare","dojo/_base/lang","../../../renderers/colorRampGenerator","./RasterFunctionX","./pixelShaders","./RasterFunctionWebGLMixin","./rasterUtils"],(function(e,t,r,o,i,n,a){return e([o,n],{declaredClass:"esri.layers.rasterLib.function.ColormapFunction",functionName:"Colormap",pixelType:"U8",renderTexture:!1,supportWebGL:!0,support2D:!0,constructor:function(e){this.functionArguments=this.mixinIgnoreCase({colormap:null,colorRampName:null,colorRamp:null,colorMapName:null,raster:null},e),this.invert=e&&e.invert;var t,r,o,i,n,a,l,s,u,p,m=e.colormap||e.Colormap;if(m){if(m.features||m[0].attributes){if(t=m.features||m,r=Object.keys(t[0].attributes),i=r.filter((function(e){return"alpha"===e.toLowerCase()}))[0],o=r.filter((function(e){return"value"===e.toLowerCase()}))[0],n=r.filter((function(e){return"red"===e.toLowerCase()}))[0],a=r.filter((function(e){return"green"===e.toLowerCase()}))[0],l=r.filter((function(e){return"blue"===e.toLowerCase()}))[0],!(o&&n&&a&&l))throw"invalid colormap";if(m=t.map((function(e){return i?[e.attributes[o],e.attributes[n],e.attributes[a],e.attributes[l],e.attributes[i]]:[e.attributes[o],e.attributes[n],e.attributes[a],e.attributes[l]]})),s=Math.max.apply(null,m.map((function(e){return e[1]})))<1.1,u=i&&Math.max.apply(null,m.map((function(e){return e[4]})))<1.1,s)for(p=0;p<m.length;p++)m[p][1]=Math.round(255*m[p][1]),m[p][2]=Math.round(255*m[p][2]),m[p][3]=Math.round(255*m[p][3]),u&&(m[p][4]=Math.round(255*m[p][4]))}this.functionArguments.colormap=this._sortClr(m)}this._initialize()},bind:function(e){this._initialize();var r=this.getSourceRasterInfo(e);return r.raster&&"F32"!==r.raster.pixelType?(this.rasterInfo=t.mixin(r.raster,{bandCount:3,pixelType:this._calculatePixelType(this.pixelType,"U8"),statistics:null,histograms:null}),this.rasterInfo.keyProperties=this.rasterInfo.keyProperties||{},this.rasterInfo.keyProperties.DataType="Processed",!0):new Error("The raster input to colormap function is invalid. It must be integer type.")},read2D:function(e){return this._colorize(e.raster)},readGL:function(e){return this._colorizeGL(e.raster)},_colorize:function(e){this._performance.start();var t=a.colorize(e.pixelBlock,{indexedColormap:this._indexedColormap,indexedColormapOffset:this._indexedColormapOffset,indexed2DColormap:this._indexed2DColormap,alphaSpecified:this._alphaSpecified});return this._addPerformanceMetric(this._performance.elapsed()),{extent:e.extent,pixelBlock:t}},_binarySearchClr:function(e,t){for(var r=0,o=e.length-1,i=0,n=0;r<o;)if((n=e[i=Math.floor((r+o)/2)])[0]<t)r=i;else{if(!(n[0]>t))return n.slice(1);o=i}return null},_sortClr:function(e,t){var r,o,i,n=[];for(r=0;r<e.length;r++)n.push(e[r]);for(r=0;r<n.length-1;r++)for(i=n[r],o=r+1;o<n.length;o++)i[0]>n[o][0]&&(i=n[o],n[o]=n[r],n[r]=i);if(t)for(r=0;r<n.length/2;r++)i=n[r],n[n.length-1-r]=n[r],n[r]=i;return n},_invertColorRamp:function(e){if(!e)return e;var t={type:e.type};return"random"===e.type?t=e:"multipart"===e.type?t.colorRamps=e.colorRamps.map((function(e){return{fromColor:e.toColor,toColor:e.fromColor}})).reverse():(t.fromColor=e.toColor,t.toColor=e.fromColor),t},_initialize:function(){if(this._indexedColormapOffset=0,this.functionArguments.colormap){var e=a.buildIndexedColormap(this.functionArguments.colormap);this._alphaSpecified=e&&e.alphaSpecified,this._indexedColormap=e&&e.indexedColormap,this._indexedColormapOffset=e&&e.offset,this._indexedColormap||(this._indexed2DColormap=this._getIndexed2DColormap())}else this.functionArguments.colorRamp?"multipart"===this.functionArguments.colorRamp.type?this.invert?this._indexedColormap=r.createMultiPartColorRamp(this._invertColorRamp(this.functionArguments.colorRamp)):this._indexedColormap=r.createMultiPartColorRamp(this.functionArguments.colorRamp):this.invert?this._indexedColormap=r.createAlgorithmicColorRamp(this._invertColorRamp(this.functionArguments.colorRamp)):this._indexedColormap=r.createAlgorithmicColorRamp(this.functionArguments.colorRamp):this.functionArguments.colormapName&&"random"===this.functionArguments.colormapName.toLowerCase()&&(this._indexedColormap=r.createRandomColorRamp())},_getIndexed2DColormap:function(){var e=this.functionArguments.colormap;if(!e)return null;var t=0;e[0][0]<0&&(t=e[0][0]);var r,o=[],i=5===e[0].length;for(r=0;r<e.length;r++)o[e[r][0]-t]=i?e[r].slice(1):e[r].slice(1).concat([255]);return o},_colorizeGL:function(e){this._performance.start(),this._initializeProgram({fragment:i.colormap,fragmentName:"Colormap"});var t=this._indexedColormap,r=this._indexedColormapOffset;this._clrTexture||(this._clrTexture=this._setupColormapTexture(t));var o=this._clrTexture,n=this.bindFrameBuffer(),a=this._setupTextureData(e);return this._setUniforms({u_indexedColormapOffset:r,u_indexedColormapMaxIndex:t.length/4-1}),this._bindTexture(o,"u_image1"),this._bindTexture(a.texture,"u_image"),this._drawGL(),{extent:a.extent,texture:n.texture}},_setupColormapTexture:function(e){var t,r=this._createTexture(),o=this.gl,i=e.length/4,n=new Float32Array(e.length),a=this.renderTexture?255:1;for(t=0;t<e.length;t++)n[t]=e[t]/a;return o.getExtension("OES_texture_float"),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,i,1,0,o.RGBA,o.FLOAT,n),r}})}));