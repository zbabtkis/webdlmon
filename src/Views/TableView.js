define(['backbone'
	  , 'underscore'
	  , 'jquery'
	  , 'tpl!Templates/TableView.html'
	  , 'tpl!Templates/TableRow.html'
	  , 'Views/DataView'
	  , 'WarnCounter'
	  , 'semantic'
	  , 'marionette'], 

function(Backbone, _, $, TableTemplate, RowTemplate, DataView, WarnCounter) {

	var DataTable = Backbone.Marionette.CompositeView.extend({
		tagName: 'table',

		template: TableTemplate,

		className: 'ui basic huge sortable table segment',

		events: {
			'click th': 'sortBy',
		},

		itemViewContainer: 'tbody',

		collectionEvents: {
			'sort': 'render'
		},

		WarnCounter: WarnCounter,

		itemView: DataView.extend({
			tagName: 'tr',
			template: RowTemplate
		})
	});

	return DataTable;
});