montageDefine("7fd8be3","core/extras/element",{dependencies:[],factory:function(require,exports,module){
if (typeof Element !== "undefined" && !Element.isElement) {
    Object.defineProperty(Element, "isElement", {
        value: function (obj) {
            return !!(obj && 1 === obj.nodeType);
        },
        writable: true,
        configurable: true
    });
}

}})