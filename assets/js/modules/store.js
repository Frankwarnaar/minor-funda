/*jshint esversion: 6 */

class Store {
	constructor(app) {
		this.app = app;
	}

	getObjectsNearby() {
		return new Promise((resolve, reject) => {
			this.app.getCoords()
				.then(coords => {
					// Get the first address matching the coordinates

					const getStreets = this.app.handleRequest('GET', `${this.app.config.geoNames.baseUrl}&lat=${coords.latitude}&lng=${coords.longitude}&username=${this.app.config.geoNames.userName}`);
					const getCity = this.app.handleRequest('GET', `${this.app.config.google.baseUrls.maps}?latlng=${coords.latitude},${coords.longitude}&key=${this.app.config.google.key}`);

					Promise.all([getStreets, getCity])
				.then(results => {
					let streets = results[0];
					let city = results[1];

					streets = streets.streetSegment.map(street => {
						return street.name;
					});
					streets = [...new Set(streets)];
					streets = this.app.utils.filterArray(streets, '0');

					city = city.results[0];
					city = this.app.utils.buildAddress(city.address_components);

					const objectReqs = [];
					streets.map(street => {
						objectReqs.push(this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${city}/${street}&page=1&pagesize=25`));

						objectReqs.push(this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=huur&zo=/${city}/${street}&page=1&pagesize=25`));
					});

					Promise.all(objectReqs)
				.then(results => {
						const streets = results.map(street => {
							return street.Objects;
						});

						// source array concatenation solution: http://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript#answer-37469411
						const objects = [].concat.apply([], streets);

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