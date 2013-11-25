/**
 * Displays highstock graph of RRD data
 */

define(['backbone', 'jquery', 'Views/Messages', 'underscore', 'semantic', 'highcharts'],

function(Backbone, $, Message, _) {
	var GraphView = Backbone.View.extend({
		type: "StockChart",

		/** Highstock options */
		settings: {
			legend: {
				enabled: true,
			},
		    rangeSelector: {
		    	buttons: [{
		    		type: 'day',
		    		count: 1,
		    		text: '1d'
		    	}, {
		    		type: 'week',
		    		count: 1,
		    		text: '1w'
		    	}, {
					type: 'month',
					count: 1,
					text: '1m'
				}, {
					type: 'month',
					count: 3,
					text: '3m'
				}, {
					type: 'month',
					count: 6,
					text: '6m'
				}, {
					type: 'year',
					count: 1,
					text: '1y'
				}, {
					type: 'all',
					text: 'All'
				}],
				selected: 1
		    }
		},

		// RRD field options.
		options: {},

		initialize: function(options) {
			var _this = this
			  , dimmer = $('.ui.dimmer');

			// Fix for before modal dimmer has been injected into the DOM.
			if(!dimmer.length) {
				dimmer = $('<div class="ui temporary dimmer" />');
				$('body').append(dimmer);
			}

			this.options.field = options.field;
			this.options.id    = options.id;

			_.bindAll(this, 'remove', 'render');
		},

		render: function(data) {
			// This is the standard for the RRD name.
			var title = this.options.id ? this.options.id + '_' + this.options.field : this.options.field;

			if($('.temporary.dimmer')) {
				$('.temporary.dimmer').remove();
			}

			if(data instanceof Array) {
				this.settings.title = {
					text: title
				};
				this.settings.series = [];
				for(var i = 0; i < data.length; i++) {
					// da field should be condensed for readability.
					if(data[i].field.field === 'da') {
						data[i].data = _.map(data[i].data, function(item) {
							return [item[0], item[1] * 100];
						});
						data[i].field.field = 'da (x100)';
					}
					// Set graph data and use "stepped" graphing.
					this.settings.series.push({
						step: 'left',
						data: data[i].data,
						name: data[i].field.field
					});
				}
			} else {
				this.settings.title = {
					text: title
				};
				this.settings.series = [{
			    	step: 'left',
			    	name: this.options.field,
			    	data: data.data
			    }];
			}

			this.$el.highcharts(this.type, this.settings);

			return this;
		}
	});

	return GraphView;
});