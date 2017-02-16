class File {
	constructor() {
		// Info-Box шаблон
		this.uploadInfoTemplate = '<span class="label label-default upload-info"></span>';
	}

	mountNode(parentNode, node) {
		parentNode.append(node);
	}

	mountAttribute(element, attribute, value) {
		element.attr(attribute, value);
	}
	
	init() {
		$('input[type="file"]').each((i, el) => {
			var $input = $(el);
			var $label = $input.parent();

			this.mountAttribute($input, 'id', 'file-' + i);
			this.mountNode($label, this.uploadInfoTemplate); // Создаем Info-Box

			// Регистрируем событие
			$input.bind('change', (event) => {
				var $target = $(event.target);
				var $uploadInfoBox = $target.siblings('.upload-info');

				// Передаем значение в InfoBox
				$uploadInfoBox.html($input.val());
			})	

		})
	}
}

module.exports = new File();

