/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _reactRouter = __webpack_require__(6);

	var _redux = __webpack_require__(7);

	var _header = __webpack_require__(8);

	var header = _interopRequireWildcard(_header);

	var _post = __webpack_require__(9);

	var post = _interopRequireWildcard(_post);

	var _reducers = __webpack_require__(11);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _reactRedux = __webpack_require__(14);

	var _reduxThunk = __webpack_require__(15);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _routes = __webpack_require__(16);

	var _routes2 = _interopRequireDefault(_routes);

	var _App = __webpack_require__(49);

	var _App2 = _interopRequireDefault(_App);

	var _Header = __webpack_require__(40);

	var _Header2 = _interopRequireDefault(_Header);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(51);
	__webpack_require__(52).transform("code", {
	  plugins: ["transform-react-jsx"]
	});

	var app = (0, _express2.default)();
	var jsdom = __webpack_require__(53).jsdom;

	global.document = jsdom('');
	global.window = document.defaultView;
	global.url = 'http://localhost:3000/';

	app.use('/static', _express2.default.static('dist'));
	app.get('*', function (req, res) {

	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {

	    var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));

	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {

	      Promise.all([store.dispatch(header.ready()), store.dispatch(post.ready())]).then(function () {

	        var appHTML = (0, _server.renderToString)(_react2.default.createElement(
	          _reactRedux.Provider,
	          { store: store },
	          _react2.default.createElement(_reactRouter.RouterContext, props)
	        ));

	        var renderedState = store.getState();

	        return {
	          state: renderedState,
	          requests: renderedState.post.posts,
	          html: appHTML
	        };
	      }).then(function (result) {
	        store.dispatch(post.makeRequests(result.requests)).then(function (state) {
	          global.preloadedState = JSON.stringify(result.state);
	          res.send(renderPage(result.html, global.preloadedState));
	        });
	      });

	      /* store.dispatch(header.ready())
	      .then(() => { store.dispatch(posts.ready()).then(() => {
	        
	          const appHTML = renderToString(
	          <Provider store={store}>
	            <RouterContext  {...props} />
	          </Provider> 
	        );
	        global.preloadedState = JSON.stringify(store.getState());
	        const html = renderPage(appHTML, global.preloadedState);
	          res.send(html);
	        console.log(preloadedState);
	      }) }) */
	    } else {
	      res.status(404).send('Not Found');
	    }
	  });
	});

	/* function render(renderProps, res){
	  let store = createStore(reducer, applyMiddleware(thunk));
	  return new Promise((resolve, reject) => {
	      var app = ( <AsyncProvider store={store}><RouterContext {...renderProps} /></AsyncProvider> ); 
	        var html = renderToString(app);
	      return resolve(html);
	  });
	} */

	var renderPage = function renderPage(appHtml, store) {
	  return "\n    <!DOCTYPE html>\n\t<html lang=\"ru\">\n\t<head>\n\t\t<meta charset=\"UTF-8\">\n\t\t<title>Rhamb - \u0431\u043B\u043E\u0433-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0434\u043B\u044F \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0444\u0440\u043E\u043D\u0442-\u044D\u043D\u0434\u0430</title>\n    <link rel=\"stylesheet\" href=\"" + url + "static/styles/main.css\">\n\t\t<link rel=\"stylesheet\" href=\"" + url + "static/public/libs/simple-line/css/simple-line-icons.css\">\n\t\t<link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"" + url + "static/public/images/favicon/favicon-32x32.png\">\n\t\t<link href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,700|Roboto+Slab:300,400,700&amp;subset=cyrillic,cyrillic-ext\" rel=\"stylesheet\">\n\t</head>\n\t<body>\n\t\t<div id=\"root\">" + appHtml + "</div>\n     <script>\n          window.__PRELOADED_STATE__ = " + store + "\n    </script>\n\t\t<script src=\"" + url + "static/main.js\"></script>\n    \n   \n\t</body>\n\t</html>\n   ";
	};

	var PORT = process.env.PORT || 3000;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ready = ready;
	var HEADER_SET_CURRENT_SECTION = exports.HEADER_SET_CURRENT_SECTION = 'HEADER_SET_CURRENT_SECTION';
	var setHeaderSection = function setHeaderSection(value) {
		return {
			type: HEADER_SET_CURRENT_SECTION,
			payload: value
		};
	};

	var SET_HEADER_STATUS = exports.SET_HEADER_STATUS = 'SET_HEADER_STATUS';
	var setHeaderStatus = function setHeaderStatus(value) {
		return {
			type: SET_HEADER_STATUS,
			payload: value
		};
	};

	var HEADER_START_LOADING = exports.HEADER_START_LOADING = 'HEADER_START_LOADING';
	var setHeaderLoadingStatus = function setHeaderLoadingStatus(value) {
		return {
			type: HEADER_START_LOADING,
			payload: value
		};
	};

	var HEADER_MOUNT_MENU = exports.HEADER_MOUNT_MENU = 'HEADER_MOUNT_MENU';
	var mountHeaderMenu = function mountHeaderMenu(value) {
		return {
			type: HEADER_MOUNT_MENU,
			payload: value
		};
	};

	function ready() {

		var defaultMenu = [{
			title: 'Блоги',
			url: '/blogs'
		}, {
			title: 'Инструменты',
			url: '/instruments'
		}, {
			title: 'Коллекции',
			url: '/collections'
		}];

		return function (dispatch) {
			return new Promise(function (resolve, reject) {
				dispatch(setHeaderLoadingStatus(true));
				resolve(true);
			}).then(function () {
				dispatch(setHeaderSection('header-menu'));
			})

			/* Loading Header */
			.then(function () {
				dispatch(mountHeaderMenu(defaultMenu));
			})
			/* End Loading Header */

			.then(function () {
				dispatch(setHeaderLoadingStatus(false));
			}).then(function () {
				dispatch(setHeaderStatus(true));
			});
		};
	}

	/* export function ready() {
	  return function (dispatch) {

	  	return new Promise((resolve, reject) => {
	  		setTimeout(() => {
		  		resolve("header-menu");
		  	}, 1)
	  	})
	  	.then(res => { dispatch(setHeaderSection(res)) })
	  	.then(() => { dispatch(setHeaderStatus(true)) })
	  }
	} */

	// 1. Start Loading. 2. Loading. 3. Finish Loading

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.POST_FETCHING_ERROR = exports.POST_FETCHING_COMPLETED = exports.POST_START_FETCH = exports.CREATE_POST_REQUEST = undefined;
	exports.createPostRequest = createPostRequest;
	exports.makeRequests = makeRequests;
	exports.ready = ready;

	var _axios = __webpack_require__(10);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CREATE_POST_REQUEST = exports.CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
	var createPostRequests = function createPostRequests(value) {
		return {
			type: CREATE_POST_REQUEST,
			payload: value
		};
	};

	var POST_START_FETCH = exports.POST_START_FETCH = 'POST_START_FETCH';
	var startFetching = function startFetching(value) {
		return {
			type: POST_START_FETCH,
			payload: value
		};
	};

	var POST_FETCHING_COMPLETED = exports.POST_FETCHING_COMPLETED = 'POST_FETCHING_COMPLETED';
	var startFetching = function startFetching(value) {
		return {
			type: POST_FETCHING_COMPLETED,
			payload: value
		};
	};

	var POST_FETCHING_ERROR = exports.POST_FETCHING_ERROR = 'POST_FETCHING_ERROR';
	var startFetching = function startFetching(value) {
		return {
			type: POST_FETCHING_ERROR,
			payload: value
		};
	};

	function createPostRequest(title, query) {
		return function (dispatch) {

			dispatch({ type: CREATE_POST_REQUEST, payload: {
					title: title,
					query: query,
					posts: []
				} });

			/* return axios.get('http://jsonplaceholder.typicode.com/posts?userId=1')
	  	.then((result) => { 
	  		dispatch({ type: POST_FETCHING_COMPLETED, payload: result.data, title, query })
	  	})
	  */
		};
	}

	function makeRequests(requests) {
		return function (dispatch) {
			return new Promise(function (resolve, reject) {
				// МОК-АП РЕКВЕСТОВ. СДЕЛАТЬ НАСТОЯЩИЕ РЕКВЕСТЫ!
				setTimeout(function () {
					resolve('123');
				}, 1000);
			});
		};
	}

	/*

	function makeRequests(requests) {
		return (dispatch) => {
			return axios.get(request.query)
			.then(
			(result) => {
				dispatch({ type: POST_FETCHING_COMPLETED, payload: result.data, title, query })
			},
			(err) => {
				console.log(err);
			})
		}
	}

	*/

	function ready() {
		return function (dispatch, getState) {

			var state = getState();
			var requests = state.post.posts;
			var requestsArray = [];

			dispatch({ type: POST_START_FETCH, payload: true });

			requestsArray.map(function (item, i) {
				makeRequest(item);
			});
		};
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(7);

	var _post = __webpack_require__(12);

	var _post2 = _interopRequireDefault(_post);

	var _header = __webpack_require__(13);

	var _header2 = _interopRequireDefault(_header);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var reducers = (0, _redux.combineReducers)({
	  post: _post2.default,
	  header: _header2.default
	});

	exports.default = reducers;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _post = __webpack_require__(9);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var initialState = {
		isFetching: false,
		isFetched: false,
		error: null,
		title: null,
		query: null,
		posts: {}
	};

	var post = function post() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];

		switch (action.type) {
			case _post.CREATE_POST_REQUEST:
				return Object.assign({}, state, {
					posts: Object.assign({}, state.posts, _defineProperty({}, action.payload.title, action.payload))
				});
			case _post.POST_START_FETCH:
				return Object.assign({}, state, {
					isFetching: action.payload
				});
			case _post.POST_FETCHING_COMPLETED:
				return Object.assign({}, state, {
					isFetching: false,
					isFetched: true,
					posts: _extends({}, state.posts, _defineProperty({}, action.title, _extends({}, state.posts[action.title], {
						posts: action.payload
					})))
				});
			case _post.POST_FETCHING_ERROR:
				return state.errors.concat(action.payload);
			default:
				return state;
		}
	};

	exports.default = post;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _header = __webpack_require__(8);

	var initialState = {
		isLoading: false,
		isLoaded: false,
		currentSection: false,
		menuItems: []
	};

	var header = function header() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];

		switch (action.type) {
			case _header.SET_HEADER_STATUS:
				return Object.assign({}, state, {
					isLoaded: action.payload
				});
			case _header.HEADER_SET_CURRENT_SECTION:
				return Object.assign({}, state, {
					currentSection: action.payload
				});
			case _header.HEADER_START_LOADING:
				return Object.assign({}, state, {
					isLoading: action.payload
				});
			case _header.HEADER_MOUNT_MENU:
				return Object.assign({}, state, {
					menuItems: action.payload
				});
			default:
				return state;
		}
	};

	exports.default = header;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(14);

	var _reactRouter = __webpack_require__(6);

	var _PageContainer = __webpack_require__(17);

	var _PageContainer2 = _interopRequireDefault(_PageContainer);

	var _Index = __webpack_require__(18);

	var _Index2 = _interopRequireDefault(_Index);

	var _Post = __webpack_require__(36);

	var _Post2 = _interopRequireDefault(_Post);

	var _Main = __webpack_require__(37);

	var _Main2 = _interopRequireDefault(_Main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
		_reactRouter.Route,
		{ component: _Main2.default },
		_react2.default.createElement(
			_reactRouter.Route,
			{ component: _PageContainer2.default },
			_react2.default.createElement(_reactRouter.Route, { path: '/', component: _Index2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: 'post/:postId', component: _Post2.default })
		)
	);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PageContainer = function (_Component) {
		_inherits(PageContainer, _Component);

		function PageContainer() {
			_classCallCheck(this, PageContainer);

			return _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).apply(this, arguments));
		}

		_createClass(PageContainer, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ id: "page" },
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row", id: "page-wrapper" },
							this.props.children
						)
					)
				);
			}
		}]);

		return PageContainer;
	}(_react.Component);

	exports.default = PageContainer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FeedContainer = __webpack_require__(19);

	var _FeedContainer2 = _interopRequireDefault(_FeedContainer);

	var _SidebarContainer = __webpack_require__(35);

	var _SidebarContainer2 = _interopRequireDefault(_SidebarContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Page = function (_Component) {
		_inherits(Page, _Component);

		function Page() {
			_classCallCheck(this, Page);

			return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
		}

		_createClass(Page, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_FeedContainer2.default, null),
					_react2.default.createElement(_SidebarContainer2.default, null)
				);
			}
		}]);

		return Page;
	}(_react.Component);

	exports.default = Page;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FeedNavigation = __webpack_require__(20);

	var _FeedNavigation2 = _interopRequireDefault(_FeedNavigation);

	var _Feed = __webpack_require__(21);

	var _Feed2 = _interopRequireDefault(_Feed);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FeedContainer = function (_Component) {
		_inherits(FeedContainer, _Component);

		function FeedContainer() {
			_classCallCheck(this, FeedContainer);

			return _possibleConstructorReturn(this, (FeedContainer.__proto__ || Object.getPrototypeOf(FeedContainer)).call(this));
		}

		_createClass(FeedContainer, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: 'col-lg-1' },
						_react2.default.createElement(_FeedNavigation2.default, null)
					),
					_react2.default.createElement(
						'div',
						{ className: 'col-lg-7' },
						_react2.default.createElement(_Feed2.default, null)
					)
				);
			}
		}]);

		return FeedContainer;
	}(_react.Component);

	exports.default = FeedContainer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NavigationElement = function (_Component) {
		_inherits(NavigationElement, _Component);

		function NavigationElement() {
			_classCallCheck(this, NavigationElement);

			return _possibleConstructorReturn(this, (NavigationElement.__proto__ || Object.getPrototypeOf(NavigationElement)).call(this));
		}

		_createClass(NavigationElement, [{
			key: "handleClick",
			value: function handleClick(val) {
				this.props.handleMode(val);
			}
		}, {
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"li",
					null,
					_react2.default.createElement(
						"a",
						{ href: "#", "data-toggle": "tooltip", "data-placement": "right", title: this.props.title },
						_react2.default.createElement("span", { className: this.props.icon + " icon" })
					)
				);
			}
		}]);

		return NavigationElement;
	}(_react.Component);

	var NavigationHr = function (_Component2) {
		_inherits(NavigationHr, _Component2);

		function NavigationHr() {
			_classCallCheck(this, NavigationHr);

			return _possibleConstructorReturn(this, (NavigationHr.__proto__ || Object.getPrototypeOf(NavigationHr)).apply(this, arguments));
		}

		_createClass(NavigationHr, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement("hr", null);
			}
		}]);

		return NavigationHr;
	}(_react.Component);

	var FeedNavigation = function (_Component3) {
		_inherits(FeedNavigation, _Component3);

		function FeedNavigation() {
			_classCallCheck(this, FeedNavigation);

			return _possibleConstructorReturn(this, (FeedNavigation.__proto__ || Object.getPrototypeOf(FeedNavigation)).call(this));
		}

		_createClass(FeedNavigation, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"section",
					{ id: "feed-navigation" },
					_react2.default.createElement(
						"ul",
						{ className: "navigation-vertical navigation" },
						_react2.default.createElement(NavigationElement, { title: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C", icon: "icon-paper-plane" }),
						_react2.default.createElement(NavigationHr, null),
						_react2.default.createElement(NavigationElement, { title: "\u0421\u0432\u0435\u0436\u0435\u0435", icon: "icon-fire" }),
						_react2.default.createElement(NavigationElement, { title: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0438", icon: "icon-star" }),
						_react2.default.createElement(NavigationElement, { mtitle: "\u041B\u0443\u0447\u0448\u0435\u0435", icon: "icon-like" }),
						_react2.default.createElement(NavigationHr, null),
						_react2.default.createElement(NavigationElement, { title: "\u0418\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u044C", icon: "icon-directions" })
					)
				);
			}
		}]);

		return FeedNavigation;
	}(_react.Component);

	exports.default = FeedNavigation;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _PostContainer = __webpack_require__(22);

	var _PostContainer2 = _interopRequireDefault(_PostContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Feed = function (_Component) {
		_inherits(Feed, _Component);

		function Feed() {
			_classCallCheck(this, Feed);

			return _possibleConstructorReturn(this, (Feed.__proto__ || Object.getPrototypeOf(Feed)).apply(this, arguments));
		}

		_createClass(Feed, [{
			key: 'render',
			value: function render() {
				var feed = {
					options: {
						postsPerPage: 2,
						type: 'posts',
						template: 'default',
						displayGetPostsButton: true
					},
					params: {
						user: 1
					}
				};

				return _react2.default.createElement(_PostContainer2.default, { options: feed.options, params: feed.params });
			}
		}]);

		return Feed;
	}(_react.Component);

	exports.default = Feed;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _ArticleContainer = __webpack_require__(23);

	var _ArticleContainer2 = _interopRequireDefault(_ArticleContainer);

	var _ArticleListPosts = __webpack_require__(32);

	var _ArticleListPosts2 = _interopRequireDefault(_ArticleListPosts);

	var _ArticleListCollections = __webpack_require__(33);

	var _ArticleListCollections2 = _interopRequireDefault(_ArticleListCollections);

	var _ArticleListTools = __webpack_require__(34);

	var _ArticleListTools2 = _interopRequireDefault(_ArticleListTools);

	var _axios = __webpack_require__(10);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactRedux = __webpack_require__(14);

	var _post = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
	// Используя этот материал сделать сортировку с помощью state.sortable и функции posts.sort();

	var PostContainer = function (_Component) {
		_inherits(PostContainer, _Component);

		function PostContainer(props) {
			_classCallCheck(this, PostContainer);

			var _this = _possibleConstructorReturn(this, (PostContainer.__proto__ || Object.getPrototypeOf(PostContainer)).call(this, props));

			_this.state = {
				URL: 'http://jsonplaceholder.typicode.com',
				postsIDs: [],
				posts: [],
				sortable: [],
				currentPage: 1,
				postsLoaded: 0,
				isAllPushed: false,
				options: {
					postsPerPage: _this.props.options.postsPerPage || 10,
					type: _this.props.options.type || 'posts',
					template: _this.props.options.template || 'default',
					displayGetPostsButton: _this.props.options.displayGetPostsButton || false
				},
				params: {
					user: _this.props.params.user || 0,
					tag: _this.props.params.tag || 0,
					category: _this.props.params.category || 0
				}
			};
			return _this;
		}

		_createClass(PostContainer, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				var title = 'posts' + '-' + this.state.options.type + '-' + this.state.params.user + '-' + this.state.params.tag + '-' + this.state.params.category;

				var query = this.constructQuery();

				this.props.dispatch((0, _post.createPostRequest)(title, query));

				/* this.props.dispatch({type: CREATE_POST_REQUEST, payload: {
	   	title: title,
	   	query: this.constructQuery()
	   }}) */
			}

			// Создаем компонент

		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.pushPostsIDs(this.constructQuery());
			}
		}, {
			key: 'serializeQuery',
			value: function serializeQuery(obj) {
				var str = [];
				for (var p in obj) {
					if (obj.hasOwnProperty(p)) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
				}return str.join("&");
			}

			// Создаем Query для Api

		}, {
			key: 'constructQuery',
			value: function constructQuery() {
				var queryObject = {
					userId: this.state.params.user,
					tag: this.state.params.tag,
					category: this.state.params.user
				};
				var query = this.serializeQuery(queryObject);
				return this.state.URL + '/' + this.state.options.type + '?' + query;
			}

			// Сохраняем ID постов, которые дает нам Api в State

		}, {
			key: 'pushPostsIDs',
			value: function pushPostsIDs(query) {
				var _this2 = this;

				_axios2.default.get(this.state.URL + '/' + 'posts' + '?' + query).then(function (response) {
					response.data.forEach(function (item, index, arr) {
						_this2.setState({
							postsIDs: _this2.state.postsIDs.concat(item.id)
						});
					});
				}).then(function () {
					_this2.pushPosts();
				});
			}

			// Отображаем посты на экране

		}, {
			key: 'pushPosts',
			value: function pushPosts() {
				var _this3 = this;

				var page = this.state.currentPage * this.state.options.postsPerPage;

				for (var i = this.state.postsLoaded; i < page; i++) {
					if (i < this.state.postsIDs.length) {
						_axios2.default.get(this.state.URL + '/' + 'posts' + '/' + this.state.postsIDs[i])
						// axios.get(baseURI + '/' + type + '/' + state.postsIDs[i])
						.then(function (response) {
							_this3.pushPostToState(response.data);
						}).catch(function (err) {
							console.log(err);
						});
					} else {
						this.setState({
							isAllPushed: true
						});
					}
				}

				this.setState({
					currentPage: this.state.currentPage + 1
				});
			}
		}, {
			key: 'pushPostToState',
			value: function pushPostToState(response) {
				if (this.state.options.template == 'list') {
					var article;
					switch (this.state.options.type) {
						case 'posts':
							var article = _react2.default.createElement(_ArticleListPosts2.default, { data: response, key: response.id });
							break;
						case 'tools':
							var article = _react2.default.createElement(_ArticleListTools2.default, { data: response, key: response.id });

							break;
						case 'collections':
							var article = _react2.default.createElement(_ArticleListCollections2.default, { data: response, key: response.id });
							break;
					}
				} else {
					switch (this.state.options.type) {
						case 'posts':
							var article = _react2.default.createElement(_ArticleContainer2.default, { data: response, key: response.id });
							break;
					}
				}
				this.setState({
					posts: this.state.posts.concat(article),
					postsLoaded: this.state.postsLoaded + 1
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				return _react2.default.createElement(
					'div',
					null,
					this.state.posts,
					this.state.options.displayGetPostsButton && !this.state.isAllPushed ? _react2.default.createElement(
						'button',
						{ className: 'btn btn-primary', onClick: function onClick() {
								_this4.pushPosts();
							} },
						'\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451'
					) : null
				);
			}
		}]);

		return PostContainer;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			post: state.post
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PostContainer);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _User = __webpack_require__(24);

	var _User2 = _interopRequireDefault(_User);

	var _Bar = __webpack_require__(25);

	var _Bar2 = _interopRequireDefault(_Bar);

	var _Content = __webpack_require__(29);

	var _Content2 = _interopRequireDefault(_Content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArticleContainer = function (_Component) {
		_inherits(ArticleContainer, _Component);

		function ArticleContainer(props) {
			_classCallCheck(this, ArticleContainer);

			var _this = _possibleConstructorReturn(this, (ArticleContainer.__proto__ || Object.getPrototypeOf(ArticleContainer)).call(this, props));

			_this.state = {
				post: _this.props.data
			};
			return _this;
		}

		_createClass(ArticleContainer, [{
			key: 'render',
			value: function render() {
				var post = this.state.post;
				return _react2.default.createElement(
					'article',
					{ id: "post-" + post.id, className: 'index' },
					_react2.default.createElement(_User2.default, { id: post.userId }),
					_react2.default.createElement(_Content2.default, { post: post }),
					_react2.default.createElement(_Bar2.default, null)
				);
			}
		}]);

		return ArticleContainer;
	}(_react.Component);

	exports.default = ArticleContainer;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(10);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var User = function (_Component) {
		_inherits(User, _Component);

		function User(props) {
			_classCallCheck(this, User);

			var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, props));

			_this.state = {
				user: []
			};
			return _this;
		}

		_createClass(User, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _this2 = this;

				_axios2.default.get('http://jsonplaceholder.typicode.com/users/' + this.props.id).then(function (response) {
					_this2.setState({
						user: response.data
					});
				}).catch(function (err) {
					console.log(err);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var user = this.state.user;

				return _react2.default.createElement(
					'div',
					{ className: 'user flex va-cntr rows' },
					_react2.default.createElement(
						'div',
						{ className: 'part' },
						_react2.default.createElement('img', { src: 'https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg', alt: '' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'part' },
						_react2.default.createElement(
							'a',
							{ href: '#' },
							user.name
						),
						_react2.default.createElement(
							'span',
							null,
							'\u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435'
						),
						_react2.default.createElement(
							'a',
							{ href: '#' },
							'Javascript'
						),
						_react2.default.createElement(
							'time',
							null,
							'25 \u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F'
						)
					)
				);
			}
		}]);

		return User;
	}(_react.Component);

	exports.default = User;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _CommentBar = __webpack_require__(26);

	var _CommentBar2 = _interopRequireDefault(_CommentBar);

	var _ActionBar = __webpack_require__(28);

	var _ActionBar2 = _interopRequireDefault(_ActionBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bar = function (_Component) {
		_inherits(Bar, _Component);

		function Bar() {
			_classCallCheck(this, Bar);

			return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
		}

		_createClass(Bar, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'footer flex rows va-cntr spc-btw' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_ActionBar2.default, null)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_CommentBar2.default, null)
					)
				);
			}
		}]);

		return Bar;
	}(_react.Component);

	exports.default = Bar;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _ActionBarElement = __webpack_require__(27);

	var _ActionBarElement2 = _interopRequireDefault(_ActionBarElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommentBar = function (_Component) {
		_inherits(CommentBar, _Component);

		function CommentBar() {
			_classCallCheck(this, CommentBar);

			return _possibleConstructorReturn(this, (CommentBar.__proto__ || Object.getPrototypeOf(CommentBar)).apply(this, arguments));
		}

		_createClass(CommentBar, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'ul',
					{ className: 'navigation-horizontal navigation' },
					_react2.default.createElement(_ActionBarElement2.default, { icon: 'icon-speech', value: '2', title: '\u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F' })
				);
			}
		}]);

		return CommentBar;
	}(_react.Component);

	exports.default = CommentBar;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ActionBarElement = function (_Component) {
		_inherits(ActionBarElement, _Component);

		function ActionBarElement() {
			_classCallCheck(this, ActionBarElement);

			return _possibleConstructorReturn(this, (ActionBarElement.__proto__ || Object.getPrototypeOf(ActionBarElement)).apply(this, arguments));
		}

		_createClass(ActionBarElement, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"li",
					null,
					_react2.default.createElement(
						"a",
						{ href: "#" },
						_react2.default.createElement("span", { className: "icon " + this.props.icon }),
						" ",
						this.props.value,
						" ",
						this.props.title
					)
				);
			}
		}]);

		return ActionBarElement;
	}(_react.Component);

	exports.default = ActionBarElement;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _ActionBarElement = __webpack_require__(27);

	var _ActionBarElement2 = _interopRequireDefault(_ActionBarElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ActionBar = function (_Component) {
		_inherits(ActionBar, _Component);

		function ActionBar() {
			_classCallCheck(this, ActionBar);

			return _possibleConstructorReturn(this, (ActionBar.__proto__ || Object.getPrototypeOf(ActionBar)).apply(this, arguments));
		}

		_createClass(ActionBar, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'ul',
					{ className: 'navigation-horizontal navigation' },
					_react2.default.createElement(_ActionBarElement2.default, { icon: 'icon-heart', value: '25', title: '' }),
					_react2.default.createElement(_ActionBarElement2.default, { icon: 'icon-share', value: '13', title: '' })
				);
			}
		}]);

		return ActionBar;
	}(_react.Component);

	exports.default = ActionBar;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _FeaturedImage = __webpack_require__(30);

	var _FeaturedImage2 = _interopRequireDefault(_FeaturedImage);

	var _Headers = __webpack_require__(31);

	var _Headers2 = _interopRequireDefault(_Headers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Content = function (_Component) {
		_inherits(Content, _Component);

		function Content() {
			_classCallCheck(this, Content);

			return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
		}

		_createClass(Content, [{
			key: 'render',
			value: function render() {
				var post = this.props.post;
				return _react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement(_FeaturedImage2.default, { title: post.title, img: 'https://cdn-images-1.medium.com/max/2000/1*bcZz-qb_DNpvrNNwQBhQmQ.jpeg' }),
					_react2.default.createElement(_Headers2.default, { title: post.title, body: post.body })
				);
			}
		}]);

		return Content;
	}(_react.Component);

	exports.default = Content;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FeaturedImage = function (_Component) {
		_inherits(FeaturedImage, _Component);

		function FeaturedImage() {
			_classCallCheck(this, FeaturedImage);

			return _possibleConstructorReturn(this, (FeaturedImage.__proto__ || Object.getPrototypeOf(FeaturedImage)).apply(this, arguments));
		}

		_createClass(FeaturedImage, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "featured-image" },
					_react2.default.createElement("img", { src: this.props.img, alt: this.props.title })
				);
			}
		}]);

		return FeaturedImage;
	}(_react.Component);

	exports.default = FeaturedImage;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Headers = function (_Component) {
		_inherits(Headers, _Component);

		function Headers() {
			_classCallCheck(this, Headers);

			return _possibleConstructorReturn(this, (Headers.__proto__ || Object.getPrototypeOf(Headers)).apply(this, arguments));
		}

		_createClass(Headers, [{
			key: "render",
			value: function render() {
				var post = this.props;
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"h2",
						null,
						_react2.default.createElement(
							"a",
							{ href: "#" },
							post.title
						)
					),
					_react2.default.createElement(
						"p",
						null,
						post.body
					),
					_react2.default.createElement(
						"a",
						{ href: "" },
						"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u0435\u0435"
					)
				);
			}
		}]);

		return Headers;
	}(_react.Component);

	exports.default = Headers;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArticleListPosts = function (_Component) {
		_inherits(ArticleListPosts, _Component);

		function ArticleListPosts() {
			_classCallCheck(this, ArticleListPosts);

			return _possibleConstructorReturn(this, (ArticleListPosts.__proto__ || Object.getPrototypeOf(ArticleListPosts)).apply(this, arguments));
		}

		_createClass(ArticleListPosts, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"article",
					{ className: "list" },
					_react2.default.createElement(
						"div",
						{ className: "part" },
						_react2.default.createElement(
							"div",
							{ className: "meta" },
							_react2.default.createElement("img", { src: "https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg", alt: "" }),
							_react2.default.createElement(
								"a",
								{ href: "#" },
								"Bob Dylan "
							),
							" ",
							_react2.default.createElement(
								"span",
								null,
								"\u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435"
							),
							" ",
							_react2.default.createElement(
								"a",
								{ href: "#" },
								" Javascript"
							)
						),
						_react2.default.createElement(
							"h3",
							null,
							_react2.default.createElement(
								"a",
								{ href: "#" },
								"JavaScript \u0432\u044B\u0445\u043E\u0434\u0438\u0442 \u0437\u0430 \u043F\u0440\u0435\u0434\u0435\u043B\u044B Web \u0432 2014 \u0433\u043E\u0434\u0443"
							),
							" "
						)
					)
				);
			}
		}]);

		return ArticleListPosts;
	}(_react.Component);

	exports.default = ArticleListPosts;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArticleListCollections = function (_Component) {
		_inherits(ArticleListCollections, _Component);

		function ArticleListCollections() {
			_classCallCheck(this, ArticleListCollections);

			return _possibleConstructorReturn(this, (ArticleListCollections.__proto__ || Object.getPrototypeOf(ArticleListCollections)).apply(this, arguments));
		}

		_createClass(ArticleListCollections, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"article",
					{ className: "list flex va-cntr rows spc-btw" },
					_react2.default.createElement(
						"div",
						{ className: "part" },
						_react2.default.createElement(
							"div",
							{ className: "meta" },
							_react2.default.createElement("img", { src: "https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg", alt: "" }),
							_react2.default.createElement(
								"a",
								{ href: "#" },
								"Kirill Dubrov "
							),
							_react2.default.createElement(
								"span",
								null,
								"\u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435"
							),
							_react2.default.createElement("img", { src: "http://daynin.github.io/clojurescript-presentation/img/react-logo.png", alt: "" }),
							_react2.default.createElement(
								"span",
								null,
								_react2.default.createElement(
									"a",
									{ href: "" },
									"React"
								)
							)
						),
						_react2.default.createElement(
							"h3",
							null,
							_react2.default.createElement(
								"a",
								{ href: "" },
								"\u0421\u043E\u0437\u0434\u0430\u0435\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0441 server-side \u0440\u0435\u043D\u0434\u0435\u0440\u0438\u043D\u0433\u043E\u043C"
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "part" },
						_react2.default.createElement(
							"div",
							{ className: "circle flex rows va-cntr a-cntr" },
							_react2.default.createElement(
								"span",
								{ "data-toggle": "tooltip", "data-placement": "left", title: "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0432 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438" },
								_react2.default.createElement(
									"a",
									{ href: "" },
									"23"
								)
							)
						)
					)
				);
			}
		}]);

		return ArticleListCollections;
	}(_react.Component);

	exports.default = ArticleListCollections;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArticleListTools = function (_Component) {
		_inherits(ArticleListTools, _Component);

		function ArticleListTools() {
			_classCallCheck(this, ArticleListTools);

			return _possibleConstructorReturn(this, (ArticleListTools.__proto__ || Object.getPrototypeOf(ArticleListTools)).apply(this, arguments));
		}

		_createClass(ArticleListTools, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"article",
					{ className: "list flex va-cntr rows spc-btw" },
					_react2.default.createElement(
						"div",
						{ className: "part" },
						_react2.default.createElement(
							"div",
							{ className: "meta" },
							_react2.default.createElement(
								"div",
								{ className: "part" },
								_react2.default.createElement("img", { src: "http://daynin.github.io/clojurescript-presentation/img/react-logo.png", alt: "" }),
								_react2.default.createElement(
									"span",
									null,
									"\u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F 237 \u043B\u044E\u0434\u044F\u043C"
								)
							)
						),
						_react2.default.createElement(
							"h3",
							null,
							_react2.default.createElement(
								"a",
								{ href: "#" },
								"React"
							),
							" ",
							_react2.default.createElement(
								"small",
								null,
								"+13"
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "part" },
						_react2.default.createElement(
							"a",
							{ href: "#", className: "btn btn-primary btn-xs" },
							"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
						)
					)
				);
			}
		}]);

		return ArticleListTools;
	}(_react.Component);

	exports.default = ArticleListTools;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _PostContainer = __webpack_require__(22);

	var _PostContainer2 = _interopRequireDefault(_PostContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SidebarContainer = function (_Component) {
		_inherits(SidebarContainer, _Component);

		function SidebarContainer() {
			_classCallCheck(this, SidebarContainer);

			return _possibleConstructorReturn(this, (SidebarContainer.__proto__ || Object.getPrototypeOf(SidebarContainer)).apply(this, arguments));
		}

		_createClass(SidebarContainer, [{
			key: 'render',
			value: function render() {
				var editorpick = {
					options: {
						postsPerPage: 3,
						type: 'posts',
						template: 'list'
					},
					params: {
						user: 1
					}
				};

				var collectionspick = {
					options: {
						postsPerPage: 3,
						type: 'collections',
						template: 'list'
					},
					params: {
						user: 1
					}
				};

				var toolspick = {
					options: {
						postsPerPage: 3,
						type: 'tools',
						template: 'list'
					},
					params: {
						user: 1
					}
				};

				return _react2.default.createElement(
					'div',
					{ className: 'col-lg-4', id: 'sidebar-wrapper' },
					_react2.default.createElement(
						'section',
						{ id: 'sidebar' },
						_react2.default.createElement(
							'div',
							{ className: 'block' },
							_react2.default.createElement(
								'header',
								null,
								_react2.default.createElement(
									'div',
									{ className: 'title' },
									_react2.default.createElement('span', { className: 'icon icon-feed' }),
									' \u0421\u0430\u043C\u043E\u0435 \u0447\u0438\u0442\u0430\u0435\u043C\u043E\u0435'
								)
							),
							_react2.default.createElement(_PostContainer2.default, { options: editorpick.options, params: editorpick.params }),
							_react2.default.createElement(
								'a',
								{ href: '#', className: 'read-more' },
								'\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'block' },
							_react2.default.createElement(
								'header',
								null,
								_react2.default.createElement(
									'div',
									{ className: 'title' },
									_react2.default.createElement('span', { className: 'icon icon-wrench' }),
									' \u041B\u0443\u0447\u0448\u0438\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B'
								)
							),
							_react2.default.createElement(_PostContainer2.default, { options: toolspick.options, params: toolspick.params }),
							_react2.default.createElement(
								'a',
								{ href: '#', className: 'read-more' },
								'\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'block' },
							_react2.default.createElement(
								'header',
								null,
								_react2.default.createElement(
									'div',
									{ className: 'title' },
									_react2.default.createElement('span', { className: 'icon-layers icon' }),
									' \u041B\u0443\u0447\u0448\u0438\u0435 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438'
								)
							),
							_react2.default.createElement(_PostContainer2.default, { options: collectionspick.options, params: collectionspick.params }),
							_react2.default.createElement(
								'a',
								{ href: '#', className: 'read-more' },
								'\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435'
							)
						)
					)
				);
			}
		}]);

		return SidebarContainer;
	}(_react.Component);

	exports.default = SidebarContainer;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Post = function (_Component) {
		_inherits(Post, _Component);

		function Post() {
			_classCallCheck(this, Post);

			return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).apply(this, arguments));
		}

		_createClass(Post, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"div",
						{ className: "col-lg-12" },
						_react2.default.createElement(
							"section",
							{ id: "post" },
							_react2.default.createElement(
								"div",
								{ className: "block" },
								_react2.default.createElement(
									"div",
									{ className: "row" },
									_react2.default.createElement(
										"div",
										{ className: "col-lg-8" },
										_react2.default.createElement(
											"header",
											{ id: "post-header" },
											_react2.default.createElement("div", { className: "meta" }),
											_react2.default.createElement(
												"div",
												{ className: "image" },
												_react2.default.createElement("img", { src: "https://cdn.aaronfagan.ca/uploads/blog-how-to-use-custom-web-fonts-on-your-website.jpg", alt: "" }),
												_react2.default.createElement(
													"div",
													{ className: "image-description" },
													"\u0424\u043E\u0442\u043E \u0432\u0437\u044F\u0442\u043E \u0438\u0437 Photostock.com"
												)
											),
											_react2.default.createElement(
												"div",
												{ className: "row" },
												_react2.default.createElement(
													"div",
													{ className: "col-md-4" },
													_react2.default.createElement(
														"div",
														{ className: "user user-lg pd-10 flex clns a-cntr" },
														_react2.default.createElement("img", { src: "https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" }),
														_react2.default.createElement(
															"div",
															{ className: "name" },
															_react2.default.createElement(
																"a",
																{ href: "" },
																"Koryakovcev Ivan"
															)
														),
														_react2.default.createElement(
															"div",
															{ className: "bio" },
															"\u0412\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A, \u043B\u044E\u0431\u0438\u0442\u0435\u043B\u044C \u0444\u0443\u043D\u0434\u0430\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0445 \u043D\u0430\u0443\u043A"
														),
														_react2.default.createElement(
															"div",
															{ className: "link" },
															_react2.default.createElement(
																"a",
																{ href: "#", className: "btn btn-primary" },
																"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
															)
														)
													)
												),
												_react2.default.createElement(
													"div",
													{ className: "col-md-8" },
													_react2.default.createElement(
														"hgroup",
														null,
														_react2.default.createElement(
															"h1",
															null,
															"\u041A\u0430\u043A \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u0448\u0440\u0438\u0444\u0442\u044B \u0432 \u0432\u0435\u0431\u0435 \u0438 \u043D\u0435 \u0441\u043E\u0439\u0442\u0438 \u0441 \u0443\u043C\u0430"
														),
														_react2.default.createElement(
															"div",
															{ className: "description" },
															"\u0411\u044B\u0432\u0430\u043B\u043E \u043B\u0438 \u0442\u0430\u043A, \u0447\u0442\u043E \u0432\u044B \u0432\u0438\u0434\u0438\u0442\u0435 \u043D\u0430 \u0432\u0435\u0431-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 \u0438 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435, \u043D\u043E \u043D\u0435 \u0432\u0438\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u0430\u200A\u2014\u200A\u043E\u043D \u043F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0430 \u043F\u0430\u0440\u0443 (\u0434\u0435\u0441\u044F\u0442\u043A\u043E\u0432) \u0441\u0435\u043A\u0443\u043D\u0434 \u043F\u043E\u0437\u0436\u0435? \u042D\u0442\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u044E\u0442\u0441\u044F \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u0432\u0435\u0431-\u0448\u0440\u0438\u0444\u0442\u044B. \u041E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u043C, \u043F\u043E\u0447\u0435\u043C\u0443 \u044D\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0438 \u043A\u0430\u043A \u044D\u0442\u043E\u0433\u043E \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C."
														)
													)
												)
											)
										),
										_react2.default.createElement(
											"div",
											{ id: "post-content" },
											_react2.default.createElement(
												"div",
												{ className: "row" },
												_react2.default.createElement(
													"div",
													{ className: "col-lg-12" },
													_react2.default.createElement(
														"h5",
														null,
														"\u0422\u0435\u043A\u0441\u0442"
													)
												)
											),
											_react2.default.createElement(
												"div",
												{ className: "divider" },
												_react2.default.createElement("img", { src: "file:///D:/www/rhamb/prototype/src/img/logo/logo-r-32.png", alt: "" })
											),
											_react2.default.createElement(
												"div",
												{ className: "row" },
												_react2.default.createElement(
													"div",
													{ className: "col-lg-6" },
													_react2.default.createElement(
														"header",
														null,
														_react2.default.createElement(
															"div",
															{ className: "description" },
															"\u0410\u0432\u0442\u043E\u0440"
														)
													),
													_react2.default.createElement(
														"div",
														{ className: "user user-lg flex rows pd-in-10" },
														_react2.default.createElement(
															"div",
															null,
															_react2.default.createElement("img", { src: "https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg", alt: "" })
														),
														_react2.default.createElement(
															"div",
															null,
															_react2.default.createElement(
																"div",
																{ className: "name" },
																"Koryakovcev Ivan"
															),
															_react2.default.createElement(
																"a",
																{ href: "#", className: "btn btn-primary btn-xs" },
																"\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
															)
														)
													)
												),
												_react2.default.createElement(
													"div",
													{ className: "col-lg-6" },
													_react2.default.createElement(
														"header",
														null,
														_react2.default.createElement(
															"div",
															{ className: "description" },
															"\u0422\u0435\u0433\u0438"
														)
													),
													_react2.default.createElement(
														"ul",
														{ className: "tags" },
														_react2.default.createElement(
															"li",
															null,
															_react2.default.createElement(
																"a",
																{ href: "" },
																"Javascript"
															)
														),
														_react2.default.createElement(
															"li",
															null,
															_react2.default.createElement(
																"a",
																{ href: "" },
																"React"
															)
														),
														_react2.default.createElement(
															"li",
															null,
															_react2.default.createElement(
																"a",
																{ href: "" },
																"Angular"
															)
														),
														_react2.default.createElement(
															"li",
															null,
															_react2.default.createElement(
																"a",
																{ href: "" },
																"\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430"
															)
														),
														_react2.default.createElement(
															"li",
															null,
															_react2.default.createElement(
																"a",
																{ href: "" },
																"SPA"
															)
														),
														_react2.default.createElement(
															"li",
															null,
															_react2.default.createElement(
																"a",
																{ href: "" },
																"jQuery"
															)
														)
													)
												)
											)
										)
									),
									_react2.default.createElement(
										"div",
										{ className: "col-lg-4" },
										_react2.default.createElement(
											"div",
											{ id: "post-promo-wrapper" },
											_react2.default.createElement(
												"div",
												{ className: "block", id: "post-promo" },
												_react2.default.createElement(
													"header",
													null,
													_react2.default.createElement(
														"div",
														{ className: "title" },
														"\u0421\u043F\u043E\u043D\u0441\u043E\u0440 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430"
													)
												),
												_react2.default.createElement(
													"div",
													{ className: "promo" },
													_react2.default.createElement(
														"div",
														{ className: "image" },
														_react2.default.createElement("img", { src: "https://assets.servedby-buysellads.com/p/manage/asset/id/26626", alt: "" })
													),
													_react2.default.createElement(
														"div",
														{ className: "title" },
														"Download Jupiter 5!"
													),
													_react2.default.createElement(
														"div",
														{ className: "description" },
														"26,000 users can't be wrong. Join them and download Jupiter today."
													),
													_react2.default.createElement(
														"div",
														{ className: "button" },
														_react2.default.createElement(
															"a",
															{ href: "", className: "btn btn-default" },
															"\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435"
														)
													)
												)
											)
										)
									)
								),
								_react2.default.createElement(
									"div",
									{ className: "row" },
									_react2.default.createElement(
										"div",
										{ className: "col-lg-12" },
										_react2.default.createElement(
											"header",
											null,
											_react2.default.createElement(
												"div",
												{ className: "title" },
												"\u041A\u043E\u043C\u043C\u0435\u0442\u0430\u0440\u0438\u0438"
											)
										),
										_react2.default.createElement(
											"div",
											{ className: "col-lg-6", id: "comments" },
											_react2.default.createElement(
												"article",
												{ className: "comment" },
												_react2.default.createElement(
													"a",
													{ className: "comment-img", href: "#non" },
													_react2.default.createElement("img", { src: "https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg", alt: "", width: "50", height: "50" })
												),
												_react2.default.createElement(
													"div",
													{ className: "comment-body" },
													_react2.default.createElement(
														"div",
														{ className: "text" },
														_react2.default.createElement(
															"p",
															null,
															"\u041C\u043E\u0439 \u043F\u0435\u0440\u0432\u044B\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"
														)
													),
													_react2.default.createElement(
														"p",
														{ className: "attribution" },
														_react2.default.createElement(
															"a",
															{ href: "#" },
															"Koryakovcev Ivan"
														),
														", 2 \u0447\u0430\u0441\u0430 \u043D\u0430\u0437\u0430\u0434"
													)
												)
											),
											_react2.default.createElement(
												"article",
												{ className: "comment" },
												_react2.default.createElement(
													"a",
													{ className: "comment-img", href: "#non" },
													_react2.default.createElement("img", { src: "https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg", alt: "", width: "50", height: "50" })
												),
												_react2.default.createElement(
													"div",
													{ className: "comment-body" },
													_react2.default.createElement(
														"div",
														{ className: "text" },
														_react2.default.createElement(
															"p",
															null,
															"This is a much longer one that will go on for a few lines."
														),
														_react2.default.createElement(
															"p",
															null,
															"It has multiple paragraphs and is full of waffle to pad out the comment. Usually, you just wish these sorts of comments would come to an end."
														)
													),
													_react2.default.createElement(
														"p",
														{ className: "attribution" },
														"by ",
														_react2.default.createElement(
															"a",
															{ href: "#non" },
															"Joe Bloggs"
														),
														" at 2:23pm, 4th Dec 2012"
													)
												)
											),
											_react2.default.createElement(
												"article",
												{ className: "comment" },
												_react2.default.createElement(
													"a",
													{ className: "comment-img", href: "#non" },
													_react2.default.createElement("img", { src: "https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg", alt: "", width: "50", height: "50" })
												),
												_react2.default.createElement(
													"div",
													{ className: "comment-body" },
													_react2.default.createElement(
														"div",
														{ className: "text" },
														_react2.default.createElement(
															"p",
															null,
															"Originally from ",
															_react2.default.createElement(
																"a",
																{ href: "http://cssdeck.com/item/301/timeline-style-blog-comments#comment_289" },
																"cssdeck.com"
															),
															" this presentation has been updated to looks more precisely to the facebook timeline"
														)
													),
													_react2.default.createElement(
														"p",
														{ className: "attribution" },
														"by ",
														_react2.default.createElement(
															"a",
															{ href: "http://www.facebook.com/luky.TikTek" },
															"Luky Vj"
														),
														" at 2:44pm, 14th Apr 2012"
													)
												)
											)
										)
									)
								)
							)
						)
					)
				);
			}
		}]);

		return Post;
	}(_react.Component);

	exports.default = Post;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Up = __webpack_require__(38);

	var _Up2 = _interopRequireDefault(_Up);

	var _HeaderContainer = __webpack_require__(39);

	var _HeaderContainer2 = _interopRequireDefault(_HeaderContainer);

	var _PageContainer = __webpack_require__(17);

	var _PageContainer2 = _interopRequireDefault(_PageContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Main = function (_Component) {
		_inherits(Main, _Component);

		function Main() {
			_classCallCheck(this, Main);

			return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
		}

		_createClass(Main, [{
			key: 'render',
			value: function render() {

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_Up2.default, null),
					_react2.default.createElement(_HeaderContainer2.default, null),
					this.props.children
				);
			}
		}]);

		return Main;
	}(_react.Component);

	exports.default = Main;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Up = function (_Component) {
		_inherits(Up, _Component);

		function Up() {
			_classCallCheck(this, Up);

			return _possibleConstructorReturn(this, (Up.__proto__ || Object.getPrototypeOf(Up)).apply(this, arguments));
		}

		_createClass(Up, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ id: "totop" },
					_react2.default.createElement("span", { className: "icon-arrow-up icon" }),
					_react2.default.createElement(
						"span",
						null,
						"\u0412\u0432\u0435\u0440\u0445"
					)
				);
			}
		}]);

		return Up;
	}(_react.Component);

	exports.default = Up;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Header = __webpack_require__(40);

	var _Header2 = _interopRequireDefault(_Header);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HeaderContainer = function (_Component) {
		_inherits(HeaderContainer, _Component);

		function HeaderContainer() {
			_classCallCheck(this, HeaderContainer);

			return _possibleConstructorReturn(this, (HeaderContainer.__proto__ || Object.getPrototypeOf(HeaderContainer)).apply(this, arguments));
		}

		_createClass(HeaderContainer, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(_Header2.default, null);
			}
		}]);

		return HeaderContainer;
	}(_react.Component);

	exports.default = HeaderContainer;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(41);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Default = __webpack_require__(42);

	var _Default2 = _interopRequireDefault(_Default);

	var _Search = __webpack_require__(46);

	var _Search2 = _interopRequireDefault(_Search);

	var _Post = __webpack_require__(48);

	var _Post2 = _interopRequireDefault(_Post);

	var _reactRedux = __webpack_require__(14);

	var _header = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // React


	// Components


	// Redux Actions


	var Header = function (_Component) {
		_inherits(Header, _Component);

		function Header() {
			_classCallCheck(this, Header);

			var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

			_this.allSections = document.querySelectorAll('.inner-wrapper > .inner');
			_this.searchButton = document.querySelectorAll('#header-search-toggler')[0];
			_this.searchButtonClose = document.querySelectorAll('#header-search-close-mark')[0];
			return _this;
		}

		_createClass(Header, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.makeUnactive();
				this.bindEvents();
				this.props.dispatch({ type: _header.SET_HEADER_STATUS, payload: true });
			}
		}, {
			key: 'makeUnactive',
			value: function makeUnactive() {
				var _this2 = this;

				var self = this;
				this.allSections.forEach(function (item, i, arr) {
					if (item.getAttribute('id') !== _this2.refs.sectionDefault.props.id) {
						item.className += ' header-inactive';
					} else {
						_this2.props.dispatch({ type: _header.HEADER_SET_CURRENT_SECTION, payload: _this2.refs.sectionDefault.props.id });
					}
				});
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {
				var self = this;
				this.searchButton.addEventListener('click', function (e) {
					e.preventDefault;
					self.makeActive('header-search');
				});
				this.searchButtonClose.addEventListener('click', function (e) {
					e.preventDefault;
					self.makeActive('header-menu');
				});
			}
		}, {
			key: 'makeActive',
			value: function makeActive(item) {
				document.getElementById(item).classList.remove('header-inactive');
				document.getElementById(this.props.header.currentSection).classList.add('header-inactive');
				this.props.dispatch({ type: _header.HEADER_SET_CURRENT_SECTION, payload: item });
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ id: 'header' },
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
							'div',
							{ className: 'inner-wrapper' },
							_react2.default.createElement(_Default2.default, { ref: 'sectionDefault', id: 'header-menu' }),
							_react2.default.createElement(_Search2.default, { id: 'header-search' }),
							_react2.default.createElement(_Post2.default, { id: 'header-post' })
						)
					)
				);
			}
		}]);

		return Header;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			header: state.header
		};
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Logo = __webpack_require__(43);

	var _Logo2 = _interopRequireDefault(_Logo);

	var _Menu = __webpack_require__(44);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Actions = __webpack_require__(45);

	var _Actions2 = _interopRequireDefault(_Actions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SectionDefault = function (_Component) {
		_inherits(SectionDefault, _Component);

		function SectionDefault() {
			_classCallCheck(this, SectionDefault);

			return _possibleConstructorReturn(this, (SectionDefault.__proto__ || Object.getPrototypeOf(SectionDefault)).apply(this, arguments));
		}

		_createClass(SectionDefault, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'inner', id: this.props.id },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-lg-6' },
							_react2.default.createElement(
								'div',
								{ className: 'col-lg-2 col-sm-3 logo part' },
								_react2.default.createElement(_Logo2.default, null)
							),
							_react2.default.createElement(
								'div',
								{ className: 'col-lg-10 col-sm-9 part' },
								_react2.default.createElement(_Menu2.default, null)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'col-lg-6', id: 'header-column-right' },
							_react2.default.createElement(
								'div',
								{ className: 'col-lg-12 col-sm-12 part flex a-end' },
								_react2.default.createElement(_Actions2.default, null)
							)
						)
					)
				);
			}
		}]);

		return SectionDefault;
	}(_react.Component);

	exports.default = SectionDefault;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Logo = function (_Component) {
		_inherits(Logo, _Component);

		function Logo() {
			_classCallCheck(this, Logo);

			return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).call(this));
		}

		_createClass(Logo, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "title" },
					_react2.default.createElement(
						"a",
						{ href: "#" },
						_react2.default.createElement("img", { src: "http://localhost:3000/static/public/images/logo/logo-r-32.png" })
					)
				);
			}
		}]);

		return Logo;
	}(_react.Component);

	exports.default = Logo;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuItem = function (_Component) {
		_inherits(MenuItem, _Component);

		function MenuItem() {
			_classCallCheck(this, MenuItem);

			return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
		}

		_createClass(MenuItem, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						'a',
						{ href: this.props.url, title: this.props.title },
						this.props.title
					)
				);
			}
		}]);

		return MenuItem;
	}(_react.Component);

	var Menu = function (_Component2) {
		_inherits(Menu, _Component2);

		function Menu(props) {
			_classCallCheck(this, Menu);

			var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

			_this2.state = {
				renderMenu: []
			};
			return _this2;
		}

		_createClass(Menu, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this3 = this;

				this.props.header.menuItems.map(function (item, i) {
					_this3.state.renderMenu.push(_react2.default.createElement(MenuItem, { key: i, url: item.url, title: item.title }));
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'ul',
					{ className: 'navigation navigation-horizontal navigation-header' },
					this.state.renderMenu
				);
			}
		}]);

		return Menu;
	}(_react.Component);

	function mapStateToProps(state) {
		return {
			header: state.header
		};
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Menu);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Actions = function (_Component) {
		_inherits(Actions, _Component);

		function Actions() {
			_classCallCheck(this, Actions);

			return _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).apply(this, arguments));
		}

		_createClass(Actions, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"nav",
					{ id: "header-navigation-buttons" },
					_react2.default.createElement(
						"ul",
						{ className: "navigation navigation-horizontal" },
						_react2.default.createElement(
							"li",
							null,
							_react2.default.createElement(
								"a",
								{ href: "#", id: "header-search-toggler" },
								_react2.default.createElement("span", { className: "icon-magnifier" })
							)
						),
						_react2.default.createElement(
							"li",
							null,
							_react2.default.createElement(
								"a",
								{ href: "#", className: "btn btn-default" },
								"\u0412\u043E\u0439\u0442\u0438"
							)
						),
						_react2.default.createElement(
							"li",
							null,
							_react2.default.createElement(
								"a",
								{ href: "#", className: "btn btn-default" },
								"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F"
							)
						)
					)
				);
			}
		}]);

		return Actions;
	}(_react.Component);

	exports.default = Actions;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Form = __webpack_require__(47);

	var _Form2 = _interopRequireDefault(_Form);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SectionDefault = function (_Component) {
		_inherits(SectionDefault, _Component);

		function SectionDefault() {
			_classCallCheck(this, SectionDefault);

			return _possibleConstructorReturn(this, (SectionDefault.__proto__ || Object.getPrototypeOf(SectionDefault)).apply(this, arguments));
		}

		_createClass(SectionDefault, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'inner', id: this.props.id },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-lg-12' },
							_react2.default.createElement(
								'div',
								{ className: 'part' },
								_react2.default.createElement(_Form2.default, null)
							),
							_react2.default.createElement(
								'div',
								{ className: 'part' },
								_react2.default.createElement(
									'button',
									{ type: 'button', className: 'btn btn-default', id: 'header-search-close-mark' },
									'\xD7'
								)
							)
						)
					)
				);
			}
		}]);

		return SectionDefault;
	}(_react.Component);

	exports.default = SectionDefault;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SearchForm = function (_Component) {
		_inherits(SearchForm, _Component);

		function SearchForm() {
			_classCallCheck(this, SearchForm);

			return _possibleConstructorReturn(this, (SearchForm.__proto__ || Object.getPrototypeOf(SearchForm)).apply(this, arguments));
		}

		_createClass(SearchForm, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ id: "header-search" },
					_react2.default.createElement(
						"form",
						{ action: "", id: "header-search-form" },
						_react2.default.createElement(
							"div",
							{ className: "input-group input-rounded" },
							_react2.default.createElement("input", { type: "text", name: "search-query", placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430\u043C, \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C" }),
							_react2.default.createElement(
								"div",
								{ className: "input-group-btn" },
								_react2.default.createElement(
									"button",
									{ type: "button", className: "btn btn-default" },
									_react2.default.createElement("span", { className: "icon-magnifier" })
								)
							)
						)
					)
				);
			}
		}]);

		return SearchForm;
	}(_react.Component);

	exports.default = SearchForm;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Logo = __webpack_require__(43);

	var _Logo2 = _interopRequireDefault(_Logo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SectionDefault = function (_Component) {
		_inherits(SectionDefault, _Component);

		function SectionDefault() {
			_classCallCheck(this, SectionDefault);

			return _possibleConstructorReturn(this, (SectionDefault.__proto__ || Object.getPrototypeOf(SectionDefault)).apply(this, arguments));
		}

		_createClass(SectionDefault, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'inner', id: this.props.id },
					_react2.default.createElement(
						'div',
						{ className: 'row' },
						_react2.default.createElement(
							'div',
							{ className: 'col-lg-6' },
							_react2.default.createElement('div', { className: 'col-lg-2 col-sm-3 logo part' }),
							_react2.default.createElement('div', { className: 'col-lg-10 col-sm-9 part' })
						),
						_react2.default.createElement(
							'div',
							{ className: 'col-lg-6', id: 'header-column-right' },
							_react2.default.createElement('div', { className: 'col-lg-12 col-sm-12 part flex a-end' })
						)
					)
				);
			}
		}]);

		return SectionDefault;
	}(_react.Component);

	exports.default = SectionDefault;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(41);

	var _reactRouter = __webpack_require__(6);

	var _routes = __webpack_require__(16);

	var _routes2 = _interopRequireDefault(_routes);

	var _reducers = __webpack_require__(11);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _redux = __webpack_require__(7);

	var _reactRedux = __webpack_require__(14);

	var _reduxThunk = __webpack_require__(15);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _windowOrGlobal = __webpack_require__(50);

	var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var preloadedState = _windowOrGlobal2.default.__PRELOADED_STATE__;

	var composeEnhancers = _windowOrGlobal2.default.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
	var store = (0, _redux.createStore)(_reducers2.default, preloadedState, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));

	var App = function (_Component) {
		_inherits(App, _Component);

		function App() {
			_classCallCheck(this, App);

			return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
		}

		_createClass(App, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_reactRedux.Provider,
					{ store: store },
					_react2.default.createElement(_reactRouter.Router, { routes: _routes2.default, history: _reactRouter.browserHistory })
				);
			}
		}]);

		return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("window-or-global");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("babel-register");

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("babel-core");

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("jsdom");

/***/ }
/******/ ]);