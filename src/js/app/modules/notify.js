class Notify {
	constructor() {
		this.element = '<div class="notify"><div class="close-mark"><span class="glyphicon glyphicon-remove"></span></div></div>';
	}
	bindEvents() {
		$('.close-mark').click((event) => {this.destroyMessage(event)});	
	}
	getMessage(event) {
		var $wrapper = $('.notify-wrapper');

		$wrapper.append(this.element);
		this.bindEvents();
				
		var $target = $(event.target).closest('[data-message]'),
			$notify = $('.notify').last(),
			data = eval("("+$target.data('message')+")");


		$notify.append('<div class="message">'+ data.message +'</div>');
		$notify.show().addClass('animated slideInLeft');	

		setTimeout(function() {
			$notify.remove();
		}, 5000);
	}
	clearMessage() {
		$('.notify').hide().removeClass('animated slideInLeft');
		$('.notify .message').remove();
	}
	destroyMessage(event) {
		var $target = $(event.target),
			$notify = $target.closest('.notify')
		$notify.remove();
	}
	init() {
		$('body').append('<div class="notify-wrapper"></div>')
	}
}

module.exports = new Notify();

