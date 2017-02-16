











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
			postsIDs: [],
			posts: [],
			sortable: [],
			currentPage: 1,
			postsLoaded: 0,
			isAllPushed: false,
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
		var title = 'posts' + '-' + 
				this.state.options.type + '-' + 
				this.state.params.user + '-' + 
				this.state.params.tag + '-' +
				this.state.params.category;

		var query = this.constructQuery();

		this.props.dispatch(createPostRequest(title, query))
		
		/* this.props.dispatch({type: CREATE_POST_REQUEST, payload: {
			title: title,
			query: this.constructQuery()
		}}) */
		
	}
	
	// Создаем компонент
	componentDidMount() {
		this.pushPostsIDs(this.constructQuery());
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

	// Сохраняем ID постов, которые дает нам Api в State
	pushPostsIDs(query) {
		axios.get(this.state.URL + '/' + 'posts' + '?' + query)
		.then((response) => {
			response.data.forEach((item, index, arr) => {
				this.setState({
					postsIDs: this.state.postsIDs.concat(item.id),
				})
			}) 
		})
		.then(() => {
			this.pushPosts();
		})
	}

	// Отображаем посты на экране
	pushPosts() {
		let page = this.state.currentPage * this.state.options.postsPerPage;
		
		for(var i = this.state.postsLoaded; i < page; i++) {
			if (i < this.state.postsIDs.length) { 
				axios.get(this.state.URL + '/' + 'posts' + '/' + this.state.postsIDs[i])
				// axios.get(baseURI + '/' + type + '/' + state.postsIDs[i])
				.then((response) => {
					this.pushPostToState(response.data);
				})
				.catch((err) => {
				    console.log(err);
				});
			} else {
				this.setState({
					isAllPushed: true
				})
			}
		}

		this.setState({
			currentPage: this.state.currentPage + 1
		})

	}

	pushPostToState(response) {
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