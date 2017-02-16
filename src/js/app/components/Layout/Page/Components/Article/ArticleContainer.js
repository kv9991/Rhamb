import React, { Component } from 'react';
import User from './User.js';
import Bar from './Bar.js';
import Content from './Content.js'

export default class ArticleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: this.props.data
		}
	}
	render() {
		let post = this.state.post;
		return (
			<article id={"post-" + post.id} className="index">
				<User id={post.userId} />
				<Content post={post} />
				<Bar />
			</article>
		);
	}
}
