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
					// Get streets nearby location
					const getStreets = this.app.handleRequest('GET', `${this.app.config.geoNames.baseUrl}&lat=${coords.latitude}&lng=${coords.longitude}&username=${this.app.config.geoNames.userName}`);
					// Get city matching users location
					const getCity = this.app.handleRequest('GET', `${this.app.config.google.baseUrls.maps}?latlng=${coords.latitude},${coords.longitude}&key=${this.app.config.google.key}`);

					// Fire api requests parallel
					Promise.all([getStreets, getCity])
				.then(results => {
					let streets = results[0];
					let city = results[1];

					// Clean the streetnames returned by geoNames API
					streets = streets.streetSegment.map(street => {
						return street.name;
					});
					streets = [...new Set(streets)];
					streets = this.app.utils.filterArray(streets, '0');

					// Cleanup the city return by Google API
					city = city.results[0];
					city = this.app.utils.getStreet(city.address_components);

					// Get all the objects on the streets nearby
					const objectReqs = [];
					streets.map(street => {
						objectReqs.push(this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${city}/${street}&page=1&pagesize=25`));

						objectReqs.push(this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=huur&zo=/${city}/${street}&page=1&pagesize=25`));
					});

					// Fire all the API calls parallel
					Promise.all(objectReqs)
				.then(results => {
						const streets = results.map(street => {
							return street.Objects;
						});

						// source array concatenation solution: http://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript#answer-37469411
						let objects = [].concat.apply([], streets);
						objects = [...new Set(objects)];

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