montageDefine("3c07db4","core/target",{dependencies:["./core","./event/event-manager","./event/mutable-event"],factory:function(e,t){var r=e("./core").Montage,i=e("./event/event-manager").defaultEventManager,n=e("./event/mutable-event").MutableEvent;t.Target=r.specialize({constructor:{value:function(){this.super()}},acceptsActiveTarget:{serializable:!1,value:!1},isActiveTarget:{get:function(){return this===i.activeTarget}},willBecomeActiveTarget:{value:Function.noop},didBecomeActiveTarget:{value:Function.noop},surrendersActiveTarget:{value:function(){return!0}},nextTarget:{serializable:!1,value:null},dispatchEvent:{value:function(e){var t=e;return e instanceof n||(t=n.fromEvent(t)),t.target=this,i.handleEvent(t),!e.defaultPrevented}},dispatchEventNamed:{value:function(e,t,r,a){var s=n.fromType(e,t,r,a);return s.target=this,i.handleEvent(s),!s.defaultPrevented}},addEventListener:{value:function(e,t,r){t&&i.registerEventListener(this,e,t,r)}},removeEventListener:{value:function(e,t,r){t&&i.unregisterEventListener(this,e,t,r)}}})}});