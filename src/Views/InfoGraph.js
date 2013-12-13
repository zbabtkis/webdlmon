define(['backbone'
	  , 'tpl!Templates/MoreInfo.html'
	  , 'Views/GraphView'],

function(Backbone, Info, GraphView) {
	"use strict";

	var InfoGraph = Backbone.Marionette.ItemView.extend({
		className: 'content',

		template: Info,

		initialize: function(options) {
			this.graph = options.graph;
		},

		onShow: function() {
			this.title = $("<h1 class='header'>" + this.model.get('id') + "</h1>");
			this.$el.before(this.title);
		},

		onRender: function() {
			this.$el
				.find('#all-graph')
				.append(this.graph.render().$el);
			console.log(this.title);
		},

		remove: function() {
			var _this = this;

			Backbone.Marionette.ItemView.prototype.remove.apply(this, arguments);
			setTimeout(function() {
				_this.title.remove();
				_this.graph.remove();
			}, 1000);
		}	
	});

	return InfoGraph;
});
