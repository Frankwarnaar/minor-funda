/*jshint esversion: 6 */

import routie from '../vendor/routie.min.js';

class Controller {
	constructor(app) {
		this.app = app;
	}

	init() {
		this.router();
		this.imageViewer();
		this.sortObjects();
		this.filterObjects();
	}

	sortObjects() {
		const $sortOption = document.querySelector('#sort');
		$sortOption.addEventListener('change', () => {
			this.app.view.reoderObjects($sortOption.value);
		});
	}

	filterObjects() {
		const $types = document.querySelectorAll('[name="type"]');

		$types.forEach($type => {
			$type.addEventListener('change', (e) => {
				const $checkedTypes = document.querySelectorAll('[name="type"]:checked');
				const checkedTypes = [];
				$checkedTypes.forEach($type => {
					checkedTypes.push($type.value);
				});

				this.app.view.filterObjects(checkedTypes);
			});
		});
	}

	imageViewer() {
		const $imageContainer = document.querySelector('#image');
		const $closeImage = document.querySelector('#image a');

		$closeImage.addEventListener('click', () => {
			this.app.view.showElement($imageContainer, false);
		});
	}

	router() {
		const app = this.app;
		routie({
			// Detail page
			'details/:objectId/:type'(objectId, type) {
				const hash = window.location.hash;

				app.view.activatePage('#details');
				app.view.renderObject(objectId, type);

				app.store.lastLocation = hash;
			},
			// Fallback to starting page
			'*'() {
				const hash = window.location.hash;

				if (hash.includes('image')) {
					const imageUrl = hash.substr(7, hash.length - 1);
					app.view.renderImage(imageUrl);
				} else {
					app.view.renderObjects();
					app.view.activatePage(`#results`);
					app.view.showElement(document.querySelector('#image'), false);
					app.store.lastLocation = hash;
				}
			}
		});
	}
}

export default Controller;