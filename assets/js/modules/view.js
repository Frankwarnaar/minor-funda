/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	render() {
		this.app.getCoords()
			.then(coords => {
				this.app.store.getAssets(coords);
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default View;