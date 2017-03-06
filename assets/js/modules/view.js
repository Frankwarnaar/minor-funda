/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	buildAddress(components) {
		console.log(components);
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
			.then(userCoords => {
				// Get the first address matching the coordinates
				this.app.handleRequest('GET', `${this.app.config.google.baseUrls.roads}?points=${userCoords.latitude},${userCoords.longitude}&key=${this.app.config.google.key}`)
			.then(streetCoords => {
				streetCoords = streetCoords.snappedPoints;
				console.log(streetCoords);

				const promises = streetCoords.map(street => {
					// console.log(streetCoords);
					return this.app.handleRequest('GET', `${this.app.config.google.baseUrl}?latlng=${streetCoords.location.latitude},${streetCoords.location.longitude}&key=${this.app.config.google.key}`);
				});

				// Promise.all(promises).then(streetCoords => {
				//
				// });

				// console.log(promises);

				// address = address.results[0];
				// address = this.buildAddress(address.address_components);
				// // Get the houses matching the address
				// this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${address}&page=1&pagesize=25`, (houses) => {
				// 	console.log(houses);
				// });
			});
				// this.app.fetchRequest(`http://api.geonames.org/findNearbyStreetsOSM?lat=${coords.latitude}&lng=${coords.longitude}&username=demo`, streets => {
				// 	console.log(streets);
				// });
		})
			.catch(error => {
				console.log(error);
			});
	}
}

export default View;