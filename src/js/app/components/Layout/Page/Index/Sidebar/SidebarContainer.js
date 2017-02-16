import React, { Component } from 'react';
import PostContainer from '../../Utils/PostContainer.js';

export default class SidebarContainer extends Component {
	
	render() {
		var editorpick = {
			options: {
				postsPerPage: 3,
				type: 'posts',
				template: 'list'
			},
			params: {
				user: 1
			}
		};

		var collectionspick = {
			options: {
				postsPerPage: 3,
				type: 'collections',
				template: 'list'
			},
			params: {
				user: 1
			}
		};

		var toolspick = {
			options: {
				postsPerPage: 3,
				type: 'tools',
				template: 'list'
			},
			params: {
				user: 1
			}
		};

		return (
			<div className="col-lg-4" id="sidebar-wrapper">
				<section id="sidebar">
					<div className="block">
						<header>
							<div className="title">
								<span className="icon icon-feed"></span> Самое читаемое
							</div>
						</header>

						<PostContainer options={editorpick.options} params={editorpick.params}  />
						
						<a href="#" className="read-more">Посмотреть все</a>
						
						
					</div>
					<div className="block">
						<header>
							<div className="title">
								<span className="icon icon-wrench"></span> Лучшие инструменты
							</div>
						</header>

						<PostContainer options={toolspick.options} params={toolspick.params}  />

						<a href="#" className="read-more">Посмотреть все</a>
						

					</div>
					<div className="block">
						<header>
							<div className="title">
								<span className="icon-layers icon"></span> Лучшие коллекции
							</div>
						</header>
						<PostContainer options={collectionspick.options} params={collectionspick.params}  />

						
						<a href="#" className="read-more">Посмотреть все</a>
					</div>
				</section>
			</div>
		);
	}
}
