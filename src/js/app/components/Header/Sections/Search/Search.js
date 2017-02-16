import React, { Component } from 'react';
import SearchForm from './Form.js';

export default class SectionDefault extends Component {
	
	render() {
		return (
			<div className="inner" id={this.props.id}>
				<div className="row">
					<div className="col-lg-12">
						<div className="part">
							<SearchForm />
						</div>
						<div className="part">
							<button type="button" className="btn btn-default" id="header-search-close-mark">&times;</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
