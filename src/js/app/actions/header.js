export const HEADER_SET_CURRENT_SECTION = 'HEADER_SET_CURRENT_SECTION';
var setHeaderSection = (value) => {
	return {
		type: HEADER_SET_CURRENT_SECTION,
		payload: value
	}
}

export const SET_HEADER_STATUS = 'SET_HEADER_STATUS';
var setHeaderStatus = (value) => {
	return {
		type: SET_HEADER_STATUS,
		payload: value
	}
}

export const HEADER_START_LOADING = 'HEADER_START_LOADING';
var setHeaderLoadingStatus = (value) => {
	return {
		type: HEADER_START_LOADING,
		payload: value
	}
}

export const HEADER_MOUNT_MENU = 'HEADER_MOUNT_MENU';
var mountHeaderMenu = (value) => {
	return {
		type: HEADER_MOUNT_MENU,
		payload: value
	}
}

export function ready() {

  const defaultMenu = [{
		title: 'Блоги',
		url: '/blogs'
	}, 
	{
		title: 'Инструменты',
		url: '/instruments'
	},
	{
		title: 'Коллекции',
		url: '/collections'
	}]

  return function (dispatch) {
  	return new Promise((resolve, reject) => {
  		dispatch(setHeaderLoadingStatus(true));
  		resolve(true);
  	})
  	.then(() => { dispatch(setHeaderSection('header-menu')) })

  	/* Loading Header */
  	.then(() => { dispatch(mountHeaderMenu(defaultMenu)) })
  	/* End Loading Header */

  	.then(() => { dispatch(setHeaderLoadingStatus(false)) })
  	.then(() => { dispatch(setHeaderStatus(true)) })

  }
}


/* export function ready() {
  return function (dispatch) {

  	return new Promise((resolve, reject) => {
  		setTimeout(() => {
	  		resolve("header-menu");
	  	}, 1)
  	})
  	.then(res => { dispatch(setHeaderSection(res)) })
  	.then(() => { dispatch(setHeaderStatus(true)) })
  }
} */ 

// 1. Start Loading. 2. Loading. 3. Finish Loading