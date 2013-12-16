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
			'click .info': 'graphInfo',
			'click [data-field]': 'graphSingle'
		},

		initialize: function() {
			this.vent = this.model.collection.vent;

			_.bindAll(this, 'error');
		},

		graph: function(graph) {
			var _this = this;

			return {
				add: function addGraphBehavior (data) {
					var today = new Date()
					  , range = 86400000 * 7;
					graph.chart.addSeries(data, false);
					graph.chart.xAxis[0].setExtremes(today - range, today); 
					graph.chart.hideLoading();
				},

				fail: function(msg) {
					_this.vent.trigger('flash', {
						message: msg, 
						type: 'error'
					});
					_this.vent.trigger('hide:modal');
				}
			};
		},

		graphSingle: function(e) {
			var field  = $(e.currentTarget).data('field')
			  , id     = this.model.get('id')
			  , graph  = new Graph({model: new Backbone.Model({title: id + '_' + field})});

			/** 
			 * Allow data fetchers in data.js to add data to line using callback provided 
			 * by this.graph.
			 */
			this.vent.trigger("display:modal", graph);
			this.vent.trigger("FieldDataFetchBehavior", id, field, this.graph(graph));
			graph.chart.showLoading();
		},

		graphInfo: function() {
			var id     = this.model.get('id')
			  , graph  = new Graph({model: new Backbone.Model({title: id})});

			this.vent.trigger('display:modal', new InfoGraph({
				model: this.model,
				graph: graph
			}));
			this.vent.trigger('InfoDataFetchBehavior', id, this.graph(graph)); 
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
