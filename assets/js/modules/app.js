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

	getAddress(coords) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.open('GET', `${config.google.baseUrl}?latlng=${coords.latitude},${coords.longitude}&key=${config.google.key}`);

			xhr.onload = function() {
				if (this.status >= 200 && this.status < 300) {
					resolve(JSON.parse(xhr.responseText).results[0]);
				} else {
					reject({status: this.status, statusText: xhr.statusText});
				}
			};

			xhr.onerror = function() {
				reject({status: this.status, statusText: xhr.statusText});
			};

			xhr.send();
		});
	}

	init() {
		this.controller.init();
	}
}

export default App;