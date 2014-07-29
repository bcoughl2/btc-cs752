montageDefine("3c07db4","ui/base/abstract-link",{dependencies:["../../core/core","./abstract-control","../../composer/press-composer"],factory:function(e,t){var r=(e("../../core/core").Montage,e("./abstract-control").AbstractControl),n=e("../../composer/press-composer").PressComposer,i=t.AbstractLink=r.specialize({constructor:{value:function i(){if(this.constructor===i)throw Error("AbstractLink cannot be instantiated.");r.constructor.call(this),this._pressComposer=new n,this.addComposer(this._pressComposer),this.defineBindings({"classList.has('montage--disabled')":{"<-":"!enabled"},"classList.has('montage--active')":{"<-":"active"}})}},hasTemplate:{value:!1},active:{value:!1},enabled:{value:!0},_pressComposer:{value:null},_url:{value:null},url:{set:function(e){this._url=e,this.needsDraw=!0},get:function(){return this._url}},_label:{value:null},label:{set:function(e){this._label=e,this.needsDraw=!0},get:function(){return this._label}},_textAlternative:{value:null},textAlternative:{set:function(e){this._textAlternative=e,this.needsDraw=!0},get:function(){return this._textAlternative}},_opensNewWindow:{value:null},opensNewWindow:{set:function(e){this._opensNewWindow=e,this.needsDraw=!0},get:function(){return this._opensNewWindow}},enterDocument:{value:function(e){e&&(this.hasOwnProperty("_label")||(this.label=this.element.textContent))}},handlePressStart:{value:function(e){this.active=!0,e.touch&&document.addEventListener("touchmove",this,!1)}},handlePress:{value:function(){this.active=!1,this.enabled&&this.dispatchActionEvent()}},handlePressCancel:{value:function(){this.active=!1,document.removeEventListener("touchmove",this,!1)}},prepareForActivationEvents:{value:function(){this._pressComposer.addEventListener("pressStart",this,!1),this._pressComposer.addEventListener("press",this,!1),this._pressComposer.addEventListener("pressCancel",this,!1)}}})}});