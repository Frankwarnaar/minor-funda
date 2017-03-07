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
				console.log(streets);
				streets = streets.streetSegment.map(street => {
					return street.name;
				});
				streets = [...new Set(streets)];

				this.app.handleRequest('GET', `${this.app.config.google.baseUrls.maps}?latlng=${coords.latitude},${coords.longitude}&key=${this.app.config.google.key}`)
					.then(city => {
						city = city.results[0];
						city = this.buildAddress(city.address_components);

						// const objects = [];

						const objectReqs = streets.map(street => {
							return this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${city}/${street}&page=1&pagesize=25`);
						});

						Promise.all(objectReqs).then(objects => {
							console.log(objects);
						});

						// streets.map(street => {
						// 	// Get the houses matching the address
						// 	this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${city}/${street}&page=1&pagesize=25`)
						// 	.then(results => {
						// 		console.log(results.Objects);
						// 		objects.push(results.Objects);
						// 	});
						// });

						// console.log(objects);
					});
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default View;