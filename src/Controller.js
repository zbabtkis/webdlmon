/**
 * Used to set application state
 *  - these can be called by the router or directly.
 */
define(['backbone', 'marionette'], function(Backbone) {
	var Controller = Backbone.Marionette.Controller.extend({
		initialize: function(options) {
			this.vent       = options.vent;
			this.collection = options.collection;
		},

		overview: function() {
			// Display basic datalogger stats.
			this.vent.trigger('display:overview', this.collection);
		},

		details: function() {
			// Display detailed (table view) of data logger stats.
			this.vent.trigger('display:details', this.collection);
		}
	});

	return Controller;
})