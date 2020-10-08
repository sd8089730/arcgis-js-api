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

define(["require","dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/Deferred","dojo/dom-class","dojo/dom-construct","dojo/dom-style","esri/dijit/geoenrichment/when","dijit/_WidgetBase","dijit/_TemplatedMixin","./_ChartLegendSupport","./_ChartEventSupport","./_ChartComparisonSupport","esri/dijit/geoenrichment/ReportPlayer/config","./utils/ChartTypes","./utils/ChartSorting","./utils/ChartJsonUtil","./utils/builder/ChartPlots","./utils/ChartFilterUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/InvokeUtil","esri/dijit/geoenrichment/utils/MouseUtil","esri/dijit/geoenrichment/utils/WaitingUtil","../sections/dynamicSettings/supportClasses/FilterUtil","../supportClasses/templateJsonUtils/query/TemplateJsonQueryUtil","dojo/text!../templates/ChartContainer.html","dojo/i18n!esri/nls/jsapi","../../_devConfig"],(function(e,t,i,r,s,n,h,a,o,l,u,c,d,_,m,g,p,f,C,w,b,S,v,I,V,y,P,R){var T,M,x,F,D,A,L,E,N,z;return P=P.geoenrichment.dijit.ReportPlayer.ChartContainer,t([o,l,u,c,d],{templateString:y,nls:P,viewModel:null,theme:null,parentWidget:null,currentFeatureIndex:null,immediateRender:!1,chartTheme:null,enableAxisLabelsAutoTilt:!1,isEditMode:!1,chart:null,_currentSeries:null,_iconRenderer:null,_textRenderer:null,_tableViewRenderer:null,_tableViewInfo:null,_renderChartPendingFlag:!1,postCreate:function(){this.inherited(arguments),this._showError(!1),w.hide(this.missingVariablesDiv),this.viewModel.isGraphicStyle&&s.add(this.domNode,"graphicReportChart"),s.add(this.domNode,this.viewModel.isLightDocumentTheme(this.theme)?"light":"dark"),this._showEmptyView(!1)},_currentSeriesItems:null,_currentSeriesItemsUnfiltered:null,_originalSeriesItems:null,_currentVisualProperties:null,_currentChartType:null,_currentComparisonInfo:null,_currentDataDrillingPanelInfo:null,_isMultiFeatureChart:null,_initPromise:null,_firstRenderPromise:null,_hasPresetFilter:null,updateChart:function(i){var s=this;if(this._destroyChart(),i)return this._checkForMissingVariables(i),this._currentChartType=i.type,this._isMultiFeatureChart=i.isMultiFeatureChart,this._currentSeriesItems=i.isMultiFeatureChart?p.getSeriesItemsForMultiFeatureChart(i.type,i.seriesItems,this.viewModel.dynamicReportInfo&&this.viewModel.dynamicReportInfo.fieldData.areaData):i.seriesItems,this._originalSeriesItems=i.seriesItems&&i.seriesItems.slice(),this._currentVisualProperties=i.visualProperties,this._currentComparisonInfo=i.comparisonInfo,this._currentDataDrillingPanelInfo=i.dataDrillingPanelInfo,h.set(this.domNode,{width:this._currentVisualProperties.width+"px",height:this._currentVisualProperties.height+"px"}),this.domNode.style.backgroundColor=this._currentVisualProperties.panelBackgroundColor||"",w.hide(this.chartLabel),this._initPromise=function(){if(i)return i.promise;var i=new r;return e(["dojox/charting/Chart","dojox/charting/action2d/Magnify","./utils/action2d/Highlight","./utils/builder/ChartBuilder","./utils/ChartCalculator","./utils/ChartStyleUtil","./tooltips/ChartTooltip","./iconRendering/IconRenderer","./textRendering/TextRenderer","./tableViewRendering/TableViewRenderer"],(function(e,r,s,n,h,a,o,l,u,c){M=r,x=s,F=n,D=h,A=a,L=o,E=l,N=u,z=c,T=t(e,{_renderPlotBackground:function(e,t,i,r){this.theme.plotarea.backgroundImageData?this.surface.createImage({src:this.theme.plotarea.backgroundImageData,x:t.l-1,y:t.t-1,width:i+2,height:r+2}):this.inherited(arguments)}}),i.resolve()})),i.promise}().then((function(){s.domNode&&(s._initChartComparisonSelect(),s._updateLabels(),s._createChart(),!_.isPlayerOnServer&&s._addPlotEventListeners(),s._createLegend())})),this._firstRenderPromise=a(this._initPromise,(function(){var e=s._currentVisualProperties.filter;return s._hasPresetFilter=!!e,!e||e.ranges&&!s.viewModel.dynamicReportInfo?s._updateSeries():a(s.getFilterRanges(),(function(t){var i=t.map((function(t){var i=I.filterData(t.dataArray,e);return{fieldName:t.fieldName,min:i[0],max:i[i.length-1]}}));return s._setFilterRanges(i)}))})),v.showProgressPromise(this.domNode,this._initPromise)},getRenderPromise:function(){return this._firstRenderPromise},_checkForMissingVariables:function(e){var t,i,r;V.processChartFieldInfos(e,(function(e,s){if(e.isMissing)switch(s){case"series":t=!0;break;case"tooltip":i=!0;break;case"dataDrilling":r=!0}}));var s=t||i||r;w[s?"show":"hide"](this.missingVariablesDiv),s&&(this.missingVariablesDiv.innerHTML=t?P.containsMissingVariablesInData:i?P.containsMissingVariablesInTooltip:P.containsMissingVariablesInInteractivePanel,this.missingVariablesDiv.style.top=(e.visualProperties.height-this.missingVariablesDiv.clientHeight)/2+"px")},isMultiFeatureChart:function(){return this._isMultiFeatureChart},getLegendNode:function(){return this.legendContainerDiv},getChartSeries:function(){return this._currentSeries},_updateLabels:function(){this.chartLabel.innerHTML=this._currentVisualProperties.title.text,w[this.chartLabel.innerHTML?"show":"hide"](this.chartLabel),this.chartLabel.style.textAlign=this._currentVisualProperties.title.align,this.chartLabel.style.marginTop=(this._currentVisualProperties.title.verticalShift||0)+"px";var e=i.mixin({},this.viewModel.getChartDefaultStyles(this.theme).titleStyle,this._currentVisualProperties.title.style);delete e.backgroundColor,h.set(this.chartLabel,A.getStyleObjWithUnits(e))},_createChart:function(){var e=n.create("div",{class:"chartContainerDiv_innerChartNode"},this.chartContainerDiv),t=new T(e,{margins:this._getChartMargins()});this.chart=t,t.setTheme(this.chartTheme),F.getChartBuilder(this._currentChartType).configureChart({chart:t,seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,chartType:this._currentChartType,comparisonInfo:this._currentComparisonInfo,themeSettings:this.viewModel.getChartDefaultStyles(this.theme),viewModel:this.viewModel,currentFeatureIndex:this.currentFeatureIndex}),_.isPlayerOnServer||((this.viewModel.dynamicReportInfo||R.charts.enableEffects)&&(this._currentChartType===m.PIE&&new M(t,f.PRIMARY,{scale:1.03}),f.getWorkingPlots(t).forEach((function(e,i){new x(t,e)}),this)),this._setChartTooltip())},_getChartMargins:function(){var e=this;function t(t){return"number"==typeof e._currentVisualProperties[t]?e._currentVisualProperties[t]:10}return{t:t("marginTop"),r:t("marginRight"),b:t("marginBottom"),l:t("marginLeft")}},_setChartTooltip:function(){f.getWorkingPlots(this.chart).forEach((function(e,t){var i=0===t?this._currentChartType:this._getComparisonChartType();new L(this.chart,e,{duration:50}).setChartType(i)}),this)},_destroyChart:function(){this._levelLineBuilder&&this._levelLineBuilder.hideLevelLine(),this.chartContainerDiv&&(this.chartContainerDiv.innerHTML=""),this.chart&&this.chart.destroy(),this.chart=null,this._destroyLegend()},_updateSeries:function(){var e=this;if(this._removeSeries(),this.chart){if(!this._currentSeriesItems)return this.resize();this._seriesTotalStats={},this._currentSeries=F.getChartBuilder(this._currentChartType).calcSeries({chartContainer:this,chart:this.chart,chartType:this._currentChartType,isMultiFeatureChart:this._isMultiFeatureChart,viewModel:this.viewModel,theme:this.theme,themeSettings:this.viewModel.getChartDefaultStyles(this.theme),seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,currentFeatureIndex:this.currentFeatureIndex,plotStats:this._seriesTotalStats,excludedSeriesHash:this._excludedSeriesHash,sorting:this._sorting||this._currentVisualProperties.sorting,comparisonInfo:this._currentComparisonInfo,comparisonFeatureAttributes:this._getComparisonFeatureAttributes(),dataDrillingPanelInfo:this._currentDataDrillingPanelInfo});var t,i=F.checkSeriesAreValid(this._currentSeries);return this._showError(!i),i&&(this._currentSeries.forEach((function(t){e._excludedSeriesHash[t.name]||e.chart.addSeries(t.name,t.data,t.params)})),t=this.resize()),a(t,(function(){e.onContentUpdated()}))}},_removeSeries:function(){var e=this;this._currentSeries=this._currentSeries||[],this._currentSeries.forEach((function(t){e.chart.removeSeries(t.name)})),this._currentSeries.length=0},_chartWidth:0,_chartHeight:0,_resizedFlag:!1,_resizeDfd:null,_pendingResizeObj:!1,resize:function(e,t,i){if(this._currentVisualProperties)return void 0!==e&&h.set(this.domNode,{width:e+"px",height:t+"px"}),a(this._initPromise,function(){if(w.isNodeInLayout(this.domNode))return void 0!==e&&D.resizeVisualProperties(this._currentVisualProperties,e,t),this._resizedFlag||(this.domNode.style.opacity="0"),this._resizeDfd=this._resizeDfd||new r,i||this.immediateRender?this._doResizeChart():b.invoke(this,"_doResizeChart",50);this._pendingResizeObj={width:e,height:t,immediate:i}}.bind(this))},_doResizeChart:function(){if(this.chart){this._resizedFlag||(this.domNode.style.opacity="1"),this._resizedFlag=!0,this._updateLegend();var e=D.calcChartDimentions(this,{visualProps:this._currentVisualProperties,comparisonInfo:this._currentComparisonInfo,chartType:this._currentChartType,maxIconSize:E.AXIS_ICON_MAX_SIZE,numPoints:this._currentSeries[0]?this._currentSeries[0].data.length:0}),t=e.w,i=e.h;if(this.enableAxisLabelsAutoTilt&&this.viewModel.isGraphicStyle&&m.hasAxis(this._currentChartType)&&!m.isXAxisVertical(this._currentChartType)){var r=D.calcAxisLabelsAutoTilt(t,this._currentSeries,this._currentVisualProperties,this.viewModel.getChartDefaultStyles(this.theme));this.chart.getAxis("x").opt.rotation=r?-r:-this._currentVisualProperties.xAxis.labelsAngle}if(this._chartWidth=t,this._chartHeight=i,this._adjustErrorMessage(),this._tableViewInfo)return this._refreshTableView(),void(this._renderChartPendingFlag=!0);try{this.chart&&(this.chart.isPreRenderMode=m.isColumnBarLike(this._currentChartType),this.chart.resize(this._chartWidth,this._chartHeight),this.chart.dirty&&this.chart.render(),m.isColumnBarLike(this._currentChartType)&&(F.getChartBuilder(this._currentChartType).updateBarSize({chart:this.chart,chartType:this._currentChartType,isMultiFeatureChart:this._isMultiFeatureChart,currentFeatureIndex:this.currentFeatureIndex,viewModel:this.viewModel,seriesItems:this._currentSeriesItems,visualProperties:this._currentVisualProperties,chartSize:this.chart.plotArea[m.isColumnLike(this._currentChartType)?"width":"height"],excludedSeriesHash:this._excludedSeriesHash,comparisonInfo:this._currentComparisonInfo,numComparisonFeatures:this._getNumComparisonFeatures()}),F.getChartBuilder(this._currentChartType).prettifyColumnBarYAxis({totalStat:this._seriesTotalStats,chart:this.chart,chartType:this._currentChartType,chartSeries:this._currentSeries,themeSettings:this.viewModel.getChartDefaultStyles(this.theme),visualProperties:this._currentVisualProperties,chartSize:this.chart.plotArea[m.isColumnLike(this._currentChartType)?"height":"width"],viewModel:this.viewModel})),this.chart.isPreRenderMode=!1,this.chart.dirty&&this.chart.render())}catch(e){console.log(e)}this._updateLegend(),this._updateIcons(),this._updateTexts(),this._resizeDfd&&this._resizeDfd.resolve(),this._resizeDfd=null,this.onRendered()}},notifyShown:function(){var e=this;return a(this._initPromise,(function(){w.isNodeInLayout(e.domNode)&&a(e._pendingResizeObj&&e.resize(e._pendingResizeObj.width,e._pendingResizeObj.height,e._pendingResizeObj.immediate),(function(){e._pendingResizeObj=null,e.viewModel.isAnimationAllowed()&&f.getWorkingPlots(e.chart).forEach((function(t,i){e.chart.getPlot(t).renderAnimation&&e.chart.getPlot(t).renderAnimation()}))}))}))},onRendered:function(){},_getIconRendererClass:function(){return E},_updateIcons:function(){this._iconRenderer||(this._iconRenderer=(new this._getIconRendererClass)(),this.own(this._iconRenderer),this._iconRenderer.setViewMode(this._viewMode)),this._iconRenderer.renderIcons({viewModel:this.viewModel,theme:this.theme,parentWidget:this,chartType:this._currentChartType,iconNode:this.chartContainerWithAxis,chartW:this._chartWidth,chartH:this._chartHeight,visualProperties:this._currentVisualProperties,comparisonInfo:this._currentComparisonInfo,chart:this.chart})},_getTextRendererClass:function(){return N},_updateTexts:function(){this._textRenderer||(this._textRenderer=(new this._getTextRendererClass)(),this._textRenderer.currentFeatureIndex=this.currentFeatureIndex,this.own(this._textRenderer),this._textRenderer.setViewMode(this._viewMode)),this._textRenderer.renderTexts({viewModel:this.viewModel,theme:this.theme,parentWidget:this,textNode:this.chartContainerWithAxis,chartW:this._chartWidth,chartH:this._chartHeight,visualProperties:this._currentVisualProperties,chart:this.chart})},_viewMode:null,setViewMode:function(e){if(this._viewMode!==e)return this._viewMode=e,a(this._initPromise,function(){this._iconRenderer&&this._iconRenderer.setViewMode(e),this._textRenderer&&this._textRenderer.setViewMode(e),this._tableViewRenderer&&this._tableViewRenderer.setViewMode(e)}.bind(this))},_showError:function(e){R.emulateErrors.contentErrors&&(e=!0),w[e?"show":"hide"](this.errorDiv),w[e?"hide":"show"](this.chartNormalViewDiv)},_adjustErrorMessage:function(){this.errorDiv.style.paddingTop=h.get(this.domNode,"height")/2-20+"px"},_sorting:null,getSorting:function(){return this._sorting},sortChart:function(e){return this._sorting=e&&e!==g.NONE?e:null,a(this._initPromise,function(){this._updateSeries()}.bind(this))},_filterStats:null,_numShownElements:null,_filterRanges:null,canFilterAreas:function(){return this._isMultiFeatureChart&&!!this._getGeoenrichment()},canFilterVariables:function(){return m.canFilterVariables(this._currentChartType,this._isMultiFeatureChart)},getFilterRanges:function(){return this.canFilterAreas()||this.canFilterVariables()?a(this._initPromise,function(){return this.canFilterAreas()?this._filterStats=this._getGeoenrichment().collectFilterRangesStats():this._filterStats=C.collectStatsForVariables(this._currentChartType,this._currentSeriesItemsUnfiltered||this._currentSeriesItems,this._currentVisualProperties,this.viewModel,this.currentFeatureIndex),this._filterStats.filterRanges}.bind(this)):(this._filterStats=null,null)},setFilterRanges:function(e){return this._hasPresetFilter=!1,this._setFilterRanges(e)},_setFilterRanges:function(e){return this._filterRanges=e,a(this._initPromise,function(){this._currentSeriesItemsUnfiltered&&(this._currentSeriesItems=this._currentSeriesItemsUnfiltered,this._currentSeriesItemsUnfiltered=null),this._currentSeriesItemsUnfiltered=this._currentSeriesItems;var t,i=C.filterSeriesItems(this._currentChartType,this._currentSeriesItems,this._currentVisualProperties,e,this.viewModel,this.currentFeatureIndex,this.canFilterAreas());return this._currentSeriesItems=i.seriesItems,this._numShownElements=i.numShownElements,this.canFilterAreas()&&this._setFilterRangesForComparison(e)?this._numShownElements+=this._getGeoenrichment().getAllGeographyAttributes().length:t=this._updateSeries(),this._showEmptyView(!this._numShownElements),t}.bind(this))},getNumElementsTotal:function(){return this._filterStats&&(this.canFilterAreas()?this._filterStats.numAreasTotal:this._filterStats.numVariablesTotal)||0},getNumElementsShown:function(){return"number"==typeof this._numShownElements?this._numShownElements:this.getNumElementsTotal()},_showEmptyView:function(e){w[e?"hide":"show"](this.chartNormalViewDiv),w[e?"show":"hide"](this.noDataPlaceHolder),e&&this._syncEmptyViewPlaceholder()},_syncEmptyViewPlaceholder:function(){this.noDataPlaceHolder&&h.set(this.noDataPlaceHolder,"paddingTop",(h.get(this.domNode,"height")-h.get(this.noDataPlaceHolder,"height"))/2+"px")},chartToTable:function(e){return a(this._initPromise,function(){this._removeTable(),this._setIsTableView(e),w.hide([this.chartContainerDiv,this.legendContainerDiv]);for(var t=0;t<this.chartContainerWithAxis.children.length;t++){var i=this.chartContainerWithAxis.children[t];i!==this.tableContainerDiv&&w.hide(i)}return this._tableViewRenderer||(this._tableViewRenderer=new z,this.own(this._tableViewRenderer),this._tableViewRenderer.setViewMode(this._viewMode)),this._refreshTableView(!0)}.bind(this))},_refreshTableView:function(e){return this._tableViewRenderer.renderTableForChart({chartType:this._currentChartType,isMultiFeatureChart:this._isMultiFeatureChart,viewModel:this.viewModel,theme:this.theme,parentWidget:this,tableNode:this.tableContainerDiv,width:h.get(this.domNode,"width"),height:this._chartHeight,chartSeries:this._currentSeries,visualProperties:this._currentVisualProperties,hasComparison:!!this._currentComparisonInfo,chart:this.chart,showAnimation:e,tableViewInfo:this._tableViewInfo})},tableToChart:function(){if(this._tableViewInfo)return a(this._initPromise,function(){if(this._removeTable(),this._renderChartPendingFlag)return this._renderChartPendingFlag=!1,a(this.resize(),this.notifyShown.bind(this));this.notifyShown()}.bind(this))},_removeTable:function(){this._setIsTableView(null),w.show([this.chartContainerDiv,this.legendContainerDiv]);for(var e=0;e<this.chartContainerWithAxis.children.length;e++)w.show(this.chartContainerWithAxis.children[e]);this._tableViewRenderer&&this._tableViewRenderer.destroyTable()},_setIsTableView:function(e){this._tableViewInfo=e,s[this._tableViewInfo?"add":"remove"](this.domNode,"isChartDataInTableView"),this._updateComparisonLabel()},getVisualState:function(){return{type:"chart",sorting:this.getSorting(),hasPresetFilter:this._hasPresetFilter,filterRanges:this._filterRanges&&i.clone(this._filterRanges),comparisonAttributes:this._comparisonAttributes,additionalAttributes:this._additionalAttributes&&this._additionalAttributes.slice(),tableViewInfo:this._tableViewInfo&&i.clone(this._tableViewInfo),tableViewRenderer:this._tableViewRenderer&&this._tableViewRenderer.getVisualState(),excludedSeriesHash:this._excludedSeriesHash&&i.clone(this._excludedSeriesHash)}},setVisualState:function(e){if(e){this._excludedSeriesHash=e.excludedSeriesHash;var t=this;return a(this._initPromise,(function(){return a(t._resizeDfd&&t._resizeDfd.promise,(function(){return a(e.sorting&&t.sortChart(e.sorting),(function(){return a(e.filterRanges&&t.setFilterRanges(e.filterRanges),(function(){return e.additionalAttributes&&(t._additionalAttributes=e.additionalAttributes),a(e.comparisonAttributes&&t._setComparisonAttributes(e.comparisonAttributes),(function(){return a(e.tableViewInfo&&t.chartToTable(e.tableViewInfo),(function(){return t._tableViewRenderer&&t._tableViewRenderer.setVisualState(e.tableViewRenderer)}))}))}))}))}))}))}},isMouseOver:function(e){return S.isMouseOver(this.domNode,{event:e})||this.comparisonSelect&&this.comparisonSelect.isMouseOver(e)},getWidth:function(){return this._currentVisualProperties.width},getHeight:function(){return this._currentVisualProperties.height},onContentUpdated:function(){},onShowDataDrillingPreview:function(e){},onTooltipInfoCreated:function(e){},destroy:function(){this._destroyChart(),this.inherited(arguments)}})}));