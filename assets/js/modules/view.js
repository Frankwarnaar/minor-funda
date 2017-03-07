/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	render() {
		this.app.store.getObjectsNearby()
			.then(objects => {
				console.log(objects);
			})
			.catch(err => {
				console.log(err);
			});
	}
}

export default View;