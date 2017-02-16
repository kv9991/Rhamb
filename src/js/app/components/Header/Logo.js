import React, { Component } from 'react';

export default class Logo extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className="title">
				<a href="#"><img src="http://localhost:3000/static/public/images/logo/logo-r-32.png" /></a>
			</div>
		);
	}
}
