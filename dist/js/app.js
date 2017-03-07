(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _App = require('./modules/App.js');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
	'use strict';

	var app = new _App2.default();
})(_App2.default); /*jshint esversion: 6 */

},{"./modules/App.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*jshint esversion: 6 */

var config = {
	funda: {
		key: '271175433a7c4fe2a45750d385dd9bfd',
		baseUrls: {
			search: '//funda.kyrandia.nl/feeds/Aanbod.svc/json',
			objects: '//funda.kyrandia.nl/feeds/Aanbod.svc/json',
			autoSuggest: '//zb.funda.info/frontend/json',
			map: '//mt1.funda.nl/maptiledata.ashx/json'
		}
	},
	google: {
		key: 'AIzaSyA5emTbr8ytwvzrw9NQW7zlXg1NubeDG5M',
		baseUrls: {
			maps: 'https://maps.googleapis.com/maps/api/geocode/json',
			roads: 'https://roads.googleapis.com/v1/nearestRoads'
		}
	},
	geoNames: {
		baseUrl: 'http://api.geonames.org/findNearbyStreetsOSMJSON?formatted=true&style=full',
		userName: 'frankwarnaar@gmail.com'
	}
};

exports.default = config;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion: 6 */

var _cfg = require('../cfg.js');

var _cfg2 = _interopRequireDefault(_cfg);

var _Controller = require('./Controller.js');

var _Controller2 = _interopRequireDefault(_Controller);

var _View = require('./View.js');

var _View2 = _interopRequireDefault(_View);

var _Store = require('./Store.js');

var _Store2 = _interopRequireDefault(_Store);

var _Utils = require('./Utils.js');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.config = _cfg2.default;
		this.controller = new _Controller2.default(this);
		this.view = new _View2.default(this);
		this.store = new _Store2.default(this);
		this.utils = new _Utils2.default();
		this.init();
	}

	_createClass(App, [{
		key: 'getCoords',
		value: function getCoords() {
			return new Promise(function (resolve, reject) {
				if (navigator.geolocation.getCurrentPosition) {
					navigator.geolocation.getCurrentPosition(function (data) {
						resolve(data.coords);
					});
				} else {
					reject('Couldn\'t get the location from your browser');
				}
			});
		}
	}, {
		key: 'fetchRequest',
		value: function fetchRequest(url) {
			return new Promise(function (resolve, reject) {
				fetch(url).then(function (response) {
					if (response.status !== 200) {
						reject(response.status);
					} else {
						// Examine the text in the response
						response.json().then(function (data) {
							resolve(data);
						});
					}
				}).catch(function (err) {
					reject(err);
				});
			});
		}
	}, {
		key: 'handleRequest',
		value: function handleRequest(method, url) {
			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();

				xhr.open(method, url);

				xhr.onload = function () {
					if (this.status >= 200 && this.status < 300) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject({ status: this.status, statusText: xhr.statusText });
					}
				};

				xhr.onerror = function () {
					reject({ status: this.status, statusText: xhr.statusText });
				};

				xhr.send();
			});
		}
	}, {
		key: 'init',
		value: function init() {
			this.controller.init();
		}
	}]);

	return App;
}();

exports.default = App;

},{"../cfg.js":2,"./Controller.js":4,"./Store.js":5,"./Utils.js":6,"./View.js":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var Controller = function () {
	function Controller(app) {
		_classCallCheck(this, Controller);

		this.app = app;
	}

	_createClass(Controller, [{
		key: "init",
		value: function init() {
			this.app.view.render();
		}
	}]);

	return Controller;
}();

exports.default = Controller;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var Store = function () {
	function Store(app) {
		_classCallCheck(this, Store);

		this.app = app;
	}

	_createClass(Store, [{
		key: 'getObjectsNearby',
		value: function getObjectsNearby() {
			var _this = this;

			return new Promise(function (resolve, reject) {
				_this.app.getCoords().then(function (coords) {
					// Get the first address matching the coordinates

					var getStreets = _this.app.handleRequest('GET', _this.app.config.geoNames.baseUrl + '&lat=' + coords.latitude + '&lng=' + coords.longitude + '&username=' + _this.app.config.geoNames.userName);
					var getCity = _this.app.handleRequest('GET', _this.app.config.google.baseUrls.maps + '?latlng=' + coords.latitude + ',' + coords.longitude + '&key=' + _this.app.config.google.key);

					Promise.all([getStreets, getCity]).then(function (results) {
						var streets = results[0];
						var city = results[1];

						streets = streets.streetSegment.map(function (street) {
							return street.name;
						});
						streets = [].concat(_toConsumableArray(new Set(streets)));
						streets = _this.app.utils.filterArray(streets, '0');

						city = city.results[0];
						city = _this.app.utils.buildAddress(city.address_components);

						var objectReqs = streets.map(function (street) {
							return _this.app.fetchRequest(_this.app.config.funda.baseUrls.search + '/' + _this.app.config.funda.key + '?type=koop&zo=/' + city + '/' + street + '&page=1&pagesize=25');
						});

						Promise.all(objectReqs).then(function (results) {
							var streets = results.map(function (street) {
								return street.Objects;
							});

							// source array concatenation solution: http://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript#answer-37469411
							var objects = [].concat.apply([], streets);

							resolve(objects);
						});
					});
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}]);

	return Store;
}();

exports.default = Store;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */
var Utils = function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, [{
		key: 'buildAddress',
		value: function buildAddress(components) {
			components = components.filter(function (component) {
				// return component.types.includes('route') || component.types.includes('locality');
				return component.types.includes('locality');
			});

			components = components.map(function (component) {
				return component.long_name;
			});

			return components.reduce(function (buffer, current) {
				return buffer + '/' + current;
			});
		}

		// Remove item from array if it contains a subtring

	}, {
		key: 'filterArray',
		value: function filterArray(array, substring) {
			return array.filter(function (item) {
				return !item.includes(substring);
			});
		}
	}]);

	return Utils;
}();

exports.default = Utils;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esversion: 6 */

var View = function () {
	function View(app) {
		_classCallCheck(this, View);

		this.app = app;
	}

	_createClass(View, [{
		key: "render",
		value: function render() {
			this.app.store.getObjectsNearby().then(function (objects) {
				console.log(objects);
			}).catch(function (err) {
				console.log(err);
			});
		}
	}]);

	return View;
}();

exports.default = View;

},{}]},{},[1])

//# sourceMappingURL=app.js.map
