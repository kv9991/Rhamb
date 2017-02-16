import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes.js';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import root from 'window-or-global';

const preloadedState = root.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState, applyMiddleware(thunk));
 
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router routes={routes} history={browserHistory}/>
			</Provider>
		);
	} 
} 
