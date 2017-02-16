import React, { Component } from 'react';
import PostContainer from '../../Utils/PostContainer.js';

export default class Feed extends Component {
	render() {
		const feed = {
			options: {
				postsPerPage: 2,
				type: 'posts',
				template: 'default',
				displayGetPostsButton: true
			},
			params: {
				user: 1
			}
		}

		return (
			<PostContainer options={feed.options} params={feed.params}  />
		);
	}
}
