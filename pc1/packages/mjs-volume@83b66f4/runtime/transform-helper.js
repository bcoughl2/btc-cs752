require("runtime/dependencies/gl-matrix");var Base=require("runtime/base").Base,Utilities=require("runtime/utilities").Utilities,TransformHelper=exports.TransformHelper=Object.create(Object.prototype,{_viewMatrix:{value:null,writable:!0},_worldViewMatrix:{value:null,writable:!0},_worldViewInverseTransposeMatrix:{value:null,writable:!0},_worldViewInverseMatrix:{value:null,writable:!0},_dirty:{value:!0,writable:!0},_id:{value:0,writable:!0},transformWillChange:{value:function(){this._dirty=!0}},transformDidChange:{value:function(){}},_node:{value:null,writable:!0},node:{set:function(e){this._node!=e&&(this._node&&this._node.transform.removeObserver(this),this._node=e,this._node&&this._node.transform.addObserver(this),this._dirty=!0)},get:function(){return this._node}},_viewMatrix:{value:null,writable:!0},viewMatrix:{set:function(e){this._viewMatrix=e,this._dirty=!0},get:function(){return this._viewMatrix}},transformDidUpdate:{value:function(){this._dirty=!0}},updateMatricesIfNeeded:{value:function(){this._dirty&&(mat4.multiply(this._viewMatrix,this._node.worldMatrix,this._worldViewMatrix),mat4.toInverseMat3(this._worldViewMatrix,this._worldViewInverseTransposeMatrix),mat3.transpose(this._worldViewInverseTransposeMatrix),mat4.inverse(this._worldViewMatrix,this._worldViewInverseMatrix),this._dirty=!1)}},worldViewMatrix:{get:function(){return this._dirty&&this.updateMatricesIfNeeded(),this._worldViewMatrix}},worldViewInverseTransposeMatrix:{get:function(){return this._dirty&&this.updateMatricesIfNeeded(),this._worldViewInverseTransposeMatrix}},worldViewInverseMatrix:{get:function(){return this._dirty&&this.updateMatricesIfNeeded(),this._worldViewInverseMatrix}},init:{value:function(){return this._viewMatrix=mat4.identity(),this._worldViewMatrix=mat4.identity(),this._worldViewInverseTransposeMatrix=mat3.identity(),this._worldViewInverseMatrix=mat4.identity(),this}}});