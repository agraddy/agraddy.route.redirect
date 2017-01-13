var luggage = require('agraddy.luggage');

var mod = function(routes, statusCode, from, to, plugins) {
	var url = from;

	if(plugins) {
		routes[url] = function(req, res) {
			luggage(req, res, plugins, drop(statusCode, to));
		};
	} else {
		routes[url] = function(req, res) {
			drop(statusCode, to)(null, req, res);
		};
	}

	function drop(statusCode, to) {
		return function(err, req, res, lug) {
			if(statusCode == 301) {
				res.writeHead(301, {'Location': to});
				res.end();
			} else if(statusCode == 302) {
				res.writeHead(302, {'Location': to});
				res.end();
			}
		}
	}
};

module.exports = mod;
