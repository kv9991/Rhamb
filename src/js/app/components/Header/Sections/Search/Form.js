import React, { Component } from 'react';

export default class SearchForm extends Component {
	render() {
		return (
			<div id="header-search">
				<form action="" id="header-search-form">
					<div className="input-group input-rounded">
						<input type="text" name="search-query" placeholder="Поиск по материалам, пользователям" />
						<div className="input-group-btn">
							<button type="button" className="btn btn-default"><span className="icon-magnifier"></span></button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
