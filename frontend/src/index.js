import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './components/hoc/App';
import HomePage from './components/pages/HomePage';
import './styles/tailwind.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <App>
        <Switch>
          <Route path="/:paramYear/" component={HomePage} />
          <Route path="/" component={HomePage} exact />
        </Switch>
      </App>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
