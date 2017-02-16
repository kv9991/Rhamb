class Tooltip {
	init() {
		$('[data-toggle="tooltip"]').tooltip();
	}
}

module.exports = new Tooltip();

