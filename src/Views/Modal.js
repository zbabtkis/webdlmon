define(['backbone', 'spin', 'semantic'], function(Backbone, Spinner) {
	var Modal = Backbone.View.extend({
		el: '.modal',

		initialize: function() {
			var el = document.getElementById('spinner')
			  , _this = this;

			this.spinner = new Spinner({color: '#aaa', top: '75px', left: '75px'}).spin(el);

			this.spinner.hide = function() {
				$(el)
					.removeClass('visible')
					.addClass('hidden');

				this.stop();
			}

			this.spinner.show = function(target) {
				_this._spinTarget = target ? _this.$(target) : $('body');

				$(el)
					.appendTo(_this._spinTarget)
					.removeClass('hidden')
					.addClass('visible');

				this.spin(el);
			}
		},

		render: function(content) {
			this.spinner.hide();
			this.$el.html(content);
			this.$el.modal('show');
		},

		spin: function(target) {
			this.spinner.show(target);
		},

		stopSpin: function() {
			this.spinner.hide();
		},

		hide: function() {
			this.$el.modal('hide');
		}
	});

	return Modal;
});