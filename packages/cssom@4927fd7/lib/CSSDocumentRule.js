var CSSOM={CSSRule:require("./CSSRule").CSSRule,MatcherList:require("./MatcherList").MatcherList};CSSOM.CSSDocumentRule=function(){CSSOM.CSSRule.call(this),this.matcher=new CSSOM.MatcherList,this.cssRules=[]},CSSOM.CSSDocumentRule.prototype=new CSSOM.CSSRule,CSSOM.CSSDocumentRule.prototype.constructor=CSSOM.CSSDocumentRule,CSSOM.CSSDocumentRule.prototype.type=10,Object.defineProperty(CSSOM.CSSDocumentRule.prototype,"cssText",{get:function(){for(var e=[],t=0,n=this.cssRules.length;n>t;t++)e.push(this.cssRules[t].cssText);return"@-moz-document "+this.matcher.matcherText+" {"+e.join("")+"}"}}),exports.CSSDocumentRule=CSSOM.CSSDocumentRule;