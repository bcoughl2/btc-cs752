var Montage=require("../../core/core").Montage,FlowBezierSpline=exports.FlowBezierSpline=Montage.specialize({constructor:{value:function FlowBezierSpline(){this._knots=[],this._densities=[]}},knots:{get:function(){return this._knots},set:function(e){this._knots=e}},previousHandlers:{get:function(){return this._previousHandlers||(this._previousHandlers=[]),this._previousHandlers},set:function(e){this._previousHandlers=e}},nextHandlers:{get:function(){return this._nextHandlers||(this._nextHandlers=[]),this._nextHandlers},set:function(e){this._nextHandlers=e}},densities:{get:function(){return this._densities},set:function(e){this._densities=e,this._densitiesLength=this._densities.length,this._maxTime=null}},_parameters:{value:{}},parameters:{get:function(){return this._parameters||(this._parameters={}),this._parameters},set:function(e){this._parameters=e,this._parametersLength=this._parameters.length}},_maxTime:{enumerable:!1,value:null},computeMaxTime:{value:function(){return this._computeDensitySummation(),this._maxTime=this._densitySummation.length?this._densitySummation[this._densitySummation.length-1]:0,this._maxTime}},_densitySummation:{enumerable:!1,value:null},_computeDensitySummation:{enumerable:!1,value:function(){var e,t=this.densities,n=t.length-1,r=0;for(this._densitySummation=[],e=0;n>e;e++)r+=(t[e]+t[e+1])/2,this._densitySummation[e]=r;this._maxTime=null}},_convertSplineTimeToBezierIndexTime:{enumerable:!1,value:function(e){if(0>e)return null;if(null===this._maxTime&&this.computeMaxTime(),e>=this._maxTime)return null;for(var t,n,r,i,a,s=this._densitySummation,o=s.length,l=o-1,u=o>>1;u;)l-u>=0&&s[l-u]>e?l-=u:u>>=1;return t=e-(l?s[l-1]:0),r=this._densities[l],i=this._densities[l+1],a=r-i,n=-1e-10>a||a>1e-10?(r-Math.sqrt(r*r+2*(i-r)*t))/a:t/r,[l,n]}},getPositionAtIndexTime:{value:function(e){var t=e[0],n=e[1],r=this._knots[t],i=this._nextHandlers[t],a=this._previousHandlers[t+1],s=this._knots[t+1],o=1-n,l=o*o*o,u=3*o*o*n,c=3*o*n*n,h=n*n*n;return[r[0]*l+i[0]*u+a[0]*c+s[0]*h,r[1]*l+i[1]*u+a[1]*c+s[1]*h,r[2]*l+i[2]*u+a[2]*c+s[2]*h]}},getRotationAtIndexTime:{value:function(e){var t,n,r,i=e[0],a=e[1],s=1-a,o=this._parameters;return t=o.rotateX!==void 0?o.rotateX.data[i]*s+o.rotateX.data[i+1]*a:0,n=o.rotateY!==void 0?o.rotateY.data[i]*s+o.rotateY.data[i+1]*a:0,r=o.rotateZ!==void 0?o.rotateZ.data[i]*s+o.rotateZ.data[i+1]*a:0,[t,n,r]}},getStyleAtIndexTime:{value:function(e){var t,n,r,i,a,s,o=e[0],l=e[1],u=this._parameters,c=1-l,h="";for(r=Object.keys(u),i=r.length,t=0;i>t;t++)n=r[t],a=u[n],s=a.data,"rotateX"!==n&&"rotateY"!==n&&"rotateZ"!==n&&s[o]!==void 0&&s[o+1]!==void 0&&(h+=n+":"+1e-5*(1e5*(s[o]*c+s[o+1]*l)>>0)+a.units+";");return h}},transformVectorArray:{value:function(e,t){var n,r,i=e.length,a=[];for(r=0;i>r;r++)n=e[r],n&&(a[r]=[n[0]*t[0]+n[1]*t[4]+n[2]*t[8]+t[12],n[0]*t[1]+n[1]*t[5]+n[2]*t[9]+t[13],n[0]*t[2]+n[1]*t[6]+n[2]*t[10]+t[14]]);return a}},transform:{value:function(e){var t=new FlowBezierSpline;return t._densities=this._densities,t._densitySummation=this._densitySummation,t._knots=this.transformVectorArray(this.knots,e),t._previousHandlers=this.transformVectorArray(this.previousHandlers,e),t._nextHandlers=this.transformVectorArray(this.nextHandlers,e),t}},deCasteljau:{value:function(e,t,n,r,i){var a=1-i,s=a*e[0]+i*t[0],o=a*t[0]+i*n[0],l=a*n[0]+i*r[0],u=a*s+i*o,c=a*o+i*l,h=a*u+i*c,d=a*e[1]+i*t[1],f=a*t[1]+i*n[1],p=a*n[1]+i*r[1],m=a*d+i*f,v=a*f+i*p,g=a*m+i*v,b=a*e[2]+i*t[2],_=a*t[2]+i*n[2],y=a*n[2]+i*r[2],w=a*b+i*_,D=a*_+i*y,E=a*w+i*D;return[[e,[s,d,b],[u,m,w],[h,g,E]],[[h,g,E],[c,v,D],[l,p,y],r]]}},cubic:{enumerable:!1,value:function(e,t,n,r,i){return((e*i+t)*i+n)*i+r}},cubeRoot:{enumerable:!1,value:function(e){return e>0?Math.pow(e,1/3):-Math.pow(-e,1/3)}},cubicRealRoots:{enumerable:!1,value:function(e,t,n,r){var i=1e-100,a=Math;if(-i>e||e>i){var s=1/e,o=t*s,l=n*s,u=(3*l-o*o)*(1/9),c=(4.5*o*l-13.5*r*s-o*o*o)*(1/27),h=u*u*u+c*c;if(h>i){var d=a.sqrt(h);return[this.cubeRoot(c+d)+this.cubeRoot(c-d)+o*(-1/3)]}if(h>-i){if(-i>c||c>i){var f=this.cubeRoot(c),p=2*f+o*(-1/3),m=o*(-1/3)-f;return m>p?[p,m]:[m,p]}return[o*(-1/3)]}var v=a.acos(c/a.sqrt(-u*u*u))*(1/3),g=a.sqrt(-u),b=1.7320508075688772*g*a.sin(v),_=o*(-1/3);return g*=a.cos(v),[_-g-b,_-g+b,_+2*g]}if(-i>t||t>i){var y=n*n-4*t*r;return y>=0?(y=a.sqrt(y),[(-n-y)/(2*t),(y-n)/(2*t)]):[]}return-i>n||n>i?[-r/n]:[]}},_halfPI:{enumerable:!1,value:.5*Math.PI},reflectionMatrix:{enumerable:!1,value:function(e,t,n,r){var i=Math,a=this._halfPI-i.atan2(t,e),s=i.sin(a),o=i.cos(a),l=this._halfPI-i.atan2(n,e*s+t*o),u=i.sin(l);return r[0]=u*s,r[1]=o*u,r[2]=i.cos(l),r}},reflectedY:{enumerable:!1,value:function(e,t,n,r){return e*r[0]+t*r[1]+n*r[2]}},directedPlaneBezierIntersection:{enumerable:!1,value:function(e,t,n,r,i,a,s,o,l){for(var u,c,h=this.reflectionMatrix(r[0],r[1],r[2],l),d=this.reflectedY(i[0]-e,i[1]-t,i[2]-n,h),f=this.reflectedY(a[0]-e,a[1]-t,a[2]-n,h),p=this.reflectedY(s[0]-e,s[1]-t,s[2]-n,h),m=this.reflectedY(o[0]-e,o[1]-t,o[2]-n,h),v=3*(f-p)+m-d,g=3*(d+p)-6*f,b=3*(f-d),_=this.cubicRealRoots(v,g,b,d),y=0,w=0,D=[];_.length>w&&0>=_[w];)w++;for(;_.length>w&&1>_[w];)u=y,y=_[w],c=.5*(u+y),this.cubic(v,g,b,d,c)>=0&&D.push([u,y]),w++;return c=.5*(y+1),this.cubic(v,g,b,d,c)>=0&&D.push([y,1]),D}}});