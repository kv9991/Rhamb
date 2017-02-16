export default class Header {
	constructor(options) {

		// Set options
		this.options = options;
		this.active = this.options.default;
		var _this = this;

		// Variables
		this.$header = $('#header');
		this.$headerMenu = $('#header-menu');
		this.$headerPost = $('#header-post');
		this.$headerSearch = $('#header-search');
		this.$headerSearchForm = $('#header-search-form');
		this.$headerSearchToggler = $('#header-search-toggler');
		this.$headerColumnRight = $('#header-column-right');
		this.$headerNavigationButtons = $('#header-navigation-buttons');
		this.$headerSearchCloseMark = $('#header-search-close-mark');

		// Initialize
		this.mapInactive();
		this.setDefault();

		// Bind
		$('#page').scrollex({
			top: '200vh',
		    enter: () => {_this.makeActive('#header-post')},
		    leave: () => {_this.makeActive('#header-menu')}
		});

		this.$headerSearchToggler.on('click', (e) => {
			_this.makeActive('#header-search');
		})

		this.$headerSearchCloseMark.on('click', (e) => {
			_this.makeActive('#header-menu');
		})
	}

	mapInactive() {
		let $headerInner = $('#header .inner');
		let i = $headerInner.length;

		for (i; i--;) {
			$headerInner.addClass('header-inactive');
		}
	}

	setDefault() {
		let $defaultElement = $(this.options.default);
		$defaultElement.removeClass('header-inactive');
	}


	makeActive(value) {
		$(this.active).addClass('header-inactive');
		$(value).removeClass('header-inactive');
		this.active = value;
	}


}

