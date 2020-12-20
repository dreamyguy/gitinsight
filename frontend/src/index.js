import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './components/hoc/App';
import PageCalendar from './components/pages/PageCalendar';
import PageCommits from './components/pages/PageCommits';
import PageContributors from './components/pages/PageContributors';
import PageCuriosa from './components/pages/PageCuriosa';
import PageRepositories from './components/pages/PageRepositories';
import PageStaleness from './components/pages/PageStaleness';
import PageTrends from './components/pages/PageTrends';
import PageDashboard from './components/pages/PageDashboard';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <App>
        <Switch>
          <Route path="/calendar/" component={PageCalendar} />
          <Route path="/commits/" component={PageCommits} />
          <Route path="/contributors/" component={PageContributors} />
          <Route path="/curiosa/" component={PageCuriosa} />
          <Route path="/repositories/" component={PageRepositories} />
          <Route path="/staleness/" component={PageStaleness} />
          <Route path="/trends/" component={PageTrends} />
          <Route path="/" component={PageDashboard} exact />
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
