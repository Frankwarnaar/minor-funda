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
				if (objects.length > 0) {
					// Render all the objects
					objects.map(object => {
						const $listItem = `
						<li>
						<img src="${object.FotoLarge}" alt="${object.Adres}">
						<a href="#details/${object.Id}/${object.Koopprijs ? 'koop' : 'huur'}"><h3>${object.Adres}</h3></a>
						<span>€${object.Koopprijs ? object.Koopprijs.toLocaleString('currency') : object.Huurprijs.toLocaleString('currency') + ' p/m'}</span>
						</li>
						`;

						$resultsList.insertAdjacentHTML('beforeend', $listItem);
					});

				} else {
					$results.insertAdjacentHTML('beforeend', 'Er zijn geen resultaten gevonden in uw buurt.');
				}
				this.showElement($results, true);
				this.showLoader(false);
			})
			.catch(err => {
				console.log(err);

				$results.insertAdjacentHTML('beforeend', 'Er is iets mis gegaan bij het ophalen van huizen in uw buurt. Probeer het later nog eens.');

				this.showElement($results, true);
				this.showLoader(false);
			});
		}
	}

	renderObject(id, type) {
		const $details = document.querySelector('#details');
		const $imageContainer = document.querySelector('#image');

		this.app.view.showElement($imageContainer, false);

		// Check if the object isn't already rendered.
		if (this.app.store.lastDetailPage !== id) {
			this.clearView($details);
			this.showLoader(true, false);
			// Get details
			this.app.fetchRequest(`${this.app.config.funda.baseUrls.objects}/${this.app.config.funda.key}/${type}/${id}`)
			.then(details => {
				this.app.store.lastDetailPage = id;

				// Get all the medium images of an object
				let gallery = '';
				details.Media.map(picture => {
					const bigPic = picture.MediaItems.filter(source => {
						if (source.Url.includes('middel')) {
							return source.Url;
						} else if (source.Url.includes('groot')) {
							return source.Url;
						} else if (source.Url.includes('grotere')) {
							return source.Url;
						}
					});

					picture.MediaItems.map(source => {
						if (source.Url.includes('middel')) {
							if (bigPic.length > 0) {
								gallery += `<a href="#image/${bigPic[bigPic.length - 1].Url}"><img src="${source.Url}" alt="${details.Adres}"></a>`;
							}
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
				this.showElement($details, true);
			})
			.catch(err => {
				console.log(err);
			});
		}
	}

	renderImage(url) {
		const $body = document.querySelector('body');
		const $imageContainer = document.querySelector('#image');
		const $closeButton = document.querySelector('#image a');
		const $lastImg = document.querySelector('#image img');

		$body.classList.add('no-scroll');

		if ($lastImg) {
			$imageContainer.removeChild($lastImg);
		}

		if (this.app.store.lastLocation) {
			$closeButton.setAttribute('href', this.app.store.lastLocation);
		}

		$imageContainer.insertAdjacentHTML('beforeend', `<img src="${url}"/>`);
		this.showElement($imageContainer, true);
	}

	// Make the current page visible and all the other invisible
	activatePage(route) {
		const $pages = Array.from(document.querySelectorAll('[data-page]'));
		$pages.forEach($page => {
			if (`#${$page.getAttribute('id')}` === route) {
				this.showElement($page, true);
			} else {
				this.showElement($page, false);
			}
		});
	}

	showLoader(show, content) {
		const $loader =  document.querySelector('.loader-container');
		const $description =  document.querySelector('.loader-container p');

		this.showElement($loader, show);
		this.showElement($description, content);
	}

	showElement($el, show) {
		if (show) {
			$el.classList.remove('hidden');
		} else{
			$el.classList.add('hidden');
		}
	}

	clearView($el) {
		$el.innerHTML = '';
	}
}

export default View;