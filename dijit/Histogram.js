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

define(["require","../kernel","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/Tooltip","dojo/has","dojo/on","dojo/string","dojo/number","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/dom","dojo/dom-construct","dojo/dom-style","dojo/dom-class","dojo/dom-geometry","dojo/date/locale","dojox/gfx","dojo/i18n!../nls/jsapi","dojo/text!./Histogram/templates/Histogram.html"],(function(t,e,i,s,a,o,n,r,d,g,h,l,u,m,c,_,b,p,f,v,L){var j=h([s,i],{declaredClass:"esri.dijit.Histogram",baseClass:"esri-histogram",templateString:L,data:null,statistics:null,isDate:!1,css:{container:"esri-histogram-container",topLabel:"esri-histogram-top-label",svgContainer:"esri-histogram-svg-container",bottomLabel:"esri-histogram-bottom-label",surface:"esri-histogram-surface",group:"esri-histogram-group",bar:"esri-histogram-bar"},_surface:null,_countTooltips:null,_barsGroup:null,_defaultImagePadding:30,_defaultBarPadding:40,_i18n:v.widgets.histogram,constructor:function(t,e){this._countTooltips=[]},startup:function(){this.inherited(arguments),this._syncContainerSizes(),this._surface=this._generateSurface(),this._barsGroup=this._generateBarsGroup(),this.statistics&&(this._generateLines(),this._generateCountTooltips()),this._updateLabels()},_syncContainerSizes:function(){this._nodeDimensions=b.getMarginBox(this.domNode),this._topLabelHeight=b.getMarginBox(this._topLabelNode).h,this._bottomLabelHeight=b.getMarginBox(this._bottomLabelNode).h;var t=this._nodeDimensions.h-(this._topLabelHeight+this._bottomLabelHeight)-1;this._svgContainer.setAttribute("style","height: "+t+"px;"),this._svgContainerDimensions=b.getMarginBox(this._svgContainer)},_updateLabels:function(){var t=this.data.maxValue,e=this.data.minValue;this._topLabelNode.innerHTML=this.isDate?this._getFormattedDate(t):this._getLocaleFormattedNumber(t),this._bottomLabelNode.innerHTML=this.isDate?this._getFormattedDate(e):this._getLocaleFormattedNumber(e)},_generateSurface:function(){var t=f.createSurface(this._svgContainer,"100%","100%");return t.rawNode.setAttribute("class",this.css.surface),t},_generateBarsGroup:function(){var t,e,i,s,a=this.data,o=this._surface,n=this._defaultBarPadding;return(t=o.createGroup()).rawNode.setAttribute("class",this.css.group),(e=g.map(a.bins,(function(t){return"object"==typeof t?t.count:t}))).reverse(),i=(this._svgContainerDimensions.h-1)/e.length,g.forEach(e,(function(a,o){s=Math.round(a>0?(this._svgContainerDimensions.w-n)*(a/Math.max.apply(Math,e)):0);var r=t.createRect({width:s,height:i}).setFill("#aaa").setTransform(f.matrix.translate(1,i*o-1)).setStroke({color:"#FFF",width:2});r.rawNode.setAttribute("class",this.css.bar),r.rawNode.setAttribute("shape-rendering","crispEdges")}),this),t},_generateLines:function(){var t,e,i,s,a,o,n=this.statistics,d=this._svgContainerDimensions.h;i=this.isDate?this._getFormattedDate(n.avg):this._getLocaleFormattedNumber(this._roundValueForLabel(n.avg)),s=r.substitute(this._i18n.statsAvg,{avg:i}),t=this._getLocaleFormattedNumber(this._roundValueForLabel(n.stddev)),e=r.substitute(this._i18n.statsSD,{sd:t}),a={color:"#667"},o={color:"#667",style:"Dot"},this._generateLine({label:s,lineStroke:a,imageURL:"esri/dijit/Histogram/images/xAvg.png",yAxisAlignment:d*(n.max-n.avg)/(n.max-n.min),imagePadding:this._defaultImagePadding}),this._generateLine({label:e,lineStroke:o,imageURL:"esri/dijit/Histogram/images/sd.png",yAxisAlignment:d*(n.max-n.avg-n.stddev)/(n.max-n.min),imagePadding:this._defaultImagePadding+10}),this._generateLine({label:e,lineStroke:o,imageURL:"esri/dijit/Histogram/images/sd.png",yAxisAlignment:d*(n.max-n.avg+n.stddev)/(n.max-n.min),imagePadding:this._defaultImagePadding+10})},_generateLine:function(e){var i,s,o,n=this._surface,r=this._svgContainerDimensions.h,d=e.yAxisAlignment,g=e.imageURL,h=e.lineStroke,l=e.label,u=e.imagePadding;(i=n.createLine({x1:0,x2:this._svgContainerDimensions.w-u,y1:d,y2:d}).setStroke(h)).rawNode.setAttribute("shape-rendering","crispEdges"),s=n.createImage({x:this._svgContainerDimensions.w-u,y:d-6,width:12,height:14,src:t.toUrl(g)}),new a({connectId:[s.rawNode],label:l}),o=d>r||d<0?"none":"block",c.set(i.rawNode,"display",o),c.set(s.rawNode,"display",o)},_generateCountTooltips:function(){var t=g.map(this.data.bins,(function(t){return"object"==typeof t?t.count:t}));t.reverse(),g.forEach(t,(function(t,e){var i=r.substitute(this._i18n.count,{count:t});this._countTooltips.push(new a({connectId:[this._barsGroup.children[e].rawNode],label:i}))}),this)},_getLocaleFormattedNumber:function(t){return isNaN(t)?null:d.format(t)},_getFormattedDate:function(t){return p.format(new Date(t))},_roundValueForLabel:function(t){return d.round(t,this._getRoundingPrecision(t))},_getRoundingPrecision:function(t){return t>=1e3?0:t>=10?2:t>=0?4:6}});return o("extend-esri")&&l.setObject("dijit.Histogram",j,e),j}));