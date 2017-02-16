import React, { Component } from 'react';
import CommentBar from './CommentBar.js';
import ActionBar from './ActionBar.js';

export default class Bar extends Component {
	render() {
		return (
			<div className="footer flex rows va-cntr spc-btw">
				<div>
					<ActionBar />
				</div>
				<div>
					<CommentBar />
				</div>
			</div>
		);
	}
}
