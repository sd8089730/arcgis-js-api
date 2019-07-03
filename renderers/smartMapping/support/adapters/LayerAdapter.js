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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Loadable","../../../../core/accessorSupport/decorators"],function(e,r,o,p,t,s,c){return function(e){function r(r){return e.call(this)||this}return o(r,e),p([c.property()],r.prototype,"geometryType",void 0),p([c.property()],r.prototype,"objectIdField",void 0),p([c.property()],r.prototype,"supportsSQLExpression",void 0),p([c.property()],r.prototype,"hasQueryEngine",void 0),p([c.property()],r.prototype,"minScale",void 0),p([c.property()],r.prototype,"maxScale",void 0),p([c.property()],r.prototype,"fullExtent",void 0),r=p([c.subclass("esri.renderers.smartMapping.support.adapters.LayerAdapter")],r)}(c.declared(t,s))});