var Montage=require("../../core").Montage,MontageSerializerModule=require("./montage-serializer"),PropertiesSerializer=require("./properties-serializer").PropertiesSerializer,SelfSerializer=require("./self-serializer").SelfSerializer,UnitSerializer=require("./unit-serializer").UnitSerializer,Alias=require("../alias").Alias,Visitor=require("mousse/serialization/visitor").Visitor,MontageVisitor=Montage.specialize.call(Visitor,{_MONTAGE_ID_ATTRIBUTE:{value:"data-montage-id"},_require:{value:null},_units:{value:null},_elements:{value:null},constructor:{value:function MontageVisitor(){}},initWithBuilderAndLabelerAndRequireAndUnits:{value:function(e,t,r,i){return Visitor.call(this,e,t),this._require=r,this._units=i,this._elements=[],this}},getTypeOf:{value:function(e){return e.isModuleReference?"Module":e instanceof Alias?"Alias":"getInfoForObject"in e||"getInfoForObject"in e.constructor?"MontageObject":e.thisIsAReferenceCreatedByMontageSerializer?"MontageReference":"undefined"!=typeof Element&&Element.isElement(e)?"Element":void 0}},visitMontageReference:{value:function(e,t,r){this.builder.top.setProperty(r,t.reference)}},visitElement:{value:function(e,t,r){var i,n;if(n=t.getAttribute(this._MONTAGE_ID_ATTRIBUTE),!n)throw Error("Not possible to serialize a DOM element with no "+this._MONTAGE_ID_ATTRIBUTE+" assigned: "+t.outerHTML);i=this.builder.createElementReference(n),this.storeValue(i,t,r),this._elements.push(t)}},visitModule:{value:function(e,t,r){var i,n;try{n=t.resolve(this._require)}catch(a){throw Error("Not possible to serialize module reference "+t.id+" from package "+t.require.location+" inside package "+this._require.location)}i=this.builder.createModuleReference(n),this.storeValue(i,t,r)}},visitAlias:{value:function(e,t){var r=this.labeler.getTemplatePropertyLabel(t),i=this.builder.createCustomObject();i.setProperty("alias",t.value),this.builder.top.setProperty(r,i)}},visitMontageObject:{value:function(e,t,r){this.isObjectSerialized(t)?this.serializeReferenceToMontageObject(e,t,r):this.handleMontageObject(e,t,r)}},handleMontageObject:{value:function(e,t,r){var i,n=this.builder.createCustomObject();this.setObjectSerialization(t,n),i=this.serializeMontageObject(e,t,n),i?this.serializeSubstituteObject(e,t,r,n,i):(n.setLabel(this.labeler.getObjectLabel(t)),this.builder.top.setProperty(r,n))}},serializeReferenceToMontageObject:{value:function(e,t,r){var i=this.labeler.getObjectLabel(t),n=this.builder.createObjectReference(i);this.builder.top.setProperty(r,n)}},serializeSubstituteObject:{value:function(e,t,r,i,n){var a,s,o,u;a=this.labeler.getObjectLabel(t),this.labeler.isUserDefinedLabel(a)?(s=this.labeler.getObjectLabel(n),this.labeler.setObjectLabel(n,a),this.builder.relabelReferences(s,a),u=this.getObjectSerialization(n),u&&(u.setLabel(a),this.labeler.isUserDefinedLabel(s)&&this.builder.createObjectReference(a).setLabel(s)),e.visit(n,r)):(e.visit(n,r),o=this.labeler.getObjectLabel(n),this.labeler.setObjectLabel(t,o),this.builder.relabelReferences(a,o))}},serializeMontageObject:{value:function(e,t,r){var i,n,a=this.builder.createObjectLiteral();return this.setObjectType(t,r),r.setProperty("properties",a),this.builder.push(r),"function"==typeof t.serializeSelf?(i=(new SelfSerializer).initWithMalkerAndVisitorAndObject(e,this,t,r),n=t.serializeSelf(i)):(this.setObjectProperties(e,t),this.setObjectCustomUnits(e,t)),this.builder.pop(),0===a.getPropertyNames().length&&r.clearProperty("properties"),n}},setObjectType:{value:function(e,t){var r=Montage.getInfoForObject(e).isInstance,i=this.getObjectLocationId(e),n=this.builder.createString(i);r?t.setProperty("prototype",n):t.setProperty("object",n)}},getObjectModuleId:{value:function(e){var t=Montage.getInfoForObject(e);return this._require.identify(t.moduleId,t.require)}},getObjectLocationId:{value:function(e){var t,r=this.getObjectModuleId(e),i=Montage.getInfoForObject(e),n=i.objectName;return t=MontageSerializerModule.MontageSerializer.getDefaultObjectNameForModuleId(r),t===n?r:r+"["+n+"]"}},setObjectProperties:{value:function(e,t){var r,i;i=this.builder.top.getProperty("properties"),this.builder.push(i),"function"==typeof t.serializeProperties?(r=(new PropertiesSerializer).initWithMalkerAndVisitorAndObject(e,this,t),t.serializeProperties(r)):this.setSerializableObjectProperties(e,t),this.builder.pop()}},setSerializableObjectProperties:{value:function(e,t){for(var r,i,n=Montage.getSerializablePropertyNames(t),a=n.length,s=0;a>s;s++)i=n[s],r=Montage.getPropertyAttribute(t,i,"serializable"),this.setProperty(e,i,t[i],r)}},hackIsReferenceAllowedForValue:{value:function(e){return"object"==typeof e&&null!=e&&!("undefined"!=typeof Element&&Element.isElement(e))}},setProperty:{value:function(e,t,r,i){var n;if("reference"===i&&this.hackIsReferenceAllowedForValue(r)){n=this.labeler.getObjectLabel(r);var a=this.builder.createObjectReference(n);this.builder.top.setProperty(t,a)}else e.visit(r,t)}},setObjectCustomUnits:{value:function(e,t){for(var r in this._units)this.setObjectCustomUnit(e,t,r)}},setObjectCustomUnit:{value:function(e,t,r){var i,n,a=this._units[r];a&&(n=(new UnitSerializer).initWithMalkerAndVisitorAndObject(e,this,t),i=a(n,t),null!=i&&e.visit(i,r))}},getExternalObjects:{value:function(){for(var e,t={},r=this.builder.getExternalReferences(),i=0;e=r[i];i++)t[e]=this.labeler.getObjectByLabel(e);return t}},getExternalElements:{value:function(){return this._elements}}});exports.MontageVisitor=MontageVisitor;