define(['Views/Modal'], function(Modal) {
	describe("Modal", function() {

		it("Renders string argument into modal body", function() {
			var modal = new Modal();
			modal.render("Hello!");

			assert.equal(modal.$el.html(), "Hello!");

			setTimeout(function() {
				modal.hide();
			}, 1000)
		});

	});
})