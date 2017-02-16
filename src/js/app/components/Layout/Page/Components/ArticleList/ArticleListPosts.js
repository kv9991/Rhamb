import React, { Component } from 'react';

export default class ArticleListPosts extends Component {
	render() {
		return (
			<article className="list">
				<div className="part">
					<div className="meta">
						<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" alt="" />
						<a href="#">Bob Dylan </a> <span>в разделе</span> <a href="#"> Javascript</a>
					</div>
					<h3><a href="#">JavaScript выходит за пределы Web в 2014 году</a> </h3>
				</div>
			</article>
		);
	}
}
