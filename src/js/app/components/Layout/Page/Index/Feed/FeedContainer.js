import React, { Component } from 'react';
import FeedNavigation from './FeedNavigation.js';
import Feed from './Feed.js';

export default class FeedContainer extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div>
				<div className="col-lg-1">
					<FeedNavigation />
				</div>
				<div className="col-lg-7">
					<Feed />
				</div>
			</div>
		);
	}
}
