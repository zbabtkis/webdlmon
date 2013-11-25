/**
 * Useful for extending views to allow graphing or "more info" modal view.
 */

define(['backbone'
	  , 'jquery'
	  , 'underscore'
	  , 'Settings'
	  , 'Views/Messages'
	  , 'Views/GraphView'
	  , 'TemplateHelpers'
	  , 'tpl!Templates/TableView.html'
	  , 'tpl!Templates/TableRow.html'
	  , 'tpl!Templates/MoreInfo.html'
	  , 'semantic'
	  , 'marionette'],

function(Backbone, $, _, _config, Messages, Graph, TemplateHelpers, TableTemplate, RowTemplate, InfoTemplate) {
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
			  , graph  = new Graph({id: id, field: field})
			  , _this  = this;

			this.vent.trigger('display:spinner');

			/**
			 * Give error if RRD request returns no data points.
			 */
			var addLine = _.bind(function(data) {
				if(data.data && data.data.length) {
					_this.vent.trigger('display:modal', graph.render(data).$el);
				} else {
					_this.error();
				}
			}, this);

			$.getJSON(_config.APP_URL + '/rrd/' + id + '/' + field, addLine);
		},

		info: function() {
			var html   = InfoTemplate(this.model.toJSON())
			  , id     = this.model.get('id')
			  , fields = []
			  , fail   = setTimeout(this.error, _config.RRD_TIMEOUT); // Since we are making three AJAX calls, we need to make sure client isn't left hanging if one of them fails.

			this.vent.trigger('display:modal', html);
			this.vent.trigger('display:spinner', '.graph');

			/** 
			 * When ajax request for RRD data completes, it is added to the
			 * graph using this functions
			 */
			var addLine = _.bind(function(data) {
				var content;

				fields.push(data);

				// Graph when all 3 requests have been made.
				if(fields.length === 3) {
					// Graph fileds that have returned valid data objects (i.e. not ENOFILE);
					content = new Graph({field: 'dv, dt, da', id: id}).render(_.without(fields, _config.ENOFILE)).$el;

					// Turn off error callback.
					clearTimeout(fail);

					this.vent.trigger('display:modal:inject', {
						selector: '.graph',
						content: content
					});
				}
			}, this);

			// Request RRD data for three fields from the RRD.
			$.getJSON(_config.APP_URL + '/rrd/' + id + '/' + 'dv', addLine);
			$.getJSON(_config.APP_URL + '/rrd/' + id + '/' + 'dt', addLine);
			$.getJSON(_config.APP_URL + '/rrd/' + id + '/' + 'da', addLine);
		},

		error: function() {
			this.vent.trigger('hide:spinner');
			this.vent.trigger('flash', {
				message: _config.RRD_ERROR,
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