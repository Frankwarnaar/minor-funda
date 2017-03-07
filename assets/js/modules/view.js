/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	renderList() {
		this.showLoader(true, true);
		this.app.store.getObjectsNearby()
			.then(objects => {
				const $results = document.querySelector('.results');
				const $resultsList = document.querySelector('#results-list');

				objects.map(object => {
					const listItem = `
					<li class="object">
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

	renderObject(id, type) {
		this.showLoader(true, false);
		this.app.fetchRequest(`${this.app.config.funda.baseUrls.objects}/${this.app.config.funda.key}/${type}/${id}`)
			.then(details => {
				const $details = document.querySelector('#details');
				console.log(details);

				const content = `
				<img src="${details.HoofdFoto}" alt=${details.Adres}>
				<h1>${details.Adres}</h1>
				`;

				$details.insertAdjacentHTML('beforeend', content);

				this.showLoader(false);
				$details.classList.remove('hidden');
			})
			.catch(err => {
				console.log(err);
			});
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