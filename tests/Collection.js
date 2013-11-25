define(['Collection', 'backbone', 'underscore'], function(Collection, Backbone, _) {
	describe("Collection", function() {
		it("can be initialized with vent", function() {
			var vent = _.extend({}, Backbone.Events)
			  , collection = new Collection([], {vent: vent});

			assert.deepEqual(collection.vent, vent);
		});

		it("adds model on data from vent", function() {
			var vent       = _.extend({}, Backbone.Events)
			  , listener   = sinon.spy()
			  , collection = new Collection([], {vent: vent});

			collection.on('add', listener);

			vent.trigger('data', {id: 'SB_WLA', 'dv': 23});

			assert.ok(listener.called);
		});

		it("emits data along with event", function() {
			var vent     = _.extend({}, Backbone.Events)
			  , listener = sinon.spy()
			  , collection = new Collection([], {vent: vent});

			collection.on('add', function(){})
		});
	});
})