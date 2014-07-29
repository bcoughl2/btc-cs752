montageDefine("daa4856","vendor/requirejs/tests/doh/_rhinoRunner",{dependencies:[],factory:function(require,exports,module){if(this["dojo"]){
	dojo.provide("doh._rhinoRunner");
}

doh.debug = print;

// Override the doh._report method to make it quit with an 
// appropriate exit code in case of test failures.
(function(){
	var oldReport = doh._report;
	doh._report = function(){
		oldReport.apply(doh, arguments);
		if(this._failureCount > 0 || this._errorCount > 0){
			quit(1);
		}
	}
})();

}})