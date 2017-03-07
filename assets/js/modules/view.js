/*jshint esversion: 6 */

class View {
	constructor(app) {
		this.app = app;
	}

	render() {
		this.showLoader(true);
		this.app.store.getObjectsNearby()
			.then(objects => {
				const $results = document.querySelector('.results');
				const $resultsList = document.querySelector('#results-list');

				objects.map(object => {
					const listItem = `
					<li class="object">
						<img src="${object.FotoLarge}" alt="${object.Adres}">
						<a href="#details/${object.GlobalId}"><h3>${object.Adres}</h3></a>
						<span>€${object.Koopprijs ? object.Koopprijs.toLocaleString('currency') : object.Huurprijs.toLocaleString('currency') + ' p/m'}</span>
					</li>
					`;
					$resultsList.insertAdjacentHTML('beforeend', `${listItem}`);
				});

				$results.classList.remove('hidden');
				this.showLoader(false);
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

	showLoader(show) {
		const loader =  document.querySelector('.loader-container');
		if (show) {
			loader.classList.remove('hidden');
		} else {
			loader.classList.add('hidden');
		}
	}
}

export default View;