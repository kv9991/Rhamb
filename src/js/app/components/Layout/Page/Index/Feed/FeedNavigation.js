import React, { Component } from 'react';

class NavigationElement extends Component {
	constructor() {
		super();
	}
	handleClick(val) {
		this.props.handleMode(val);
	}
	render() {
		return (
			<li> 
				<a href="#" data-toggle="tooltip" data-placement="right" title={this.props.title}>
					<span className={this.props.icon + " icon"}></span>
				</a>
			</li>
		);
	}
}

class NavigationHr extends Component {
	render() {
		return (
			<hr />
		)
	}
}


export default class FeedNavigation extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<section id="feed-navigation">
				<ul className="navigation-vertical navigation">
					<NavigationElement title="Написать" icon="icon-paper-plane" />
					<NavigationHr /> 
					<NavigationElement title="Свежее" icon="icon-fire" />
					<NavigationElement title="Подписки" icon="icon-star" />
					<NavigationElement mtitle="Лучшее" icon="icon-like" />
					<NavigationHr />
					<NavigationElement title="Исследовать" icon="icon-directions" />
				</ul>
			</section>
		);
	}
}
