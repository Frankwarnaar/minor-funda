/*jshint esversion: 6 */
class Utils {
	getStreet(components) {
		components = components.filter(component => {
			return component.types.includes('locality');
		});

		return components[0].long_name;
	}

	// Remove item from array if it contains a subtring
	filterArray(array, substring) {
		return array.filter(item => {
			return (!item.includes(substring));
		});
	}
}

export default Utils;