montageDefine("3c07db4","core/gate",{dependencies:["./core","./logger"],factory:function(e,t){var i=e("./core").Montage,r=e("./logger").logger("gate");t.Gate=i.specialize({constructor:{value:function(){this.super()}},init:{enumerable:!1,value:function(){return this.reset(),this}},initWithDelegate:{enumerable:!1,value:function(e){return this.reset(),this.delegate=e,this}},initWithDescriptor:{enumerable:!1,value:function(e){var t;this.reset();for(t in e)this.setField(t,e[t].value);return this}},count:{value:0},table:{value:null},getField:{enumerable:!1,value:function(e){var t=this.table;return!t||t[e]}},setField:{enumerable:!1,value:function(e,t){var i,n=this.table,s=this.count;n=n?n:this.table={},i=n[e],void 0!==i||t?i!==void 0&&i!==t?t?this.count--:this.count++:t&&r.isDebug&&r.debug(this,e+" was not set before."):this.count++,n[e]=!!t,0===this.count&&s>0?this.callDelegateMethod(!0):0===s&&this.count>0&&this.callDelegateMethod(!1)}},removeField:{enumerable:!1,value:function(e){var t=this.table,i=t[e];void 0===i||i||this.count--,delete t[e]}},delegate:{enumerable:!1,value:null},callDelegateMethod:{value:function(e){var t;this.delegate&&"function"==typeof(t=this.delegate["gateDidBecome"+(e?"True":"False")])&&t.call(this.delegate,this)},enumerable:!1},value:{enumerable:!1,get:function(){return 0===this.count}},reset:{enumerable:!1,value:function(){this.table={},this.count=0}},toString:{value:function(){var e,t,i=this._fields,r="";for(e=0;t=i[e];e++)r+=t+"["+(this._value&i[t])+"], ";return r}}})}});