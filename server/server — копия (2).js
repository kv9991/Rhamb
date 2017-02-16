require("babel-register");
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx"]
});

import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import reducer from '../src/js/app/reducers';

import routes from '../src/js/app/routes';
import App from '../src/js/app/App.js';

var app = express();
var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
global.url = 'http://localhost:3000/';

app.use('/static', express.static('dist'));
app.get('*', (req, res) => {

  match({ routes: routes, location: req.url }, (err, redirect, props) => {

    /* let history = createMemoryHistory();
    let store = configureStore();
    let routes = createRoutes(history);
    let location = createLocation(req.url) */
    
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      renderAsync(req, res, props);
    } else {
      res.status(404).send('Not Found')
    }
  })
})


function renderAsync(req, res, renderProps){
  var app = (
    <RoutingContext {...renderProps} />
  );
  renderToString(app).then(function({html}){
    return res.send(renderPage(html));
  });
}


var renderPage = (appHtml) => {
  return `
    <!DOCTYPE html>
	<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<title>Rhamb - блог-платформа для современного фронт-энда</title>
		<link rel="stylesheet" href="${url}static/public/libs/simple-line/css/simple-line-icons.css">
		<link rel="icon" type="image/png" sizes="32x32" href="${url}static/public/images/favicon/favicon-32x32.png">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700|Roboto+Slab:300,400,700&amp;subset=cyrillic,cyrillic-ext" rel="stylesheet">
	</head>
	<body>
		<div id="root">${appHtml}</div>
		<script src="${url}static/bundle.js"></script>
	</body>
	</html>
   `
}

var PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})