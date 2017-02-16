import { combineReducers } from 'redux';
import post from './post.js';
import header from './header.js';

const reducers = combineReducers({
  post: post,
  header: header
})

export default reducers