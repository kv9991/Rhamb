import React, { Component } from 'react';
import ActionBarElement from './ActionBarElement.js';

export default class CommentBar extends Component {
	render() {
		return (
			<ul className="navigation-horizontal navigation">
				<ActionBarElement icon="icon-speech" value="2" title="комментария" />
			</ul>
		);
	}
}
