import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes.js';
import reducer from './reducers';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import root from 'window-or-global';

const preloadedState = root.__PRELOADED_STATE__;

const composeEnhancers = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, preloadedState, composeEnhancers(
	applyMiddleware(thunk))
);
 
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router routes={routes} history={browserHistory}/>
			</Provider>
		);
	} 
} 
