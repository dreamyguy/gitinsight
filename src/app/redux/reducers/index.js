import {combineReducers} from 'redux';

import commits from './reducerCommits';
import frontend from './reducerFrontend';

export default combineReducers({
  commits,
  frontend
});
