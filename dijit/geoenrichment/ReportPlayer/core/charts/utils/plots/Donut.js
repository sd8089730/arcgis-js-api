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

define(["dojo/_base/declare","dojo/_base/lang","dojox/charting/plot2d/Base","dojox/charting/plot2d/_PlotEvents","dojox/charting/plot2d/common","dojox/gfx/matrix","dojox/lang/functional","dojox/lang/utils","./animation/_DonutAnimation","./labelsRendering/LabelOverlapFixer","./labelsRendering/LabelsUtil"],(function(t,e,n,i,s,a,r,l,o,h,u){var c=function(t,e,n,i,s,a,r,l,o,h,u,c){var f=function(s,c,f){e=void 0!==c?c:e;var b=d.getEndAngle(e,s,a,r,o,u,f);1===s&&(b=Number(Math.floor(1e5*b)/1e5));var x,g=n*l,p=b-e,m=i.cx+n*Math.cos(e),_=i.cy+n*Math.sin(e),v=i.cx+n*Math.cos(b),M=i.cy+n*Math.sin(b);if(g){var y=i.cx+g*Math.cos(e),R=i.cy+g*Math.sin(e),A=i.cx+g*Math.cos(b),P=i.cy+g*Math.sin(b);x=t.createPath().moveTo(y,R).lineTo(m,_).arcTo(n,n,0,p>Math.PI,!0,v,M).lineTo(A,P).arcTo(g,g,0,p>Math.PI,!1,y,R).closePath().setStroke(h.series.stroke)}else x=t.createPath().moveTo(i.cx,i.cy).lineTo(m,_).arcTo(n,n,0,p>Math.PI,!0,v,M).lineTo(i.cx,i.cy).closePath().setStroke(h.series.stroke);return x.setFill(h.series.fill),{shape:x,end:b,donutGap:r}};return c.push({isSlice:!0,sliceIndex:s,func:f}),f},d={getStartAngle:function(t,e){return t.series.donutArcPercent&&100!==t.series.donutArcPercent?(100-t.series.donutArcPercent)/100*360/2-270:(t.series.startAngle||0)+e},getEndAngle:function(t,e,n,i,s,a,r){var l=t+2*e*Math.PI-i;if(n){var o=a+2*Math.PI-i;r||s.series.donutArcPercent&&100!==s.series.donutArcPercent?(l+=i,l=Math.min(l,o)):l=o}return l}};return t([n,i,o],{enableHole:!0,enableGap:!0,startAngleOffset:0,_animationInfos:null,_dataLabels:null,_labelBoxes:null,defaultParams:{labels:!0,ticks:!1,fixed:!0,precision:1,labelStyle:"outside",startAngle:0,animate:null},optionalParams:{radius:0,omitLabels:!1,labelFunc:null,stroke:{},outline:{},fill:{},styleFunc:null,font:"",fontColor:"",labelWiring:{}},constructor:function(t,n){this.opt=e.clone(this.defaultParams),l.updateWithObject(this.opt,n),l.updateWithPattern(this.opt,n,this.optionalParams),this.axes=[],this.run=null,this.dyn=[],this.runFilter=[]},clear:function(){return this.inherited(arguments),this.dyn=[],this.run=null,this},setAxis:function(t){return this},addSeries:function(t){return this.run=t,this},getSeriesStats:function(){return e.delegate(s.defaultStats)},getRequiredColors:function(){return this.run?this.run.data.length:0},getRenderResults:function(){return this._lastRenderResults},render:function(t,n){if(!this.dirty)return this;this.resetEvents(),this._eventSeries={},this.cleanGroup();var i=this.group,s=this.chart.theme;if(!this.run||!this.run.data.length)return this;var l,o,h,f,b,x,g=(t.width-n.l-n.r)/2,p=(t.height-n.t-n.b)/2/this._getRYMultiplier(s),m=Math.min(g,p),_=a._degToRad(this._getStartAngle(s)),v=_,M=this.events(),y=this.run.data.map((function(t,e){return"number"!=typeof t&&t.hidden&&(this.runFilter.push(e),t.hidden=!1),this.runFilter.some((function(t){return t===e}))?"number"==typeof t?0:{y:0,text:t.text}:t}),this);this.dyn=[],"radius"in this.opt&&(m=this.opt.radius,x=m);var R,A={cx:n.l+g,cy:n.t+p,r:m};if(h=r.map(y,"x ? Math.max(x.y, 0) : 0"),r.every(h,"<= 0"))return i.createCircle(A).setStroke(s.series.stroke),this.dyn=h.map((function(){return{}})),this;f=r.map(h,"/this",r.foldl(h,"+",0)),this.opt.labels&&(b=f.map((function(t,e){return u.getLabelInfo(this,y[e],s,{horizontalAlign:s.series.dataLabelsHorizontalAlign,dataLabelsMaxWidth:s.series.dataLabelsMaxWidth})}),this));var P=this.enableHole?(s.series.donutHolePercent||0)/100:0,S=this.enableGap?a._degToRad(s.series.donutGap||0):0;f=this._fixSlices(f,S),this._lastRenderResults={},this._animationInfos=[],this._labelBoxes=[];var L=r.map(y,(function(t,e){var n=[this.opt,this.run];return null!=t&&"number"!=typeof t&&n.push(t),this.opt.styleFunc&&n.push(this.opt.styleFunc(t)),s.next("slice",n,!0)}),this),T=this._preprocessParams(y,s,m,m*P,g,p,A,f);if(A=T.circle,m=T.r,this.opt.labels)switch(l=0,o=0,b.forEach((function(t,e){l=Math.max(l,t.box.w),o=Math.max(o,t.box.h)})),this.opt.labelStyle){case"outside":var w=m;m=Math.min(g-l,p-o)-5,x=m+10,m=Math.max(m,w/2);break;case"inside":var E=(m-m*P)/2+m*P;x=Math.abs(E+(m-l/2))/2;break;case"columns":m=Math.min(g-l-20,p-2*o),x=m}var k=new Array(f.length);function I(t,e,n){return d.getEndAngle(t,e,n,S,s,_)}if(f.some((function(t,e){t=this._getSliceValueAt(f,e,s);var n,a=y[e],r=L[e];R=m*P;var l=c(i,v,m,A,e,e+1===f.length,S,P,s,r,_,this._animationInfos)(t),o=l.end,h=l.shape;return s.series.isEditMode&&(h.rawNode.style.cursor="pointer"),this.dyn.push({fill:void 0,stroke:r.series.stroke}),M&&(n={element:"slice",index:e,run:this.run,shape:h,x:e,y:"number"==typeof a?a:a.y,cx:A.cx,cy:A.cy,cr:m},this._connectEvents(n),k[e]=n),v=o+S,!1}),this),this.opt.labels)if("outside"===this.opt.labelStyle||"inside"===this.opt.labelStyle)v=_,f.some((function(t,e){t=this._getSliceValueAt(f,e,s);var n=b[e];if(t<=0)return!1;L[e];if(t>=1)return this._labelBoxes.push({x:A.cx-n.box.w/2,y:A.cy-n.box.h/2,w:n.box.w,h:n.box.h,text:n.getText()}),!0;var i=I(v,t,e+1===f.length);if(this.opt.omitLabels&&i-v<.001)return!1;var a,r,l=(v+i)/2;return"outside"===this.opt.labelStyle?(a=A.cx+x*Math.cos(l)-(n.box.w/2-n.box.w/2*Math.cos(l)),r=A.cy+x*Math.sin(l)-(n.box.h/2-n.box.h/2*Math.sin(l))):(a=A.cx+x*Math.cos(l)-n.box.w/2,r=A.cy+x*Math.sin(l)-n.box.h/2),this._labelBoxes.push({x:a,y:r,w:n.box.w,h:n.box.h,text:n.getText()}),v=i+S,!1}),this);else if("columns"===this.opt.labelStyle){v=_;var F=this.opt.omitLabels,j=[];f.forEach((function(t,e){t=this._getSliceValueAt(f,e,s);var n=I(v,t,e+1===f.length),i=(v+n)/2;j.push({angle:i,left:Math.cos(i)<0,theme:L[e],index:e,omit:!!F&&n-v<.001}),v=n+S}),this),this._getProperLabelRadius(j,b[0].box.h,1.1*x);for(var B=0;B<j.length;B++){var G=j[B],O=b[B];if(!G.omit){var W=A.cx-g,H=A.cx+g,V=O.box.w+5,C=A.cx+G.labelR*Math.cos(G.angle),Y=A.cy+G.labelR*Math.sin(G.angle),z=G.left?W+V:H-V,N=G.left?W:z+5,q=i.createPath().moveTo(A.cx+x*Math.cos(G.angle),A.cy+x*Math.sin(G.angle));q.lineTo(C,Y),q.lineTo(z,Y).setStroke(G.theme.series.labelWiring),this._labelBoxes.push({x:N,y:Y-O.box.h/2,w:O.box.w,h:O.box.h,text:O.getText()})}}}this._renderLabels(i,s,t,n);var D=0;return this._eventSeries[this.run.name]=r.map(y,(function(t){return t<=0?null:k[D++]})),this.dirty=!1,this._lastRenderResults=e.mixin(this._lastRenderResults,{labels:this.opt.labels,radiusInner:R,radiusOuter:m}),this._renderAdditionalElements(y,i,s,m,R,A,f),this.opt.animate&&this._renderAnimation(s,m,i,A,f),this},_renderLabels:function(t,e,n,i){this._dataLabels=[],h.fixLabelsOverlap(this._labelBoxes,n,i,this._getFixLabelsParams(),t),this._labelBoxes.forEach((function(t){t.hidden||this._dataLabels.push(this.renderLabel(t))}),this)},renderLabel:function(t){var e=u.renderHTMLLabel(this.chart,t.x,t.y,t.text);return this.htmlElements.push(e),e},_getFixLabelsParams:function(){return{allowXShift:!0,allowYShift:!0,xGap:3,yGap:3,xTolerance:0,yTolerance:0}},_getStartAngle:function(t){return d.getStartAngle(t,this.startAngleOffset)},_getEndAngle:function(t){return 0},_fixSlices:function(t,e){var n=[],i=0,s=[],a=e/(2*Math.PI)+.001;t.forEach((function(t,e){if(t<a){var r=a-t;t=a,i+=r,s.push(e),n[e]=t}}));var r=i/(t.length-s.length);return t.forEach((function(t,e){-1===s.indexOf(e)&&(t-=r,n[e]=t)})),n},_getSliceValueAt:function(t,e,n){return Math.max(0,t[e])*(n.series.donutArcPercent?n.series.donutArcPercent/100:1)},_preprocessParams:function(t,e,n,i,s,a,r,l){return{circle:r,r:n}},_getRYMultiplier:function(t){return Math.max(.625,t.series.donutArcPercent&&100!==t.series.donutArcPercent?(1+Math.cos(a._degToRad(360*(100-t.series.donutArcPercent)/100/2.1)))/2:1)},_renderAdditionalElements:function(t,e,n,i,s,a,r){},_getProperLabelRadius:function(t,e,n){var i,s,a=1,r=1;if(1!==t.length){for(var l=0;l<t.length;l++){var o=Math.abs(Math.sin(t[l].angle));t[l].left?a>=o&&(a=o,i=t[l]):r>=o&&(r=o,s=t[l])}i.labelR=s.labelR=n,this._calculateLabelR(i,t,e),this._calculateLabelR(s,t,e)}else t[0].labelR=n},_calculateLabelR:function(t,e,n){for(var i,s=t.index,a=e.length,r=t.labelR;!(e[s%a].left^e[(s+1)%a].left);)e[(s+1)%a].omit||(r=(i=(Math.sin(e[s%a].angle)*r+(e[s%a].left?-n:n))/Math.sin(e[(s+1)%a].angle))<t.labelR?t.labelR:i,e[(s+1)%a].labelR=r),s++;for(var l=0===(s=t.index)?a-1:s-1;!(e[s].left^e[l].left);)e[l].omit||(r=(i=(Math.sin(e[s].angle)*r+(e[s].left?n:-n))/Math.sin(e[l].angle))<t.labelR?t.labelR:i,e[l].labelR=r),l--,s=--s<0?s+e.length:s,l=l<0?l+e.length:l}})}));