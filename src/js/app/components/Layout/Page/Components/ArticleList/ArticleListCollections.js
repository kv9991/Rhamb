import React, { Component } from 'react';

export default class ArticleListCollections extends Component {
	render() {
		return (
			<article className="list flex va-cntr rows spc-btw">
				<div className="part">
					<div className="meta">
						<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" alt="" />
						<a href="#">Kirill Dubrov </a>
						<span>в разделе</span>
						<img src="http://daynin.github.io/clojurescript-presentation/img/react-logo.png" alt="" />
						<span><a href="">React</a></span>
					</div>
					<h3><a href="">Создаем приложение с server-side рендерингом</a></h3>
				</div>
				<div className="part">
					<div className="circle flex rows va-cntr a-cntr">
						<span data-toggle="tooltip" data-placement="left" title="Материалов в коллекции"><a href="">23</a></span>
					</div>
				</div>
			</article>
		);
	}
}
