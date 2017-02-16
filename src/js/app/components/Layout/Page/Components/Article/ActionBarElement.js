import React, { Component } from 'react';

export default class ActionBarElement extends Component {
	render() {
		return (
			<li><a href="#"><span className={"icon " + this.props.icon}></span> {this.props.value} {this.props.title}</a></li>
		);
	}
}
