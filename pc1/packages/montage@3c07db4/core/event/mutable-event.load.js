montageDefine("3c07db4","core/event/mutable-event",{dependencies:["../core"],factory:function(e,t){var i=e("../core").Montage;if("undefined"!=typeof window){var r={},n=function(e,t){var r="_"+t;i.defineProperty(e,r,{value:void 0}),i.defineProperty(e,t,{get:function(e,t){return function(){return this.hasOwnProperty(t)?this[t]:this._event?this._event[e]:void 0}}(t,r),set:function(e){return function(t){this[e]=t}}(r)})};t.MutableEvent=i.specialize({_initPrototypeWithEvent:{value:function(e){var t;for(t in e)this[t]||n(this,t);return n(this,"replayed"),this}},_initWithEvent:{value:function(e){return this._event=e,this}},preventDefault:{value:function(){this._event.preventDefault()}},getPreventDefault:{value:function(){return this._event.getPreventDefault?this._event.getPreventDefault():this._event.defaultPrevented}},stopImmediatePropagation:{value:function(){this._event.stopImmediatePropagation(),this.propagationStopped=!0,this.immediatePropagationStopped=!0}},propagationStopped:{value:!1},immediatePropagationStopped:{value:!1},mutable:{value:!0},target:{value:null},stopPropagation:{value:function(){this._event.stopPropagation(),this.propagationStopped=!0}},stop:{value:function(){this.preventDefault(),this.stopPropagation()}}},{fromEvent:{value:function(e){var i,n=e.type,s=r[n];return s||(s=function(){},s.prototype=(new t.MutableEvent)._initPrototypeWithEvent(e),r[n]=s),i=new s,i._initWithEvent(e),i}},fromType:{value:function(e,t,i,r){var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t,i,r),this.fromEvent(n)}}})}}});