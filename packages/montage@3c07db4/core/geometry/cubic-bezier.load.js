montageDefine("3c07db4","core/geometry/cubic-bezier",{dependencies:["../core","./point"],factory:function(e,t){var i=e("../core").Montage,r=e("./point").Point,n=t.CubicBezier=i.specialize({init:{enumerable:!1,value:function(e){return null!==e&&(2===e.length?(this.p1=e[0],this.p2=e[1]):4===e.length&&(this.p0=e[0],this.p1=e[1],this.p2=e[2],this.p3=e[3])),this}},position:{enumerable:!1,value:function(e){if(!(0>e||e>1)){e=1-e;var t=e*e*e,i=3*e*e*(1-e),n=3*e*(1-e)*(1-e),s=(1-e)*(1-e)*(1-e);return(new r).init(this.p0.x*t+this.p1.x*i+this.p2.x*n+this.p3.x*s,this.p0.y*t+this.p1.y*i+this.p2.y*n+this.p3.y*s)}}},split:{enumerable:!1,value:function(e){return this.makeScaffolding(e),n.create(n).init([this.p0,this.p01,this.p012,this.p0123])}},splitToTimingFunction:{enumerable:!1,value:function(e){this.makeScaffolding(e);var t=this.p0123.x,i=this.p0123.y;return n.create(n).init([(new r).init(this.p01.x/t,this.p01.y/i),(new r).init(this.p012.x/t,this.p012.y/i)])}},makeScaffolding:{enumerable:!1,value:function(e){e=1-e;var t=1e6;i.defineProperty(this,"p01",{value:r.interpolate(e,this.p0,this.p1,t)}),i.defineProperty(this,"p12",{value:r.interpolate(e,this.p1,this.p2,t)}),i.defineProperty(this,"p23",{value:r.interpolate(e,this.p2,this.p3,t)}),i.defineProperty(this,"p012",{value:r.interpolate(e,this.p01,this.p12,t)}),i.defineProperty(this,"p123",{value:r.interpolate(e,this.p12,this.p23,t)}),i.defineProperty(this,"p0123",{value:r.interpolate(e,this.p012,this.p123,t)})}},p0:{enumerable:!0,value:(new r).init(0,0)},p1:{enumerable:!0,value:(new r).init(0,0)},p2:{enumerable:!0,value:(new r).init(1,1)},p3:{enumerable:!0,value:(new r).init(1,1)}})}});