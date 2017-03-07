/*jshint esversion: 6 */

import routie from '../vendor/routie.min.js';

class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.app.view.render();
		this.router();
	}

	router() {
		const app = this.app;
		routie({
			// Detail page
			'details/:objectId'(objectId) {
				app.view.activatePage('#details');
				// app.view.renderObject(objectId);
			},
			// Fallback to starting page
			'*'() {
				app.view.activatePage(`#results`);
			}
		});
	}
}

export default Controller;