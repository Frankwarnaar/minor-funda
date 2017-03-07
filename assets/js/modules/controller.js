/*jshint esversion: 6 */

import routie from '../vendor/routie.min.js';

class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.router();
	}

	router() {
		const app = this.app;
		routie({
			// Detail page
			'details/:objectId/:type'(objectId, type) {
				app.view.activatePage('#details');
				app.view.renderObject(objectId, type);
			},
			// Fallback to starting page
			'*'() {
				app.view.renderList();
				app.view.activatePage(`#results`);
			}
		});
	}
}

export default Controller;