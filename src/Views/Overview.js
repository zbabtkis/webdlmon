define(['backbone'
	  , 'jquery'
	  , 'tpl!Templates/Overview.html'
	  , 'Views/DataView'
	  , 'Settings'
	  , 'marionette'],

function(Backbone, $, OverviewTemplate, DataView, _config) {

	var Overview = Backbone.Marionette.CollectionView.extend({
		itemView: DataView.extend({
			className: 'ui overview piled segment',
			template: OverviewTemplate
		}),
		
		collectionEvents: {
			'change sort': 'render',
		}
	});

	return Overview;
});