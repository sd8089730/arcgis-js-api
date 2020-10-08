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

define(["require","exports","tslib","../../../geometry","../../../core/Error","../../../core/maybe","../../../core/promiseUtils","../../../core/accessorSupport/decorators","../PixelBlock","../RasterInfo","../RasterStorageInfo","./BaseRaster","./xmlUtilities"],(function(e,t,r,n,a,o,i,s,l,u,f,p,h){"use strict";var c,g,d=(c=new ArrayBuffer(4),g=new Uint8Array(c),new Uint32Array(c)[0]=1,1===g[0]),m=new Map;m.set("Int8","s8"),m.set("UInt8","u8"),m.set("Int16","s16"),m.set("UInt16","u16"),m.set("Int32","s32"),m.set("UInt32","u32"),m.set("Float32","f32"),m.set("Float64","f32"),m.set("Double64","f32");var y=new Map;return y.set("lerc",".lrc"),y.set("none",".til"),y.set("deflate",".pzp"),y.set("jpeg",".jzp"),function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._files=null,t._storageIndex=null,t.datasetFormat="MRF",t}return r.__extends(t,e),t.prototype.open=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,n,a,i,s,l,u,f,p,h,c,g,d,m,y,w,I,x,b,_,M;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,this.init()];case 1:return r.sent(),this.datasetName=this.url.slice(this.url.lastIndexOf("/")+1),t=e?o.unwrap(e.signal):null,[4,this.request(this.url,{responseType:"xml",signal:t})];case 2:return n=r.sent(),a=this._parseHeader(n.data),i=a.rasterInfo,s=a.files,this._set("rasterInfo",i),this._files=s,[4,this.request(s.index,{responseType:"array-buffer",signal:t})];case 3:for(l=r.sent(),this._storageIndex=this._parseIndex(l.data),u=0,f=-1,c=this.rasterInfo.storageInfo,g=c.blockWidth,d=c.blockHeight,m=c.compression,y=this.rasterInfo.storageInfo.pyramidScalingFactor,w=this.rasterInfo,I=w.width,x=w.height,b=w.bandCount,_=[],M="none"===m?1:b;u<this._storageIndex.length;)f++,p=Math.ceil(I/g/Math.pow(y,f)),h=Math.ceil(x/d/Math.pow(y,f)),u+=p*h*M*4,_.push({maxRow:h,maxCol:p,minCol:0,minRow:0});return this.rasterInfo.storageInfo.blockBoundary=_,f>0&&(this.rasterInfo.storageInfo.firstPyramidLevel=1,this.rasterInfo.storageInfo.maximumPyramidLevel=f),this.updateTileInfo(),[2]}}))}))},t.prototype.fetchRawTile=function(e,t,n,a){return void 0===a&&(a={}),r.__awaiter(this,void 0,void 0,(function(){var o,s,u,f,p,h,c,g,d,m,y,w,I,x,b,_,M,v,A,R,F,T,E,k,U,C;return r.__generator(this,(function(r){switch(r.label){case 0:if(o=this.rasterInfo.storageInfo,s=o.blockWidth,u=o.blockHeight,f=o.blockBoundary,p=o.compression,!(h=f[e])||h.maxRow<t||h.maxCol<n||h.minRow>t||h.minCol>n)return[2,null];if(c=this.rasterInfo,g=c.bandCount,d=c.pixelType,m=this._getTileLocation(e,t,n),y=m.ranges,w=m.actualTileWidth,I=m.actualTileHeight,!y||0===y.length)return[2,null];if(0===y[0].from&&0===y[0].to)return C=new Uint8Array(s*u),[2,new l({width:s,height:u,pixels:null,mask:C,validPixelCount:0})];for(x=this.ioConfig.bandIds,b="none"===p?1:g,_=[],M=0,M=0;M<b;M++)(!x||x.indexOf[M]>-1)&&_.push(this.request(this._files.data,{range:{from:y[M].from,to:y[M].to},responseType:"array-buffer",signal:a.signal}));return[4,i.all(_)];case 1:for(v=r.sent(),A=v.map((function(e){return e.data.byteLength})).reduce((function(e,t){return e+t})),R=new Uint8Array(A),F=0,M=0;M<b;M++)R.set(new Uint8Array(v[M].data),F),F+=v[M].data.byteLength;return T="lerc"===this.rasterInfo.storageInfo.compression?"lerc":"bip",[4,this.decodePixelBlock(R.buffer,{width:s,height:u,format:T,pixelType:d})];case 2:if(E=r.sent(),k=0,U=0,w!==s||I!==u)if(C=E.mask)for(M=0;M<u;M++)if(U=M*s,M<I)for(k=w;k<s;k++)C[U+k]=0;else for(k=0;k<s;k++)C[U+k]=0;else for(C=new Uint8Array(s*u),E.mask=C,M=0;M<I;M++)for(U=M*s,k=0;k<w;k++)C[U+k]=1;return[2,E]}}))}))},t.prototype._parseIndex=function(e){if(e.byteLength%16>0)throw"invalid array buffer must be multiples of 16";var t,r,n,a,o,i;if(d){for(r=new Uint8Array(e),a=new ArrayBuffer(e.byteLength),n=new Uint8Array(a),o=0;o<e.byteLength/4;o++)for(i=0;i<4;i++)n[4*o+i]=r[4*o+3-i];t=new Uint32Array(a)}else t=new Uint32Array(e);return t},t.prototype._getTileLocation=function(e,t,r){var n,a,o,i=this.rasterInfo.storageInfo,s=i.blockWidth,l=i.blockHeight,u=i.pyramidScalingFactor,f=i.compression,p=this.rasterInfo,h=p.width,c=p.height,g=p.bandCount,d="none"===f?1:g,m=0,y=0;for(o=0;o<e;o++)y=Math.pow(u,o),m+=(n=Math.ceil(h/s/y))*(a=Math.ceil(c/l/y));y=Math.pow(u,e),n=Math.ceil(h/s/y),a=Math.ceil(c/l/y),m+=t*n+r,m*=4*d;for(var w=this._storageIndex.subarray(m,m+4*d),I=0,x=0,b=[],_=0;_<d;_++)x=(I=w[4*_+0]*Math.pow(2,32)+w[4*_+1])+w[4*_+2]*Math.pow(2,32)+w[4*_+3],b.push({from:I,to:x});return{ranges:b,actualTileWidth:r<n-1?s:Math.ceil(h/y)-s*(n-1),actualTileHeight:t<a-1?l:Math.ceil(c/y)-l*(a-1)}},t.prototype._parseHeader=function(e){var t=h.getElement(e,"MRF_META/Raster");if(!t)throw new a("mrf:open","not a valid MRF format");var r=h.getElement(t,"Size"),o=parseInt(r.getAttribute("x"),10),i=parseInt(r.getAttribute("y"),10),s=parseInt(r.getAttribute("c"),10),l=(h.getElementValue(t,"Compression")||"none").toLowerCase();if(!l||-1===["none","lerc"].indexOf(l))throw new a("mrf:open","currently does not support compression "+l);var p=h.getElementValue(t,"DataType")||"UInt8",c=m.get(p);if(null==c)throw new a("mrf:open","currently does not support pixel type "+p);var g,d,w=h.getElement(t,"PageSize"),I=parseInt(w.getAttribute("x"),10),x=parseInt(w.getAttribute("y"),10),b=h.getElement(t,"DataValues");if(b&&null!=(d=b.getAttribute("NoData"))&&(g=d.trim().split(" ").map((function(e){return parseFloat(e)}))),h.getElement(e,"MRF_META/CachedSource"))throw new a("mrf:open","currently does not support MRF referencing other data files");var _=h.getElement(e,"MRF_META/GeoTags"),M=h.getElement(_,"BoundingBox");if(null==M)throw new a("mrf:open","missing node MRF_META/GeoTags/BoundingBox");var v,A=parseFloat(M.getAttribute("minx")),R=parseFloat(M.getAttribute("miny")),F=parseFloat(M.getAttribute("maxx")),T=parseFloat(M.getAttribute("maxy")),E=h.getElementValue(_,"Projection"),k=h.getElementValue(e,"datafile"),U=h.getElementValue(e,"IndexFile");"LOCAL_CS[]"!==E&&(v=new n.SpatialReference({wkt:E}));var C=new n.Extent(A,R,F,T);C.spatialReference=v;var B=h.getElement(e,"MRF_META/Rsets"),L=parseInt(B&&B.getAttribute("scale")||"2",10),S=new f({origin:new n.Point({x:C.xmin,y:C.ymax,spatialReference:v}),blockWidth:I,blockHeight:x,pyramidBlockWidth:I,pyramidBlockHeight:x,compression:l,pyramidScalingFactor:L}),H=new n.Point({x:(F-A)/o,y:(T-R)/i,spatialReference:v});return{rasterInfo:new u({width:o,height:i,extent:C,spatialReference:v,bandCount:s,pixelType:c,pixelSize:H,noDataValue:g,storageInfo:S}),files:{mrf:this.url,index:U||this.url.replace(".mrf",".idx"),data:k||this.url.replace(".mrf",y.get(l))}}},r.__decorate([s.property()],t.prototype,"_files",void 0),r.__decorate([s.property()],t.prototype,"_storageIndex",void 0),r.__decorate([s.property({type:String,json:{write:!0}})],t.prototype,"datasetFormat",void 0),t=r.__decorate([s.subclass("esri.layers.support.rasterIO.MRFRaster")],t)}(p)}));