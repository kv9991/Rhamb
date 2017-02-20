import { POST_START_FETCH, 
	POST_FETCHING_COMPLETED, 
	POST_FETCHING_ERROR,
	CREATE_POST_REQUEST } from '../actions/post';


var initialState = {
	isFetching: false,
	isFetched: false,
	posts: {}
}

const post = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_POST_REQUEST: 
			return Object.assign({}, state, {
				posts: Object.assign({}, state.posts, {
					[action.payload.title] : action.payload
				})
			})
		case POST_START_FETCH:
			return Object.assign({}, state, {
				isFetching: action.payload
			})
		case POST_FETCHING_COMPLETED:
			return Object.assign({}, state, {
				isFetching: false,
				isFetched: true,
				posts: {
					...state.posts,
					[action.title]: {
						...state.posts[action.title],
						posts: action.payload
					}
				}
			})
		case POST_FETCHING_ERROR:
			return state.errors.concat(action.payload)
		default: 
			return state
	}	
}

export default post

