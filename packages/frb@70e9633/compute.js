function compute(e,t,n){n.target=e,n.targetPath=t;var i=n.source=n.source||e,r=n.args,a=n.compute,s=n.parameters=n.parameters||i,o=n.document,l=n.components,c=n.trace,u=n.sourceScope=new Scope(i);u.parameters=s,u.document=o,u.components=l;var h=n.targetScope=new Scope(e);h.parameters=s,h.document=o,h.components=l;var d=r.map(function(e){return parse(e)}).map(function(e){if("rangeContent"===e.type){var t=compileObserver(e.args[0]);return Observers.makeRangeContentObserver(t)}if("mapContent"===e.type){var t=compileObserver(e.args[0]);return Observers.makeMapContentObserver(t)}return compileObserver(e)}),p=Observers.makeRangeContentObserver(Observers.makeObserversObserver(d)),m=Observers.makeComputerObserver(p,a,e),f=parse(t),g=compileBinder(f);return g(m,u,h,n,c?{sourcePath:r.join(", "),targetPath:t}:void 0)}var parse=require("./parse"),compileObserver=require("./compile-observer"),compileBinder=require("./compile-binder"),Observers=require("./observers"),Scope=require("./scope");module.exports=compute;