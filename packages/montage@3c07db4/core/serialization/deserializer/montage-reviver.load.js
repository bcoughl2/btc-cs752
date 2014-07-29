montageDefine("3c07db4","core/serialization/deserializer/montage-reviver",{dependencies:["../../core","mousse/deserialization/reviver","./properties-deserializer","./self-deserializer","./unit-deserializer","../../module-reference","../alias","../../promise"],factory:function(e,t){var r=e("../../core").Montage,n=e("mousse/deserialization/reviver").Reviver,i=e("./properties-deserializer").PropertiesDeserializer,a=e("./self-deserializer").SelfDeserializer,s=e("./unit-deserializer").UnitDeserializer,o=e("../../module-reference").ModuleReference,u=e("../alias").Alias,l=e("../../promise").Promise,c=r.specialize({_require:{value:null},_objectRequires:{value:null},init:{value:function(e,t){if("function"!=typeof e)throw Error("Function 'require' missing.");if("string"!=typeof e.location)throw Error("Function 'require' location is missing");if("object"!=typeof t&&t!==void 0)throw Error("Parameter 'objectRequires' should be an object.");return this._require=e,this._objectRequires=t,this}},getExports:{value:function(e,t){var r;for(t=e.resolve(t),r=e.getModuleDescriptor(t);void 0!==r.redirect;)r=e.getModuleDescriptor(r.redirect);return void 0!==r.mappingRedirect?this.getExports(r.mappingRequire,r.mappingRedirect):r.exports}},getModule:{value:function(e,t){var r,n,i=this._objectRequires;return r=i&&t in i?i[t]:this._require,n=this.getExports(r,e),n||(n=r.async(e)),n}}}),f=t.MontageReviver=r.specialize.call(n,{moduleLoader:{value:null},init:{value:function(e,t){return this.moduleLoader=(new c).init(e,t),this}},getTypeOf:{value:function(e){if(null!==e&&"object"==typeof e&&1===Object.keys(e).length){if("#"in e)return"Element";if("%"in e)return"Module"}return n.prototype.getTypeOf.call(this,e)}},_checkLabel:{value:function(e,t){return t&&":"!==e[0]?Error('Aliases can only be defined in template properties (start with a colon (:)), "'+e+'".'):t||":"!==e[0]?void 0:Error('Only aliases are allowed as template properties (start with a colon (:), "'+e+'".')}},reviveRootObject:{value:function(e,t,r){var i,a="alias"in e;return i=this._checkLabel(r,a),i?l.reject(i):n.prototype.reviveRootObject.apply(this,arguments)}},reviveElement:{value:function(e,t,r){var n=e["#"],i=t.getElementById(n);return i?(r&&t.setObjectLabel(i,r),i):l.reject(Error("Element with id '"+n+"' was not found."))}},reviveModule:{value:function(e,t){var r=e["%"],n=t.getRequire();r=n.resolve(r);var i=n.getModuleDescriptor(r);return(new o).initWithIdAndRequire(i.id,i.require)}},reviveCustomObject:{value:function(e,t,r){return"alias"in e?this.reviveAlias(e,t,r):this.reviveMontageObject(e,t,r)}},reviveMontageObject:{value:function(e,t,r){var n,i,a,s=this,o=e.prototype||e.object;return o&&(i=f.parseObjectLocationId(o),n=this.moduleLoader.getModule(i.moduleId,r),a=i.objectName),l.isPromise(n)?n.then(function(n){return s.instantiateMontageObject(e,n,a,t,r)},function(t){throw t.stack&&console.error(t.stack),Error('Error deserializing "'+r+'" when loading module "'+i.moduleId+"' from '"+e.prototype+"'")}):this.instantiateMontageObject(e,n,a,t,r)}},instantiateMontageObject:{value:function(e,t,r,n,i){var a,s,o=this;return a=this.getMontageObject(e,t,r,n,i),n.setObjectLabel(a,i),a.isDeserializing=!0,s=this.reviveObjectLiteral(e,n),l.isPromise(s)?s.then(function(e){return o.deserializeMontageObject(e,a,n,i)}):this.deserializeMontageObject(s,a,n,i)}},deserializeMontageObject:{value:function(e,t,r,n){var i;return"function"==typeof t.deserializeSelf?this.deserializeCustomMontageObject(t,e,r,n):(r.setUnitsToDeserialize(t,e,f._unitNames),i=this.deserializeMontageObjectProperties(t,e.properties,r),l.isPromise(i)?i.then(function(){return t}):t)}},deserializeMontageObjectProperties:{value:function(e,t,r){var n;if("function"==typeof e.deserializeProperties){var a=(new i).initWithReviverAndObjects(this,r);n=e.deserializeProperties(a)}else for(var s in t)e[s]=t[s];return n}},deserializeCustomMontageObject:{value:function(e,t,r,n){var i,s=(new a).initWithObjectAndObjectDescriptorAndContextAndUnitNames(e,t,r,f._unitNames);return i=e.deserializeSelf(s),l.isPromise(i)?i.then(function(e){return r.setObjectLabel(e,n),e}):i!==void 0?(r.setObjectLabel(i,n),i):e}},getMontageObject:{value:function(e,t,r,n,i){var a;if(n.hasUserObject(i))return n.getUserObject(i);if("prototype"in e){if(!(r in t))throw Error('Error deserializing "'+i+'": object named "'+r+'"'+' was not found in "'+e.prototype+'".'+" Available objects are: "+Object.keys(t)+".");return a=Object.create(t[r].prototype),a.isDeserializing=!0,"function"==typeof a.didCreate?a.didCreate():"function"==typeof a.constructor&&a.constructor(),a}if("object"in e){if(!(r in t))throw Error('Error deserializing "'+i+'": object named "'+a+"' was not found given '"+e.object+"'");return t[r]}throw Error("Error deserializing "+JSON.stringify(e)+', might need "prototype" or "object" on label '+JSON.stringify(i))}},reviveAlias:{value:function(e,t,r){var n=new u;return n.value=e.alias,t.setObjectLabel(n,r),n}},didReviveObjects:{value:function(e,t){var r,n=this;return r=this._deserializeUnits(t),l.isPromise(r)?r.then(function(){n._invokeDeserializedFromSerialization(e,t)}):(this._invokeDeserializedFromSerialization(e,t),void 0)}},_invokeDeserializedFromSerialization:{value:function(e,t){var r;for(var n in e)r=e[n],null!=r&&delete r.isDeserializing,t.hasUserObject(n)||r&&"function"==typeof r.deserializedFromSerialization&&r.deserializedFromSerialization(n)}},_deserializeUnits:{value:function(e){var t,r,n=e.getUnitsToDeserialize(),i=f._unitRevivers;try{for(var a,o=0;a=n[o];o++){t=a.unitNames;for(var u,c=0;u=t[c];c++)u in a.objectDesc&&(r=(new s).initWithContext(e),i[u](r,a.object,a.objectDesc[u]))}}catch(d){return l.reject(d)}}}},{_unitRevivers:{value:Object.create(null)},_unitNames:{value:[]},_findObjectNameRegExp:{value:/([^\/]+?)(\.reel)?$/},_toCamelCaseRegExp:{value:/(?:^|-)([^-])/g},_replaceToCamelCase:{value:function(e,t){return t.toUpperCase()}},_locationDescCache:{value:Object.create(null)},parseObjectLocationId:{value:function(e){var t,r,n,i,a=this._locationDescCache;return e in a?t=a[e]:(r=e.indexOf("["),r>0?(n=e.substr(0,r),i=e.slice(r+1,-1)):(n=e,this._findObjectNameRegExp.test(e),i=RegExp.$1.replace(this._toCamelCaseRegExp,this._replaceToCamelCase)),t={moduleId:n,objectName:i},a[e]=t),t}},defineUnitReviver:{value:function(e,t){this._unitRevivers[e]=t,this._unitNames.push(e)}},getTypeOf:{value:function(e){return this.prototype.getTypeOf.call(this,e)}}});t!==void 0&&(t.MontageReviver=f)}});