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

define(["dojo/has","dojo/string","dojo/_base/lang","dojo/_base/array","../../kernel","../../geometry/Point","../../geometry/Extent","../../SpatialReference","../../geometry/webMercatorUtils"],(function(n,e,r,t,o,a,i,u,s){var l="0123456789bcdefghjkmnpqrstuvwxyz",x={base32:l,decimals:function(){for(var n={},e=0;e<l.length;e++)n[l[e]]=e;return n}(),neighbors:{n:[null,"238967debc01fg45kmstqrwxuvhjyznp"],s:[null,"bc01fg45238967deuvhjyznpkmstqrwx"],e:[null,"14365h7k9dcfesgujnmqp0r2twvyx8zb"],w:[null,"p0r21436x8zb9dcf5h7kjnmqesgutwvy"]},borders:{n:[null,"bcfguvyz"],s:[null,"0145hjnp"],e:[null,"prxz"],w:[null,"028b"]},bitsPerBase32Char:5,maxGeohashLength:12,longitudeRange:[-180,180],latitudeRange:[-90,90]};function h(n){var e=n.spatialReference;if(!e)return{x:n.x,y:n.y};var r,t=e.isWebMercator();return 4326===e.wkid?r={x:n.x,y:n.y}:t&&(r={x:n.getLongitude(),y:n.getLatitude()}),r}function c(n){var e,r=n.spatialReference,t=!(!r||!r.isWebMercator());return!(!r||4326!==r.wkid)?e=new i(n.toJson()):t&&(e=s.webMercatorToGeographic(n,!0)),e}function f(n,e){var r=u.prototype._info[4326];return e.x=a.prototype._normalizeX(n.x,r),e.y=n.y,e}function g(n){var r=x.decimals[n].toString(2);return e.pad(r,x.bitsPerBase32Char,"0")}function m(n,e){var r;(e=e.slice()).splice(1,0,0);for(var t=e[0],o=e[2],a=0;a<n.length;a++){Number(n[a])?e[0]=e[1]:e[2]=e[1],r=e[1]=(e[0]+e[2])/2,t=e[0],o=e[2]}return{value:r,min:t,max:o}}function v(n){var e=function(n){var e=m(n[0],x.longitudeRange),r=m(n[1],x.latitudeRange);return{x:e.value,y:r.value,extent:{xmin:e.min,xmax:e.max,ymin:r.min,ymax:r.max}}}(function(n){for(var e=[],r=[],t=0;t<n.length;t++)t%2==0?e.push(n[t]):r.push(n[t]);return[e=e.join(""),r=r.join("")]}(function(n){for(var e=[],r=0;r<n.length;r++)e.push(g(n[r]));return e.join("")}(n)));return{point:{x:e.x,y:e.y},extent:e.extent,geohash:n}}function y(n,e,r){var t=[];(e=e.slice()).splice(1,0,0);for(var o=e[0],a=e[2],i=0;i<r;i++){var u;n>=e[1]?(e[0]=e[1],u=1):(e[2]=e[1],u=0),e[1]=(e[0]+e[2])/2,t.push(u),o=e[0],a=e[2]}return{value:t.join(""),min:o,max:a}}function p(n){var e,r,t=n*x.bitsPerBase32Char;return t%2==0?e=r=t/2:r=t-(e=(t+1)/2),{lon:e,lat:r}}function b(n){var e=0;n=n.split("").reverse().join("");for(var r=0;r<n.length;r++){e+=Number(n[r])*Math.pow(2,r)}return x.base32[e]}function d(n,e){var r=function(n,e){var r=p(e),t=y(n.x,x.longitudeRange,r.lon),o=y(n.y,x.latitudeRange,r.lat);return{x:t.value,y:o.value,extent:{xmin:t.min,xmax:t.max,ymin:o.min,ymax:o.max}}}(n,e),t=function(n){for(var e=n.length,r=x.bitsPerBase32Char,t=e/r,o=[],a=0;a<t;a++){var i=n.substr(a*r,r);o.push(b(i))}return o.join("")}(function(n,e){for(var r=[],t=n.length+e.length,o=Math.ceil(t/x.bitsPerBase32Char),a=0,i=0,u=0;u<o*x.bitsPerBase32Char;u++){var s=u%2==0?n[a++]:e[i++];null==s&&(s=0),r.push(s)}return r.join("")}(r.x,r.y));return{point:n,extent:r.extent,geohash:t}}function w(n,e){var r={x:n.xmin,y:n.ymin},t={x:n.xmin,y:n.ymax},o={x:n.xmax,y:n.ymin},a={x:n.xmax,y:n.ymax};return{sw:E.pointToGeohash(r,e),nw:E.pointToGeohash(t,e),se:E.pointToGeohash(o,e),ne:E.pointToGeohash(a,e)}}function j(n,e,r,t,o){var a,i=n;do{o[i]||(o[i]=!0,t.push(i)),(a=i===e)||(i=P(i,r))}while(!a)}function T(n,e,r,t){var o=w(n,e),a=[];j(o.sw,o.nw,"n",a,{});var i=[];j(o.se,o.ne,"n",i,{});for(var u=0;u<a.length;u++)j(a[u],i[u],"e",r,t)}function z(n){return t.filter(n,(function(n){return 180===n.xmax}))[0]}function C(n){return t.filter(n,(function(n){return-180===n.xmin}))[0]}function M(n,e,r,t){var o=E.geographicToWebMercator(n),a=o.y+e,u=o.y-e,s={x:o.x+e,y:a},l={x:o.x-e,y:u},x=E.webMercatorToGeographic(s,!0),h=E.webMercatorToGeographic(l,!0),c=null!=r?r:h.x,f=null!=t?t:x.x;return new i(c,h.y,f,x.y)}function G(n,e,r,t){var o,a;"min"===t?a=180:"max"===t&&(o=-180);var u=function(n,e,r){var t=E.geohashToCell(n.sw).extent,o=E.geohashToCell(n.ne).extent,a=null!=e?e:t.xmin,i=null!=r?r:o.xmax;return{xmin:a,ymin:t.ymin,xmax:i,ymax:o.ymax}}(w(n,e),o,a),s=M({x:u.xmin,y:u.ymin},r,o,a),l=M({x:u.xmax,y:u.ymax},r,o,a);return new i(s.xmin,s.ymin,l.xmax,l.ymax)}function k(n,e,r){var t,o=n,a=0;do{a++,(t=o===e)||(o=P(o,r))}while(!t);return a}function R(n,e){var r=w(n,e),t=k(r.nw,r.ne,"e");return{rows:k(r.nw,r.sw,"s"),cols:t}}function q(n,e){var r=z(n),t=C(n),o=R(r,e),a=R(t,e),i=o.rows,u=o.cols+a.cols;return function(n,e,r){return n=f(n,{}),e=f(e,{}),E.pointToGeohash(n,r)===E.pointToGeohash(e,r)}({x:r.xmin,y:r.ymax},{x:t.xmax,y:t.ymax},e)&&u--,{rows:i,cols:u}}function P(n,e){var r=n.length%2,t=n.slice(-1),o=x.decimals[t],a=n.slice(0,-1);return-1!=x.borders[e][r].indexOf(t)&&a&&(a=P(a,e)),a+x.neighbors[e][r][o]}x.neighbors.n[0]="14365h7k9dcfesgujnmqp0r2twvyx8zb",x.neighbors.s[0]="p0r21436x8zb9dcf5h7kjnmqesgutwvy",x.neighbors.e[0]="238967debc01fg45kmstqrwxuvhjyznp",x.neighbors.w[0]="bc01fg45238967deuvhjyznpkmstqrwx",x.borders.n[0]="prxz",x.borders.s[0]="028b",x.borders.e[0]="bcfguvyz",x.borders.w[0]="0145hjnp";var E={geographicToWebMercator:function(n){var e=a.lngLatToXY(n.x,n.y);return{x:e[0],y:e[1]}},webMercatorToGeographic:function(n,e){var r=a.xyToLngLat(n.x,n.y,e);return{x:r[0],y:r[1]}},geohashToCell:function(n){return v(n)},pointToCell:function(n,e){e=e||x.maxGeohashLength;var r=h(n);if(r)return d(r=f(r,r),e)},geohashToPoint:function(n){return E.geohashToCell(n).point},pointToGeohash:function(n,e){var r=E.pointToCell(n,e);return r&&r.geohash},getCells:function(n){return t.map(n,(function(n){return E.geohashToCell(n)}))},getCellSize:function(n){n=n||1;var e=x.longitudeRange,r=x.latitudeRange,t=Math.abs(e[1]-e[0]),o=Math.abs(r[1]-r[0]),a=p(n);return{width:t/Math.pow(2,a.lon),height:o/Math.pow(2,a.lat)}},getCellSizeInMeters:function(n){var e=E.getCellSize(n),r=s.metersPerDegree;return e.width*=r,e.height*=r,e},getIntersecting:function(n,e,r){e=e||1,r=r||0;var o=[],a=c(n);if(a){r&&(a=E.expandExtent(n,e,r));var i=a.normalize(),u={};t.forEach(i,(function(n){T(n,e,o,u)}))}return o},countIntersecting:function(n,e,r){e=e||1,r=r||0;var t=0,o=c(n);if(o){r&&(o=E.expandExtent(n,e,r));var a,i=o.normalize();t=2===i.length?(a=q(i,e)).cols*a.rows:(a=R(i[0],e)).cols*a.rows}return t},getChildren:function(n){n=n||"";var e=[];for(var r in x.decimals)e.push(n+r);return e},getNeighbors:function(n){var e=P(n,"n"),r=P(n,"s");return[e,P(e,"e"),P(e,"w"),r,P(r,"e"),P(r,"w"),P(n,"e"),P(n,"w")]},getExtentFromDistance:function(n,e){var r;e=e||1e3;var t=h(n);return t&&(r=M(t,e)),r},expandExtent:function(n,e,r){e=e||1,r=r||0;var t=c(n);if(t){if(r){var o=t.normalize();return 2===o.length?function(n,e,r){var t,o,a=z(n),u=C(n),s=G(a,e,r,"min"),l=G(u,e,r,"max");return s.getWidth()+l.getWidth()>=360?(t=-180,o=180):(t=s.xmin,o=l.xmax),new i(t,s.ymin,o,s.ymax)}(o,e,r):G(o[0],e,r)}return t}},getNeighborsWithinDistance:function(n,e,r){r=r||1e3,e=e||1;var o=[],a=h(n);if(a){var i=M(a,r).normalize(),u={};t.forEach(i,(function(n){T(n,e,o,u)}))}return o}};return n("extend-esri")&&r.setObject("layers.clustering.geohashUtils",E,o),E}));