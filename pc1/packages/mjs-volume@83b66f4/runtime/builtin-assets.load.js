montageDefine("83b66f4","runtime/builtin-assets",{dependencies:["q","runtime/runtime-tf-loader"],factory:function(e,t){var n=e("q"),i=e("runtime/runtime-tf-loader").RuntimeTFLoader;t.BuiltInAssets=Object.create(Object.prototype,{_deferredForName:{value:{},writable:!0},_assetInfos:{value:{},writable:!0},registerBuiltinAssetsIfNeeded:{value:function(){var t=e.location+"assets/picking/picking.json",n=e.location+"assets/gradient/gradient.json";this._assetInfos.pickingTechnique={location:t,options:{ids:["pickingTechnique"]}},this._assetInfos.gradient={location:n}}},assetInfosForName:{value:function(e){return this.registerBuiltinAssetsIfNeeded(),this._assetInfos[e]}},assetWithName:{value:function(e){var t=this._deferredForName[e];if(!t){t=n.defer(),this._deferredForName[e]=t;var r={};r.loadCompleted=function(e){t.resolve(e)}.bind(this);var a=Object.create(i),s=this.assetInfosForName(e);s?(a.initWithPath(s.location),a.delegate=r,a.load(null,s.options)):t.reject("ERROR:"+e+" isn't registered as a built-in asset")}return t.promise}}})}});