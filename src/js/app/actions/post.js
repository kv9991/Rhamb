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

export function createPostRequest(title, query) {
	return (dispatch) => {

		dispatch({type: CREATE_POST_REQUEST, payload: {
			title,
			query,
			posts: []
		}})

		/* return axios.get('http://jsonplaceholder.typicode.com/posts?userId=1')
			.then((result) => { 
				dispatch({ type: POST_FETCHING_COMPLETED, payload: result.data, title, query })
			})
		*/
	}
}

export function makeRequests(requests) {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			// МОК-АП РЕКВЕСТОВ. СДЕЛАТЬ НАСТОЯЩИЕ РЕКВЕСТЫ!
			setTimeout(() => {
				resolve('123');
			}, 1000)
		})
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