/**
 * Displays highstock graph of RRD data
 */

define(['backbone', 'highcharts', 'Settings'],

function(Backbone, Highstock, config) {
	var GraphView = Backbone.View.extend({
		render: function() {
			settings = config.CHART_OPTIONS;

			settings.title = { text: this.model.get('title') };
			settings.chart = { renderTo: this.el };

			this.chart = Highstock.StockChart(settings);

			return this;
		},

		remove: function() {
			Backbone.View.prototype.remove.apply(this, arguments);
			this.chart.destroy();
		}
	});

	return GraphView;
});
