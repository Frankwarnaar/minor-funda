/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	buildAddress(components) {
		components = components.filter(component => {
			// return component.types.includes('route') || component.types.includes('locality');
			return component.types.includes('locality');
		});

		components = components.map(component => {
			return component.long_name;
		});

		return components.reduce((buffer, current) => {
			return `${buffer}/${current}`;
		});
	}

	render() {
		this.app.getCoords()
			.then(coords => {
				// Get the first address matching the coordinates
				this.app.handleRequest('GET', `${this.app.config.geoNames.baseUrl}&lat=${coords.latitude}&lng=${coords.longitude}&username=${this.app.config.geoNames.userName}`)
			.then(streets => {
				streets = streets.streetSegment.map(street => {
					return street.name;
				});
				streets = [...new Set(streets)];

				streets = this.app.utils.filterArray(streets, '0');

				this.app.handleRequest('GET', `${this.app.config.google.baseUrls.maps}?latlng=${coords.latitude},${coords.longitude}&key=${this.app.config.google.key}`)
			.then(city => {
				city = city.results[0];
				city = this.buildAddress(city.address_components);

				const objectReqs = streets.map(street => {
					return this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${city}/${street}&page=1&pagesize=25`);
				});

				Promise.all(objectReqs)
			.then(results => {
					const streets = results.map(street => {
						return street.Objects;
					});

					// source array concatenation solution: http://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript#answer-37469411
					const objects = [].concat.apply([], streets);

					console.log(objects);
					});
				});
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default View;