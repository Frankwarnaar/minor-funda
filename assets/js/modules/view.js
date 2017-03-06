/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	render() {
		this.app.store.getLocation()
			.then(coords => {
				console.log(coords);
			})
			.catch(error => {
				console.log('error');
			});
	}
}