











// http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
// Используя этот материал сделать сортировку с помощью state.sortable и функции posts.sort();

import React, { Component } from 'react';
import Article from '../Components/Article/ArticleContainer';
import ArticleListPost from '../Components/ArticleList/ArticleListPosts';
import ArticleListCollection from '../Components/ArticleList/ArticleListCollections';
import ArticleListTool from '../Components/ArticleList/ArticleListTools';
import axios from 'axios';
import { connect } from 'react-redux';
import { createPostRequest } from '../../../../actions/post';

class PostContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			URL: 'http://jsonplaceholder.typicode.com',
			postsRaw: [],
			posts: [],
			sortable: [],
			currentPage: 1,
			postsLoaded: 0,
			isAllPushed: false,
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

		this.state.title = 'posts' + '-' + 
				this.state.options.type + '-' + 
				this.state.params.user + '-' + 
				this.state.params.tag + '-' +
				this.state.params.category;

		this.props.dispatch(createPostRequest(this.state.title, this.constructQuery()))
		
	}
	
	// Создаем компонент
	componentDidMount() {
		var posts = this.props.post.posts[this.state.title].posts;

		posts.forEach((post) => {
			this.state.postsRaw = this.state.postsRaw.concat(post);
		})

		this.pushPosts();
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
		let page = this.state.currentPage * this.state.options.postsPerPage;
		
		for(var i = this.state.postsLoaded; i <= page; i++) {
			if (i <= this.state.postsRaw.length) { 
				this.pushPostToState(this.state.postsRaw[i]);
			} else {
				this.setState({
					isAllPushed: true
				})
			}
		}
		this.state.currentPage += 1;




	}

	pushPostToState(response) {
		console.log(response);
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

		this.setState({ 
		    posts: this.state.posts.concat(article),
			postsLoaded: this.state.postsLoaded + 1,
		})

	}

	render() {
		console.log(this.state.posts)
		return ( 

			<div>
				{ this.state.posts }
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