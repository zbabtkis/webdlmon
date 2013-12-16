define([
    'backbone'
  , 'Collection'
  , 'Views/TableView'
  , 'Views/Modal'
  , 'Views/Menu'
  , 'Router'
  , 'Views/Messages'
  , 'Views/Overview'
  , 'Controller'
  , 'Settings'
  , 'data'
  , 'marionette'], 

function(Backbone, Collection, TableView, Modal, Menu, Router, Message, Overview, Controller, _config, AppData) {
	var App    = new Backbone.Marionette.Application();

	App.addRegions({
		messageRegion: '#message-region',
		dataRegion: '#region-data',
		optionsRegion: '#region-options',
		modalRegion: '#graph-modal'
	});

	App.modalRegion.on('show', function(view) {
		App.modalRegion.$el.modal('setting', {
			onHide: function() {
				// Wait until modal is closed before removing view.
				setTimeout(function() {
					App.modalRegion.close();
				}, 1000);
			}
		});
		App.modalRegion.$el.modal('show');
	});

	// App Data Handlers require vent to communicate with app.
	AppData(App.vent);

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

			'display:modal': function(view) {
				App.modalRegion.show(view);
			},

			'display:spinner': function(target) {
				// modal.spin(target);
			},

			'display:modal:inject': function(data) {
				// modal.$el.find(data.selector).html(data.content);
			},

			'hide:spinner': function() {
				// modal.stopSpin();
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
