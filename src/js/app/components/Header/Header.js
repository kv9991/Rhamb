// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Components
import SectionDefault from './Sections/Default/Default.js';
import SectionSearch from './Sections/Search/Search.js';
import SectionPost from './Sections/Post/Post.js';

// Redux Actions
import { connect } from 'react-redux';
import { HEADER_SET_CURRENT_SECTION, SET_HEADER_STATUS } from '../../actions/header';

class Header extends Component {
	constructor() {
		super();
		this.allSections = document.querySelectorAll('.inner-wrapper > .inner');
		this.searchButton = document.querySelectorAll('#header-search-toggler')[0];
		this.searchButtonClose = document.querySelectorAll('#header-search-close-mark')[0];
	}

	componentDidMount() {		
		this.makeUnactive();
		this.bindEvents();
		this.props.dispatch({type: SET_HEADER_STATUS, payload: true});
	}

	makeUnactive() {
		var self = this;
		this.allSections.forEach((item, i, arr) => {
			if (item.getAttribute('id') !== this.refs.sectionDefault.props.id) {
				item.className += ' header-inactive';
			} else {
				this.props.dispatch({type: HEADER_SET_CURRENT_SECTION, payload: this.refs.sectionDefault.props.id});
			}
		})
	}

	bindEvents() {
		var self = this;
		this.searchButton.addEventListener('click', (e) => {
			e.preventDefault;
			self.makeActive('header-search');
		})
		this.searchButtonClose.addEventListener('click', (e) => {
			e.preventDefault;
			self.makeActive('header-menu');
		})
	}

	makeActive(item) {
		document.getElementById(item).classList.remove('header-inactive');
		document.getElementById(this.props.header.currentSection).classList.add('header-inactive');
		this.props.dispatch({type: HEADER_SET_CURRENT_SECTION, payload: item});
	}

	render() {
		return (
			<div id="header">
				<div className="container">
					<div className="inner-wrapper">
						<SectionDefault ref="sectionDefault" id="header-menu" />
						<SectionSearch id="header-search" />
						<SectionPost id="header-post" />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { 
  	header: state.header
  }
}

export default connect(mapStateToProps)(Header)