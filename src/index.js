import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import store from './app/redux/store/store';
import {App} from './app/App';
import Home from './app/pages/global/Home';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/gitinsight" component={Home}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
