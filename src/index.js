import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './app/redux/store/store';
import {Layout} from './app/pages/Layout';
import Home from './app/pages/global/Home';
import StatsGlobal from './app/pages/global/StatsGlobal';
import StatsRepo from './app/pages/global/StatsRepo';
import StatsContributors from './app/pages/global/StatsContributors';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="/stats-global" component={StatsGlobal}/>
        <Route path="/stats-repo/:repoName/" component={StatsRepo}/>
        <Route path="/stats-contributors" component={StatsContributors}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
