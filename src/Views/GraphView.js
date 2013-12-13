/**
 * Displays highstock graph of RRD data
 */

define(['backbone', 'jquery', 'Views/Messages', 'underscore', 'highcharts', 'semantic'],

function(Backbone, $, Message, _, Highstock) {
	var GraphView = Backbone.View.extend({
		/** Highstock options */
		settings: function() {
			return {
				legend: {
					enabled: true,
				},

				navigator: {
					enabled: false
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
				},

				chart: {
					renderTo: this.el
				}
			};
		},

		render: function() {
			this.chart = Highstock.StockChart(this.settings());

			return this;
		},

		remove: function() {
			Backbone.View.prototype.remove.apply(this, arguments);
			this.chart.destroy();
		}
	});

	return GraphView;
});
