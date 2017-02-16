import React, { Component } from 'react';

export default class Headers extends Component {
	render() {
		let post = this.props;
		return (
			<div>
				<h2><a href="#">{post.title}</a></h2>
				<p>{post.body}</p>
				<a href="">Читать далее</a>
			</div>
		);
	}
}
