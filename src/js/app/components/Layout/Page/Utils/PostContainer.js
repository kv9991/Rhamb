import React, { Component } from 'react';
import Article from '../Components/Article/ArticleContainer';
import ArticleListPost from '../Components/ArticleList/ArticleListPosts';
import ArticleListCollection from '../Components/ArticleList/ArticleListCollections';
import ArticleListTool from '../Components/ArticleList/ArticleListTools';
import axios from 'axios';
import { connect } from 'react-redux';
import { createPostRequest, makePostComponent } from '../../../../actions/post';

class PostContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			options: {
				postsPerPage: this.props.options.postsPerPage || 10,
				type: this.props.options.type || 'posts',
				template: this.props.options.template || 'default',
				displayGetPostsButton: this.props.options.displayGetPostsButton || false,
			},
			params: {
				user: this.props.params.user || 0,
				tag: this.props.params.tag || 0,
				category: this.props.params.category || 0
			}
		}
	}

	componentWillMount() {

		const { dispatch, post } = this.props;
		this.state.title = this.createTitle();
		dispatch(createPostRequest(this.state.title, this.constructQuery(), this.state.options, this.state.params))
		
	}
	
	// Создаем компонент
	componentDidMount() {

		const { dispatch, post } = this.props;
		const posts = post.posts[this.state.title].posts;

	}

	createTitle() {
		return (
			this.state.options.type + '-' + 
			this.state.params.user + '-' + 
			this.state.params.tag + '-' +
			this.state.params.category
		)
	}

	serializeQuery(obj) {
		var str = [];
		for(var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	}

	// Создаем Query для Api
	constructQuery() {
		const queryObject = {
			userId: this.state.params.user,
			tag: this.state.params.tag,
			category: this.state.params.user
		};
		const query = this.serializeQuery(queryObject);
		return this.state.URL + '/' + this.state.options.type + '?' + query;
	}


	// Отображаем посты на экране
	pushPosts() {
		const { dispatch, post } = this.props;
		const postState = post.posts[this.state.title];

		let page = postState.currentPage * postState.options.postsPerPage;
		
		for(var i = postState.postsLoaded; i <= page; i++) {
			if (i <= postState.posts.length) { 
				this.pushPostToState(postState.posts[i]);
			} else {
				this.setState({
					isAllPushed: true
				})
			}
		}
		this.state.currentPage += 1;
	}

	pushPostToState(response) {

		const { dispatch, post } = this.props; 

		if (this.state.options.template == 'list') {
			var article;
			switch(this.state.options.type) {
				case 'posts' : 
					var article = React.createElement(ArticleListPost, {data: response, key: response.id});
					break;
				case 'tools' : 
					var article = React.createElement(ArticleListTool, {data: response, key: response.id});

					break;
				case 'collections' :
					var article = React.createElement(ArticleListCollection, {data: response, key: response.id});
					break;
			}
		} else {
			switch(this.state.options.type) {
				case 'posts' : 
					var article = React.createElement(Article, {data: response, key: response.id});
					break;
			}
		}

		dispatch(makePostComponent(article, this.state.title));

	}

	render() {
		// console.log(this.props.post.posts[this.state.title])
		return ( 

			<div>
				{  }
				{ (this.state.options.displayGetPostsButton && !this.state.isAllPushed) ? <button className="btn btn-primary" onClick={() => {this.pushPosts()}}>Загрузить ещё</button> : null }
			</div>
		);
	}
}


function mapStateToProps(state) {
  return { 
  	post: state.post
  }
}


export default connect(mapStateToProps)(PostContainer)