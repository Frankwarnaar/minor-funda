/*jshint esversion: 6 */

import config from '../cfg.js';
import Controller from './Controller.js';
import View from './View.js';
import Store from './Store.js';

class App {
	constructor() {
		this.config     = config;
		this.controller = new Controller(this);
		this.view       = new View(this);
		this.store      = new Store(this);
		this.init();
	}

	getCoords() {
		console.log('getting location');
		return new Promise(function(resolve, reject) {
			if (navigator.geolocation.getCurrentPosition) {
				navigator.geolocation.getCurrentPosition(data => {
					resolve(data.coords);
				});
			} else {
				reject(`Couldn't get the location from your browser`);
			}
		});
	}

	init() {
		this.controller.init();
	}
}

export default App;