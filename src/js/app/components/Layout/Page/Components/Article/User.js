import React, { Component } from 'react';
import axios from 'axios';

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: []
		}
	}

	componentWillMount() {
		axios.get('http://jsonplaceholder.typicode.com/users/' + this.props.id)
		.then((response) => {
		    this.setState({ 
			    user: response.data
			})
		})
		.catch((err) => {
		    console.log(err);
		});
	}
	render() {
		let user = this.state.user;

		return (
			<div className="user flex va-cntr rows">
				<div className="part">
					<img src="https://pp.vk.me/c626631/v626631328/13a83/kOBi3QH6wek.jpg" alt="" />
				</div>
				<div className="part">
					<a href="#">{user.name}</a><span>в разделе</span><a href="#">Javascript</a>
					<time>25 сентября</time>
				</div>
			</div>
		);

	}
}
