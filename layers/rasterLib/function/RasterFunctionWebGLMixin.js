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

define(["dojo/_base/declare","dojo/_base/lang","./RasterFunctionX","./pixelShaders","./vertexShaders","./webglHelper","./convolutionKernel"],(function(t,e,r,i,n,s,o){return t(null,{gl:null,rgbaFloatData:null,originalTexture:null,lastTexture:null,renderTexture:!1,constructor:function(t){this._isProgramInitialized=!1,this.gl=t&&t.gl,t&&t.renderTexture&&(this.renderTexture=t.renderTexture),this._xformSetting=t&&t._xformSetting||{requireProjection:!1,meshSize:[20,20]}},bindFrameBuffer:function(){var t,e=this.gl;this._setupPingPongTextures(),this._setupBranchingTextures();var r=this._glSetting;return this.isBranch?(r.branchIndex=(r.branchIndex+1)%r.branchCount,t=r.branches[r.branchIndex]):(r.pingpongIndex=(r.pingpongIndex+1)%r.pingpong.length,t=r.pingpong[r.pingpongIndex]),e.bindFramebuffer(e.FRAMEBUFFER,t.frameBuffer),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),t},_initializeProgram:function(t){if(this.gl)try{var e=this.gl,r=e.drawingBufferWidth,o=e.drawingBufferHeight;e.viewport(0,0,r,o);var a=this._glSetting.programUniforms,h="local"===this.functionName?"local"+this.functionArguments.operation:this.functionName,g=a[h];if(g)this._uniforms=g.uniforms,this.rasterProgram=g.program;else{this._useMesh=this._tileMode&&this._xformSetting.requireProjection;var u=this._useMesh?n.mesh:n.basic,f=n.getShader(e,t.vertex||u),l=i.getShader(e,t.fragment),_=this._loadProgram(f,l),m={rasterProgram:s.getUniforms(e,_)};a[h]={uniforms:m,program:_},this.rasterProgram=_,this._uniforms=m}e.useProgram(this.rasterProgram);var x=e.getAttribLocation(this.rasterProgram,"a_texCoord"),c=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,c);var d=s.createMesh(this._xformSetting.meshSize);e.bufferData(e.ARRAY_BUFFER,d,e.STATIC_DRAW),e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0),e.disable(e.DEPTH_TEST),e.blendFunc(e.SRC_ALPHA,e.ZERO),e.disable(e.BLEND),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),this._shaderInfo={fragment:t.fragmentName}}catch(t){return void console.error("webgl exception: "+t.message)}else console.error("WebGL is required.")},_setUniform:function(t,e,r){if(null!=e){r&&!this._uniforms[r]&&(this._uniforms[r]=s.getUniforms(this.gl,this[r]));var i=r?this._uniforms[r]:this._uniforms.rasterProgram,n=i[t]||i[t+"[0]"];n&&s.setUniform(this.gl,n,e)}},_setUniforms:function(t,e){var r,i,n,s=Object.keys(t),o=s.length;for(r=0;r<o;r++)this._setUniform(s[r],t[s[r]],e);this.rawInput?this._setUniform("u_flipY",!0,e):this._setUniform("u_flipY",!1,e),this._tileMode?(this.rawInput?(i=this._xformSetting.offset,n=this._xformSetting.scale):(i=[0,0],n=[1,1]),this._setUniform("u_xformOffset",i,e),this._setUniform("u_xformScale",n,e),this._xformSetting.requireProjection&&(this.rawInput?(this._setupXformTexture(),this._setUniform("u_projection",!0,e),this._setUniform("u_transformGridSize",this._xformSetting.gridConfig.size,e),this._setUniform("u_transformSpacing",this._xformSetting.gridConfig.spacing,e),this._setUniform("u_targetImageSize",new Float32Array([this.gl.drawingBufferWidth,this.gl.drawingBufferHeight]),e)):this._setUniform("u_projection",!1,e))):(i=[0,0],n=[1,1],this._setUniform("u_xformOffset",i,e),this._setUniform("u_xformScale",n,e)),this.rawInput&&this._rawResolution&&("RSP_BilinearInterpolation"===this.interpolation||"RSP_CubicConvolution"===this.interpolation)?(this._setUniform("u_resampling",1),this._setUniform("u_rawResolution",this._rawResolution)):this._setUniform("u_resampling",0)},_setupTextureData:function(t,e){if(t.texture)return t;t.raster&&t.raster.pixelBlock&&(t=t.raster),this.rawInput=!0;var r,i=e&&e.notOriginal,n=e&&e.bandIDs;if(e&&e.reCreate?r=!1:(r=this._tileMode?!this._xformSetting.hasNewTexture:!this._glSetting.hasNewTexture)&&this._originalBandIDs&&(r=!!n&&this._originalBandIDs.join("")===n.join("")),this._glSetting.branchCount>0&&(r=!1),r&&this.originalTexture)return{extent:t.extent,texture:this.originalTexture};var s=this._createTexture();i||(this.originalTexture=s,this._originalBandIDs=n);var o=this.gl,a=t.pixelBlock;this._rawResolution=a?[1/t.pixelBlock.width,1/t.pixelBlock.height]:[1/this.gl.drawingBufferWidth,1/this.gl.drawingBufferHeight];var h=0;n&&n.length>0&&a&&(h=Math.max.apply(null,n),a.pixels.length>h&&n&&(a.pixels=n.map((function(t){return a.pixels[t]})),a.statistics&&(a.statistics=n.map((function(t){return a.statistics[t]})))));var g=a.width,u=a.height;o.getExtension("OES_texture_float");var f=a.getAsRGBAFloat();return o.texImage2D(o.TEXTURE_2D,0,o.RGBA,g,u,0,o.RGBA,o.FLOAT,f),{extent:t.extent,texture:s}},_setupPingPongTextures:function(){var t=this._glSetting;if(!t||!t.pingpong){t.pingpong=[];var e=s.createBufferTexture(this.gl,!1);t.pingpong.push(e),e=s.createBufferTexture(this.gl,!1),t.pingpong.push(e),t.pingpongIndex=1}},_setupBranchingTextures:function(){var t=this._glSetting;if(!t||!t.branches){t.branches=[];var e,r=0,i=t.branchCount;if(i>0){for(r=0;r<i;r++)e=s.createBufferTexture(this.gl,!1),t.branches.push(e);t.branchIndex=i-1}}},_setupXformTexture:function(t){for(var e=this._createTexture(),r=this.gl,i=4*this._xformSetting.gridConfig.size[0],n=this._xformSetting.gridConfig.size[1],s=new Float32Array(i*n*4),o=0,a=0;a<this._xformSetting.gridConfig.coefficients.length;a++)s[o++]=this._xformSetting.gridConfig.coefficients[a],a%3==2&&(s[o++]=1);r.getExtension("OES_texture_float"),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,i,n,0,r.RGBA,r.FLOAT,s),this._bindTexture(e,"u_transformGrid",t)},_createTexture:function(t){return s.createTexture(this.gl,t)},_bindTexture:function(t,e,r){e=e||"u_image",r=r||"rasterProgram";var i=this._uniforms[r],n=this._getTextureIndex(e);if(-1!==n){var s=i[e].location,o=this.gl;o.uniform1i(s,n),o.activeTexture(o.TEXTURE0+n),o.bindTexture(o.TEXTURE_2D,t)}},_getTextureIndex:function(t,e){e=e||"rasterProgram";var r=this._uniforms[e];if(!r||!r[t]||r[t].info.type!==this.gl.SAMPLER_2D)return-1;if("u_transformGrid"===t)return 0;var i="u_image"===t?0:parseInt(t.replace("u_image",""));return this._xformSetting.requireProjection?i+1:i},_drawGL:function(t){var e=this.gl;this.renderTexture?(e.enable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null)):e.disable(e.BLEND),t||e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight);var r=this._xformSetting.meshSize||[1,1];e.drawArrays(e.TRIANGLES,0,r[0]*r[1]*6),this._drawMesh()},_drawMesh:function(){if(this.renderTexture&&this._glSetting.drawMesh){this.meshProgram=this.meshProgram||this._setupMeshProgram();var t=this.gl;t.useProgram(this.meshProgram),t.bindFramebuffer(t.FRAMEBUFFER,null);var e=t.getAttribLocation(this.meshProgram,"a_texCoord"),r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r);var i=this._xformSetting.meshSize||[1,1],n=s.createMesh(i,!0);t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW),t.enableVertexAttribArray(e),t.vertexAttribPointer(e,2,t.FLOAT,!1,0,0),t.disable(t.DEPTH_TEST),t.blendFunc(t.ONE,t.ZERO),this._setUniforms({u_color:[0,0,1,1],u_drawMeshLines:!0},"meshProgram"),t.drawArrays(t.LINES,0,i[0]*i[1]*10)}},_setupMeshProgram:function(){var t=n.getShader(this.gl,n.mesh),e=i.getShader(this.gl,i.constant);return this._loadProgram(t,e)},_loadProgram:function(t,e){return s.loadProgram(this.gl,t,e)},_getShaderScript:function(t,e){var r=document.getElementById(e);if(!r)return null;for(var i="",n=r.firstChild;n;)3==n.nodeType&&(i+=n.textContent),n=n.nextSibling;return i}})}));