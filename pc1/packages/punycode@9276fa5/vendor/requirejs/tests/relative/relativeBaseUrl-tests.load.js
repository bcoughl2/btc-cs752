montageDefine("9276fa5","vendor/requirejs/tests/relative/relativeBaseUrl-tests",{dependencies:[],factory:function(e){e.relativeBaseUrlCounter=0,e({baseUrl:e.isBrowser?"./":"./relative/"},["./top","top"],function(i,t){doh.register("relativeBaseUrl",[function(s){s.is(i.id,t.id),s.is(1,e.relativeBaseUrlCounter),delete e.relativeBaseUrlCounter}]),doh.run()})}});