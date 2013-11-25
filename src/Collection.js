/**
 * Holds collection of data loggers
 */
define(['backbone', 'Settings', 'underscore'], function(Backbone, settings, _) {	

	var Collection = Backbone.Collection.extend({
		initialize:function(models, options) {
			this.vent = options.vent;

			// If a model becomes not 'ok', update the number of OK devices.
			this.on('add change:ok', this.updateOk);
			
			this.vent.on('data', _.bind(function(data) {
				this.set(data, {remove: false});
			}, this));

			// Keeps track of how many DLs haven't been heard from in a while.
			this.deadCounter = new Backbone.Model();
		},

		// Determined sort order.
		comparator: function(model) {
			return model.get('id');
		},

		// Updates number of DLs that haven't been heard from in a while.
		updateOk: function() {
			var counts = _.countBy(this.toJSON(), function(model) {
				return model.ok;
			});

			// Set number of inactive data loggers.
			this.deadCounter.set('count', counts.false);
		}
	});

	return Collection
});