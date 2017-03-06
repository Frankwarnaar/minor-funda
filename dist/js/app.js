var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    "use strict";

    var cfg$$config = {
        fundaKey: '271175433a7c4fe2a45750d385dd9bfd'
    };

    var cfg$$default = cfg$$config;

    var modules$Controller$$Controller = function () {
        function modules$Controller$$Controller(app) {
            _classCallCheck(this, modules$Controller$$Controller);

            this.app = app;
        }

        _createClass(modules$Controller$$Controller, [{
            key: 'init',
            value: function init() {
                this.app.view.render();
            }
        }]);

        return modules$Controller$$Controller;
    }();

    var modules$Controller$$default = modules$Controller$$Controller;

    var modules$View$$View = function () {
        function modules$View$$View(app) {
            _classCallCheck(this, modules$View$$View);

            this.app = app;
        }

        _createClass(modules$View$$View, [{
            key: 'render',
            value: function render() {
                var _this = this;

                this.app.getCoords().then(function (coords) {
                    _this.app.store.getAssets(coords);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }]);

        return modules$View$$View;
    }();

    var modules$View$$default = modules$View$$View;

    var modules$Store$$Store = function () {
        function modules$Store$$Store(app) {
            _classCallCheck(this, modules$Store$$Store);

            this.app = app;
        }

        _createClass(modules$Store$$Store, [{
            key: 'getAssets',
            value: function getAssets(location) {
                console.log(location);
            }
        }]);

        return modules$Store$$Store;
    }();

    var modules$Store$$default = modules$Store$$Store;

    var modules$App$$App = function () {
        function modules$App$$App() {
            _classCallCheck(this, modules$App$$App);

            this.config = cfg$$default;
            this.controller = new modules$Controller$$default(this);
            this.view = new modules$View$$default(this);
            this.store = new modules$Store$$default(this);
            this.init();
        }

        _createClass(modules$App$$App, [{
            key: 'getCoords',
            value: function getCoords() {
                console.log('getting location');
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
            key: 'init',
            value: function init() {
                this.controller.init();
            }
        }]);

        return modules$App$$App;
    }();

    var modules$App$$default = modules$App$$App;

    (function () {
        'use strict';

        var app = new modules$App$$default();
    })(modules$App$$default);
}).call(undefined);