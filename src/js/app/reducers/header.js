import { SET_HEADER_STATUS, 
	HEADER_SET_CURRENT_SECTION,
	HEADER_START_LOADING,
	HEADER_MOUNT_MENU } from '../actions/header';

const initialState = {
	isLoading: false,
	isLoaded: false,
	currentSection: false,
	menuItems: []
}

const header = (state = initialState, action) => {
	switch (action.type) {
	    case SET_HEADER_STATUS:
	    	return Object.assign({}, state, {
			    isLoaded: action.payload
			});
		case HEADER_SET_CURRENT_SECTION:
			return Object.assign({}, state, {
			    currentSection: action.payload
			});
		case HEADER_START_LOADING: 
			return Object.assign({}, state, {
				isLoading: action.payload 
			});
		case HEADER_MOUNT_MENU: 
			return Object.assign({}, state, {
				menuItems: action.payload
			});
		default: 
			return state
	}	
}

export default header

