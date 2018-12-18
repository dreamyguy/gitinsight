import {combineReducers} from 'redux';

import commits from './reducerCommits';
import frontend from './reducerFrontend';
import statsGlobal from './reducerStatsGlobal';
import statsRepo from './reducerStatsRepo';
import statsContributors from './reducerStatsContributors';

export default combineReducers({
  commits,
  frontend,
  statsGlobal,
  statsRepo,
  statsContributors
});
