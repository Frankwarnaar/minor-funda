/*jshint esversion: 6 */

class App {
	constructor() {
		this.config     = config;
		this.controller = new Controller(this);
		this.view       = new View(this);
		this.store      = new Store(this);
		this.init();
	}

	getLocation() {
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