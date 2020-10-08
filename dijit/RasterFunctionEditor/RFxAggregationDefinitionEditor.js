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

define(["dojo/_base/declare","dojo/i18n!../../nls/jsapi","dojo/text!./templates/RFxAggregationDefinitionEditor.html","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/Evented","../../kernel","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","./EditableGridMixin","./RFxGridBase","dijit/form/Select","dijit/form/NumberTextBox","./RFxRasterDimensionSelect"],(function(e,i,t,n,a,s,r,l,o,d,h,u,m,g,v,c,_){var f=e("RFxAggregationDefinitionEditor",[o,d,h,u,m],{declaredClass:"esri.dijit.RasterFunctionEditor.RFxAggregationDefinitionEditor",templateString:t,widgetsInTemplate:!0,rasterDimensionSelect:null,intervalRangesGrid:null,_intervalKeywordFormTimeUnits:null,_intervalValueFormTimeUnits:null,_dimensionDefinitionSelect:null,_valueIntervalTextbox:null,_intervalKeywordFormTimeUnitsContainer:null,_intervalRangesGridDivContainer:null,_intervalValueDivContainer:null,_intervalValueFormTimeUnitsContainer:null,definitionType:"",selectedDimension:"",widgetState:null,aggregationDefinitionEnum:{ALL:"ALL",INTERVAL_KEYWORD:"INTERVAL_KEYWORD",INTERVAL_VALUE:"INTERVAL_VALUE",INTERVAL_RANGES:"INTERVAL_RANGES"},aggregationDefinition:{ALL:"aggDefTypeAll",INTERVAL_VALUE:"aggDefTypeIntervalValue",INTERVAL_RANGES:"aggDefTypeIntervalRanges"},esriTimeIntervalKeywords:{HOURLY:"esriTimeIntervalKeywordHourly",DAILY:"esriTimeIntervalKeywordDaily",WEEKLY:"esriTimeIntervalKeywordWeekly",DEKADLY:"esriTimeIntervalKeywordDekadly",PENTADLY:"esriTimeIntervalKeywordPentadly",MONTHLY:"esriTimeIntervalKeywordMonthly",QUARTERLY:"esriTimeIntervalKeywordQuarterly",YEARLY:"esriTimeIntervalKeywordYearly",RECURRING_DAILY:"esriTimeIntervalKeywordRecurringDaily",RECURRING_WEEKLY:"esriTimeIntervalKeywordRecurringWeekly",RECURRING_MONTHLY:"esriTimeIntervalKeywordRecurringMonthly",RECURRING_QUARTERLY:"esriTimeIntervalKeywordRecurringQuarterly"},esriTimeUnits:{HOURS:"esriTimeUnitsHours",DAYS:"esriTimeUnitsDays",WEEKS:"esriTimeUnitsWeeks",MONTHS:"esriTimeUnitsMonths",YEARS:"esriTimeUnitsYears"},constructor:function(){this.inherited(arguments),this.widgetState={},this._i18n=i.rasterFunctions.enumLabels,this._i18n=n.mixin(this._i18n,i.rasterFunctions.rfxArgs)},postCreate:function(){this.inherited(arguments),this._generateLabelNode(this._i18n.dimensionName,this.aggregationdefBase,!0),this._generateLabelNode(this._i18n.rasterTypeName,this.aggregationdefBase),this._addBreakLine(this.aggregationdefBase);var e=this._generateDropdownOptions(this.aggregationDefinition);this._dimensionDefinitionSelect=this._generateDropdownNode(e,this.aggregationdefBase),this._intervalKeywordFormTimeUnitsContainer=document.createElement("div"),this._intervalKeywordFormTimeUnitsContainer.classList.add("hidden"),this.aggregationdefBase.appendChild(this._intervalKeywordFormTimeUnitsContainer),this._generateLabelNode(this._i18n.dimensionUnit,this._intervalKeywordFormTimeUnitsContainer),this._addBreakLine(this._intervalKeywordFormTimeUnitsContainer);var i=this._generateDropdownOptions(this.esriTimeIntervalKeywords);this._intervalKeywordFormTimeUnits=this._generateDropdownNode(i,this._intervalKeywordFormTimeUnitsContainer),this._intervalValueDivContainer=document.createElement("div"),this._intervalValueDivContainer.classList.add("hidden","esri-rfx-aggregationdef-intervalValue-div"),this.aggregationdefBase.appendChild(this._intervalValueDivContainer),this._generateLabelNode(this._i18n.predictDimensionInterval,this._intervalValueDivContainer),this._valueIntervalTextbox=this._generateTextBoxNode(this._intervalValueDivContainer),this._intervalValueFormTimeUnitsContainer=document.createElement("div"),this._intervalValueFormTimeUnitsContainer.classList.add("hidden"),this._intervalValueDivContainer.appendChild(this._intervalValueFormTimeUnitsContainer),this._generateLabelNode(this._i18n.dimensionUnit,this._intervalValueFormTimeUnitsContainer),this._addBreakLine(this._intervalValueFormTimeUnitsContainer);var t=this._generateDropdownOptions(this.esriTimeUnits);if(this._intervalValueFormTimeUnits=this._generateDropdownNode(t,this._intervalValueFormTimeUnitsContainer),this._intervalRangesGridDivContainer=document.createElement("div"),this._intervalRangesGridDivContainer.classList.add("hidden","esri-rfx-aggregationdef-intervalRanges-grid"),this.aggregationdefBase.appendChild(this._intervalRangesGridDivContainer),this._generateLabelNode(this._i18n.rangesName,this._intervalRangesGridDivContainer),this.layerArg&&this.layerArg.input){var a,s=this.layerArg.input;this.set("labelAttr","alias"),s.declaredClass.indexOf("RFxRasterInput")>0&&s.value&&(a=s.getSelectedLayer(s.get("value").name)).getMultidimensionalInfo().then(n.hitch(this,(function(e){if(a.multidimensionalInfo=e,this.defaultValue&&this.defaultValue.dimension&&(this.selectedDimension=this.defaultValue.dimension),this.defaultValue&&this.defaultValue.definitionType){this.definitionType=this.defaultValue&&this.defaultValue.definitionType;var i=this._dimensionDefinitionSelect.getOptions("INTERVAL_KEYWORD");"INTERVAL_KEYWORD"!==this.definitionType||i||this._dimensionDefinitionSelect.addOption({value:"INTERVAL_KEYWORD",label:this._i18n.aggDefTypeIntervalKeyword}),this._dimensionDefinitionSelect.set("value",this.definitionType),this.widgetState[this.definitionType]=this._cloneData(this.defaultValue)}else this.definitionType=this._dimensionDefinitionSelect.value}))),this._dimensionDefinitionSelect.on("change",this._handleDimensionDefinitionSelectChange.bind(this)),this.rasterDimensionSelect=new _({layerArg:this.layerArg,defaultValue:this.defaultValue&&this.defaultValue.dimension},this._rasterDimensionSelectDiv),this.rasterDimensionSelect.startup(),this.rasterDimensionSelect.on("change",function(e){this._handleDimensionSelectChange(e)}.bind(this)),this.rasterDimensionSelect.on("raster-dimension-select-update",function(e){this._handleDimensionSelectChange(e[0].name)}.bind(this))}},onRasterChange:function(){if(this.layerArg&&this.layerArg.input){var e,i=this.layerArg.input;i.declaredClass.indexOf("RFxRasterInput")>0&&i.value&&(e=i.getSelectedLayer(i.get("value").name)).getMultidimensionalInfo().then(n.hitch(this,(function(i){e.multidimensionalInfo=i,this.rasterDimensionSelect.onRasterChange(),this.widgetState={}})))}},_handleDimensionDefinitionSelectChange:function(e){switch(this.definitionType=e,this.defaultValue=this._cloneData(this.widgetState[e]),this.definitionType){case this.aggregationDefinitionEnum.ALL:this._intervalKeywordFormTimeUnitsContainer.classList.add("hidden"),this._intervalValueDivContainer.classList.add("hidden"),this._intervalRangesGridDivContainer.classList.add("hidden");break;case"INTERVAL_KEYWORD":this._updateIntervalKeywordSelect(),this._intervalKeywordFormTimeUnitsContainer.classList.remove("hidden"),this._intervalValueDivContainer.classList.add("hidden"),this._intervalRangesGridDivContainer.classList.add("hidden");break;case this.aggregationDefinitionEnum.INTERVAL_VALUE:this._updateIntervalValueForm(),this._intervalKeywordFormTimeUnitsContainer.classList.add("hidden"),this._intervalValueDivContainer.classList.remove("hidden"),this._intervalRangesGridDivContainer.classList.add("hidden");break;case this.aggregationDefinitionEnum.INTERVAL_RANGES:this._createIntervalRangesGrid(),this._intervalKeywordFormTimeUnitsContainer.classList.add("hidden"),this._intervalValueDivContainer.classList.add("hidden"),this._intervalRangesGridDivContainer.classList.remove("hidden")}},_handleDimensionSelectChange:function(e){this.selectedDimension=e;var i="StdTime"!==this.selectedDimension;"StdTime"===e?this._dimensionDefinitionSelect.getOptions("INTERVAL_KEYWORD")||this._dimensionDefinitionSelect.addOption({value:"INTERVAL_KEYWORD",label:this._i18n.aggDefTypeIntervalKeyword}):this._dimensionDefinitionSelect.removeOption("INTERVAL_KEYWORD");switch(this.definitionType){case"INTERVAL_KEYWORD":if(i)return this._dimensionDefinitionSelect.reset(),void this._handleDimensionDefinitionSelectChange("ALL");break;case this.aggregationDefinitionEnum.INTERVAL_VALUE:this._updateIntervalValueForm();break;case this.aggregationDefinitionEnum.INTERVAL_RANGES:this._createIntervalRangesGrid()}},_createIntervalRangesGrid:function(){var e=[this._i18n.minValue,this._i18n.maxValue],i=this._getGridSchema(["MinValue","MaxValue"],["dropdown","dropdown"],e),t=this._getGridData(),n=this._getDefaultValueObject(t[0]);this.intervalRangesGrid&&this.intervalRangesGrid.destroy(),this._intervalRangesGridDiv=document.createElement("div"),this._intervalRangesGridDivContainer.appendChild(this._intervalRangesGridDiv),this.intervalRangesGrid=new g({schema:i,data:t,hasIdColumn:!0,isExtensible:!0,defaultBlankObject:n},this._intervalRangesGridDiv),this.intervalRangesGrid.keepScrollPosition=!0,this.intervalRangesGrid.on("grid-data-change",this._handleIntervalRangesGridChange.bind(this))},_handleIntervalRangesGridChange:function(){console.log("_handlintervalRangesGridChange"),this.defaultValue=this._getValueAttr(!0)},_updateIntervalKeywordSelect:function(){var e=this.defaultValue&&this.defaultValue.intervalKeyword;e&&this._intervalKeywordFormTimeUnits.set("value",e)},_updateIntervalValueForm:function(){var e=this.defaultValue&&this.defaultValue.intervalValue||3,i=this.defaultValue&&this.defaultValue.units||"HOURS";this._valueIntervalTextbox.set("value",e),"StdTime"===this.selectedDimension?(this._intervalValueFormTimeUnitsContainer.classList.remove("hidden"),this._intervalValueFormTimeUnits.set("value",i)):this._intervalValueFormTimeUnitsContainer.classList.add("hidden")},_getGridSchema:function(e,i,t){return e.map((function(e,n){return{label:t[n],name:e,dataType:i[n]}}))},_getGridData:function(){var e=[{MinValue:[],MaxValue:[]}];if(!this.layerArg||!this.layerArg.input)return e;var i,t=this.layerArg.input;if(this.set("labelAttr","alias"),t.declaredClass.indexOf("RFxRasterInput")>0&&t.value){var n=this.layerArg.value&&this.layerArg.value.name||t.get("value").name;return i=t.getSelectedLayer(n),this._createIntervalRangesDataObject(i)}return e},_getDefaultValueObject:function(e){var i=this._cloneData(e),t={label:" ",value:"",selected:!0,disabled:!0};return Object.keys(i).forEach((function(e,n){i[e].unshift(t)}),this),i},_createIntervalRangesDataObject:function(e){var i=[],t=[],n=[],a=[{MinValue:[],MaxValue:[]}];if(!e)return a;var s=e.multidimensionalInfo;if(!(s&&s.variables))return a;if(this.defaultValue&&this.defaultValue.dimension&&this.defaultValue.minValues.length>0&&this.defaultValue.maxValues.length>0){var r=this.defaultValue&&this.defaultValue.minValues,l=this.defaultValue&&this.defaultValue.maxValues;r.forEach((function(e,a){t=this._getDimensionValues(s,this.selectedDimension),n=this._getDimensionValues(s,this.selectedDimension),this._makeDropdownSelection(t,r[a]),this._makeDropdownSelection(n,l[a]),i.push(this._cloneData({MinValue:t,MaxValue:n}))}),this)}else t=this._getDimensionValues(s,this.selectedDimension),n=this._getDimensionValues(s,this.selectedDimension),i.push({MinValue:t,MaxValue:n});return i},_parseIntervalRangesGridData:function(e,i){var t=[],n=[];return e.forEach((function(e){if("*"!==e.idNum){var a=e.MinValue.filter((function(e){return e.selected})),s=e.MaxValue.filter((function(e){return e.selected}));if(1===a.length&&1===s.length){var r=a[0].value,l=s[0].value;(i||""!==r&&""!==l)&&(t.push(r),n.push(l))}}})),{MinValue:t,MaxValue:n}},_getDimensionValues:function(e,i){var t=[];return e.variables.forEach(function(e){e.dimensions.forEach(function(e){e.name===i&&e.values.forEach(function(i){var n=e.hasRanges?this._removeDuplicatesFromArray(i).join(" - "):i+"",a={label:n,value:n,selected:!1,disabled:!1};"StdTime"===e.name&&(n=new Date(Number(a.value)).toISOString().slice(0,22),a.label=n,a.value=n),this._itemInArray(t,a)||t.push(a)}.bind(this))}.bind(this))}.bind(this)),t},_removeDuplicatesFromArray:function(e){return a.filter(e,(function(e,i,t){return a.indexOf(t,e)===i}))},_cloneData:function(e){return n.clone(e)},_itemInArray:function(e,i){return e.some((function(e){return e.label===i.label}))},_makeDropdownSelection:function(e,i){var t=!1;if(e.forEach((function(e){e.value===i?(e.selected=!0,t=!0):e.selected=!1})),!t){e.unshift({label:" ",value:"",selected:!0,disabled:!0})}},_addBreakLine:function(e){var i=document.createElement("br");e.appendChild(i)},_generateLabelNode:function(e,i,t){var n=document.createElement("label");n.innerHTML=e,n.classList.add("esri-rfx-args-editor__tr--arg-name","esri-paddingTop-5"),t?i.prepend(n):i.appendChild(n)},_generateDropdownNode:function(e,i){var t=document.createElement("div");return i.appendChild(t),new v({options:e},t)},_generateTextBoxNode:function(e){var i=document.createElement("div");return e.appendChild(i),new c(null,i)},_generateDropdownOptions:function(e){return Object.keys(e).map(function(i){return{value:i,label:this._i18n[e[i]]}}.bind(this))},_getValueAttr:function(e){e||(e=!1);var i,t=this._dimensionDefinitionSelect.value,n={definitionType:t,dimension:this.rasterDimensionSelect.get("value")};switch(t){case"INTERVAL_KEYWORD":n.intervalKeyword=this._intervalKeywordFormTimeUnits.get("value");break;case this.aggregationDefinitionEnum.INTERVAL_VALUE:n.intervalValue=this._valueIntervalTextbox.get("value"),"StdTime"===n.dimension&&(n.units=this._intervalValueFormTimeUnits.get("value"));break;case this.aggregationDefinitionEnum.INTERVAL_RANGES:var a=this.intervalRangesGrid.getStoreValue();i=this._parseIntervalRangesGridData(a,e),n.minValues=i.MinValue,n.maxValues=i.MaxValue}return this.widgetState[t]=this._cloneData(n),n}});return s("extend-esri")&&n.setObject("dijit.RasterFunctionEditor.RFxAggregationDefinitionEditor",f,l),f}));