montageDefine("3c07db4","core/meta/object-property",{dependencies:["../core","../exception","./blueprint","../logger"],factory:function(e,t){"use strict";var r=e("../core").Montage,n=e("../exception").Exception;e("./blueprint").Blueprint;var i=e("./blueprint").Binder,a=e("../logger").logger("object-property");t.ObjectProperty=r.specialize({constructor:{value:function(){this.superForValue("constructor")()}},init:{serializable:!1,enumerable:!1,value:function(){return this}},apply:{value:function(e,t){if(!e.hasOwnProperty("blueprint")){var n;n=r.getInfoForObject(e),null!=n&&n.isInstance===!1&&(t===void 0?t=i.manager.blueprintForPrototype(n.objectName,n.moduleId):(t.prototypeName!==n.objectName||t.moduleId!==n.moduleId)&&(t=null),this.applyWithBlueprint(e,t))}}},applyWithBlueprint:{value:function(e,t){null!=t&&(this.addProperties(e,t),null!==t.parent&&this.apply(Object.getPrototypeOf(e),t))}},addProperties:{value:function(e,t){for(var n,i=0;n=t.propertyBlueprints[i++];)n.isDerived?this.addDerivedProperty(e,n):n.isAssociation?this.addAssociation(e,n):this.addProperty(e,n);r.defineProperty(e,"_blueprint",{serializable:!1,enumerable:!1,value:t}),r.defineProperty(e,"blueprint",{enumerable:!1,serializable:!1,get:function(){return this._blueprint}}),r.defineProperty(e,"blueprintGet",{serializable:!1,enumerable:!1,value:this.blueprintGet}),r.defineProperty(e,"blueprintSet",{serializable:!1,enumerable:!1,value:this.blueprintSet})}},addProperty:{value:function(e,t){this.addPropertyStorage(e,t),this.addPropertyDefinition(e,t),this.addPropertyStoredValue(e,t)}},addPropertyStorage:{value:function(e,t){var n="_"+t.name,i=null;e.hasOwnProperty(n)?a.isError&&a.error("We have an issue here. The developer should not override the storage value for "+n+"."):(i=t.isToMany?{value:[],enumerable:!1,serializable:!0,distinct:!0}:{value:null,enumerable:!1,serializable:!0},r.defineProperty(e,n,i))}},addPropertyDefinition:{value:function(e,t){var n=t.name,i=null;e.hasOwnProperty(n)?a.isDebug&&a.debug("The developer has already created the property "+n+" method do nothing."):(i={get:function(){return this.blueprintGet(n)},enumerable:!0,serializable:!1},t.readOnly||(i.set=function(e){return this.blueprintSet(n,e)}),r.defineProperty(e,n,i))}},blueprintGet:{value:function(e){var t=this.blueprint.propertyBlueprintForName(e),r="_"+t.name;return this[r]},enumerable:!1,serializable:!1},blueprintSet:{value:function(e,t){var r=this.blueprint.propertyBlueprintForName(e),i="_"+r.name;if(null==t&&r.denyDelete)throw(new n).initWithMessageTargetAndMethod("Deny Delete",this,r.name);this[i]=t},enumerable:!1,serializable:!1},addPropertyStoredValue:{value:function(e,t){var n=t.name+"$Storage",i=null;e.hasOwnProperty(n)?a.isError&&a.error("We have an issue here. The developer should not override the stored value for "+n+"."):(i=t.isToMany?{value:[],enumerable:!1,serializable:!1,distinct:!0}:{value:null,enumerable:!1,serializable:!1},r.defineProperty(e,n,i))}},addAssociation:{value:function(e,t){this.addPropertyStorage(e,t),this.addAssociationDefinition(e,t),this.addPropertyStoredValue(e,t)}},addAssociationDefinition:{value:function(e,t){t.isToMany?this.addToManyAssociationDefinition(e,t):this.addToOneAssociationDefinition(e,t)}},addToOneAssociationDefinition:{value:function(e,t){var n=t.name.toCapitalized(),i="addTo"+n;e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="removeFrom"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="clear"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}})}},addToManyAssociationDefinition:{value:function(e,t){var n=t.name.toCapitalized(),i="addTo"+n;e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="removeFrom"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}}),i="clear"+n,e.hasOwnProperty(i)?a.isError&&a.error("We have an issue here. The developer should not override the method "+i+"."):r.defineProperty(e,i,{serializable:!1,enumerable:!1,value:function(){return null}})}},addDerivedProperty:{value:function(){}}})}});