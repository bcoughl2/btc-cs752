(function(e){function t(e,n){var r;if(e&&n&&(t.locale[e]=n),r=e=e||"en",n=n||t.locale[r=t.Utils.getFallbackLocale(e)],!n)throw Error("Plural Function not found for locale: "+e);this.pluralFunc=n,this.locale=e,this.fallbackLocale=r}t.locale={en:function(e){return 1===e?"one":"other"}},t.SafeString=function(e){this.string=e},t.SafeString.prototype.toString=function(){return""+this.string},t.Utils={numSub:function(e,t,n){return e.replace(/^#|[^\\]#/g,function(e){var r=e&&2===e.length?e.charAt(0):"";return r+'" + (function(){ var x = '+t+';\nif( isNaN(x) ){\nthrow new Error("MessageFormat: `"+lastkey_'+n+'+"` isnt a number.");\n}\nreturn x;\n})() + "'})},escapeExpression:function(e){var n={"\n":"\\n",'"':'\\"'},r=/[\n"]/g,i=/[\n"]/,a=function(e){return n[e]||"&amp;"};return e instanceof t.SafeString?""+e:null===e||e===!1?"":i.test(e)?e.replace(r,a):e},getFallbackLocale:function(e){for(var n=e.indexOf("-")>=0?"-":"_";!t.locale.hasOwnProperty(e);)if(e=e.substring(0,e.lastIndexOf(n)),0===e.length)return null;return e}};var n=function(){var e={parse:function(e,t){function n(e,t,n){for(var r=e,i=n-e.length,a=0;i>a;a++)r=t+r;return r}function r(e){var t=e.charCodeAt(0);if(255>=t)var r="x",i=2;else var r="u",i=4;return"\\"+r+n(t.toString(16).toUpperCase(),"0",i)}function i(e){return'"'+e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/[\x80-\uFFFF]/g,r)+'"'}function a(e){C>T||(T>C&&(C=T,L=[]),L.push(e))}function s(){var e="start@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=T,r=o(),i=null!==r?function(e){return{type:"program",program:e}}(r):null;if(null!==i)var a=i;else{var a=null;T=n}return V[e]={nextPos:T,result:a},a}function o(){var e="messageFormatPattern@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=T,r=T,i=g();if(null!==i){for(var a=[],s=u();null!==s;){a.push(s);var s=u()}if(null!==a)var o=[i,a];else{var o=null;T=r}}else{var o=null;T=r}var l=null!==o?function(e,t){var n=[];e&&e.val&&n.push(e);for(var r in t)t.hasOwnProperty(r)&&n.push(t[r]);return{type:"messageFormatPattern",statements:n}}(o[0],o[1]):null;if(null!==l)var c=l;else{var c=null;T=n}return V[e]={nextPos:T,result:c},c}function u(){var t="messageFormatPatternRight@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T,i=T;if("{"===e.substr(T,1)){var s="{";T+=1}else{var s=null;x&&a('"{"')}if(null!==s){var o=D();if(null!==o){var u=l();if(null!==u){var c=D();if(null!==c){if("}"===e.substr(T,1)){var f="}";T+=1}else{var f=null;x&&a('"}"')}if(null!==f){var d=g();if(null!==d)var h=[s,o,u,c,f,d];else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}var m=null!==h?function(e,t){var n=[];return e&&n.push(e),t&&t.val&&n.push(t),{type:"messageFormatPatternRight",statements:n}}(h[2],h[5]):null;if(null!==m)var p=m;else{var p=null;T=r}return V[t]={nextPos:T,result:p},p}function l(){var t="messageFormatElement@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T,i=T,s=y();if(null!==s){var o=T;if(","===e.substr(T,1)){var u=",";T+=1}else{var u=null;x&&a('","')}if(null!==u){var l=c();if(null!==l)var f=[u,l];else{var f=null;T=o}}else{var f=null;T=o}var d=null!==f?f:"";if(null!==d)var h=[s,d];else{var h=null;T=i}}else{var h=null;T=i}var m=null!==h?function(e,t){var n={type:"messageFormatElement",argumentIndex:e};return t&&t.length?n.elementFormat=t[1]:n.output=!0,n}(h[0],h[1]):null;if(null!==m)var p=m;else{var p=null;T=r}return V[t]={nextPos:T,result:p},p}function c(){var t="elementFormat@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T,i=T,s=D();if(null!==s){if("plural"===e.substr(T,6)){var o="plural";T+=6}else{var o=null;x&&a('"plural"')}if(null!==o){var u=D();if(null!==u){if(","===e.substr(T,1)){var l=",";T+=1}else{var l=null;x&&a('","')}if(null!==l){var c=D();if(null!==c){var h=f();if(null!==h){var m=D();if(null!==m)var p=[s,o,u,l,c,h,m];else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}var v=null!==p?function(e,t){return{type:"elementFormat",key:e,val:t.val}}(p[1],p[5]):null;if(null!==v)var b=v;else{var b=null;T=r}if(null!==b)var g=b;else{var y=T,_=T,w=D();if(null!==w){if("select"===e.substr(T,6)){var E="select";T+=6}else{var E=null;x&&a('"select"')}if(null!==E){var O=D();if(null!==O){if(","===e.substr(T,1)){var I=",";T+=1}else{var I=null;x&&a('","')}if(null!==I){var M=D();if(null!==M){var S=d();if(null!==S){var P=D();if(null!==P)var C=[w,E,O,I,M,S,P];else{var C=null;T=_}}else{var C=null;T=_}}else{var C=null;T=_}}else{var C=null;T=_}}else{var C=null;T=_}}else{var C=null;T=_}}else{var C=null;T=_}var L=null!==C?function(e,t){return{type:"elementFormat",key:e,val:t.val}}(C[1],C[5]):null;if(null!==L)var A=L;else{var A=null;T=y}if(null!==A)var g=A;else var g=null}return V[t]={nextPos:T,result:g},g}function f(){var e="pluralStyle@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=T,r=h(),i=null!==r?function(e){return{type:"pluralStyle",val:e}}(r):null;if(null!==i)var a=i;else{var a=null;T=n}return V[e]={nextPos:T,result:a},a}function d(){var e="selectStyle@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=T,r=p(),i=null!==r?function(e){return{type:"selectStyle",val:e}}(r):null;if(null!==i)var a=i;else{var a=null;T=n}return V[e]={nextPos:T,result:a},a}function h(){var e="pluralFormatPattern@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=T,r=T,i=m(),a=null!==i?i:"";if(null!==a){for(var s=[],o=v();null!==o;){s.push(o);var o=v()}if(null!==s)var u=[a,s];else{var u=null;T=r}}else{var u=null;T=r}var l=null!==u?function(e,t){var n={type:"pluralFormatPattern",pluralForms:t};return n.offset=e?e:0,n}(u[0],u[1]):null;if(null!==l)var c=l;else{var c=null;T=n}return V[e]={nextPos:T,result:c},c}function m(){var t="offsetPattern@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T,i=T,s=D();if(null!==s){if("offset"===e.substr(T,6)){var o="offset";T+=6}else{var o=null;x&&a('"offset"')}if(null!==o){var u=D();if(null!==u){if(":"===e.substr(T,1)){var l=":";T+=1}else{var l=null;x&&a('":"')}if(null!==l){var c=D();if(null!==c){var f=E();if(null!==f){var d=D();if(null!==d)var h=[s,o,u,l,c,f,d];else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}}else{var h=null;T=i}var m=null!==h?function(e){return e}(h[5]):null;if(null!==m)var p=m;else{var p=null;T=r}return V[t]={nextPos:T,result:p},p}function p(){var e="selectFormatPattern@"+T,t=V[e];if(t)return T=t.nextPos,t.result;for(var n=T,r=[],i=v();null!==i;){r.push(i);var i=v()}var a=null!==r?function(e){return{type:"selectFormatPattern",pluralForms:e}}(r):null;if(null!==a)var s=a;else{var s=null;T=n}return V[e]={nextPos:T,result:s},s}function v(){var t="pluralForms@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T,i=T,s=D();if(null!==s){var u=b();if(null!==u){var l=D();if(null!==l){if("{"===e.substr(T,1)){var c="{";T+=1}else{var c=null;x&&a('"{"')}if(null!==c){var f=D();if(null!==f){var d=o();if(null!==d){var h=D();if(null!==h){if("}"===e.substr(T,1)){var m="}";T+=1}else{var m=null;x&&a('"}"')}if(null!==m)var p=[s,u,l,c,f,d,h,m];else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}}else{var p=null;T=i}var v=null!==p?function(e,t){return{type:"pluralForms",key:e,val:t}}(p[1],p[5]):null;if(null!==v)var g=v;else{var g=null;T=r}return V[t]={nextPos:T,result:g},g}function b(){var t="stringKey@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T,i=y(),s=null!==i?function(e){return e}(i):null;if(null!==s)var o=s;else{var o=null;T=r}if(null!==o)var u=o;else{var l=T,c=T;if("="===e.substr(T,1)){var f="=";T+=1}else{var f=null;x&&a('"="')}if(null!==f){var d=E();if(null!==d)var h=[f,d];else{var h=null;T=c}}else{var h=null;T=c}var m=null!==h?function(e){return e}(h[1]):null;if(null!==m)var p=m;else{var p=null;T=l}if(null!==p)var u=p;else var u=null}return V[t]={nextPos:T,result:u},u}function g(){var e="string@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=T,r=T,i=D();if(null!==i){var a=[],s=T,o=D();if(null!==o){var u=_();if(null!==u){var l=D();if(null!==l)var c=[o,u,l];else{var c=null;T=s}}else{var c=null;T=s}}else{var c=null;T=s}for(;null!==c;){a.push(c);var s=T,o=D();if(null!==o){var u=_();if(null!==u){var l=D();if(null!==l)var c=[o,u,l];else{var c=null;T=s}}else{var c=null;T=s}}else{var c=null;T=s}}if(null!==a)var f=[i,a];else{var f=null;T=r}}else{var f=null;T=r}var d=null!==f?function(e,t){for(var n=[],r=0;t.length>r;++r)for(var i=0;t[r].length>i;++i)n.push(t[r][i]);return{type:"string",val:e+n.join("")}}(f[0],f[1]):null;if(null!==d)var h=d;else{var h=null;T=n}return V[e]={nextPos:T,result:h},h}function y(){var t="id@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T,i=T,s=D();if(null!==s){if(null!==e.substr(T).match(/^[a-zA-Z$_]/)){var o=e.charAt(T);T++}else{var o=null;x&&a("[a-zA-Z$_]")}if(null!==o){var u=[];if(null!==e.substr(T).match(/^[^ 	\n\r,.+={}]/)){var l=e.charAt(T);T++}else{var l=null;x&&a("[^ 	\\n\\r,.+={}]")}for(;null!==l;)if(u.push(l),null!==e.substr(T).match(/^[^ 	\n\r,.+={}]/)){var l=e.charAt(T);T++}else{var l=null;x&&a("[^ 	\\n\\r,.+={}]")}if(null!==u){var c=D();if(null!==c)var f=[s,o,u,c];else{var f=null;T=i}}else{var f=null;T=i}}else{var f=null;T=i}}else{var f=null;T=i}var d=null!==f?function(e,t){return e+(t?t.join(""):"")}(f[1],f[2]):null;if(null!==d)var h=d;else{var h=null;T=r}return V[t]={nextPos:T,result:h},h}function _(){var e="chars@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=T,r=w();if(null!==r)for(var i=[];null!==r;){i.push(r);var r=w()}else var i=null;var a=null!==i?function(e){return e.join("")}(i):null;if(null!==a)var s=a;else{var s=null;T=n}return V[e]={nextPos:T,result:s},s}function w(){var t="char@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T;if(null!==e.substr(T).match(/^[^{}\\\0- 	\n\r]/)){var i=e.charAt(T);T++}else{var i=null;x&&a("[^{}\\\\\\0- 	\\n\\r]")}var s=null!==i?function(e){return e}(i):null;if(null!==s)var o=s;else{var o=null;T=r}if(null!==o)var u=o;else{var l=T;if("\\#"===e.substr(T,2)){var c="\\#";T+=2}else{var c=null;x&&a('"\\\\#"')}var f=null!==c?function(){return"\\#"}():null;if(null!==f)var d=f;else{var d=null;T=l}if(null!==d)var u=d;else{var h=T;if("\\{"===e.substr(T,2)){var m="\\{";T+=2}else{var m=null;x&&a('"\\\\{"')}var p=null!==m?function(){return"{"}():null;if(null!==p)var v=p;else{var v=null;T=h}if(null!==v)var u=v;else{var b=T;if("\\}"===e.substr(T,2)){var g="\\}";T+=2}else{var g=null;x&&a('"\\\\}"')}var y=null!==g?function(){return"}"}():null;if(null!==y)var _=y;else{var _=null;T=b}if(null!==_)var u=_;else{var w=T,E=T;if("\\u"===e.substr(T,2)){var D="\\u";T+=2}else{var D=null;x&&a('"\\\\u"')}if(null!==D){var I=O();if(null!==I){var M=O();if(null!==M){var S=O();if(null!==S){var P=O();if(null!==P)var C=[D,I,M,S,P];else{var C=null;T=E}}else{var C=null;T=E}}else{var C=null;T=E}}else{var C=null;T=E}}else{var C=null;T=E}var L=null!==C?function(e,t,n,r){return String.fromCharCode(parseInt("0x"+e+t+n+r))}(C[1],C[2],C[3],C[4]):null;if(null!==L)var A=L;else{var A=null;T=w}if(null!==A)var u=A;else var u=null}}}}return V[t]={nextPos:T,result:u},u}function E(){var t="digits@"+T,n=V[t];if(n)return T=n.nextPos,n.result;var r=T;if(null!==e.substr(T).match(/^[0-9]/)){var i=e.charAt(T);T++}else{var i=null;x&&a("[0-9]")}if(null!==i)for(var s=[];null!==i;)if(s.push(i),null!==e.substr(T).match(/^[0-9]/)){var i=e.charAt(T);T++}else{var i=null;x&&a("[0-9]")}else var s=null;var o=null!==s?function(e){return parseInt(e.join(""),10)}(s):null;if(null!==o)var u=o;else{var u=null;T=r}return V[t]={nextPos:T,result:u},u}function O(){var t="hexDigit@"+T,n=V[t];if(n)return T=n.nextPos,n.result;if(null!==e.substr(T).match(/^[0-9a-fA-F]/)){var r=e.charAt(T);T++}else{var r=null;x&&a("[0-9a-fA-F]")}return V[t]={nextPos:T,result:r},r}function D(){var e="_@"+T,t=V[e];if(t)return T=t.nextPos,t.result;var n=x;x=!1;for(var r=T,i=[],s=I();null!==s;){i.push(s);var s=I()}var o=null!==i?function(e){return e.join("")}(i):null;if(null!==o)var u=o;else{var u=null;T=r}return x=n,x&&null===u&&a("whitespace"),V[e]={nextPos:T,result:u},u}function I(){var t="whitespace@"+T,n=V[t];if(n)return T=n.nextPos,n.result;if(null!==e.substr(T).match(/^[ 	\n\r]/)){var r=e.charAt(T);T++}else{var r=null;x&&a("[ 	\\n\\r]")}return V[t]={nextPos:T,result:r},r}function M(){function t(e){e.sort();for(var t=null,n=[],r=0;e.length>r;r++)e[r]!==t&&(n.push(e[r]),t=e[r]);switch(n.length){case 0:return"end of input";case 1:return n[0];default:return n.slice(0,n.length-1).join(", ")+" or "+n[n.length-1]}}var n=t(L),r=Math.max(T,C),a=e.length>r?i(e.charAt(r)):"end of input";return"Expected "+n+" but "+a+" found."}function S(){for(var t=1,n=1,r=!1,i=0;C>i;i++){var a=e.charAt(i);"\n"===a?(r||t++,n=1,r=!1):"\r"===a|"\u2028"===a||"\u2029"===a?(t++,n=1,r=!0):(n++,r=!1)}return{line:t,column:n}}var P={_:D,"char":w,chars:_,digits:E,elementFormat:c,hexDigit:O,id:y,messageFormatElement:l,messageFormatPattern:o,messageFormatPatternRight:u,offsetPattern:m,pluralFormatPattern:h,pluralForms:v,pluralStyle:f,selectFormatPattern:p,selectStyle:d,start:s,string:g,stringKey:b,whitespace:I};if(void 0!==t){if(void 0===P[t])throw Error("Invalid rule name: "+i(t)+".")}else t="start";var T=0,x=!0,C=0,L=[],V={},A=P[t]();if(null===A||T!==e.length){var k=S();throw new this.SyntaxError(M(),k.line,k.column)}return A},toSource:function(){return this._source}};return e.SyntaxError=function(e,t,n){this.name="SyntaxError",this.message=e,this.line=t,this.column=n},e.SyntaxError.prototype=Error.prototype,e}();t.prototype.parse=function(){return n.parse.apply(n,arguments)},t.prototype.precompile=function(e){function n(e,s){s=s||{};var o,u,l,c="";switch(e.type){case"program":return n(e.program);case"messageFormatPattern":for(o=0;e.statements.length>o;++o)c+=n(e.statements[o],s);return a.begin+c+a.end;case"messageFormatPatternRight":for(o=0;e.statements.length>o;++o)c+=n(e.statements[o],s);return c;case"messageFormatElement":return s.pf_count=s.pf_count||0,c+='if(!d){\nthrow new Error("MessageFormat: No data passed to function.");\n}\n',e.output?c+='r += d["'+e.argumentIndex+'"];\n':(l="lastkey_"+(s.pf_count+1),c+="var "+l+' = "'+e.argumentIndex+'";\n',c+="var k_"+(s.pf_count+1)+"=d["+l+"];\n",c+=n(e.elementFormat,s)),c;case"elementFormat":return"select"===e.key?(c+=n(e.val,s),c+="r += (pf_"+s.pf_count+"[ k_"+(s.pf_count+1)+" ] || pf_"+s.pf_count+'[ "other" ])( d );\n'):"plural"===e.key&&(c+=n(e.val,s),c+="if ( pf_"+s.pf_count+"[ k_"+(s.pf_count+1)+' + "" ] ) {\n',c+="r += pf_"+s.pf_count+"[ k_"+(s.pf_count+1)+' + "" ]( d ); \n',c+="}\nelse {\n",c+="r += (pf_"+s.pf_count+'[ MessageFormat.locale["'+r.fallbackLocale+'"]( k_'+(s.pf_count+1)+" - off_"+s.pf_count+" ) ] || pf_"+s.pf_count+'[ "other" ] )( d );\n',c+="}\n"),c;case"pluralFormatPattern":for(s.pf_count=s.pf_count||0,c+="var off_"+s.pf_count+" = "+e.offset+";\n",c+="var pf_"+s.pf_count+" = { \n",i=!0,o=0;e.pluralForms.length>o;++o)"other"===e.pluralForms[o].key&&(i=!1),u?c+=",\n":u=1,c+='"'+e.pluralForms[o].key+'" : '+n(e.pluralForms[o].val,function(){var e=JSON.parse(JSON.stringify(s));return e.pf_count++,e}());if(c+="\n};\n",i)throw Error("No 'other' form found in pluralFormatPattern "+s.pf_count);return c;case"selectFormatPattern":for(s.pf_count=s.pf_count||0,c+="var off_"+s.pf_count+" = 0;\n",c+="var pf_"+s.pf_count+" = { \n",i=!0,o=0;e.pluralForms.length>o;++o)"other"===e.pluralForms[o].key&&(i=!1),u?c+=",\n":u=1,c+='"'+e.pluralForms[o].key+'" : '+n(e.pluralForms[o].val,function(){var e=JSON.parse(JSON.stringify(s));return e.pf_count++,e}());if(c+="\n};\n",i)throw Error("No 'other' form found in selectFormatPattern "+s.pf_count);return c;case"string":return'r += "'+t.Utils.numSub(t.Utils.escapeExpression(e.val),"k_"+s.pf_count+" - off_"+(s.pf_count-1),s.pf_count)+'";\n';default:throw Error("Bad AST type: "+e.type)}}var r=this,i=!1,a={begin:'function(d){\nvar r = "";\n',end:"return r;\n}"};return n(e)},t.prototype.compile=function(e){return Function("MessageFormat","return "+this.precompile(this.parse(e)))(t)},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=t),exports.MessageFormat=t):"function"==typeof define&&define.amd?define(function(){return t}):e.MessageFormat=t})(this);