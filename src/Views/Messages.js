/**
 * Displays messages in nice colored box reflecting type of message
 */
define(['backbone', 'underscore', 'marionette'], function(Backbone, _, Marionette) {
	var Message = Backbone.Marionette.ItemView.extend({
		className: "ui attached message",

		initialize: function(options) {
			this.type    = options.type;
			this.message = options.message;
		},

		render: function() {
			var removeClass = this.type === 'success' ? 'red' : 'green'
			  , addClass    = this.type === 'success' ? 'green' : 'red'
			  , message     = this.message;

			this.$el
				.html(message)
				.removeClass(removeClass)
				.addClass(addClass);

			return this;
		}
	});

	return Message;
});