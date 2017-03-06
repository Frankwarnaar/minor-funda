/*jshint esversion: 6 */

class Store {
	constructor(app) {
		this.app = app;
	}

	getLocation() {
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
}