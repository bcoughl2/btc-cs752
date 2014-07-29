"use strict";function Dict(e,t){return this instanceof Dict?(t=t||Function.noop,this.getDefault=t,this.store={},this.length=0,this.addEach(e),void 0):new Dict(e,t)}function mangle(e){return"~"+e}function unmangle(e){return e.slice(1)}var Shim=require("./shim"),GenericCollection=require("./generic-collection"),GenericMap=require("./generic-map"),PropertyChanges=require("./listen/property-changes");module.exports=Dict,Dict.Dict=Dict,Object.addEach(Dict.prototype,GenericCollection.prototype),Object.addEach(Dict.prototype,GenericMap.prototype),Object.addEach(Dict.prototype,PropertyChanges.prototype),Dict.prototype.constructClone=function(e){return new this.constructor(e,this.mangle,this.getDefault)},Dict.prototype.assertString=function(e){if("string"!=typeof e)throw new TypeError("key must be a string but Got "+e)},Dict.prototype.get=function(e,t){this.assertString(e);var n=mangle(e);return n in this.store?this.store[n]:arguments.length>1?t:this.getDefault(e)},Dict.prototype.set=function(e,t){this.assertString(e);var n=mangle(e);return n in this.store?(this.dispatchesBeforeMapChanges&&this.dispatchBeforeMapChange(e,this.store[n]),this.store[n]=t,this.dispatchesMapChanges&&this.dispatchMapChange(e,t),!1):(this.dispatchesMapChanges&&this.dispatchBeforeMapChange(e,void 0),this.length++,this.store[n]=t,this.dispatchesMapChanges&&this.dispatchMapChange(e,t),!0)},Dict.prototype.has=function(e){this.assertString(e);var t=mangle(e);return t in this.store},Dict.prototype["delete"]=function(e){this.assertString(e);var t=mangle(e);return t in this.store?(this.dispatchesMapChanges&&this.dispatchBeforeMapChange(e,this.store[t]),delete this.store[mangle(e)],this.length--,this.dispatchesMapChanges&&this.dispatchMapChange(e,void 0),!0):!1},Dict.prototype.clear=function(){var e,t;for(t in this.store)e=unmangle(t),this.dispatchesMapChanges&&this.dispatchBeforeMapChange(e,this.store[t]),delete this.store[t],this.dispatchesMapChanges&&this.dispatchMapChange(e,void 0);this.length=0},Dict.prototype.reduce=function(e,t,n){for(var i in this.store)t=e.call(n,t,this.store[i],unmangle(i),this);return t},Dict.prototype.reduceRight=function(e,t,n){var i=this,r=this.store;return Object.keys(this.store).reduceRight(function(t,a){return e.call(n,t,r[a],unmangle(a),i)},t)},Dict.prototype.one=function(){var e;for(e in this.store)return this.store[e]};