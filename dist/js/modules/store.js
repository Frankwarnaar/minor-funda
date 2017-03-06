var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var Store = function () {
	function Store(app) {
		_classCallCheck(this, Store);

		this.app = app;
	}

	_createClass(Store, [{
		key: "getLocation",
		value: function getLocation() {
			return new Promise(function (resolve, reject) {
				if (navigator.geolocation.getCurrentPosition) {
					navigator.geolocation.getCurrentPosition(function (data) {
						resolve(data.coords);
					});
				} else {
					reject("Couldn't get the location from your browser");
				}
			});
		}
	}]);

	return Store;
}();