/**
 * Displays highstock graph of RRD data
 */

define(['backbone', 'jquery', 'Views/Messages', 'underscore', 'highcharts', 'semantic'],

function(Backbone, $, Message, _, Highstock) {
	var GraphView = Backbone.View.extend({
		type: "StockChart",

		/** Highstock options */
		settings: {
			series: [],
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

		initialize: function(options) {
			this.options = options || {};
		},

		render: function() {
			// This is the standard for the RRD name.
			var title = (this.options.id || "") + this.options.field;

			this.$el.highcharts(this.type, this.settings);

			this.chart = this.$el.highcharts();

			return this;
		}
	});

	return GraphView;
});
