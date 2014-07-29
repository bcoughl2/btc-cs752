"use strict";var Montage=require("../core").Montage,Promise=require("../promise").Promise,Deserializer=require("../serialization").Deserializer,BinderManager=require("./binder-manager").BinderManager,BlueprintModule=require("./blueprint"),deprecate=require("../deprecate"),logger=require("../logger").logger("blueprint"),_binderManager=null,Binder=exports.Binder=Montage.specialize({constructor:{value:function Binder(){return this.superForValue("constructor")(),this._name=null,this.binderModuleId=null,this.isDefault=!1,this._blueprintForPrototypeTable={},this}},initWithNameAndRequire:{value:function(e,t){if(!e)throw Error("name is required");if(!t)throw Error("require is required");return this._name=e,this._require=t,Binder.manager.addBinder(this),this}},serializeSelf:{value:function(e){e.setProperty("name",this.name),this.blueprints.length>0&&e.setProperty("blueprints",this.blueprints),e.setProperty("binderModuleId",this.binderInstanceModuleId)}},deserializeSelf:{value:function(e){this._name=e.getProperty("name");var t=e.getProperty("blueprints");t&&(this._blueprints=t),this.binderInstanceModuleId=e.getProperty("binderModuleId")}},_name:{value:null},name:{get:function(){return this._name}},_require:{value:null},require:{get:function(){return this._require}},_blueprintForPrototypeTable:{distinct:!0,value:{}},identifier:{get:function(){return["binder",this.name.toLowerCase()].join("_")}},binderInstanceModuleId:{serializable:!1,value:null},isDefault:{serializable:!1,value:!1},_blueprints:{distinct:!0,value:[]},blueprints:{get:function(){return this._blueprints}},addBlueprint:{value:function(e){if(null!==e){var t=this.blueprints.indexOf(e);0>t&&(null!==e.binder&&e.binder!==this&&e.binder.removeBlueprint(e),this.blueprints.push(e),e.binder=this)}return e}},removeBlueprint:{value:function(e){if(null!==e){var t=this.blueprints.indexOf(e);t>=0&&(this.blueprints.splice(t,1),e.binder=null)}return e}},addBlueprintNamed:{value:function(e){return this.addBlueprint((new BlueprintModule.Blueprint).initWithName(e))}},blueprintForPrototype:{value:deprecate.deprecateMethod(void 0,function(e){return this.blueprintForName(e)},"blueprintForPrototype","blueprintForName")},blueprintForName:{value:function(e){for(var t=this.blueprints,r=t.length,n=0;r>n;n++)if(t[n].name===e)return t[n]}},_blueprintObjectProperty:{value:null},ObjectProperty:{get:function(){return this._blueprintObjectProperty||(this._blueprintObjectProperty=Binder.manager.defaultBlueprintObjectProperty),this._blueprintObjectProperty}},blueprintModuleId:require("../core")._blueprintModuleIdDescriptor,blueprint:require("../core")._blueprintDescriptor},{manager:{get:function(){return null===_binderManager&&(_binderManager=new BinderManager),_binderManager}}});