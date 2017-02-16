import React, { Component } from 'react';

export default class ArticleListTools extends Component {
	render() {
		return (
			<article className="list flex va-cntr rows spc-btw">
				<div className="part">
					<div className="meta">
						<div className="part">
							<img src="http://daynin.github.io/clojurescript-presentation/img/react-logo.png" alt="" />
							<span>нравится 237 людям</span>
						</div>
					</div> 
					<h3><a href="#">React</a> <small>+13</small></h3>
				</div>
				<div className="part">
					<a href="#" className="btn btn-primary btn-xs">Подписаться</a>
				</div>
			</article>
		);
	}
}
