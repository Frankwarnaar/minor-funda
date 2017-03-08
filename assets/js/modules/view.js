/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	renderList() {
		const $results = document.querySelector('.results');
		const $resultsList = document.querySelector('#results-list');

		// Check if there aren't any objects rendered yet
		if ($resultsList.innerHTML.length === 0) {
			this.showLoader(true, true);
			this.app.store.getObjectsNearby()
			.then(objects => {
				// Render all the objects
				objects.map(object => {
					const listItem = `
					<li>
					<img src="${object.FotoLarge}" alt="${object.Adres}">
					<a href="#details/${object.Id}/${object.Koopprijs ? 'koop' : 'huur'}"><h3>${object.Adres}</h3></a>
					<span>€${object.Koopprijs ? object.Koopprijs.toLocaleString('currency') : object.Huurprijs.toLocaleString('currency') + ' p/m'}</span>
					</li>
					`;

					$resultsList.insertAdjacentHTML('beforeend', listItem);
				});

				$results.classList.remove('hidden');
				this.showLoader(false);
			})
			.catch(err => {
				console.log(err);
			});
		}
	}

	renderObject(id, type) {
		const $details = document.querySelector('#details');
		// Check if the object isn't already rendered.
		if (this.app.store.lastDetailPage !== id) {
			this.clearView($details);
			this.showLoader(true, false);
			// Get details
			this.app.fetchRequest(`${this.app.config.funda.baseUrls.objects}/${this.app.config.funda.key}/${type}/${id}`)
			.then(details => {
				this.app.store.lastDetailPage = id;

				console.log(details);

				// Get all the medium images of an object
				let gallery = '';
				details.Media.map(picture => {
					picture.MediaItems.map(source => {
						if (source.Url.includes('middel')) {
							gallery += `<img src="${source.Url}" alt="${details.Adres}">`;
						}
					});
				});

				// Filter description
				let descriptions = details.VolledigeOmschrijving.split('\n');
				descriptions = descriptions.filter(item => {
					return item.length > 0;
				});

				// Structure description
				const description = descriptions.reduce((buffer, item) => {
					if (item[0] === '-') {
						return `${buffer} <li>${item.substr(1, item.length - 1)}</li>`;
					} if (item[item.length - 2] === ':') {
						return `${buffer} <h2>${item}</h2>`;
					} else {
						return `${buffer} <p>${item}</p>`;
					}
				});

				// Set content
				const content = `
				<section class="object__images">
					<img src="${details.HoofdFoto}" alt=${details.Adres}>
					<section>
						${gallery}
					</section>
				</section>
				<section>
					<h1>${details.Adres}</h1>
					<p>${description}</p>
				</section>
				`;

				$details.insertAdjacentHTML('beforeend', content);

				this.showLoader(false);
				$details.classList.remove('hidden');
			})
			.catch(err => {
				console.log(err);
			});
		}
	}

	clearView($el) {
		$el.innerHTML = '';
	}

	// Make the current page visible and all the other invisible
	activatePage(route) {
		const $pages = Array.from(document.querySelectorAll('[data-page]'));
		$pages.forEach($page => {
			if (`#${$page.getAttribute('id')}` === route) {
				$page.classList.remove('hidden');
			} else {
				$page.classList.add('hidden');
			}
		});
	}

	showLoader(show, content) {
		const loader =  document.querySelector('.loader-container');
		const description =  document.querySelector('.loader-container p');

		if (show) {
			loader.classList.remove('hidden');
		} else {
			loader.classList.add('hidden');
		}

		if (content) {
			description.classList.remove('hidden');
		} else {
			description.classList.add('hidden');
		}
	}
}

export default View;