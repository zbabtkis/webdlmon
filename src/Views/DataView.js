/**
 * Useful for extending views to allow graphing or "more info" modal view.
 */

define(['backbone'
	  , 'jquery'
	  , 'underscore'
	  , 'Settings'
	  , 'Views/Messages'
	  , 'Views/GraphView'
	  , 'Views/InfoGraph'
	  , 'TemplateHelpers'
	  , 'tpl!Templates/TableView.html'
	  , 'tpl!Templates/TableRow.html'
	  , 'semantic'
	  , 'marionette'],

function (Backbone, $, _, config, Messages, Graph, InfoGraph, TemplateHelpers, TableTemplate, RowTemplate) {
	"use strict";

	var DataView = Backbone.Marionette.ItemView.extend({
		// For formatting data logger info strings.
		templateHelpers: TemplateHelpers,

		modelEvents: {
			'change': 'render'
		},

		events: {
			'click .info': 'info',
			'click [data-field]': 'graph'
		},

		initialize: function() {
			this.vent = this.model.collection.vent;

			_.bindAll(this, 'error');
		},

		graph: function(e) {
			var field  = $(e.currentTarget).data('field')
			  , id     = this.model.get('id')
			  , graph  = new Graph({field: field, id: id});

			var addGraphBehavior = function(data) {
				graph.chart.addSeries(data);
				graph.chart.xAxis[0].setExtremes(config.GRAPH_START, config.GRAPH_END); 
				graph.chart.hideLoading();
			};

			this.vent.trigger("FieldDataFetchBehavior", id, field, addGraphBehavior);
			this.vent.trigger("display:modal", graph);

			graph.chart.showLoading();
		},

		info: function() {
			var id     = this.model.get('id')
			  , graph  = new Graph({field: 'da, dt, da', id: id});

			var addGraphBehavior = function addInfoGraphBehavior(data) {
				graph.chart.addSeries(data);
			    graph.chart.xAxis[0].setExtremes(config.GRAPH_START, config.GRAPH_END);
				graph.chart.hideLoading();
			};

			this.vent.trigger('InfoDataFetchBehavior', id, addGraphBehavior); 
			this.vent.trigger('display:modal', new InfoGraph({
				model: this.model,
				graph: graph
			}));

			graph.chart.showLoading();
		},

		error: function() {
			this.vent.trigger('hide:spinner');
			this.vent.trigger('flash', {
				message: config.RRD_ERROR,
				type: "error"
			});
		},

		attributes: function() {
			return {
				'data-id': this.model.get('id')
			};
		}
	});

	return DataView;
});
