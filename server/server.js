require("babel-register");
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx"]
});

import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext  } from 'react-router';
import { createStore, applyMiddleware } from 'redux';

import * as header from '../src/js/app/actions/header';
import * as post from '../src/js/app/actions/post';

import reducer from '../src/js/app/reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; 

import routes from '../src/js/app/routes';
import App from '../src/js/app/App.js';
import Header from '../src/js/app/components/Header/Header.js';

var app = express();
var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
global.url = 'http://localhost:3000/';

app.use('/static', express.static('dist'));
app.get('*', (req, res) => {

  match({ routes: routes, location: req.url }, (err, redirect, props) => {

    const store = createStore(reducer, applyMiddleware(thunk));
    
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {

    Promise.all([
      store.dispatch(header.ready()),
      store.dispatch(post.ready())
    ])
    .then(() => {
      
      let appHTML = renderToString(
        <Provider store={store}>
          <RouterContext  {...props} />
        </Provider> 
      )

      let renderedState = store.getState();

      return {
        state : renderedState,
        requests : renderedState.post.posts,
        html: appHTML
      };
    })
    .then((result) => {
      store.dispatch(post.makeRequests(result.requests))
      .then((state) => {
        global.preloadedState = JSON.stringify(result.state);
        res.send(renderPage(result.html, global.preloadedState));
      })
    })

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
  })
})

/* function render(renderProps, res){
  let store = createStore(reducer, applyMiddleware(thunk));
  return new Promise((resolve, reject) => {
      var app = ( <AsyncProvider store={store}><RouterContext {...renderProps} /></AsyncProvider> ); 
        var html = renderToString(app);
      return resolve(html);
  });
} */

var renderPage = (appHtml, store) => {
  return `
    <!DOCTYPE html>
	<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<title>Rhamb - блог-платформа для современного фронт-энда</title>
    <link rel="stylesheet" href="${url}static/styles/main.css">
		<link rel="stylesheet" href="${url}static/public/libs/simple-line/css/simple-line-icons.css">
		<link rel="icon" type="image/png" sizes="32x32" href="${url}static/public/images/favicon/favicon-32x32.png">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700|Roboto+Slab:300,400,700&amp;subset=cyrillic,cyrillic-ext" rel="stylesheet">
	</head>
	<body>
		<div id="root">${appHtml}</div>
     <script>
          window.__PRELOADED_STATE__ = ${store}
    </script>
		<script src="${url}static/main.js"></script>
    
   
	</body>
	</html>
   `
}

var PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})