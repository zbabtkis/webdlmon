require([], function(GraphView) {

	describe("GraphView", function() {
		it("is a Backbone constructor", function() {
			var gv = new GraphView({});
			assert.typeOf(GraphView, 'function');
			assert.typeOf(gv, 'object');
		});

		it("can be instantiated with options", function() {
			var gv = new GraphView({id: "SB_WLA", field: 'dv'});

			assert.equal(gv.options.id, "SB_WLA");
			assert.equal(gv.options.field, "dv");
		});

		it("triggers display:modal", function() {
			var gv = new GraphView({id: 'SB_WLA', field: 'dv'});
		});
	});

});