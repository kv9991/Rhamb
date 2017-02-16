import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import PageContainer from './components/Layout/Page/PageContainer.js';
import Index from './components/Layout/Page/Index.js';
import Post from './components/Layout/Page/Post/Post.js';
import Main from './components/Main.js';


module.exports = (
	<Route component={ Main }>
		<Route component={ PageContainer }>
			<Route path="/" component={ Index } />
			<Route path="post/:postId" component={ Post } />
		</Route>
	</Route>
)