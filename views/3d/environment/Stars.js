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

define(["require","exports","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../request","../../../core/asyncUtils","../../../core/Error","../../../core/Logger","../../../core/promiseUtils","../../../core/watchUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../support/buffer/glUtil","../support/buffer/InterleavedLayout","../webgl-engine/shaders/StarsPrograms","../../webgl/BufferObject","../../webgl/programUtils","../../webgl/renderState","../../webgl/Util","../../webgl/VertexArrayObject"],function(t,e,r,a,i,o,s,n,f,l,u,c,h,d,p,m,g,_,b,y){var v=n.getLogger("esri.views.3d.environment.Stars"),w=function(){function e(t){this.slot=13,this.numBinaryFloats=2,this.numBinaryUInt8=1,this.bytesPerStar=9,this.needsRender=!1,this.didRender=!0,this._loadDataController=f.createAbortController(),this._numStars=0,this._modelMatrix=c.mat4f64.create(),this.view=t,this._loadDataPromise=this._loadBrightStarCatalogue()}return e.prototype.destroy=function(){this._loadDataController&&(this._loadDataController.abort(),this._loadDataController=null),this._dateHandle&&(this._dateHandle.remove(),this._dateHandle=null),this._program&&(this._program.dispose(),this._program=null),this._vao&&(this._vao.dispose(),this._vao=null)},e.prototype.initializeRenderContext=function(t){var e=this,r=t.rctx;this._program=g.createProgram(r,p.program),this._pipelineState=_.makePipelineState({blending:_.separateBlendingParams(770,1,771,771),depthTest:{func:515},colorWrite:_.defaultColorWriteParams}),this._dateHandle=l.init(this.view,"environment.lighting.date",function(t){return e._update(t)}),this._loadDataPromise.then(function(){e._numStars=e._starData.byteLength/e.bytesPerStar;var t=new Float32Array(e._starData,0,e._numStars*e.numBinaryFloats),a=new Uint8Array(e._starData,e._numStars*e.numBinaryFloats*4,e._numStars*e.numBinaryUInt8);e._vao=e._createVertexArrayObject(r,t,a),e.needsRender=!0})},e.prototype.uninitializeRenderContext=function(t){this.destroy()},e.prototype.render=function(t){if(t.slot!==this.slot||0!==t.pass||null==this._starData)return!1;var e=t.rctx,r=this._program;e.bindProgram(r);var a=t.camera;return r.setUniformMatrix4fv("view",a.viewMatrix),r.setUniformMatrix4fv("proj",a.projectionMatrix),r.setUniform4fv("viewport",a.fullViewport),r.setUniformMatrix4fv("model",this._modelMatrix),r.setUniform1f("pixelRatio",a.pixelRatio),e.setPipelineState(this._pipelineState),e.bindVAO(this._vao),b.assertCompatibleVertexAttributeLocations(this._vao,r),e.drawArrays(0,0,this._numStars),this.needsRender=!1,!0},e.prototype._computeDayDuration=function(t){var e=t,r=new Date(t.getFullYear(),0,1,11,58,56);return(+e-+r)/(+new Date(t.getFullYear()+1,0,1,11,58,55)-+r)},e.prototype._update=function(t){if(t){var e=t.getHours()/12,r=t.getMinutes()/60*(2/24),a=t.getSeconds()/60*(2/1440),i=(e+r+a-.9972222)%2,o=2*this._computeDayDuration(t),s=this._modelMatrix;u.mat4.copy(s,D),u.mat4.rotateZ(s,s,-o*Math.PI),u.mat4.multiply(s,x,s),u.mat4.rotateZ(s,s,-i*Math.PI),this.needsRender=!0}},e.prototype._hexToRGB=function(t){return[parseInt(t.substring(0,2),16),parseInt(t.substring(2,4),16),parseInt(t.substring(4,6),16)]},e.prototype._unpackUint8Attributes=function(t){return t>=192?[2.9,t-192]:t>=160?[2.5,t-160]:t>=128?[2,t-128]:t>=96?[1.5,t-96]:t>=64?[1,t-64]:t>=32?[.7,t-32]:[.4,t]},e.prototype._createVertexArrayObject=function(t,e,r){for(var a=U.createBuffer(this._numStars),i=a.position,o=a.color,s=a.size,n=0;n<this._numStars;n++){var f=e[2*n+0],l=e[2*n+1];i.set(n,0,-Math.cos(f)*Math.sin(l)),i.set(n,1,-Math.sin(f)*Math.sin(l)),i.set(n,2,-Math.cos(l));var u=this._unpackUint8Attributes(r[n]),c=this._hexToRGB(S[u[1]]);o.set(n,0,255*c[0]),o.set(n,1,255*c[1]),o.set(n,2,255*c[2]),o.set(n,3,255),s.set(n,u[0])}return new y(t,p.program.attributes,{geometry:h.glLayout(U)},{geometry:m.createVertex(t,35044,a.buffer)})},e.prototype._verifyStartData=function(t){if(!t)throw new s("stars:no-data-received","Failed to create stars because star catalogue is missing");var e=t.byteLength/this.bytesPerStar;if(e%1!=0||e>5e4||e<5e3)throw new s("stars:invalid-data","Failed to create stars because star catalogue data is invalid")},e.prototype._loadBrightStarCatalogue=function(){return a(this,void 0,void 0,function(){var e,a,s;return r(this,function(r){switch(r.label){case 0:return M?(this._starData=M,[2]):[4,o.result(i(t.toUrl("./resources/stars.wsv"),{responseType:"array-buffer",signal:this._loadDataController.signal}))];case 1:if(e=r.sent(),this._loadDataController=null,!1===e.ok){if(f.isAbortError(e.error))throw e.error;return v.error("loadBrightStarCatalogue",e.error.message),[2]}a=e.value,s=a.data;try{this._verifyStartData(s)}catch(t){throw v.error("loadBrightStarCatalogue",t),t}return M=s,this._starData=s,[2]}})})},e}(),S=["9bb2ff","9eb5ff","aabfff","bbccff","ccd8ff ","dae2ff","e4e9ff","eeefff","f8f6ff","fff9fb","fff5ef","fff1e5","ffeddb","ffe9d2","ffe6ca","ffe3c3","ffe0bb","ffddb4","ffdaad","ffd6a5","ffd29c","ffcc8f","ffc178","ffa94b","ff7b00"],x=c.mat4f64.fromValues(1,0,0,0,0,.9174771405229186,.39778850739794974,0,0,-.39778850739794974,.9174771405229186,0,0,0,0,1),D=c.mat4f64.fromValues(1,0,0,0,0,.9174771405229186,-.39778850739794974,0,0,.39778850739794974,.9174771405229186,0,0,0,0,1),U=d.newLayout().vec3f("position").vec4u8("color").f32("size"),M=null;return w});