montageDefine("3c07db4","core/range-controller",{dependencies:["./core","collections/generic-collection"],factory:function(e,t){var r=e("./core").Montage,n=e("collections/generic-collection"),i=function(e,t){var r=e.clone();r.makeObservable(),r.rangeController=t,r.contentEquals=e&&e.contentEquals||Object.is,Object.defineProperty(r,"clone",{value:function(){return r.slice()}});var n=r.splice;return Object.defineProperty(r,"splice",{configurable:!1,value:function(e,t){var r=this.rangeController.content;this.contentEquals=r&&r.contentEquals||Object.is,e=e>=0?e:this.length+e;var i=this.length,a=Math.min(t,i-e),s=[].slice.call(arguments,2);s.contentEquals=this.contentEquals;var o,u=s.filter(function(t,n){if(r&&!r.has(t))return!1;if(s.findLast(t)>n)return!1;var i=this.find(t);return 0>i||i>=e&&e+a>i},this),l=Math.max(u.length,0),c=l-a,d=Math.max(i+c,e+l);if(!this.rangeController.multiSelect&&d>1){var f=l?u[l-1]:this.one();o=[0,i,f]}else o=this.rangeController.avoidsEmptySelection&&0===d?r.has(this[0])?[1,this.length-1]:[0,this.length,r.one()]:[e,t].concat(u);return n.apply(this,o)}}),r};t.RangeController=r.specialize({constructor:{value:function(e){this.content=null,this._selection=new i([],this),this.sortPath=null,this.filterPath=null,this.visibleIndexes=null,this.reversed=!1,this.start=null,this.length=null,this.selectAddedContent=!1,this.deselectInvisibleContent=!1,this.clearSelectionOnOrderChange=!1,this.avoidsEmptySelection=!1,this.multiSelect=!1,this.organizedContent=[],this.organizedContent.addRangeChangeListener(this,"organizedContent"),this.defineBinding("_orderedContent",{"<-":"content.($filterPath.defined() ? filter{path($filterPath)} : ()).($sortPath.defined() ? sorted{path($sortPath)} : ()).($reversed ?? 0 ? reversed() : ())"}),this.defineBinding("organizedContent.rangeContent()",{"<-":"_orderedContent.($visibleIndexes.defined() ?$visibleIndexes.filter{<$_orderedContent.length}.map{$_orderedContent[()]} : ()).($start.defined() && $length.defined() ?view($start, $length) : ())"}),this.addRangeAtPathChangeListener("content",this,"handleContentRangeChange"),this.addPathChangeListener("sortPath",this,"handleOrderChange"),this.addPathChangeListener("reversed",this,"handleOrderChange"),this.addOwnPropertyChangeListener("multiSelect",this),this.iterations=[],e&&this.initWithContent(e)}},initWithContent:{value:function(e){return this.content=e,this}},sortPath:{value:null},reversed:{value:null},filterPath:{value:null},visibleIndexes:{value:null},start:{value:null},length:{value:null},selectAddedContent:{value:!1},deselectInvisibleContent:{value:!1},clearSelectionOnOrderChange:{value:!1},avoidsEmptySelection:{value:!1},multiSelect:{value:!1},_orderedContent:{value:null},organizedContent:{value:null},iterations:{value:null},_selection:{value:null},selection:{get:function(){return this._selection},set:function(e){var t=[0,this._selection.length];e&&e.toArray&&(t=t.concat(e.toArray())),this._selection.splice.apply(this._selection,t)}},select:{value:function(e){!this.multiSelect&&this.selection.length>=1&&this.selection.clear(),this.selection.add(e)}},deselect:{value:function(e){(!this.avoidsEmptySelection||this.selection.length>1)&&this.selection["delete"](e)}},clearSelection:{value:function(){(!this.avoidsEmptySelection||this.selection.length>1)&&this.selection.clear()}},add:{value:function(e){var t;return this.content||(this.content=[]),t=this.content.add(e),t&&this.handleAdd(e),t}},push:{value:function(){for(var e=this.content.push.apply(this.content,arguments),t=0;arguments.length>t;t++)this.handleAdd(arguments[t]);return e}},pop:{value:function(){return this.content.pop()}},shift:{value:function(){return this.content.shift()}},unshift:{value:function(){for(var e=this.content.unshift.apply(this.content,arguments),t=0;arguments.length>t;t++)this.handleAdd(arguments[t]);return e}},splice:{value:function(){for(var e=this.content.splice.apply(this.content,arguments),t=2;arguments.length>t;t++)this.handleAdd(arguments[t]);return e}},swap:{value:function(e,t,r){var n=this.content.swap.apply(this.content,arguments);if(r)for(var e=2;r.length>e;e++)this.handleAdd(r[e]);return n}},"delete":{value:function(e){return this.content["delete"](e)}},has:{value:function(e){return this.content?this.content.has(e):!1}},addEach:{value:n.prototype.addEach},deleteEach:{value:n.prototype.deleteEach},clear:{value:function(){this.content.clear()}},addContent:{value:function(){var e=new this.contentConstructor;return this.add(e),e}},_contentConstructor:{value:null},contentConstructor:{get:function(){return this._contentConstructor?this._contentConstructor:this.content&&this.content.contentConstructor?this.content.contentConstructor:Object},set:function(e){this._contentConstructor=e}},handleContentRangeChange:{value:function(e,t){if(this.selection.length>0){var r=this.content&&this.content.contentEquals||Object.is;t.deleteEach(e,r),this.selection&&this.selection.deleteEach(t)}}},handleSelectionRangeChange:{value:function(e,t){if(this.selection)if(this.content){for(var r=[],n=0;e.length>n;n++)this.content.has(e[n])||r.push(e[n]);if(this._selection.deleteEach(r),!this.multiSelect&&this._selection.length>1){var i=this._selection.pop();this._selection.clear(),this._selection.add(i)}this.avoidsEmptySelection&&0==this._selection.length&&this._selection.add(t[0])}else this._selection.clear()}},handleOrganizedContentRangeChange:{value:function(e,t){if(this.deselectInvisibleContent&&this.selection){var r=t.clone(1);r.deleteEach(e),this.selection.deleteEach(t)}}},handleOrderChange:{value:function(){this.clearSelectionOnOrderChange&&this.selection&&this.selection.clear()}},handleAdd:{value:function(e){this.selectAddedContent&&this.selection&&(!this.multiSelect&&this.selection.length>=1&&this.selection.clear(),this.selection.add(e))}},handleMultiSelectChange:{value:function(){if(this.selection){var e=this.selection.length;if(!this.multiSelect&&e>1){var t=this._selection.pop();this._selection.clear(),this._selection.add(t)}}}}},{blueprintModuleId:e("./core")._blueprintModuleIdDescriptor,blueprint:e("./core")._blueprintDescriptor})}});