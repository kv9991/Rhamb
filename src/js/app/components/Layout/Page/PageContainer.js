import React, { Component } from 'react';

export default class PageContainer extends Component {
	static getState(store) {
		return store
	}

	render() {
		return (
			<div id="page">
				<div className="container">
					<div className="row" id="page-wrapper">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
