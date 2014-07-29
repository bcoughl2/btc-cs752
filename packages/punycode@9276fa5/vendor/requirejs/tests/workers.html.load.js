montageDefine("9276fa5","vendor/requirejs/tests/workers.html",{text:'<!DOCTYPE html><html><head>\n    <title>require.js: Web Workers Test</title>\n    <script src=doh/runner.js></script>\n    <script src=doh/_browserRunner.js></script>\n    <script>var worker=new Worker("workers.js"),d=new doh.Deferred,count=0;worker.onerror=function(){console.error("WORKER ERROR",arguments)},worker.onmessage=function(e){e.data.debug?console.log(e.data.debug):(count+=1,1===count?doh.is("blue",e.data):2===count?doh.is("green",e.data):3===count?doh.is("You called a function",e.data):4===count&&(doh.is("blue",e.data),d.callback(!0)))},doh.register("webworkers",[{name:"webworkers",timeout:5e3,runTest:function(){return d}}]),doh.run();</script>\n</head>\n<body>\n    <h1>require.js: Web Workers Test</h1>\n    <p>Check console for messages</p>\n\n\n</body></html>'});