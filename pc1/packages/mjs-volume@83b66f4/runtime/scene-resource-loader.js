var ResourceLoader=require("runtime/resource-loader").ResourceLoader,MeshResourceLoader=require("runtime/mesh-resource-loader").MeshResourceLoader;exports.SceneResourceLoader=Object.create(ResourceLoader,{_scene:{value:null,writable:!0},scene:{get:function(){return this._scene},set:function(e){this._scene=e}},meshesDidLoad:{value:function(){this.delegate&&this.delegate.sceneResourcesDidPrepare(this.scene)}},loadScene:{value:function(){var e=this;if(this.scene){var t=this.scene.rootNode,n={},i=[];t.apply(function(e){return e.meshes&&e.meshes.length&&e.meshes.forEach(function(e){null==n[e.id]&&(i.push(e),n[e.id]=e)},this),null},!0,null);var r=Object.create(MeshResourceLoader).init(i,e.webGLRenderer,this);r.loadMeshes()}}},init:{value:function(e,t,n){return n&&(this.delegate=n),this.webGLRenderer=t,this.scene=e,t.resourceManager.observers.push(this),this}}});