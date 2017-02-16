import React, { Component } from 'react';

export default class FeaturedImage extends Component {
	render() {
		return (
			<div className="featured-image">
				<img src={this.props.img} alt={this.props.title} /> 
			</div>
		);
	}
}
