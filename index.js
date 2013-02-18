
/**
 * Module dependencies
 */

var jsonp = require('jsonp')
  , qs = require('querystring')
	,	isArray = require('isArray')
	,	endpoints = require('./endpoints');

/**
 * Base url
 */

var base_url = ' http://198.74.50.217:8011/api/0/';

/**
 * Main object
 */

var mediasancion = {};

for(var e in endpoints) {

(function(name, data){

	mediasancion[name] = function(options, fn) {

		if("function" == typeof options) {
			fn = options;
			options = {};
		}

		options = options || {};

		options.format = 'jsonp';

		var url = data.url;
		if(options.id) url = data.url.replace(':id', options.id);

		if(isArray(options.fields)) {
			options.fields = options.fields.join(',');
		}

		jsonp(base_url + url + '/?' + qs.stringify(options), {param: 'jsonp_callback'}, fn);
	};

})(e, endpoints[e]);

}

/**
 * Expose object
 */

module.exports = mediasancion;

