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

define([],(function(){"use strict";var e=function(e,r,t,a,i,n,s,f){var l,o,u,c,h,d=(1<<t)-1,p=0,m=0,g=4*e.length-Math.ceil(t*a/8);if(e[e.length-1]<<=8*g,i)for(l=0;l<a;l++)0===m&&(u=e[p++],m=32),m>=t?(o=u>>>m-t&d,m-=t):(o=(u&d)<<(c=t-m)&d,o+=(u=e[p++])>>>(m=32-c)),r[l]=i[o];else for(h=Math.ceil((f-n)/s),l=0;l<a;l++)0===m&&(u=e[p++],m=32),m>=t?(o=u>>>m-t&d,m-=t):(o=(u&d)<<(c=t-m)&d,o+=(u=e[p++])>>>(m=32-c)),r[l]=o<h?n+o*s:f},r=function(e,r,t,a,i,n){var s,f=(1<<r)-1,l=0,o=0,u=0,c=0,h=0,d=[],p=4*e.length-Math.ceil(r*t/8);e[e.length-1]<<=8*p;var m=Math.ceil((n-a)/i);for(o=0;o<t;o++)0===c&&(s=e[l++],c=32),c>=r?(h=s>>>c-r&f,c-=r):(h=(s&f)<<(u=r-c)&f,h+=(s=e[l++])>>>(c=32-u)),d[o]=h<m?a+h*i:n;return d.unshift(a),d},t=function(e,r,t,a,i,n,s,f){var l,o,u,c,h=(1<<t)-1,d=0,p=0,m=0;if(i)for(l=0;l<a;l++)0===p&&(u=e[d++],p=32,m=0),p>=t?(o=u>>>m&h,p-=t,m+=t):(o=u>>>m&h,p=32-(c=t-p),o|=((u=e[d++])&(1<<c)-1)<<t-c,m=c),r[l]=i[o];else{var g=Math.ceil((f-n)/s);for(l=0;l<a;l++)0===p&&(u=e[d++],p=32,m=0),p>=t?(o=u>>>m&h,p-=t,m+=t):(o=u>>>m&h,p=32-(c=t-p),o|=((u=e[d++])&(1<<c)-1)<<t-c,m=c),r[l]=o<g?n+o*s:f}return r},a=function(e,r,t,a,i,n){var s,f=(1<<r)-1,l=0,o=0,u=0,c=0,h=0,d=0,p=[],m=Math.ceil((n-a)/i);for(o=0;o<t;o++)0===c&&(s=e[l++],c=32,d=0),c>=r?(h=s>>>d&f,c-=r,d+=r):(h=s>>>d&f,c=32-(u=r-c),h|=((s=e[l++])&(1<<u)-1)<<r-u,d=u),p[o]=h<m?a+h*i:n;return p.unshift(a),p},i=function(e,r,t,a){var i,n,s,f,l=(1<<t)-1,o=0,u=0,c=4*e.length-Math.ceil(t*a/8);for(e[e.length-1]<<=8*c,i=0;i<a;i++)0===u&&(s=e[o++],u=32),u>=t?(n=s>>>u-t&l,u-=t):(n=(s&l)<<(f=t-u)&l,n+=(s=e[o++])>>>(u=32-f)),r[i]=n;return r},n=function(e,r,t,a){var i,n,s,f,l=(1<<t)-1,o=0,u=0,c=0;for(i=0;i<a;i++)0===u&&(s=e[o++],u=32,c=0),u>=t?(n=s>>>c&l,u-=t,c+=t):(n=s>>>c&l,u=32-(f=t-u),n|=((s=e[o++])&(1<<f)-1)<<t-f,c=f),r[i]=n;return r},s={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var r=65535,t=65535,a=e.length,i=Math.floor(a/2),n=0;i;){var s=i>=359?359:i;i-=s;do{r+=e[n++]<<8,t+=r+=e[n++]}while(--s);r=(65535&r)+(r>>>16),t=(65535&t)+(t>>>16)}return 1&a&&(t+=r+=e[n]<<8),((t=(65535&t)+(t>>>16))<<16|(r=(65535&r)+(r>>>16)))>>>0},readHeaderInfo:function(e,r){var t=r.ptr,a=new Uint8Array(e,t,6),i={};if(i.fileIdentifierString=String.fromCharCode.apply(null,a),0!==i.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+i.fileIdentifierString;t+=6;var n,s=new DataView(e,t,8),f=s.getInt32(0,!0);if(i.fileVersion=f,t+=4,f>=3&&(i.checksum=s.getUint32(4,!0),t+=4),s=new DataView(e,t,12),i.height=s.getUint32(0,!0),i.width=s.getUint32(4,!0),t+=8,f>=4?(i.numDims=s.getUint32(8,!0),t+=4):i.numDims=1,s=new DataView(e,t,40),i.numValidPixel=s.getUint32(0,!0),i.microBlockSize=s.getInt32(4,!0),i.blobSize=s.getInt32(8,!0),i.imageType=s.getInt32(12,!0),i.maxZError=s.getFloat64(16,!0),i.zMin=s.getFloat64(24,!0),i.zMax=s.getFloat64(32,!0),t+=40,r.headerInfo=i,r.ptr=t,f>=3&&(n=f>=4?52:48,this.computeChecksumFletcher32(new Uint8Array(e,t-n,i.blobSize-14))!==i.checksum))throw"Checksum failed.";return!0},checkMinMaxRanges:function(e,r){var t=r.headerInfo,a=this.getDataTypeArray(t.imageType),i=t.numDims*this.getDataTypeSize(t.imageType),n=this.readSubArray(e,r.ptr,a,i),s=this.readSubArray(e,r.ptr+i,a,i);r.ptr+=2*i;var f,l=!0;for(f=0;f<t.numDims;f++)if(n[f]!==s[f]){l=!1;break}return t.minValues=n,t.maxValues=s,l},readSubArray:function(e,r,t,a){var i;if(t===Uint8Array)i=new Uint8Array(e,r,a);else{var n=new ArrayBuffer(a);new Uint8Array(n).set(new Uint8Array(e,r,a)),i=new t(n)}return i},readMask:function(e,r){var t,a,i=r.ptr,n=r.headerInfo,s=n.width*n.height,f=n.numValidPixel,l=new DataView(e,i,4),o={};if(o.numBytes=l.getUint32(0,!0),i+=4,(0===f||s===f)&&0!==o.numBytes)throw"invalid mask";if(0===f)t=new Uint8Array(Math.ceil(s/8)),o.bitset=t,a=new Uint8Array(s),r.pixels.resultMask=a,i+=o.numBytes;else if(o.numBytes>0){t=new Uint8Array(Math.ceil(s/8));var u=(l=new DataView(e,i,o.numBytes)).getInt16(0,!0),c=2,h=0,d=0;do{if(u>0)for(;u--;)t[h++]=l.getUint8(c++);else for(d=l.getUint8(c++),u=-u;u--;)t[h++]=d;u=l.getInt16(c,!0),c+=2}while(c<o.numBytes);if(-32768!==u||h<t.length)throw"Unexpected end of mask RLE encoding";a=new Uint8Array(s);var p=0,m=0;for(m=0;m<s;m++)7&m?(p=t[m>>3],p<<=7&m):p=t[m>>3],128&p&&(a[m]=1);r.pixels.resultMask=a,o.bitset=t,i+=o.numBytes}return r.ptr=i,r.mask=o,!0},readDataOneSweep:function(e,r,t){var a,i=r.ptr,n=r.headerInfo,f=n.numDims,l=n.width*n.height,o=n.imageType,u=n.numValidPixel*s.getDataTypeSize(o)*f,c=r.pixels.resultMask;if(t===Uint8Array)a=new Uint8Array(e,i,u);else{var h=new ArrayBuffer(u);new Uint8Array(h).set(new Uint8Array(e,i,u)),a=new t(h)}if(a.length===l*f)r.pixels.resultPixels=a;else{r.pixels.resultPixels=new t(l*f);var d=0,p=0,m=0,g=0;if(f>1)for(m=0;m<f;m++)for(g=m*l,p=0;p<l;p++)c[p]&&(r.pixels.resultPixels[g+p]=a[d++]);else for(p=0;p<l;p++)c[p]&&(r.pixels.resultPixels[p]=a[d++])}return i+=u,r.ptr=i,!0},readHuffmanTree:function(e,r){var t=this.HUFFMAN_LUT_BITS_MAX,a=new DataView(e,r.ptr,16);if(r.ptr+=16,a.getInt32(0,!0)<2)throw"unsupported Huffman version";var i=a.getInt32(4,!0),n=a.getInt32(8,!0),l=a.getInt32(12,!0);if(n>=l)return!1;var o=new Uint32Array(l-n);s.decodeBits(e,r,o);var u,c,h,d,p=[];for(u=n;u<l;u++)p[c=u-(u<i?0:i)]={first:o[u-n],second:null};var m=e.byteLength-r.ptr,g=Math.ceil(m/4),w=new ArrayBuffer(4*g);new Uint8Array(w).set(new Uint8Array(e,r.ptr,m));var y,x=new Uint32Array(w),k=0,b=0;for(y=x[0],u=n;u<l;u++)(d=p[c=u-(u<i?0:i)].first)>0&&(p[c].second=y<<k>>>32-d,32-k>=d?32===(k+=d)&&(k=0,y=x[++b]):(k+=d-32,y=x[++b],p[c].second|=y>>>32-k));var I=0,v=0,U=new f;for(u=0;u<p.length;u++)void 0!==p[u]&&(I=Math.max(I,p[u].first));v=I>=t?t:I;var M,A,V,D,S,T=[];for(u=n;u<l;u++)if((d=p[c=u-(u<i?0:i)].first)>0)if(M=[d,c],d<=v)for(A=p[c].second<<v-d,V=1<<v-d,h=0;h<V;h++)T[A|h]=M;else for(A=p[c].second,S=U,D=d-1;D>=0;D--)A>>>D&1?(S.right||(S.right=new f),S=S.right):(S.left||(S.left=new f),S=S.left),0!==D||S.val||(S.val=M[1]);return{decodeLut:T,numBitsLUTQick:v,numBitsLUT:I,tree:U,stuffedData:x,srcPtr:b,bitPos:k}},readHuffman:function(e,r,t){var a,i,n,s,f,l,o,u,c,h=r.headerInfo,d=h.numDims,p=r.headerInfo.height,m=r.headerInfo.width,g=m*p,w=this.readHuffmanTree(e,r),y=w.decodeLut,x=w.tree,k=w.stuffedData,b=w.srcPtr,I=w.bitPos,v=w.numBitsLUTQick,U=w.numBitsLUT,M=0===r.headerInfo.imageType?128:0,A=r.pixels.resultMask,V=0;I>0&&(b++,I=0);var D,S=k[b],T=1===r.encodeMode,B=new t(g*d),P=B;for(D=0;D<h.numDims;D++){if(d>1&&(P=new t(B.buffer,g*D,g),V=0),r.headerInfo.numValidPixel===m*p)for(u=0,l=0;l<p;l++)for(o=0;o<m;o++,u++){if(i=0,f=s=S<<I>>>32-v,32-I<v&&(f=s|=k[b+1]>>>64-I-v),y[f])i=y[f][1],I+=y[f][0];else for(f=s=S<<I>>>32-U,32-I<U&&(f=s|=k[b+1]>>>64-I-U),a=x,c=0;c<U;c++)if(!(a=s>>>U-c-1&1?a.right:a.left).left&&!a.right){i=a.val,I=I+c+1;break}I>=32&&(I-=32,S=k[++b]),n=i-M,T?(n+=o>0?V:l>0?P[u-m]:V,n&=255,P[u]=n,V=n):P[u]=n}else for(u=0,l=0;l<p;l++)for(o=0;o<m;o++,u++)if(A[u]){if(i=0,f=s=S<<I>>>32-v,32-I<v&&(f=s|=k[b+1]>>>64-I-v),y[f])i=y[f][1],I+=y[f][0];else for(f=s=S<<I>>>32-U,32-I<U&&(f=s|=k[b+1]>>>64-I-U),a=x,c=0;c<U;c++)if(!(a=s>>>U-c-1&1?a.right:a.left).left&&!a.right){i=a.val,I=I+c+1;break}I>=32&&(I-=32,S=k[++b]),n=i-M,T?(o>0&&A[u-1]?n+=V:l>0&&A[u-m]?n+=P[u-m]:n+=V,n&=255,P[u]=n,V=n):P[u]=n}r.ptr=r.ptr+4*(b+1)+(I>0?4:0)}r.pixels.resultPixels=B},decodeBits:function(s,f,l,o,u){var c=f.headerInfo,h=c.fileVersion,d=0,p=s.byteLength-f.ptr>=5?5:s.byteLength-f.ptr,m=new DataView(s,f.ptr,p),g=m.getUint8(0);d++;var w=g>>6,y=0===w?4:3-w,x=(32&g)>0,k=31&g,b=0;if(1===y)b=m.getUint8(d),d++;else if(2===y)b=m.getUint16(d,!0),d+=2;else{if(4!==y)throw"Invalid valid pixel count type";b=m.getUint32(d,!0),d+=4}var I,v,U,M,A,V,D,S,T,B=2*c.maxZError,P=c.numDims>1?c.maxValues[u]:c.zMax;if(x){for(f.counter.lut++,S=m.getUint8(d),k,d++,M=Math.ceil((S-1)*k/8),A=Math.ceil(M/4),v=new ArrayBuffer(4*A),U=new Uint8Array(v),f.ptr+=d,U.set(new Uint8Array(s,f.ptr,M)),D=new Uint32Array(v),f.ptr+=M,T=0;S-1>>>T;)T++;M=Math.ceil(b*T/8),A=Math.ceil(M/4),v=new ArrayBuffer(4*A),(U=new Uint8Array(v)).set(new Uint8Array(s,f.ptr,M)),I=new Uint32Array(v),f.ptr+=M,V=h>=3?a(D,k,S-1,o,B,P):r(D,k,S-1,o,B,P),h>=3?t(I,l,T,b,V):e(I,l,T,b,V)}else f.counter.bitstuffer++,T=k,f.ptr+=d,T>0&&(M=Math.ceil(b*T/8),A=Math.ceil(M/4),v=new ArrayBuffer(4*A),(U=new Uint8Array(v)).set(new Uint8Array(s,f.ptr,M)),I=new Uint32Array(v),f.ptr+=M,h>=3?null==o?n(I,l,T,b):t(I,l,T,b,!1,o,B,P):null==o?i(I,l,T,b):e(I,l,T,b,!1,o,B,P))},readTiles:function(e,r,t){var a=r.headerInfo,i=a.width,n=a.height,f=a.microBlockSize,l=a.imageType,o=s.getDataTypeSize(l),u=Math.ceil(i/f),c=Math.ceil(n/f);r.pixels.numBlocksY=c,r.pixels.numBlocksX=u,r.pixels.ptr=0;var h,d,p,m,g,w,y,x,k,b,I=0,v=0,U=0,M=0,A=0,V=0,D=0,S=0,T=0,B=0,P=0,z=0,F=0,L=0,O=0,C=new t(f*f),H=n%f||f,E=i%f||f,_=a.numDims,X=r.pixels.resultMask,Z=r.pixels.resultPixels,R=a.fileVersion>=5?14:15,Y=a.zMax;for(U=0;U<c;U++)for(A=U!==c-1?f:H,M=0;M<u;M++)for(B=U*i*f+M*f,P=i-(V=M!==u-1?f:E),x=0;x<_;x++){if(_>1?(b=Z,B=U*i*f+M*f,Z=new t(r.pixels.resultPixels.buffer,i*n*x*o,i*n),Y=a.maxValues[x]):b=null,D=e.byteLength-r.ptr,d={},O=0,S=(h=new DataView(e,r.ptr,Math.min(10,D))).getUint8(0),O++,k=a.fileVersion>=5?4&S:0,T=S>>6&255,(S>>2&R)!==(M*f>>3&R))throw"integrity issue";if(k&&0===x)throw"integrity issue";if((g=3&S)>3)throw r.ptr+=O,"Invalid block encoding ("+g+")";if(2!==g)if(0===g){if(k)throw"integrity issue";if(r.counter.uncompressed++,r.ptr+=O,z=(z=A*V*o)<(F=e.byteLength-r.ptr)?z:F,p=new ArrayBuffer(z%o==0?z:z+o-z%o),new Uint8Array(p).set(new Uint8Array(e,r.ptr,z)),m=new t(p),L=0,X)for(I=0;I<A;I++){for(v=0;v<V;v++)X[B]&&(Z[B]=m[L++]),B++;B+=P}else for(I=0;I<A;I++){for(v=0;v<V;v++)Z[B++]=m[L++];B+=P}r.ptr+=L*o}else if(w=s.getDataTypeUsed(k&&l<6?4:l,T),y=s.getOnePixel(d,O,w,h),O+=s.getDataTypeSize(w),3===g)if(r.ptr+=O,r.counter.constantoffset++,X)for(I=0;I<A;I++){for(v=0;v<V;v++)X[B]&&(Z[B]=k?Math.min(Y,b[B]+y):y),B++;B+=P}else for(I=0;I<A;I++){for(v=0;v<V;v++)Z[B]=k?Math.min(Y,b[B]+y):y,B++;B+=P}else if(r.ptr+=O,s.decodeBits(e,r,C,y,x),O=0,k)if(X)for(I=0;I<A;I++){for(v=0;v<V;v++)X[B]&&(Z[B]=C[O++]+b[B]),B++;B+=P}else for(I=0;I<A;I++){for(v=0;v<V;v++)Z[B]=C[O++]+b[B],B++;B+=P}else if(X)for(I=0;I<A;I++){for(v=0;v<V;v++)X[B]&&(Z[B]=C[O++]),B++;B+=P}else for(I=0;I<A;I++){for(v=0;v<V;v++)Z[B++]=C[O++];B+=P}else{if(k)if(X)for(I=0;I<A;I++)for(v=0;v<V;v++)X[B]&&(Z[B]=b[B]),B++;else for(I=0;I<A;I++)for(v=0;v<V;v++)Z[B]=b[B],B++;r.counter.constant++,r.ptr+=O}}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:s.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var r=e.headerInfo.zMax,t=e.headerInfo.numDims,a=e.headerInfo.height*e.headerInfo.width,i=0,n=0,s=0,f=e.pixels.resultMask,l=e.pixels.resultPixels;if(f)if(t>1)for(i=0;i<t;i++)for(s=i*a,r=e.headerInfo.maxValues[i],n=0;n<a;n++)f[n]&&(l[s+n]=r);else for(n=0;n<a;n++)f[n]&&(l[n]=r);else if(t>1)for(i=0;i<t;i++)for(s=i*a,r=e.headerInfo.maxValues[i],n=0;n<a;n++)l[s+n]=r;else for(n=0;n<a;n++)l[n]=r},getDataTypeArray:function(e){var r;switch(e){case 0:r=Int8Array;break;case 1:r=Uint8Array;break;case 2:r=Int16Array;break;case 3:r=Uint16Array;break;case 4:r=Int32Array;break;case 5:r=Uint32Array;break;case 6:r=Float32Array;break;case 7:r=Float64Array;break;default:r=Float32Array}return r},getPixelType:function(e){var r;switch(e){case 0:r="S8";break;case 1:r="U8";break;case 2:r="S16";break;case 3:r="U16";break;case 4:r="S32";break;case 5:r="U32";break;case 6:r="F32";break;case 7:r="F64";break;default:r="F32"}return r},isValidPixelValue:function(e,r){if(null==r)return!1;var t;switch(e){case 0:t=r>=-128&&r<=127;break;case 1:t=r>=0&&r<=255;break;case 2:t=r>=-32768&&r<=32767;break;case 3:t=r>=0&&r<=65536;break;case 4:t=r>=-2147483648&&r<=2147483647;break;case 5:t=r>=0&&r<=4294967296;break;case 6:t=r>=-34027999387901484e22&&r<=34027999387901484e22;break;case 7:t=r>=5e-324&&r<=17976931348623157e292;break;default:t=!1}return t},getDataTypeSize:function(e){var r=0;switch(e){case 0:case 1:r=1;break;case 2:case 3:r=2;break;case 4:case 5:case 6:r=4;break;case 7:r=8;break;default:r=e}return r},getDataTypeUsed:function(e,r){var t=e;switch(e){case 2:case 4:t=e-r;break;case 3:case 5:t=e-2*r;break;case 6:t=0===r?e:1===r?2:1;break;case 7:t=0===r?e:e-2*r+1;break;default:t=e}return t},getOnePixel:function(e,r,t,a){var i=0;switch(t){case 0:i=a.getInt8(r);break;case 1:i=a.getUint8(r);break;case 2:i=a.getInt16(r,!0);break;case 3:i=a.getUint16(r,!0);break;case 4:i=a.getInt32(r,!0);break;case 5:i=a.getUInt32(r,!0);break;case 6:i=a.getFloat32(r,!0);break;case 7:i=a.getFloat64(r,!0);break;default:throw"the decoder does not understand this pixel type"}return i}},f=function(e,r,t){this.val=e,this.left=r,this.right=t};return{decode:function(e,r){var t=(r=r||{}).noDataValue,a=0,i={};if(i.ptr=r.inputOffset||0,i.pixels={},s.readHeaderInfo(e,i)){var n=i.headerInfo,f=n.fileVersion,l=s.getDataTypeArray(n.imageType);if(f>5)throw"unsupported lerc version 2."+f;s.readMask(e,i),n.numValidPixel===n.width*n.height||i.pixels.resultMask||(i.pixels.resultMask=r.maskData);var o,u=n.width*n.height;if(i.pixels.resultPixels=new l(u*n.numDims),i.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==n.numValidPixel)if(n.zMax===n.zMin)s.constructConstantSurface(i);else if(f>=4&&s.checkMinMaxRanges(e,i))s.constructConstantSurface(i);else{var c=new DataView(e,i.ptr,2),h=c.getUint8(0);if(i.ptr++,h)s.readDataOneSweep(e,i,l);else if(f>1&&n.imageType<=1&&Math.abs(n.maxZError-.5)<1e-5){var d=c.getUint8(1);if(i.ptr++,i.encodeMode=d,d>2||f<4&&d>1)throw"Invalid Huffman flag "+d;d?s.readHuffman(e,i,l):s.readTiles(e,i,l)}else s.readTiles(e,i,l)}i.eofOffset=i.ptr,r.inputOffset?(o=i.headerInfo.blobSize+r.inputOffset-i.ptr,Math.abs(o)>=1&&(i.eofOffset=r.inputOffset+i.headerInfo.blobSize)):(o=i.headerInfo.blobSize-i.ptr,Math.abs(o)>=1&&(i.eofOffset=i.headerInfo.blobSize));var p={width:n.width,height:n.height,pixelData:i.pixels.resultPixels,minValue:n.zMin,maxValue:n.zMax,validPixelCount:n.numValidPixel,dimCount:n.numDims,dimStats:{minValues:n.minValues,maxValues:n.maxValues},maskData:i.pixels.resultMask};if(i.pixels.resultMask&&s.isValidPixelValue(n.imageType,t)){var m=i.pixels.resultMask;for(a=0;a<u;a++)m[a]||(p.pixelData[a]=t);p.noDataValue=t}return i.noDataValue=t,r.returnFileInfo&&(p.fileInfo=s.formatFileInfo(i)),p}},getBandCount:function(e){for(var r=0,t=0,a={ptr:0,pixels:{}};t<e.byteLength-58;)s.readHeaderInfo(e,a),t+=a.headerInfo.blobSize,r++,a.ptr=t;return r}}}));