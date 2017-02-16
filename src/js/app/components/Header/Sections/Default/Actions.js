import React, { Component } from 'react';

export default class Actions extends Component {
	render() {
		return (
			<nav id="header-navigation-buttons">
				<ul className="navigation navigation-horizontal">
					<li><a href="#" id="header-search-toggler"><span className="icon-magnifier"></span></a></li>
					<li><a href="#" className="btn btn-default">Войти</a></li> 
					<li><a href="#" className="btn btn-default">Зарегистрироваться</a></li>
				</ul>
			</nav>
		);
	}
}
