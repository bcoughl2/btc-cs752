montageDefine("70e9633","language",{dependencies:["collections/set","collections/dict"],factory:function(e,t){var n=e("collections/set"),i=e("collections/dict"),r=t.precedence=i(),a=t.precedenceLevels=[["tuple","record"],["literal","value","parameters","property","element","component","mapBlock","filterBlock","sortedBlock","groupBlock","groupMapBlock","with"],["not","neg","number","parent"],["scope"],["default"],["pow","root","log"],["mul","div","mod","rem"],["add","sub"],["equals","lt","gt","le","ge","compare"],["and"],["or"],["if"]];a.forEach(function(e){var t=n(r.keys());e.forEach(function(e){r.set(e,t)})});var s=t.operatorTokens=i({"**":"pow","//":"root","%%":"log","*":"mul","/":"div","%":"mod",rem:"rem","+":"add","-":"sub","<":"lt",">":"gt","<=":"le",">=":"ge","==":"equals","<=>":"compare","!=":"notEquals","??":"default","&&":"and","||":"or","?":"then",":":"else"});t.operatorTypes=i(s.map(function(e,t){return[e,t]}))}});