montageDefine("3c07db4","core/module-reference",{dependencies:["./core"],factory:function(e,t){var r=e("./core").Montage;t.ModuleReference=r.specialize({constructor:{value:function(){return this.super()}},initWithIdAndRequire:{value:function(e,t){if(!e||!t)throw Error("Module ID and require required");return this.id=e,this.require=t,this}},id:{value:null},require:{value:null},_exports:{value:null},exports:{get:function(){return this._exports?this._exports:this._exports=this.require.async(this.id)}},resolve:{value:function(e){return e.identify(this.id,this.require)}},isModuleReference:{writable:!1,configurable:!1,value:!0}})}});