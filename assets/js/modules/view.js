/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	buildAddress(components) {
		components = components.filter(component => {
			return component.types.includes('route') || component.types.includes('locality');
		});

		components = components.map(component => {
			return component.long_name;
		});

		return components.reduce((buffer, current) => {
			return `${buffer}, ${current}`;
		});
	}

	render() {
		this.app.getCoords()
			.then(coords => {
				this.app.getAddress(coords)
			.then(address => {
				address = this.buildAddress(address.address_components);
				console.log(address);
			});
		})
			.catch(error => {
				console.log(error);
			});
	}
}

export default View;