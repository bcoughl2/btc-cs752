montageDefine("daa4856","vendor/requirejs/tests/priority/priorityWithDeps/script/req/utils/utils",{dependencies:[],factory:function(require,exports,module){define('req/utils/utils', [
	'req/begin',
	'req/config'
], function() {
	var utils = {
		test:  function() {
			return ('utils ' + ip.config.test);
		}
	};
	return ip.utils = utils;
});

}})