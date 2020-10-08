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

define(["../../kernel","../_EventedWidget","../_Tooltip","./_DelayedUpdate","./colorRampUtil","./schemeUtil","./stylerUtil","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/a11yclick","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/has","dojo/on","dojo/query","dojo/i18n!../../nls/jsapi","dojo/text!./templates/ColorRampPicker.html","dojo/NodeList-dom","dijit/form/Button","esri/dijit/HorizontalSlider"],(function(e,t,s,i,r,o,a,n,c,l,h,d,p,m,_,u,g,S,f,C,y){var v=d("esri.dijit.SymbolStyler.ColorRampPicker",[t,n,c,i,s],{baseClass:"esriColorRampPicker",templateString:y,labels:C.widgets.symbolEditor,css:{item:"esriItem",label:"esriLabel",selected:"esriSelected",container:"esriContainer",list:"esriList",preview:"esriPreview",flipper:"esriFlipper",viewport:"esriViewport",transparencySection:"esriColorRampPickerTransparencySection"},schemes:null,selected:null,numStops:0,_schemesChanged:!1,_selectedChanged:!1,_numStopsChanged:!1,_orientationChanged:!1,_transparencyChanged:!1,_commitPropsTrigger:null,_colorRampSurfaces:null,_previewRampSurface:null,_rampsAndSchemes:null,_transparency:null,_transparencyLabels:"["+[0,50,100].map((function(e){var t=C.widgets.colorPicker.percent;return p.replace(t,{percent:e})})).map((function(e){return"'"+e+"'"}))+"]",constructor:function(e){this._colorRampSurfaces=[],this._commitPropsTrigger=this.createUpdateTrigger(this._commitProperties,this)},_commitProperties:function(){var e,t=!1,s=!1;if((this._schemesChanged||this._numStopsChanged)&&(this._schemesChanged=!1,this._numStopsChanged=!1,e=o.getColorRampsWithSchemes(this.schemes,this.numStops),this._rampsAndSchemes=e,t=!0),this._transparencyChanged){this._transparencyChanged=!1;var i=1-this._transparency;h.forEach(this.selected.colors,(function(e){e.a=i})),s=!0}this._selectedChanged&&(this._selectedChanged=!1,s=!0),this._orientationChanged&&(this._orientationChanged=!1,s=!0,t=!0),this.selected||this.set("selected",this._rampsAndSchemes[0]),s&&this._renderSelected(),t&&this._renderSuggestions()},_renderSuggestions:function(){var e=this._rampsAndSchemes,t=this._colorRampSurfaces,s=this.dap_colorRampPicker;_.empty(s),t.forEach((function(e){e.destroy()})),this._colorRampSurfaces=h.map(e,(function(e){var t=_.create("div",{className:this.css.item,tabIndex:0},s);return r.create({node:t,colors:e.colors,numClasses:this.numStops,style:"ramp"})}),this)},_renderSelected:function(){var e=this.selected.colors,t=this.selected.scheme,s=this.dap_previewRamp,i=o.is2DScheme(t);this._previewRampSurface&&(this._previewRampSurface.destroy(),this._previewRampSurface=null,_.empty(s)),m.toggle(s,"esriGrid",i),this._previewRampSurface=r.create({node:s,colors:e,numClasses:this.numStops,height:i?void 0:180,style:i?"grid":"ramp"}),this.findTooltip(this.dap_colorFlipper).label=i?this.labels.rotateColorsTooltip:this.labels.flipColorsTooltip},getStyle:function(){return this.get("selected")},_setSchemesAttr:function(e){this._schemesChanged=!0,this._set("schemes",o.cloneScheme(e)),this._commitPropsTrigger()},_getSelectedAttr:function(){var e=this.selected,t={colors:o._createColors(e.colors)};return e.scheme&&(t.scheme=o.cloneScheme(e.scheme)),t},_setSelectedAttr:function(e){p.isArray(e)&&(e={colors:e});var t=this._hasSameColors(e.colors);this._transparency=null===this._transparency?t?0:1-e.colors[e.colors.length-1].a:this._transparency,a.silentlyUpdateIntermediateChangingValueWidget(this.dap_transparencySlider,this._transparency),this._transparencyChanged=!t,this.dap_transparencySlider.set("disabled",t,!1),this._selectedChanged=!0,this._set("selected",e),this._commitPropsTrigger(),this.emit("color-ramp-change",this.get("selected"))},_hasSameColors:function(e){var t=e[0];return h.every(e,(function(e){var s=e.r===t.r&&e.g===t.g&&e.b===t.b;return t=e,s}))},_setNumStopsAttr:function(e){e=e>0?e:0,this._numStopsChanged=!0,this._set("numStops",e),this._commitPropsTrigger()},postCreate:function(){this.inherited(arguments),this._addHandlers(),this.createTooltips([{node:this.dap_colorFlipper,label:this.labels.flipColorsTooltip},{node:this.dap_colorRampPicker,label:this.labels.selectRampTooltip}])},_addHandlers:function(){var e="."+this.css.item;this.own(S(this.dap_colorRampPicker,S.selector(e,l),p.partial(this._rampClickHandler,this)),S(this.dap_colorFlipper,l,p.hitch(this,(function(){this.flipColors()}))),S(this.dap_transparencySlider,"change",p.hitch(this,(function(){this._transparency=this.dap_transparencySlider.get("value"),this._transparencyChanged=!0,this._commitPropsTrigger()}))))},_rampClickHandler:function(e){var t=e.css.selected,s="."+e.css.item,i=f("."+e.css.item,e.dap_colorRampPicker).indexOf(this);f(s,e.dap_colorRampPicker).removeClass(t),m.add(this,t),e.set("selected",e._rampsAndSchemes[i])},flipColors:function(){var e=this._rampsAndSchemes,t=this.selected;h.forEach(e,(function(e){o.flipColors(e.scheme)})),-1===e.map((function(e){return e.scheme})).indexOf(t.scheme)&&o.flipColors(t.scheme),o.is2DScheme(t.scheme)?t.colors=o.getColorsForClassBreaks(t.scheme,this.numStops):t.colors.reverse(),this._orientationChanged=!0,this._schemesChanged=!0,this.set("selected",t),this._commitPropsTrigger()},destroy:function(){this.inherited(arguments),h.forEach(this._colorRampSurfaces,(function(e){e.destroy()})),this._previewRampSurface&&this._previewRampSurface.destroy()}});return g("extend-esri")&&p.setObject("dijit.SymbolStyler.ColorRampPicker",v,e),v}));