/*jshint esversion: 6 */

class App {
	constructor() {
		this.config     = config;
		this.controller = new Controller(this);
		this.view       = new View(this);
		this.store      = new Store(this);
		this.init();
	}

	init() {
		this.controller.init();
	}
}