export default class Sidebar {
	constructor(options) {

		this.options = options;

		this.$sidebar = $(this.options.selector);

		var _this = this,
			footerHeight = $('#footer').outerHeight(true),
			documentHeight = $(document).height(),
			windowHeight = $(window).height()


		$(window).on('scroll', function(e) {

			var scrollTop = $(document).scrollTop(),
				scrollBottom = Math.floor(documentHeight - scrollTop - windowHeight);
			

			if (scrollBottom < footerHeight) {
				_this.setStyles({
					'top': 'auto',
					'bottom': footerHeight + 25
				})
			} else {
				if (scrollTop > 100) {
					_this.setStyles({
						'top': 100,
						'bottom': 'auto'
					})
				} else {
					_this.setStyles({
						'top': '0',
						'bottom': 'auto'
					})
				}
			}

		})

	}
	
	setStyles(obj) {
		this.$sidebar.css(obj);
	}

}

