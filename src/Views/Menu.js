/**
 * Application menu for selecting details or overview.
 */
define(['backbone','jquery', 'Collection', 'Router'], function(Backbone, $, Collection, Router) {
	var Menu = Backbone.View.extend({
		el: '#region-menu',

		events: {
			'click .item[data-action=details]': 'details',
			'click .item[data-action=overview]': 'overview'
		},

		initialize: function(options) {
			this.vent = options.vent;
			this.model.on('change:count', this.renderCounter, this);
		},

		renderCounter: function(model, num) {
			var $label = this.$('.label');
			// Updates document title with number of warnings.
			if(!num) {
				$label.hide();
				document.title = 'WebDLMon | NEES@UCSB';
			} else {
				$label.show();
				document.title = '(' + num + ((num > 1) ? ' warning' : ' warning') + ') WebDLMon | NEES@UCSB';
				this.$('.label').html(num);
			}
		},

		details: function() {
			this.vent.trigger('select:details');
		},

		overview: function() {
			this.vent.trigger('select:overview')
		},

		select: function(action) {
			this.$('.active').removeClass('active');
			this.$('[data-action=' + action + ']').addClass('active');
		}
	});

	return Menu;
})