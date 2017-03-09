/*jshint esversion: 6 */

class Store {
	constructor(app) {
		this.app = app;
	}

	getObjectsNearby() {
		return new Promise((resolve, reject) => {
			// Get coordinates of users location
			this.app.getCoords()
				.then(coords => {
					// Get street of location
					this.app.handleRequest('GET', `${this.app.config.google.baseUrls.maps}?latlng=${coords.latitude},${coords.longitude}&key=${this.app.config.google.key}`)
				.then(location => {
					const locationComponents = location.results[0].address_components;

					let street = locationComponents.filter(component => {
						return component.types.includes('route');
					})[0];
					street = street.long_name;

					let city = locationComponents.filter(component => {
						return component.types.includes('locality');
					})[0];
					city = city.long_name;

					const requests = [
						this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${city}/${street}/+1km&page=1&pagesize=25`),
						this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=huur&zo=/${city}/${street}/+1km&page=1&pagesize=25`),
					];

					Promise.all(requests)
				.then(results => {
						const streets = results.map(street => {
							return street.Objects;
						});

						// source array concatenation solution: http://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript#answer-37469411
						let objects = [].concat.apply([], streets);
						objects = [...new Set(objects)];

						this.objects = objects;
						resolve(objects);
					});
				});
			})
			.catch(error => {
				reject(error);
			});
		});
	}
}

export default Store;