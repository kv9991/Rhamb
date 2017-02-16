import React, { Component } from 'react';
import Up from './Layout/Up.js';
import HeaderContainer from './Header/HeaderContainer.js';
import PageContainer from './Layout/Page/PageContainer.js';

export default class Main extends Component {
	render() {

		return (
			<div>
				<Up />
				<HeaderContainer />
				{this.props.children}
			</div>
		);
	}
}
