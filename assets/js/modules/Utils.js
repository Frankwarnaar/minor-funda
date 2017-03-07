/*jshint esversion: 6 */
class Utils {
	buildAddress(components) {
		components = components.filter(component => {
			// return component.types.includes('route') || component.types.includes('locality');
			return component.types.includes('locality');
		});

		components = components.map(component => {
			return component.long_name;
		});

		return components.reduce((buffer, current) => {
			return `${buffer}/${current}`;
		});
	}

	// Remove item from array if it contains a subtring
	filterArray(array, substring) {
		return array.filter(item => {
			return (!item.includes(substring));
		});
	}
}

export default Utils;