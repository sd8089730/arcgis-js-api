// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.17/esri/copyright.txt for details.

define(["require","exports","../../../../core/Logger","../../../../core/maybe","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../support/imageUtils","./DefaultTextureUnits","./glUtil3D","./SSAOTechnique","./Util","../../../webgl/FramebufferObject","../../../webgl/Texture","../../../webgl/Util","@dojo/framework/shim/Promise"],(function(e,t,i,s,r,o,n,a,u,h,l,p,f,c,_,m){"use strict";var d=i.getLogger("esri.views.3d.webgl-engine.lib.SSAOHelper"),b=function(){function t(e,t,i){this._enabled=!1,this._BLUR_F=2,this._attenuation=.5,this._radius=3,this._samples=16,this._viewportToRestore=a.vec4f64.create(),this.quadVAO=null,this._rctx=t,this._techniqueRep=e,this._requestRender=i,this._ssaoTechniqueConfig=new p.SSAOTechniqueConfiguration,this._emptyTexture=l.createColorTexture(t,[1,1,1,1])}return t.prototype.dispose=function(){this._emptyTexture.dispose(),this._emptyTexture=null,s.isSome(this.quadVAO)&&(this.quadVAO=s.disposeMaybe(this.quadVAO))},Object.defineProperty(t.prototype,"isSupported",{get:function(){var e=this._rctx,t=-1!==e.parameters.versionString.indexOf("WebGL 0.93"),i=-1!==e.parameters.versionString.indexOf("WebGL 0.94");return!(t||i)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"enabled",{get:function(){return this._enabled},set:function(e){e?this.enable():this.disable()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"attenuation",{get:function(){return this._attenuation},set:function(e){this._attenuation=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"radius",{get:function(){return this._radius},set:function(e){this._radius=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"filterRadius",{get:function(){return 4},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"samples",{get:function(){return this._samples},set:function(e){this._samples=e,this._enabled&&this.selectPrograms()},enumerable:!1,configurable:!0}),t.prototype.computeSSAO=function(e,t,i){if(this._noiseTexture){f.assert(this.enabled);var r=this._rctx,a=e.fullViewport,u=a[2],h=a[3],p=u/this._BLUR_F,c=h/this._BLUR_F;this._ssaoFBO.resize(u,h),this._blur0FBO.resize(p,c),this._blur1FBO.resize(p,c);var _=1*u,d=1*h;r.bindFramebuffer(this._ssaoFBO),n.vec4.copy(this._viewportToRestore,e.fullViewport),r.setViewport(0,0,u,h);var b=this._ssaoTechnique.program,T=this._blurTechnique.program;r.bindProgram(b),r.setPipelineState(this._ssaoTechnique.pipeline),b.setUniform2f("rnmScale",u/this._noiseTexture.descriptor.width,h/this._noiseTexture.descriptor.height),b.setUniform3fv("pSphere",this._samples<=8?this._data.random8:this._samples<=16?this._data.random16:this._samples<=32?this._data.random32:this._data.random64);var O=this._data.minDiscrepancy,U=this._samples<O.length?O[this._samples]:5779;b.setUniform1f("numSpiralTurns",U);var v=x,y=g;f.inverseProjectionInfo(e.projectionMatrix,e.fullWidth,e.fullHeight,v,y),b.setUniform4fv("projInfo",v),b.setUniform2fv("zScale",y),b.setUniform2f("nearFar",e.near,e.far);var F=1/e.computeRenderPixelSizeAtDist(1);b.setUniform1f("projScale",1*F),b.setUniform2f("screenDimensions",_,d);var w=2*this._radius,S=o.vec3.distance(e.eye,e.center);w=20*e.computeRenderPixelSizeAtDist(S),w=Math.max(.1,w),b.setUniform1f("radius",w),b.setUniform1f("intensity",4*this._attenuation/Math.pow(w,6)),b.setUniform1i("rnm",0),b.setUniform1i("normalMap",1),b.setUniform1i("depthMap",2),r.bindTexture(this._noiseTexture,0),r.bindTexture(i,1),r.bindTexture(t,2),s.isSome(this.quadVAO)||(this.quadVAO=l.createQuadVAO(this._rctx));var B=this.quadVAO;r.bindVAO(B),r.drawArrays(5,0,m.vertexCount(B,"geometry"));r.bindTexture(this._ssaoFBO.colorTexture,0),r.setViewport(0,0,_/this._BLUR_F,d/this._BLUR_F),r.bindFramebuffer(this._blur0FBO),r.bindProgram(T),T.setUniform2f("screenDimensions",_,d),T.setUniform1i("tex",0),T.setUniform1i("normalMap",1),T.setUniform1i("depthMap",2),T.setUniform2f("blurSize",0,1*this._BLUR_F/d),T.setUniform1i("radius",4),T.setUniform1f("g_BlurFalloff",.08),T.setUniform2f("nearFar",e.near,e.far),S>5e4&&(F=Math.max(0,F-(S-5e4))),T.setUniform1f("projScale",F),T.setUniform2f("zScale",1,0),r.drawArrays(5,0,m.vertexCount(B,"geometry")),T.setUniform2f("blurSize",1*this._BLUR_F/_,0),r.bindFramebuffer(this._blur1FBO),r.bindTexture(this._blur0FBO.colorTexture,0),r.drawArrays(5,0,m.vertexCount(B,"geometry")),r.setViewport(this._viewportToRestore[0],this._viewportToRestore[1],this._viewportToRestore[2],this._viewportToRestore[3])}},t.prototype.setUniforms=function(e,t){var i=this.enabled&&this._noiseTexture,s=this._rctx;s.bindTexture(i?this._blur1FBO.colorTexture:this._emptyTexture,t),s.setActiveTexture(0),e.setUniform1i("ssaoTex",t),i?e.setUniform4f("viewportPixelSz",this._viewportToRestore[0],this._viewportToRestore[1],1/this._ssaoFBO.width,1/this._ssaoFBO.height):e.setUniform4f("viewportPixelSz",-1,-1,-1,-1)},t.prototype.bindToAllPrograms=function(e){for(var t=e.getProgramsUsingUniform("viewportPixelSz"),i=0;i<t.length;i++)this.setUniforms(t[i],h.DefaultTextureUnits.SSAO)},t.prototype.selectPrograms=function(){var e=this._samples<=8?8:this._samples<=16?16:this._samples<=32?32:64;this._ssaoTechniqueConfig.samples=e,this._ssaoTechniqueConfig.radius=4,this._ssaoTechniqueConfig.output=0,this._ssaoTechnique=this._techniqueRep.acquireAndReleaseExisting(p.SSAOTechnique,this._ssaoTechniqueConfig,this._ssaoTechnique),this._ssaoTechniqueConfig.output=1,this._blurTechnique=this._techniqueRep.acquireAndReleaseExisting(p.SSAOTechnique,this._ssaoTechniqueConfig,this._blurTechnique)},t.prototype.enable=function(){var e=this;this.enabled||(this.isSupported?(this._enabled=!0,this.loadResources((function(){e._enabled&&e.initialize()}))):d.warn("SSAO is not supported for this browser or hardware"))},t.prototype.loadResources=function(t){var i=this;this._data?t():new Promise((function(t,i){e(["./SSAOHelperData"],t,i)})).then((function(e){i._data=e,t()}))},t.prototype.initialize=function(){var e=this,t={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:0,height:0},i={colorTarget:0,depthStencilTarget:0};this._ssaoFBO=new c(this._rctx,i,t),this._blur0FBO=new c(this._rctx,i,t),this._blur1FBO=new c(this._rctx,i,t),u.requestImage(this._data.noiseTexture).then((function(t){e._enabled&&(e._noiseTexture=new _(e._rctx,{target:3553,pixelFormat:6408,dataType:5121,hasMipmap:!0,width:t.width,height:t.height},t),e._requestRender())})),this.selectPrograms()},t.prototype.disable=function(){this.enabled&&(this._enabled=!1,this._noiseTexture&&(this._noiseTexture.dispose(),this._noiseTexture=null),this._blur1FBO&&(this._blur1FBO.dispose(),this._blur1FBO=null),this._blur0FBO&&(this._blur0FBO.dispose(),this._blur0FBO=null),this._ssaoFBO&&(this._ssaoFBO.dispose(),this._ssaoFBO=null))},t.prototype.getGpuMemoryUsage=function(){return m.getGpuMemoryUsage(this._blur0FBO)+m.getGpuMemoryUsage(this._blur1FBO)+m.getGpuMemoryUsage(this._ssaoFBO)},Object.defineProperty(t.prototype,"test",{get:function(){return{ssao:this._ssaoFBO,blur:this._blur1FBO}},enumerable:!1,configurable:!0}),t}(),g=r.vec2f64.create(),x=a.vec4f64.create();return b}));