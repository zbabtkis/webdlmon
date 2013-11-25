define(['Views/GraphView'], function(GraphView) {

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

		it("can be rendered with array of data", function() {
			var gv = new GraphView({id: 'SB_WLA', field: 'dv'})
			  , data = [
				  	{
				  		field: 'dv', 
				  		data: [
							[3452542543, 32432],
							[3243445354, 324]
						]
					}, {
				  		field: 'dt', 
				  		data: [
							[4355646443, 2334],
							[4656657768, 4533]
						]
					}

			  ];

			gv.render(data);

			assert.equal(gv.$el.children().length, 1);
		});

		it("can be rendered a single set of data", function() {
			var gv = new GraphView({id: 'SB_WLA', field: 'dv'})
			  , data = {
					field: 'dt', 
					data: [
						[4355646443, 2334],
						[4656657768, 4533]
					]
				};

			gv.render(data);

			assert.equal(gv.$el.children().length, 1);
		});
	});
});