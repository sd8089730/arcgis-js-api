// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/assignHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","@dojo/framework/shim/AbortController","../../core/Accessor","../../core/arrayUtils","../../core/Collection","../../core/Error","../../core/HandleOwner","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../layers/GraphicsLayer","../../layers/graphics/editingSupport","../../layers/support/fieldUtils","../../renderers/support/clickToleranceUtils","../../symbols/support/symbolUtils","../../views/2d/layers/support/popupUtils2D","../../views/support/layerViewUtils","./CreateWorkflowData","./Edits","./UpdateWorkflowData","./Workflow","../FeatureForm/FeatureFormViewModel","../FeatureTemplates/FeatureTemplatesViewModel","../Sketch/SketchViewModel","../Spinner/SpinnerViewModel"],function(e,t,r,i,n,o,a,u,l,s,d,c,f,p,w,h,v,y,g,m,k,b,W,M,_,F,V,C,I,U,O,A){function S(e,t,r){q.error(new c(e,t,r))}function E(e){return e&&g.isEditableLayer(e.layer)}function x(e,t){return e&&s.find(e,function(e){return e.layer===t})}function T(e,t){var r=e.layer,i=r.createQuery();return i.objectIds=[e.getAttribute(r.objectIdField)],i.outFields=["*"],i.outSpatialReference=t.spatialReference,r.queryFeatures(i).then(function(e){return e.features[0]})}function j(e,t,r,i,o){e.create(t.layer.geometryType);var a=e.on("create",function(r){var a=r.state,u=r.graphic;if("cancel"===a)return void o();if("complete"===a){var l=u.clone();l.attributes=n({},t.template.prototype.attributes),l.layer=t.layer,e.layer.remove(u);var s=l.symbol;l.symbol=null,b.getDisplayedSymbol(l).then(function(e){l.symbol=e||s,i(l)})}});return r.map.add(e.layer),{remove:function(){a.remove(),r.map.remove(e.layer),e.cancel()}}}function D(e,t,r,i){var n=e.clone();t.layer.add(n);var o=function(){var t=e.layer;if("graphics"===t.type)return{remove:function(){}};var i=t.objectIdField,n=e.attributes[i];return r.whenLayerView(e.layer).then(function(e){return e.setVisibility(n,!1)}),{remove:function(){r.whenLayerView(e.layer).then(function(e){return e.setVisibility(n,!0)})}}}(),a={multipleSelectionEnabled:!1};t.update(n,a);var u=t.on("update",function(e){var r=e.graphics[0];if("cancel"===e.state)return void t.update(r,a);i(r.clone())});return r.map.add(t.layer),{remove:function(){o.remove(),u.remove(),r.map.remove(t.layer),t.cancel(),t.layer.removeAll()}}}function L(e){if(1===e.length){var t=e[0];if(!("items"in t))return t;var r=t;return 1===r.items.length?r.items[0]:void 0}}var P=this,q=p.getLogger("esri.widgets.Editor.EditorViewModel"),G=["create","update"],H=function(e,t,r){return a(P,void 0,void 0,function(){var i,n;return o(this,function(o){switch(o.label){case 0:return 0===e.length?[2]:[4,t.hitTest(r)];case 1:return i=o.sent(),0===i.results.length?[2]:(n=i.results.map(function(e){return e.graphic.layer}),[2,w.eachAlways(e.items.filter(function(e){var t=e.layer;return e.supports.indexOf("update")>-1&&n.indexOf(t)>-1}).map(function(e){var i=e.layer,n=k.calculateTolerance(i.renderer),o=W.createQueryGeometry(r.mapPoint,n,t),a=i.objectIdField,u=i.displayField,l=[a];return m.hasField(i.fields,u)&&l.push(u),i.queryFeatures({geometry:o,outFields:l}).then(function(e){return e.features})}))])}})})};return function(e){function t(t){var r=e.call(this,t)||this;return r._sketchGraphicsLayer=new y({listMode:"hide"}),r.activeWorkflow=null,r.activityQueue=[],r.failures=[],r.featureFormViewModel=new I,r.featureTemplatesViewModel=new U,r.layerInfos=null,r.sketchViewModel=new O({layer:r._sketchGraphicsLayer}),r.spinnerViewModel=new A,r}return r(t,e),t.prototype.initialize=function(){var e=this;this.handles.add([h.on(this,"view.allLayerViews","change",function(){return e.notifyChange("editableItems")}),h.watch(this,"editableItems",function(){var t=e.activeWorkflow;if(t){var r=t.stepId;if("create"===t.type)return e.updateCreationTemplates(),void("awaiting-feature-creation-info"!==r||e.canCreate||e._cancelWorkflow());"update"===t.type&&("awaiting-feature-to-update"===r&&!e.canUpdate||"awaiting-update-feature-candidate"===r&&!t.data.candidates.some(function(t){var r=e.editableItems.find(function(e){return e.layer===t.layer});return r&&r.supports.indexOf("update")>-1}))&&e._cancelWorkflow()}})])},t.prototype.destroy=function(){this.view=null,this._cancelWorkflow()},Object.defineProperty(t.prototype,"allowedWorkflows",{get:function(){return this._get("allowedWorkflows")},set:function(e){e&&0!==e.length||(e=G.slice()),this._set("allowedWorkflows",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canCreate",{get:function(){return this.editableItems.some(function(e){return e.supports.indexOf("create")>-1})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"canUpdate",{get:function(){return this.editableItems.some(function(e){return e.supports.indexOf("update")>-1})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"editableItems",{get:function(){var e=this,t=this.get("view.allLayerViews");if(!t)return new d;this.handles.remove("layer-view-property-watchers");var r=function(){return e.notifyChange("editableItems")};return t.filter(E).map(function(t){e.handles.add(h.watch(t,"suspended",r),"layer-view-property-watchers");var i=t.layer,n=t.suspended,o=[],a=e.allowedWorkflows,u=i.capabilities.operations,l=x(e.layerInfos,i),d=a.filter(function(e){return!l||!1!==l.enabled&&("create"===e&&!1!==l.addEnabled||"update"===e&&!1!==l.updateEnabled)});return!n&&s.find(d,function(e){return"create"===e})&&u.supportsAdd&&o.push("create"),!n&&s.find(d,function(e){return"update"===e})&&u.supportsUpdate&&o.push("update"),!n&&!1!==(l&&l.deleteEnabled)&&u.supportsDelete&&o.push("delete"),{layer:i,supports:o}}).reverse()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){if(!this.get("view.ready")||0===this.editableItems.length)return"disabled";var e=this.activeWorkflow;return e?e.stepId:"ready"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"syncing",{get:function(){return this.activityQueue.length>0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"view",{set:function(e){if(e&&"2d"!==e.type)return void S("editing:unsupported-view","SceneView is not supported");this.sketchViewModel.view=e,this.spinnerViewModel.view=e,this._set("view",e)},enumerable:!0,configurable:!0}),t.prototype.startCreateWorkflowAtFeatureTypeSelection=function(){return a(this,void 0,void 0,function(){var e;return o(this,function(t){switch(t.label){case 0:return this.canCreate?[4,this._cancelWorkflow()]:(S("editing:unsupported-workflow","Create workflow is unsupported or disabled."),[2]);case 1:return t.sent(),e=this._createCreateWorkflow(),[4,e.start()];case 2:return t.sent(),this._set("activeWorkflow",e),[2]}})})},t.prototype.startCreateWorkflowAtFeatureCreation=function(e){return a(this,void 0,void 0,function(){var t;return o(this,function(r){switch(r.label){case 0:return this.canCreate?[4,this._cancelWorkflow()]:(S("editing:unsupported-workflow","Update workflow is unsupported or disabled."),[2]);case 1:return r.sent(),t=this._createCreateWorkflow("awaiting-feature-to-create"),t.data.creationInfo=e,[4,t.start()];case 2:return r.sent(),this._set("activeWorkflow",t),[2]}})})},t.prototype.startCreateWorkflowAtFeatureEdit=function(e){return a(this,void 0,void 0,function(){var t;return o(this,function(r){switch(r.label){case 0:return this.canCreate?[4,this._cancelWorkflow()]:(S("editing:unsupported-workflow","Update workflow is unsupported or disabled."),[2]);case 1:return r.sent(),t=this._createCreateWorkflow("editing-new-feature"),t.data.edits.feature=e,[4,t.start()];case 2:return r.sent(),this._set("activeWorkflow",t),[2]}})})},t.prototype.startUpdateWorkflowAtFeatureSelection=function(){return a(this,void 0,void 0,function(){var e;return o(this,function(t){switch(t.label){case 0:return this.canUpdate?[4,this._cancelWorkflow()]:(S("editing:unsupported-workflow","Update workflow is unsupported or disabled."),[2]);case 1:return t.sent(),e=this._createUpdateWorkflow(),[4,e.start()];case 2:return t.sent(),this._set("activeWorkflow",e),[2]}})})},t.prototype.startUpdateWorkflowAtMultipleFeatureSelection=function(e){return a(this,void 0,void 0,function(){var t;return o(this,function(r){switch(r.label){case 0:return this.canUpdate?[4,this._cancelWorkflow()]:(S("editing:unsupported-workflow","Update workflow is unsupported or disabled."),[2]);case 1:return r.sent(),t=this._createUpdateWorkflow("awaiting-update-feature-candidate"),t.data.candidates=e,[4,t.start()];case 2:return r.sent(),this._set("activeWorkflow",t),[2]}})})},t.prototype.startUpdateWorkflowAtFeatureEdit=function(e){return a(this,void 0,void 0,function(){var t;return o(this,function(r){switch(r.label){case 0:return this.canUpdate?[4,this._cancelWorkflow()]:(S("editing:unsupported-workflow","Update workflow is unsupported or disabled."),[2]);case 1:return r.sent(),t=this._createUpdateWorkflow("editing-existing-feature"),t.data.edits.feature=e,[4,t.start()];case 2:return r.sent(),this._set("activeWorkflow",t),[2]}})})},t.prototype.deleteFeatureFromWorkflow=function(){return a(this,void 0,void 0,function(){var e;return o(this,function(t){switch(t.label){case 0:return(e=this.activeWorkflow)&&"create"!==e.type?(this._delete(e.data.edits.feature),[4,e.reset()]):(S("editing:unsupported-workflow","Deleting requires an active update workflow."),[2]);case 1:return t.sent(),[2]}})})},t.prototype.cancelWorkflow=function(e){return a(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,this._cancelWorkflow(n({warn:!0},e))];case 1:return t.sent(),[2]}})})},t.prototype.updateCreationTemplates=function(){this.featureTemplatesViewModel.layers=this.editableItems.filter(function(e){return e.supports.indexOf("create")>-1}).map(function(e){return e.layer}).toArray()},t.prototype._highlight=function(e){var t=e&&s.find(this.view.allLayerViews.items,function(t){return t.layer===e.layer});M.hasHighlight(t)&&this.handles.add(t.highlight(e),"candidate-highlight")},t.prototype._unhighlight=function(){this.handles.remove("candidate-highlight")},t.prototype._cancelWorkflow=function(e){return a(this,void 0,void 0,function(){var t;return o(this,function(r){switch(r.label){case 0:return t=this.activeWorkflow,t?[4,t.cancel(e)]:(e&&e.warn&&S("editing:no-active-workflow","There is no active workflow to cancel."),[2]);case 1:return r.sent(),this._set("activeWorkflow",null),[2]}})})},t.prototype._createCreateWorkflow=function(e){var t=this,r=this.handles,i=new _({edits:new F,viewModel:this});return new C({type:"create",data:i,steps:this._createWorkflowStepCreator(i,e),commit:function(){return r.remove(t.activeWorkflow.stepId),t._create(i.edits.feature)}})},t.prototype._createWorkflowStepCreator=function(e,t){void 0===t&&(t="awaiting-feature-creation-info");var r=e.viewModel.handles,i={"awaiting-feature-creation-info":function(){return{id:"awaiting-feature-creation-info",setUp:function(){return a(this,void 0,void 0,function(){return o(this,function(t){return e.creationInfo=null,r.add(e.viewModel.featureTemplatesViewModel.on("select",function(t){var r=t.item;e.creationInfo={layer:r.layer,template:r.template},e.viewModel.activeWorkflow.next()}),this.id),[2]})})},tearDown:function(){return a(this,void 0,void 0,function(){return o(this,function(e){return r.remove(this.id),[2]})})}}},"awaiting-feature-to-create":function(){return{id:"awaiting-feature-to-create",setUp:function(){return a(this,void 0,void 0,function(){var t,i=this;return o(this,function(n){return t=function(){r.add(j(e.viewModel.sketchViewModel,e.creationInfo,e.viewModel.view,function(t){e.edits.feature=t,e.viewModel.activeWorkflow.next()},function(){r.remove(i.id),t()}),i.id)},t(),[2]})})},tearDown:function(){return a(this,void 0,void 0,function(){return o(this,function(e){return r.remove(this.id),[2]})})}}},"editing-new-feature":function(){return{id:"editing-new-feature",setUp:function(){return a(this,void 0,void 0,function(){var t,i,n;return o(this,function(o){return t=e.edits.feature,i=x(e.viewModel.layerInfos,t.layer),n=i&&i.fieldConfig,e.viewModel.featureFormViewModel.set({feature:t,fieldConfig:n}),r.add([e.viewModel.featureFormViewModel.on("value-change",function(){e.edits.updateAttributes(e.viewModel.featureFormViewModel.getValues())}),D(t,e.viewModel.sketchViewModel,e.viewModel.view,function(t){var r=t.geometry;return e.edits.updateGeometry(r)})],this.id),[2]})})},tearDown:function(){return a(this,void 0,void 0,function(){return o(this,function(t){return e.edits.feature=null,e.viewModel.featureFormViewModel.set({feature:null,fieldConfig:null}),r.remove(this.id),[2]})})}}}},n=!1,u=["awaiting-feature-creation-info","awaiting-feature-to-create","editing-new-feature"].filter(function(e){return!!n||(n=e===t)}).map(function(e){return i[e]()});e.viewModel.updateCreationTemplates();var l=L(e.viewModel.featureTemplatesViewModel.items);if("awaiting-feature-creation-info"===u[0].id&&l){var s=l.layer,d=l.template;e.creationInfo={layer:s,template:d},u.shift()}return u},t.prototype._createUpdateWorkflow=function(e){var t=this,r=this.handles,i=new V({edits:new F,viewModel:this});return new C({type:"update",data:i,steps:this._updateWorkflowStepCreator(i,e),commit:function(){var e;r.remove(t.activeWorkflow.stepId);var n=i.edits.feature,o=n.clone();if(!i.edits.attributesModified){var a=n.layer.objectIdField;o.attributes=(e={},e[a]=n.getAttribute(a),e)}return i.edits.geometryModified||(o.geometry=null),t._update(o)}})},t.prototype._updateWorkflowStepCreator=function(e,t){void 0===t&&(t="awaiting-feature-to-update");var r=e.viewModel.handles,i={"awaiting-feature-to-update":function(){return{id:"awaiting-feature-to-update",setUp:function(){return a(this,void 0,void 0,function(){var t,i,n,a,l;return o(this,function(o){return t=e.viewModel,i=t.spinnerViewModel,n=t.view,a=null,r.add({remove:function(){a&&(a.abort(),a=null)}},this.id),e.edits.feature=null,l=n.on("click",function(t){t.stopPropagation(),i.location=t.mapPoint,i.visible=!0,a&&a.abort();var r=e.viewModel.editableItems;a=new u.default,w.create(function(e,i){w.onAbort(a.signal,function(){return i(w.createAbortError())}),e(H(r,n,t))}).then(function(t){if(e.viewModel.spinnerViewModel.visible=!1,w.throwIfAborted(a),e.candidates=t.reduce(function(e,t){return t.error?e:e.concat(t.value)},[]),0!==e.candidates.length)if(1===e.candidates.length){var r=e.candidates[0];e.edits.feature=r,e.viewModel.activeWorkflow.go("editing-existing-feature")}else e.viewModel.activeWorkflow.next()})}),r.add(l,this.id),[2]})})},tearDown:function(){return a(this,void 0,void 0,function(){return o(this,function(e){return r.remove(this.id),[2]})})}}},"awaiting-update-feature-candidate":function(){return{id:"awaiting-update-feature-candidate",setUp:function(){return a(this,void 0,void 0,function(){var t,i;return o(this,function(n){return t=e.edits,i=e.viewModel,t.feature=null,r.add(h.watch(t,"feature",function(e){i._unhighlight(),i._highlight(e)}),this.id),[2]})})},tearDown:function(){return a(this,void 0,void 0,function(){return o(this,function(t){return e.viewModel._unhighlight(),r.remove(this.id),[2]})})}}},"editing-existing-feature":function(){return{id:"editing-existing-feature",setUp:function(){return a(this,void 0,void 0,function(){var t,i,n=this;return o(this,function(o){return t=e.edits.feature,i=e.viewModel,e.editableItem=i.editableItems.find(function(e){return e.layer===t.layer}),[2,T(t,i.view).then(function(t){e.edits.updateGeometry(t.geometry),e.edits.updateAttributes(t.attributes),e.edits.trackChanges();var o=t.layer,a=x(i.layerInfos,o),u=a&&a.fieldConfig;i.featureFormViewModel.set({feature:t,fieldConfig:u});var l=[i.featureFormViewModel.on("value-change",function(){e.edits.updateAttributes(i.featureFormViewModel.getValues())})];o.capabilities.editing.supportsGeometryUpdate?l.push(D(t,i.sketchViewModel,i.view,function(t){var r=t.geometry;return e.edits.updateGeometry(r)})):i._highlight(t),r.add(l,n.id)})]})})},tearDown:function(){return a(this,void 0,void 0,function(){return o(this,function(t){return e.editableItem=null,e.viewModel.featureFormViewModel.set({feature:null,fieldConfig:null}),r.remove(this.id),e.viewModel._unhighlight(),[2]})})}}}},n=!1;return["awaiting-feature-to-update","awaiting-update-feature-candidate","editing-existing-feature"].filter(function(e){return!!n||(n=e===t)}).map(function(e){return i[e]()})},t.prototype._create=function(e){return this._queueOperation(function(){return e.layer.applyEdits({addFeatures:[e]})})},t.prototype._delete=function(e){return this._queueOperation(function(){return e.layer.applyEdits({deleteFeatures:[e]})})},t.prototype._update=function(e){return this._queueOperation(function(){return e.layer.applyEdits({updateFeatures:[e]})}).then()},t.prototype._queueOperation=function(e){var t=this;this.activityQueue.push(e),this.notifyChange("syncing");var r=function(e,t){var r=t.indexOf(e);r>-1&&t.splice(r,1)};return e().then(function(e){var t=e.addFeatureResults,r=e.deleteFeatureResults,i=e.updateFeatureResults,n=s.find(t,function(e){return!!e.error})||s.find(i,function(e){return!!e.error})||s.find(r,function(e){return!!e.error});if(n)throw n.error}).catch(function(i){S("editing:operation-error","An error ocurred.",{error:i});var n={error:i,retry:function(){r(n,t.failures),t._queueOperation(e)},cancel:function(){return r(n,t.failures)}};t._set("failures",t.failures.concat([n]))}).then(function(){r(e,t.activityQueue),t.notifyChange("syncing")})},i([v.property({readOnly:!0})],t.prototype,"activeWorkflow",void 0),i([v.property({readOnly:!0})],t.prototype,"activityQueue",void 0),i([v.property({value:G.slice()})],t.prototype,"allowedWorkflows",null),i([v.property({readOnly:!0,dependsOn:["editableItems"]})],t.prototype,"canCreate",null),i([v.property({readOnly:!0,dependsOn:["editableItems"]})],t.prototype,"canUpdate",null),i([v.property({dependsOn:["allowedWorkflows","layerInfos","view.allLayerViews","view.ready"],readOnly:!0})],t.prototype,"editableItems",null),i([v.property({readOnly:!0})],t.prototype,"failures",void 0),i([v.property()],t.prototype,"featureFormViewModel",void 0),i([v.property()],t.prototype,"featureTemplatesViewModel",void 0),i([v.property()],t.prototype,"layerInfos",void 0),i([v.property()],t.prototype,"sketchViewModel",void 0),i([v.property()],t.prototype,"spinnerViewModel",void 0),i([v.property({dependsOn:["editableItems","activeWorkflow.stepId","view.ready"]})],t.prototype,"state",null),i([v.property({readOnly:!0})],t.prototype,"syncing",null),i([v.property()],t.prototype,"view",null),i([v.property()],t.prototype,"startCreateWorkflowAtFeatureTypeSelection",null),i([v.property()],t.prototype,"startCreateWorkflowAtFeatureCreation",null),i([v.property()],t.prototype,"startCreateWorkflowAtFeatureEdit",null),i([v.property()],t.prototype,"startUpdateWorkflowAtFeatureSelection",null),i([v.property()],t.prototype,"startUpdateWorkflowAtMultipleFeatureSelection",null),i([v.property()],t.prototype,"startUpdateWorkflowAtFeatureEdit",null),i([v.property()],t.prototype,"deleteFeatureFromWorkflow",null),i([v.property()],t.prototype,"cancelWorkflow",null),t=i([v.subclass("esri.widgets.Editor.EditorViewModel")],t)}(v.declared(l,f))});