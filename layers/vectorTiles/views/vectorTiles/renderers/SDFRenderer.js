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

define(["require","exports","dojo/has","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","./vtShaderSnippets","../../webgl/ShaderVariations","../../webgl/VertexArrayObject"],(function(e,t,i,r,a,o,s,n,f,l,_){return function(){function e(){this._attributeLocations={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3},this._attributeLocationsDD={a_pos:0,a_vertexOffset:1,a_tex:2,a_levelInfo:3,a_color:4,a_size:5},this._initialized=!1,this._viewProjMat=r.create(),this._offsetVector=a.create(),this._extrudeMat=r.create(),this._haloColor=o.create(),this._sdfColor=o.create(),this._scaleVec=a.create()}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,a,o,f,l,_,u,d,h,c,x,m){var v=this;if(!i("esri-vector-tiles-avoid-text")){this._initialized||this._initialize(e);var y=s.degToByte(f),p=u.getLayoutValue("text-rotation-alignment",a);2===p&&(p=1===u.getLayoutValue("symbol-placement",a)?0:1);var D=0===p,g=u.getLayoutValue("text-keep-upright",a)&&D,V=3===o,b=.8*3/x,z=u.hasDataDrivenTextSize?1:u.getLayoutValue("text-size",a),U=u.hasDataDrivenTextColor?[1,1,1,1]:u.getPaintValue("text-color",a),A=u.hasDataDrivenTextOpacity?1:u.getPaintValue("text-opacity",a),M=U[3]*A*m;this._sdfColor[0]=M*U[0],this._sdfColor[1]=M*U[1],this._sdfColor[2]=M*U[2],this._sdfColor[3]=M,this._glyphTextureSize||(this._glyphTextureSize=new Float32Array([d.width/4,d.height/4]));var O=_.tileTransform.transform,C=u.getPaintValue("text-translate",a);if(0!==C[0]||0!==C[1]){r.copy(this._viewProjMat,_.tileTransform.transform);var w=C[0],P=C[1],j=0,L=0,S=_.coordRange/512,T=(1<<_.key.level)/Math.pow(2,a)*S;if(1===u.getPaintValue("text-translate-anchor",a)){var I=-s.C_DEG_TO_RAD*f,B=Math.sin(I),E=Math.cos(I);j=T*(w*E-P*B),L=T*(w*B+P*E)}else j=T*w,L=T*P;this._offsetVector[0]=j,this._offsetVector[1]=L,this._offsetVector[2]=0,r.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),O=this._viewProjMat}D?r.copy(this._extrudeMat,h):r.copy(this._extrudeMat,c),this._scaleVec[0]=1/24,this._scaleVec[1]=1/24,this._scaleVec[2]=1,r.scale(this._extrudeMat,this._extrudeMat,this._scaleVec);var F=u.hasDataDrivenText,k=this._getSDFVAO(e,_,F);if(k){e.bindVAO(k);var R=this._shaderVariations.getProgram([F,V],void 0,void 0,F?this._attributeLocationsDD:this._attributeLocations);if(e.bindProgram(R),R.setUniformMatrix4fv("u_transformMatrix",O),R.setUniformMatrix4fv("u_extrudeMatrix",this._extrudeMat),R.setUniform2fv("u_normalized_origin",_.tileTransform.displayCoord),R.setUniform1f("u_depth",u.z+1/65536),R.setUniform2fv("u_mosaicSize",this._glyphTextureSize),R.setUniform1f("u_mapRotation",y),R.setUniform1f("u_keepUpright",g?1:0),R.setUniform1f("u_level",10*a),R.setUniform1f("u_fadeSpeed",10*l.fadeSpeed),R.setUniform1f("u_minfadeLevel",10*l.minfadeLevel),R.setUniform1f("u_maxfadeLevel",10*l.maxfadeLevel),R.setUniform1f("u_fadeChange",10*(a+l.fadeChange)),R.setUniform1i("u_texture",0),R.setUniform1f("u_size",z),R.setUniform1f("u_antialiasingWidth",b),V){var G=n.int32To4Bytes(t.layerID);R.setUniform4f("u_id",G[0],G[1],G[2],G[3])}t.glyphPerPageElementsMap.forEach((function(t,i){d.bind(e,9729,i,0);var r=u.getPaintValue("text-halo-color",a),o=u.getPaintValue("text-halo-width",a);if(r[3]>0&&o>0){var s=r[3]*A*m;v._haloColor[0]=s*r[0],v._haloColor[1]=s*r[1],v._haloColor[2]=s*r[2],v._haloColor[3]=s;var n=3*u.getPaintValue("text-halo-blur",a),f=3*o;R.setUniform4fv("u_color",v._haloColor),R.setUniform1f("u_halo",1),R.setUniform1f("u_edgeDistance",f),R.setUniform1f("u_edgeBlur",n),e.drawElements(4,t[1],5125,12*t[0])}v._sdfColor[3]>0&&(R.setUniform4fv("u_color",v._sdfColor),R.setUniform1f("u_halo",0),R.setUniform1f("u_edgeDistance",0),R.setUniform1f("u_edgeBlur",0),e.drawElements(4,t[1],5125,12*t[0]))})),e.bindVAO()}}},e.prototype._initialize=function(e){if(this._initialized)return!0;var t=new l("text",["textVS","textFS"],[],f,e);return t.addDefine("DD","DD",[!0,!1],"DD"),t.addDefine("ID","ID",[!0,!0],"ID"),this._shaderVariations=t,this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0},e.prototype._getSDFVAO=function(e,t,i){if(i){if(t.textDDVertexArrayObject)return t.textDDVertexArrayObject;var r=t.textDDVertexBuffer,a=t.textIndexBuffer;return r&&a?(t.textDDVertexArrayObject=new _(e,this._attributeLocationsDD,this._vertexAttributesDD,{geometry:r},a),t.textDDVertexArrayObject):null}if(t.textVertexArrayObject)return t.textVertexArrayObject;r=t.textVertexBuffer,a=t.textIndexBuffer;return r&&a?(t.textVertexArrayObject=new _(e,this._attributeLocations,this._vertexAttributes,{geometry:r},a),t.textVertexArrayObject):null},e}()}));