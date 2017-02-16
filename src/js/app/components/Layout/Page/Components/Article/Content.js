import React, { Component } from 'react';
import FeaturedImage from './FeaturedImage.js';
import Headers from './Headers.js';

export default class Content extends Component {
	render() {
		let post = this.props.post;
		return (
			<div className="content"> 
				<FeaturedImage title={post.title} img="https://cdn-images-1.medium.com/max/2000/1*bcZz-qb_DNpvrNNwQBhQmQ.jpeg" />
				<Headers title={post.title} body={post.body} />
			</div>
		);
	}
}
