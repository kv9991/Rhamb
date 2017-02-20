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

function shouldCreateRequest(title, state) {
	if (state.post.posts.hasOwnProperty(title)) {
		return true
	} else {
		return false
	}
}
 
export function createPostRequest(title, query) {
	return (dispatch, getState) => {
		if (!shouldCreateRequest(title, getState())) {
			dispatch({type: CREATE_POST_REQUEST, payload: {
				title,
				query,
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