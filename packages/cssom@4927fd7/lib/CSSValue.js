var CSSOM={};CSSOM.CSSValue=function(){},CSSOM.CSSValue.prototype={constructor:CSSOM.CSSValue,set cssText(){var e=this._getConstructorName();throw new Exception('DOMException: property "cssText" of "'+e+'" is readonly!')},get cssText(){var e=this._getConstructorName();throw new Exception('getter "cssText" of "'+e+'" is not implemented!')},_getConstructorName:function(){var e=""+this.constructor,t=e.match(/function\s([^\(]+)/),n=t[1];return n}},exports.CSSValue=CSSOM.CSSValue;