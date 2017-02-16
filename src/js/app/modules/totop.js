export default class ToTop {
	constructor() {

		this.$totop = $('#totop');
		this.bind();

	}

	on() {
		this.$totop.addClass('active');
	}

	off() {
		this.$totop.removeClass('active');
	}

	goTop() {
		$('html, body').animate({
			scrollTop: 0
		}, 300);
	}

	bind() {

		var self = this;

		$(window).on('scroll', function(e) {
			var offsetFromTop = $(window).scrollTop();
			if (offsetFromTop > 100) {
				self.on();
			} else {
				self.off();
			}
		})

		$(window).on('load', function(e) {
			var offsetFromLeft = $('#page-wrapper').offset().left;
			$('#totop').width(offsetFromLeft - 30);
		})

		this.$totop.on('click', function(e) {
			self.goTop();
		})


	}

	
}

