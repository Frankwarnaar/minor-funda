/*jshint esversion: 6 */

class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.app.view.render();
	}
}

export default Controller;