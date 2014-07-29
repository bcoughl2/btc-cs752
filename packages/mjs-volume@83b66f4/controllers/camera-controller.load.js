montageDefine("83b66f4","controllers/camera-controller",{dependencies:["runtime/dependencies/gl-matrix","runtime/utilities","runtime/transform","montage"],factory:function(e,t){e("runtime/dependencies/gl-matrix"),e("runtime/utilities").Utilities;var n=e("runtime/transform").Transform,i=e("montage").Montage;t.CameraController=i.specialize({constructor:{value:function(){this.super(),this._lastPosition=[0,0]}},_deltaForEvent:{value:function(e){return null!=e.wheelDeltaY?e.wheelDeltaY:-e.deltaY}},_minimalDistance:{value:0,writable:!0},_computeInitialDistance:{value:function(){if(this.sceneBBox){var e=this.sceneBBox,t=vec3.createFrom((e[1][0]-e[0][0])/2,(e[1][1]-e[0][1])/2,(e[1][2]-e[0][2])/2),n=vec3.length(t),i=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2,(e[0][2]+e[1][2])/2],r=vec3.create(this.viewPoint.glTFElement.transform.translation),a=vec3.create();a[0]=i[0]-r[0],a[1]=i[1]-r[1],a[2]=i[2]-r[2];var s=vec3.length(a);this._minimalDistance=n>s?s:n,this.zoomStep=1e-4*n}}},viewPointDidChange:{value:function(){this._computeInitialDistance()}},_viewPoint:{value:null,writable:!0},viewPoint:{get:function(){return this._viewPoint},set:function(e){this._viewPoint!=e&&(this._viewPoint=e,this.viewPointDidChange())}},_node:{value:null,writable:!0},zoomStep:{value:0,writable:!0},sceneBBox:{value:null,writable:!0},nodeDidChange:{value:function(){var e=this.node.glTFElement;this.sceneBBox=e.getBoundingBox(!0),this._computeInitialDistance()}},node:{get:function(){return this._node},set:function(e){this._node!=e&&(this._node=e,this.nodeDidChange())}},_lastPosition:{value:null,writable:!0},_transform:{value:null,writable:!0},_axisUp:{value:null,writable:!0},zoom:{value:function(e){if(!this.moving){var t,n=vec3.create(),i=vec3.create(this.viewPoint.glTFElement.transform.translation);this.node.glTFElement;var r=this.sceneBBox;t=[(r[0][0]+r[1][0])/2,(r[0][1]+r[1][1])/2,(r[0][2]+r[1][2])/2],n[0]=t[0]-i[0],n[1]=t[1]-i[1],n[2]=t[2]-i[2],vec3.normalize(n);var a=this._deltaForEvent(e),s=this.zoomStep*a;i[0]+=s*n[0],i[1]+=s*n[1],i[2]+=s*n[2];var o=vec3.create();o[0]=t[0]-i[0],o[1]=t[1]-i[1],o[2]=t[2]-i[2];var l=vec3.length(o);if(l>this._minimalDistance)this.viewPoint.glTFElement.transform.translation=i;else{var u=a>0?-this._minimalDistance:this._minimalDistance;i[0]=t[0]+n[0]*u,i[1]=t[1]+n[1]*u,i[2]=t[2]+n[2]*u,this.viewPoint.glTFElement.transform.translation=i}}}},translate:{value:function(e){if(this._transform.matrix=this.viewPoint.glTFElement.worldMatrix,0!=this.moving){var t=e.translateX-this._lastPosition[0],n=e.translateY-this._lastPosition[1];this._lastPosition[0]=e.translateX,this._lastPosition[1]=e.translateY,t*=.05,n*=-.05,this._axisUp=vec3.createFrom(0,1,0),mat4.rotateVec3(this._transform.matrix,this._axisUp);var i,r=!1;if(0==r){this.node.glTFElement;var a=this.sceneBBox;i=[(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2,(a[0][2]+a[1][2])/2]}var s=vec3.create(),o=vec3.create(this._transform.translation);s[0]=i[0]-o[0],s[1]=i[1]-o[1],s[2]=i[2]-o[2];var l=vec3.create(this._axisUp),u=vec3.create();vec3.normalize(s),vec3.cross(s,this._axisUp,u),vec3.normalize(u),vec3.cross(s,u,l),vec3.normalize(l);var c=mat4.identity(),h=0;h=Math.abs(n)>Math.abs(t)?Math.abs(n)/Math.abs(t):Math.abs(t)/Math.abs(n),h>.5?(mat4.rotate(c,t,l),mat4.rotate(c,n,u)):Math.abs(n)>Math.abs(t)?mat4.rotate(c,n,u):mat4.rotate(c,t,l),o[0]-=i[0],o[1]-=i[1],o[2]-=i[2],mat4.rotateVec3(c,o),o[0]+=i[0],o[1]+=i[1],o[2]+=i[2];var d=mat4.identity();mat4.multiply3(c,this._transform.matrix,d);var f=mat4.identity();mat4.translate(f,o);var p=mat4.identity();mat4.multiply(f,d,p),this.viewPoint.glTFElement.transform.matrix=p}}},beginTranslate:{value:function(){this.moving=!0,null==this._transform&&(this._transform=Object.create(n).init()),this._transform.matrix=this.viewPoint.glTFElement.worldMatrix}},endTranslate:{value:function(){this.moving=!1,this._axisUp=null}}})}});