montageDefine("4927fd7","lib/CSSValue",{dependencies:[],factory:function(e,t){var n={};n.CSSValue=function(){},n.CSSValue.prototype={constructor:n.CSSValue,set cssText(){var e=this._getConstructorName();throw new Exception('DOMException: property "cssText" of "'+e+'" is readonly!')},get cssText(){var e=this._getConstructorName();throw new Exception('getter "cssText" of "'+e+'" is not implemented!')},_getConstructorName:function(){var e=""+this.constructor,t=e.match(/function\s([^\(]+)/),n=t[1];return n}},t.CSSValue=n.CSSValue}});