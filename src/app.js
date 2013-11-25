require.config({
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

define([
	'io'
  , 'backbone'
  , 'Collection'
  , 'Views/TableView'
  , 'Views/Modal'
  , 'Views/Menu'
  , 'Router'
  , 'Views/Messages'
  , 'Views/Overview'
  , 'Controller'
  , 'Settings'
  , 'marionette'], 

function(io, Backbone, Collection, TableView, Modal, Menu, Router, Message, Overview, Controller, _config) {
	var App    = new Backbone.Marionette.Application()
	  , socket = io.connect(_config.APP_URL);

	App.addRegions({
		messageRegion: '#message-region',
		dataRegion: "#region-data",
		optionsRegion: '#region-options'
	});

	// Message flasher.
	App.addInitializer(function() {
		App.vent.on('flash', function(message) {
			if(App.messageRegion.timeout) clearTimeout(App.messageRegion.timeout);

			App.messageRegion.show(new Message(message));

			if(message.method !== 'keep') {
				// Close message after MESSAGE_TIMEOUT (in seconds).
				App.messageRegion.timeout = setTimeout(function() {
					App.messageRegion.close();
				}, _config.MESSAGE_TIMEOUT);
			}
		});
	})

	/**
	 * Socket.io adapter.
	 */
	App.addInitializer(function() {
		//When tcp connection dies, display message
		socket.on('die', function() {
			App.vent.trigger('flash', {
				message: "<i class='large attention icon'></i> This data is old because dlmon2json has stopped!"
			  , type: 'error'
			  , method: 'keep'
			});

			socket.once('live', function() {
				App.vent.trigger('flash', {
					message: "<i class='large thumbs up icon'></i> And we're back!"
				  , type: 'success'
				});
			});
		});

		socket.on('data', function(data) {
			App.vent.trigger('data', data);
		});

		socket.on('error', function(err) {
			App.vent.trigger('error', err);
			App.vent.trigger('flash', {
				message: err,
				type: 'error'
			});
		});
	});

	/** 
	 * Instantiate app components.
	 */
	App.addInitializer(function() {
		// Instantiate App data collection.
		var appCollection = new Collection([], {vent: App.vent})
		  , appController = new Controller({collection: appCollection, vent: App.vent})
		  , appRouter     = new Router({controller: appController})
		  , appMenu       = new Menu({vent: App.vent, model: appCollection.deadCounter});

		App.vent.on({
			'select:details': function() {
				// Navigate without creating browser history.
				// Don't trigger -- see http://lostechies.com/derickbailey/2011/08/28/dont-execute-a-backbone-js-route-handler-from-your-code/
				appRouter.navigate('/details', {replace: true});
				appController.details();
			},

			'select:overview': function() {
				appRouter.navigate('/overview', {replace: true});
				appController.overview();
			}
		});

		App.vent.on({
			'display:overview': function() {
				// Highlights menu item.
				appMenu.select('overview');
			},

			'display:details': function() {
				appMenu.select('details');
			}
		});

		window.collection = appCollection;
	});

	/** 
	 * For displaying app content
	 */
	App.addInitializer(function() {
		var modal = new Modal();
		App.vent.on({
			'display:overview': function(collection) {
				App.dataRegion.show(new Overview({collection: collection}));
			},

			'display:details': function(collection) {
				App.dataRegion.show(new TableView({collection: collection}));
			},

			'display:modal': function(content) {
				modal.render(content);
				// Modal should be refreshed after it is drawn fully so it
				// stays centered.
				modal.$el.modal('refresh');
			},

			'display:spinner': function(target) {
				modal.spin(target);
			},

			'display:modal:inject': function(data) {
				modal.$el.find(data.selector).html(data.content);
				modal.$el.modal('refresh');
			},

			'hide:spinner': function() {
				modal.stopSpin();
			}
		});
	});

	/**
	 * App Router initializer
	 */
	App.on("initialize:after", function() {
		Backbone.history.start();
	});

	App.start();
});