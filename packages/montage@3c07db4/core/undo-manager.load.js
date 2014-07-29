montageDefine("3c07db4","core/undo-manager",{dependencies:["./core","./target","./promise","collections/map","collections/list"],factory:function(e,t){var r=e("./core").Montage,i=e("./target").Target,n=e("./promise").Promise,a=e("collections/map"),o=e("collections/list"),s=0,l=1,u=t.UndoManager=i.specialize({_operationQueue:{value:null},_promiseOperationMap:{value:null},constructor:{value:function u(){this._operationQueue=[],this._promiseOperationMap=new a,this._undoStack=new o,this._redoStack=new o,this._batchStack=new o,this.defineBinding("undoLabel",{"<-":"undoEntry.label || _promiseOperationMap.get(_undoStack.head.prev.value).label"}),this.defineBinding("undoCount",{"<-":"length",source:this._undoStack}),this.defineBinding("canUndo",{"<-":"!!length",source:this._undoStack}),this.defineBinding("isUndoing",{"<-":"!!undoEntry"}),this.defineBinding("redoLabel",{"<-":"redoEntry.label || _promiseOperationMap.get(_redoStack.head.prev.value).label"}),this.defineBinding("redoCount",{"<-":"length",source:this._redoStack}),this.defineBinding("canRedo",{"<-":"!!length",source:this._redoStack}),this.defineBinding("isRedoing",{"<-":"!!redoEntry"}),this.defineBinding("currentBatch",{"<-":"_batchStack.head.prev.value"})}},_maxUndoCount:{enumerable:!1,value:null},maxUndoCount:{get:function(){return this._maxUndoCount},set:function(e){e!==this._maxUndoCount&&(this._maxUndoCount=e,null!=this._maxUndoCount&&this._trimStacks())}},_undoStack:{value:null},undoCount:{value:0},_redoStack:{value:null},redoCount:{value:0},_trimStacks:{enumerable:!1,value:function(){var e=this._undoStack.length-this._maxUndoCount,t=this._redoStack.length-this._maxUndoCount;e>0&&this._undoStack.splice(0,e),t>0&&this._redoStack.splice(0,t)}},registrationEnabled:{value:!0},_batchStack:{value:null},currentBatch:{value:null},openBatch:{value:function(e){var t={};t.label=e,t.promisedOperations=[],this._batchStack.push(t)}},closeBatch:{value:function(){if(!this.currentBatch)throw Error("No batch operation to close");var e,t=this.currentBatch.label,r=this.currentBatch.promisedOperations,i=[],a=function(){e=Object.create(null),this.openBatch(t);var r=i.reduceRight(function(t,r){return t.then(function(){return s._resolveUndoEntry(e,r),e.undoFunction.apply(e.context,e.args)})},n.resolve());return r.finally(function(){s.closeBatch()})},o=r.reduce(function(e,t){return e.then(function(e){return e&&i.push(e),t})},n.resolve());this._batchStack.pop();var s=this;this.register(t,o.then(function(e){return i.push(e),[a,s]}))}},register:{value:function(e,t){var r,i=this;if(!n.isPromiseAlike(t))throw Error("UndoManager expected a promise");if(0===this._maxUndoCount||!this.registrationEnabled)return n.resolve(null);if(this.currentBatch)this.currentBatch.promisedOperations.push(t),r=t;else{var a={label:e};this._promiseOperationMap.set(t,a),this.isUndoing?(a.label=this.undoLabel,this._redoStack.length===this._maxUndoCount&&this._redoStack.shift(),this._redoStack.push(t)):(this._undoStack.length===this._maxUndoCount&&this._undoStack.shift(),this._undoStack.push(t),!this.isRedoing&&this._redoStack.length>0&&this.clearRedo()),this.isUndoing||this.isRedoing||this.dispatchEventNamed("operationRegistered",!0,!1),r=t.then(function(e){return i._resolveUndoEntry(a,e),a}).then(function(){return i._flushOperationQueue()})}return r}},_resolveUndoEntry:{value:function(e,t){var r,i,n,a;if("string"==typeof t[0]?(r=t[0],i=t[1],n=t[2],a=3):(i=t[0],n=t[1],a=2),r&&(e.label=r),"function"!=typeof i)throw Error("Need undo function for '"+e.label+"' operation, not: "+i);e.undoFunction=i,e.context=n,e.args=t.slice(a)}},_flushOperationQueue:{value:function(){var e,t=this._operationQueue,r=t.length,i=[],a=this._promiseOperationMap,o=this;if(0!==r){var s=!1,l=t.reduce(function(e,t){var r=o._promiseOperationMap.get(t);return s||"function"!=typeof r.undoFunction?(s=!0,e):(i.push(t),e.then(function(){return o._performOperation(r)}).then(function(){a.delete(t)}))},n.resolve());return e=i.length,e>0&&t.splice(0,e),l}}},_performOperation:{value:function(e){var t=this;e.operationType===s?this.undoEntry=e:this.redoEntry=e;var r;try{r=e.undoFunction.apply(e.context,e.args)}catch(i){throw e.deferredOperation.reject(i),i}return n.isPromiseAlike(r)?r.finally(function(){t.undoEntry=null,t.redoEntry=null}).then(function(t){e.deferredOperation.resolve(t)},function(t){e.deferredOperation.reject(t)}):(this.undoEntry=null,this.redoEntry=null,e.deferredOperation.resolve(r),void 0)}},clearUndo:{value:function(){this._undoStack.splice(0,this._undoStack.length)}},clearRedo:{value:function(){this._redoStack.splice(0,this._redoStack.length)}},isUndoing:{value:!1},isRedoing:{value:!1},undoEntry:{enumerable:!1,value:null},redoEntry:{enumerable:!1,value:null},undo:{value:function(){if(0===this.undoCount)return n.resolve(null);var e=this;return this._scheduleOperation(this._undoStack.pop(),s).then(function(t){return e.dispatchEventNamed("undo",!0,!1,t),t})}},redo:{value:function(){if(0===this.redoCount)return n.resolve(null);var e=this;return this._scheduleOperation(this._redoStack.pop(),l).then(function(t){return e.dispatchEventNamed("redo",!0,!1),t})}},_scheduleOperation:{value:function(e,t){var r=n.defer(),i=this._promiseOperationMap.get(e);return i.deferredOperation=r,i.operationType=t,this._operationQueue.push(e),this._flushOperationQueue().thenResolve(r.promise)}},canUndo:{value:null},canRedo:{value:null},undoLabel:{value:null},redoLabel:{value:null}}),c=null;r.defineProperty(t,"defaultUndoManager",{get:function(){return c||(c=new u),c}})}});