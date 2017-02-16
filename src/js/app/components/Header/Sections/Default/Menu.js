import React, { Component } from 'react';
import { connect } from 'react-redux';

class MenuItem extends Component {
	render() {
		return (
			<li>
				<a href={this.props.url} title={this.props.title}>{this.props.title}</a>
			</li>
		)

	}
}

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderMenu: []
		}
	}
	componentDidMount() {
		this.props.header.menuItems.map((item, i) => {
			this.state.renderMenu.push(<MenuItem key={i} url={item.url} title={item.title} />)
	    })
	}
	render() {
		return (
			<ul className="navigation navigation-horizontal navigation-header">
				{ this.state.renderMenu }
			</ul>
		);
	}
}

function mapStateToProps(state) {
	return {
		header: state.header
	} 
}
export default connect(mapStateToProps)(Menu);