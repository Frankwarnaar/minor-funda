/*jshint esversion: 6 */

import config from '../cfg.js';
import Controller from './Controller.js';
import View from './View.js';
import Store from './Store.js';
import Utils from './Utils.js';

class App {
	constructor() {
		this.config     = config;
		this.controller = new Controller(this);
		this.view       = new View(this);
		this.store      = new Store(this);
		this.utils      = new Utils();
		this.init();
	}

	getCoords() {
		return new Promise((resolve, reject) => {
			if (navigator.geolocation.getCurrentPosition) {
				navigator.geolocation.getCurrentPosition(data => {
					resolve(data.coords);
				});
			} else {
				reject(`Couldn't get the location from your browser`);
			}
		});
	}

	fetchRequest(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
			.then(response => {
				if (response.status !== 200) {
					reject(response.status);
				} else {
					// Examine the text in the response
					response.json().then((data) => {
						resolve(data);
					});
				}
			})
			.catch((err) => {
				reject(err);
			});
		});
	}

	handleRequest(method, url) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();

			xhr.open(method, url);

			xhr.onload = function() {
				if (this.status >= 200 && this.status < 300) {
					resolve(JSON.parse(xhr.responseText));
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