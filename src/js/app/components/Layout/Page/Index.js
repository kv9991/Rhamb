import React, { Component } from 'react';
import FeedContainer from './Index/Feed/FeedContainer.js';
import SidebarContainer from './Index/Sidebar/SidebarContainer.js';

export default class Page extends Component {
	render() {
		return (
			<div>
				<FeedContainer  />
				<SidebarContainer />
			</div>
		);
	}
}
