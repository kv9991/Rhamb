import { POST_START_FETCH, 
	POST_FETCHING_COMPLETED, 
	POST_FETCHING_ERROR,
	CREATE_POST_REQUEST,
	MAKE_POST_COMPONENT,
	POST_INCREASE_CURRENT_PAGE,
	POST_SET_IS_ALL_PUSHED } from '../actions/post';


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
						posts: action.payload,
						components: [],
						currentPage: 1,
						postsLoaded: 0,
						isAllPushed: false
					}
				}
			})
		case POST_FETCHING_ERROR:
			return state.errors.concat(action.payload)
		case MAKE_POST_COMPONENT: 
			return {
				...state,
				posts: {
					...state.posts,
					[action.title]: {
						...state.posts[action.title],
						components: state.posts[action.title].components.concat(action.payload)
					}
				}
			}
		case POST_INCREASE_CURRENT_PAGE:
			return {
				...state,
				posts: {
					...state.posts,
					[action.title]: {
						...state.posts[action.title],
						currentPage: state.posts[action.title].currentPage + 1
					}
				}
			}
		case POST_SET_IS_ALL_PUSHED: 
			return {
				...state,
				posts: {
					...state.posts,
					[action.title]: {
						...state.posts[action.title],
						isAllPushed: action.payload
					}
				}
			}
		default: 
			return state
	}	
}

export default post

