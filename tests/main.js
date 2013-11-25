require.config({
	baseUrl: '/src/',
	urlArgs: 'cb=' + Math.random(),
	paths: {
		'jquery':     '../bower_components/jquery/jquery'
	  , 'backbone':   '../bower_components/backbone/backbone'
	  , 'underscore': '../bower_components/underscore/underscore'
	  , 'io':         'http://webdlmon.nees.ucsb.edu:8888/socket.io/socket.io'
	  , 'marionette': '../bower_components/marionette/lib/backbone.marionette'
	  , 'semantic':   '../bower_components/semantic/build/packaged/javascript/semantic.min'
	  , 'highcharts': '../bower_components/highstock/js/highstock.src'
	  , 'tpl':        '../bower_components/requirejs-tpl/tpl'
	  , 'spin':       '../bower_components/spin.js/spin'
	},
	shim: {
		'backbone': {
			exports: 'Backbone'
		  , deps: ['underscore', 'jquery']
		},
		'marionette': {
			exports: 'Marionette'
		  , deps: ['backbone']
		},
		'jquery': {
			exports: 'jQuery'
		},
		'underscore': {
			exports: '_'
		},
		'io': {
			exports: 'io'
		},
		'semantic': ['jquery'],
		'highcharts': {
			deps: ['jquery'],
			exports: 'Highcharts'
		}
	}
});

require(['../tests/GraphView', '../tests/Collection', '../tests/Modal'], function() {	

	if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
	else { mocha.run(); }
});