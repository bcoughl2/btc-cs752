montageDefine("daa4856","vendor/requirejs/tests/priority/priorityWithDeps/script/req/config",{dependencies:[],factory:function(require,exports,module){define('req/config', [
	'req/begin'
], function() {
	var config = {
		test: 'Hello require',
		state: 'alpha'
	};
	return ip.config = config;
});

}})