import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './app/redux/store/store';
import {Layout} from './app/pages/Layout';
import Home from './app/pages/global/Home';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="/gitinsight" component={Home}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
