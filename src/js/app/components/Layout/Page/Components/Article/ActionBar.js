import React, { Component } from 'react';
import ActionBarElement from './ActionBarElement.js';

export default class ActionBar extends Component {
	render() {
		return (
			<ul className="navigation-horizontal navigation">
				<ActionBarElement icon="icon-heart" value="25" title="" />
				<ActionBarElement icon="icon-share" value="13" title="" />
			</ul>
		);
	}
}
