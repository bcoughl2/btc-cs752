montageDefine("9276fa5","vendor/requirejs/tests/workers",{dependencies:[],factory:function(e){importScripts("../require.js"),e({baseUrl:"./"},["require","simple","anon/blue","func","anon/green"],function(e,i,t,s,a){postMessage(i.color),postMessage(a.name),postMessage(s()),postMessage(t.name)})}});