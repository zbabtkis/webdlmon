/**
 * This isn't being used -- can delete.
 */

define(['underscore', 'backbone'], function(_, Backbone) {
	var WarnCounter = _.extend({
		counter: 0,
		warn: function() {
			this.counter++;
			this.trigger('change:counter');
		},
		cameBack: function() {
			this.counter--;
			this.trigger('change:counter');
		}
	}, Backbone.Events);

	return WarnCounter;
});