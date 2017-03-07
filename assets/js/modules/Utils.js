/*jshint esversion: 6 */
class Utils {
	// Remove item from array if it contains a subtring
	filterArray(array, substring) {
		return array.filter(item => {
			return (!item.includes(substring));
		});
	}
}

export default Utils;