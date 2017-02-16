import Notify from './notify.js';
import Tooltip from './tooltip.js';
import ToTop from './totop.js';
var affix = require('../../bootstrap/affix.js');

class Binds {
	constructor() {
		this.$body = $('body');
		this.$sidebar = $('#sidebar');
		this.$header = $('#header');
		this.$headerMenu = $('#header-menu');
		this.$headerPost = $('#header-post');
		this.$headerSearch = $('#header-search');
		this.$headerSearchForm = $('#header-search-form');
		this.$headerSearchToggler = $('#header-search-toggler');
		this.$headerColumnRight = $('#header-column-right');
		this.$headerNavigationButtons = $('#header-navigation-buttons');
		this.$sidebarWrapper = $('#sidebar-wrapper');
		this.$postPromo = $('#post-promo');
		this.$postPromoWrapper = $('#post-promo-wrapper');
		this.$feedNavigation = $('#feed-navigation');
	}

	init() {
		
		// прикручиваем к [data-message] и ко всем children
		$('[data-message]').on('click', (event) => {Notify.getMessage(event)})
		.children().bind("click", (event) => {
			Notify.getMessage(event);
		    event.stopPropagation();
		});

		$(function () {
		  $('[data-toggle="tooltip"]').tooltip()
		})
		

		$("a.hash[href^='#']").on('click', function(e) {
			e.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
			       scrollTop: $(hash).offset().top
			     }, 300, function(){
			       window.location.hash = hash;
			});
		});

		$('select').selectpicker();

		// SIDEBAR

		this.$sidebar.affix({
		  offset: {
		    top: 100
		  }
		})

		this.$feedNavigation.affix({
		  offset: {
		    top: 100
		  }
		})

		this.$sidebar.css(
			'width', this.$sidebarWrapper.width()
		);

		// HEADER

		this.$header.affix({  
		  offset: {
		    top: 100
		  }
		})

		// POST PROMO

		this.$postPromo.affix({
			offset: {
				top:100,
				bottom: () => {
					return $('#related').outerHeight(true) + $('#footer').outerHeight(true) + $('#comments').outerHeight(true) + 90;
				} 
			}
		})

		
		this.$postPromo.css({
			'width': this.$postPromoWrapper.width()
		})

	}
}

module.exports = new Binds();

