process.chdir('test');
var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var mod = require('../');
var routes = {};
routes.get = {};

one();

function one() {
	var res = response();

	mod(routes.get, 301, '/one', '/destination');

	res.on('finish', function() {
		tap.assert.equal(res._statusCode, 301, 'Should set redirect status code.');
		two();
	});

	routes.get['/one']({}, res);
}

function two() {
	var res = response();

	mod(routes.get, 302, '/two', '/destination');

	res.on('finish', function() {
		tap.assert.equal(res._statusCode, 302, 'Should set redirect status code.');
		regex();
	});

	routes.get['/two']({}, res);
}

function regex() {
	var res = response();

	mod(routes.get, 302, '^/matches(1*)/regex$', '/destination');

	res.on('finish', function() {
		tap.assert.equal(res._statusCode, 302, 'Should set redirect status code.');
		plugins();
	});

	routes.get['^/matches(1*)/regex$']({}, res);
}

function plugins() {
	var res = response();

	mod(routes.get, 302, '/plugins', '/destination', [function plugin(req, res, lug, cb) {
		tap.assert(true, 'Should run the luggage.');
		cb();
	}]);

	res.on('finish', function() {
		tap.assert.equal(res._statusCode, 302, 'Should set redirect status code.');
		end();
	});

	routes.get['/plugins']({}, res);
}

function end() {
}



