import {combineReducers} from 'redux';

import commits from './reducerCommits';
import frontend from './reducerFrontend';
import stats from './reducerStats';

export default combineReducers({
  commits,
  frontend,
  stats
});
