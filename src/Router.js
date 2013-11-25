/**
 * Defines application routes (sets state of the app if you navigate 
 * directly to route)
 */
define(['backbone', 'marionette'], function(Backbone) {

	var Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'':         'overview',
			'overview': 'overview',
			'details':  'details'
		}
	});

	return Router;
});