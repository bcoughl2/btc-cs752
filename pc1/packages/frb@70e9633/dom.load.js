montageDefine("70e9633","dom",{dependencies:["collections/listen/property-changes"],factory:function(e){function t(e){s.dispatchOwnPropertyChange(e.target,"checked",e.target.checked)}function n(e){s.dispatchOwnPropertyChange(e.target,"value",e.target.value)}function i(e){s.dispatchOwnPropertyChange(e.target,"innerHTML",e.target.innerHTML),s.dispatchOwnPropertyChange(e.target,"innerText",e.target.innerText),s.dispatchOwnPropertyChange(e.target,"value",e.target.innerText)}function r(e){"checked"===e?this.addEventListener("change",t):"value"===e&&(this.addEventListener("change",n),"text"===this.type||"TEXTAREA"===this.nodeName?this.addEventListener("keyup",n):this.contentEditable&&(this.innerText=this.innerText?this.innerText:this.value,this.addEventListener("keyup",i)))}function a(e){"checked"===e?this.removeEventListener("change",t):"value"===e&&(this.removeEventListener("change",n),"text"===this.type||"TEXTAREA"===this.nodeName?this.removeEventListener("keyup",n):this.contentEditable&&this.removeEventListener("keyup",i))}var s=e("collections/listen/property-changes"),o=Object.getPrototypeOf(document.createElement("input"));o.makePropertyObservable=r,o.makePropertyUnobservable=a;var l=Object.getPrototypeOf(document.createElement("textarea"));l.makePropertyObservable=r,l.makePropertyUnobservable=a;var c=Object.getPrototypeOf(document.createElement("span"));c.makePropertyObservable=r,c.makePropertyUnobservable=a}});