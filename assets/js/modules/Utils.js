/*jshint esversion: 6 */
class Utils {
	getStreet(components) {
		components = components.filter(component => {
			return component.types.includes('locality');
		});

		return components[0].long_name;
	}

	// Remove item from array if it contains a subtring
	filterArray(array, values) {
		return array.filter(item => {
			if (values.includes('koop') && item.Koopprijs !== null) {
				return true;
			}

			if (values.includes('huur') && item.Huurprijs !== null) {
				return true;
			}

			return false;
		});
	}

	sortArray(array, key) {
		return array.sort((a, b) => {
			if (typeof(a[key]) === 'string') {
				return a[key].localeCompare(b[key]);
			} else {
				return a[key] - b[key];
			}
		});
	}
}

export default Utils;