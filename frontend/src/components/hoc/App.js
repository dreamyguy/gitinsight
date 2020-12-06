// This HOC component is meant for one thing only: be a host for the 'ContextProvider'
import React from 'react';
import PropTypes from 'prop-types';
import { ContextProvider } from '../../contexts';

function App({ children }) {
  return (
    <div className="App">
      <ContextProvider>{children}</ContextProvider>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
