var master=new doh.Deferred,count=0;doh.register("priority",[{name:"priority",timeout:5e3,runTest:function(){return master}}]),doh.run(),require({baseUrl:"./",priority:["one","two"]},["alpha","beta","gamma","epsilon"],function(e,i,t,s){count+=1,doh.is(1,count),doh.is("alpha",e.name),doh.is("beta",e.betaName),doh.is("beta",i.name),doh.is("gamma",i.gammaName),doh.is("gamma",t.name),doh.is("theta",t.thetaName),doh.is("epsilon",t.epsilonName),doh.is("epsilon",s.name);var a,u=/alpha|beta|gamma|theta/,n=document.getElementsByTagName("script");for(a=n.length-1;a>-1;a--)doh.f(u.test(n[a].src));master.callback(!0)});