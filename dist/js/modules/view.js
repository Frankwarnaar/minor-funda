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
			var _this = this;

			this.app.getLocation().then(function (coords) {
				_this.app.store.getAssets(coords);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}]);

	return View;
}();