import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import store from './redux/store/store';

import {App} from './App';
import Home from './pages/global/Home';

describe('App', () => {
  const app = shallow(
    <Provider store={store}>
      <App>
        <Home/>
      </App>
    </Provider>
  );
  it('renders properly', () => {
    expect(app).toMatchSnapshot();
  });
});
