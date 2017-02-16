import React, { Component } from 'react';
import Logo from '../../Logo.js';

export default class SectionDefault extends Component {
	
	render() {
		return (
			<div className="inner" id={this.props.id}>
				<div className="row">
					<div className="col-lg-6">
						<div className="col-lg-2 col-sm-3 logo part">
							
						</div>
						<div className="col-lg-10 col-sm-9 part">
							
						</div>
					</div>
					<div className="col-lg-6" id="header-column-right">
						<div className="col-lg-12 col-sm-12 part flex a-end">
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}
