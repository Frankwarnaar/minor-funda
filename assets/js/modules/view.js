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
				this.app.handleRequest('GET', `${this.app.config.google.baseUrls.maps}?latlng=${coords.latitude},${coords.longitude}&key=${this.app.config.google.key}`)
			.then(address => {
				address = address.results[0];
				address = this.buildAddress(address.address_components);
				// Get the houses matching the address
				this.app.fetchRequest(`${this.app.config.funda.baseUrls.search}/${this.app.config.funda.key}?type=koop&zo=/${address}&page=1&pagesize=25`, (houses) => {
					console.log(houses);
				});
			});
		})
			.catch(error => {
				console.log(error);
			});
	}
}

export default View;