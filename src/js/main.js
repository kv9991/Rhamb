import Bootstrapper from './bootstrapper.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';


	
class Root {
	init() {
		ReactDOM.render(
		  <App />,
		  document.getElementById('root')
		);  
		new Bootstrapper();
	}
}

// Генерируем приложение	
var root = new Root();

// Инициализируем приложение 12
root.init();