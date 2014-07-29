montageDefine("3c07db4","core/serialization/bindings",{dependencies:["frb","frb/parse","frb/stringify","frb/expand","frb/scope","../serialization"],factory:function(e){var t=e("frb"),r=(e("frb/parse"),e("frb/stringify")),n=e("frb/expand"),i=e("frb/scope"),a=e("../serialization").Serializer,s=e("../serialization").Deserializer;a.defineSerializationUnit("bindings",function(e,a){var s,o=t.getBindings(a),u={};for(var l in o){var c=o[l],f={};if(!("serializable"in c)||c.serializable){var d=c.sourcePath,h=c.sourceSyntax;if(c.source!==a){var p=e.getObjectLabel(c.source),m=new i({type:"component",label:p});m.components=e,h=n(h,m)}var m=new i;m.components=e,d=r(h,m),c.twoWay?f["<->"]=d:f["<-"]=d,c.converter?f.converter=c.converter:(f.convert=c.convert,f.revert=c.revert),c.trace&&(f.trace=!0),u[l]=f,s=!0}}return s?u:void 0}),s.defineDeserializationUnit("bindings",function(e,r,n){for(var i in n){var a=n[i];if("object"!=typeof a)throw Error("Binding descriptor must be an object, not "+typeof a);"boundObject"in a?(a.source=e.getObjectByLabel(a.boundObject),a.oneway?a["<-"]=a.boundPropertyPath:a["<->"]=a.boundPropertyPath,delete a.boundObject,delete a.boundObjectPropertyPath,delete a.oneway):a["<<->"]&&(console.warn("WARNING: <<-> in bindings is deprectated, use <-> only, please update now."),a["<->"]=a["<<->"],delete a["<<->"])}t.defineBindings(r,n,{components:e})})}});