import axios from 'axios'

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
var createPostRequests = (value) => {
	return {
		type: CREATE_POST_REQUEST,
		payload: value
	}
}

export const POST_START_FETCH = 'POST_START_FETCH';
var startFetching = (value) => {
	return {
		type: POST_START_FETCH,
		payload: value
	}
}

export const POST_FETCHING_COMPLETED = 'POST_FETCHING_COMPLETED';
var startFetching = (value) => {
	return {
		type: POST_FETCHING_COMPLETED,
		payload: value
	}
}

export const POST_FETCHING_ERROR = 'POST_FETCHING_ERROR';
var startFetching = (value) => {
	return {
		type: POST_FETCHING_ERROR,
		payload: value
	}
}

export const POST_INCREASE_CURRENT_PAGE = 'POST_INCREASE_CURRENT_PAGE';
function increaseCurrentPage(title) {
	return {
		type: POST_INCREASE_CURRENT_PAGE,
		title
	}
}

export const POST_SET_IS_ALL_PUSHED = 'POST_SET_IS_ALL_PUSHED';
function setIsAllPushed(value) {
	return {
		type: POST_SET_IS_ALL_PUSHED,
		payload: value
	}
}


export const CREATE_POST_COMPONENTS = 'CREATE_POST_COMPONENTS';
function createPostComponents(posts, title) {
	return (dispatch, getState) => {


		let postState = getState().post.posts[title];
		let page = postState.currentPage * postState.options.postsPerPage;
		
		for(var i = postState.postsLoaded; i <= page; i++) {
			if (i <= posts.length) { 
				console.log(posts[i])
				dispatch(makePostComponent(posts[i], title))
			} else {
				dispatch(setIsAllPushed(true));
			}
		}

		dispatch(increaseCurrentPage(title));

	}
}

export const MAKE_POST_COMPONENT = 'MAKE_POST_COMPONENT';
function makePostComponent(post, title) {
	return {
		type: MAKE_POST_COMPONENT,
		payload: post,
		title
	}
}

function shouldCreateRequest(title, state) {
	if (state.post.posts.hasOwnProperty(title)) {
		return true
	} else {
		return false
	}
}
 
export function createPostRequest(title, query, options, params) {
	return (dispatch, getState) => {
		if (!shouldCreateRequest(title, getState())) {
			dispatch({type: CREATE_POST_REQUEST, payload: {
				title,
				query,
				options,
				params,
				posts: null
			}})
		} else {
			return true
		}
	}
}


function makeRequest(request, dispatch) {
	return axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
		.then((result) => {
			dispatch({ 
				type: POST_FETCHING_COMPLETED, 
				payload: result.data, 
				title: request.title, 
				query: request.query 
			})
			return result
		})
		.then((result) => {
			dispatch(createPostComponents(result.data, request.title))
		})
}

export function makeRequests(requests) {
	return (dispatch, getState) => {
		var promises = [];

		Object.values(requests).forEach((request) => {
			promises.push(makeRequest(request, dispatch));
		})

		let chain = Promise.resolve();
			
		return Promise.all(promises).then(() => {
			return getState();
		});
	}
}

/* this.setState({ 
		    posts: this.state.posts.concat(article),
			postsLoaded: this.state.postsLoaded + 1,

/*

function makeRequests(requests) {
	return (dispatch) => {
		return axios.get(request.query)
		.then(
		(result) => {
			dispatch({ type: POST_FETCHING_COMPLETED, payload: result.data, title, query })
		},
		(err) => {
			console.log(err);
		})
	}
}

*/

export function ready() {
	return (dispatch, getState) => {
		
		const state = getState();
		const requests = state.post.posts;
		var requestsArray = [];

		dispatch({ type: POST_START_FETCH, payload: true })

		requestsArray.map((item, i) => {
			makeRequest(item);
		})
	}
}