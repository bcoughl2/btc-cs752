montageDefine("70e9633","observe",{dependencies:["./parse","./compile-observer","./observers","./scope"],factory:function(e,t,n){function i(e,t,n){var i;i="function"==typeof n?{change:n}:n,i=i||c,i.source=e,i.sourcePath=t;var u=i.parameters=i.parameters||e,h=i.document,d=i.components,p=i.beforeChange,m=i.contentChange,f=new l(e);f.parameters=u,f.document=h,f.components=d,f.beforeChange=p;var g=r(t),v=a(g);return m===!0&&(v=s.makeRangeContentObserver(v)),v(o(function(t){if(t){if("function"!=typeof m)return i.change.apply(e,arguments);if("function"==typeof m)return t.addRangeChangeListener(m),function(){t.removeRangeChangeListener(m)}}else;}),f)}var r=e("./parse"),a=e("./compile-observer"),s=e("./observers"),o=s.autoCancelPrevious,l=e("./scope");n.exports=i;var c={}}});