/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	render() {
		this.app.getCoords()
			.then(coords => {
				this.app.getAddress(coords)
					.then(address => {
						console.log(address);
					});
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default View;