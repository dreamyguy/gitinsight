// This HOC component is meant for one thing only: be a host for
//  the HOP (higher-order-providers):
//  - 'ApolloProvider'
//  - 'ContextProvider'

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import PropTypes from 'prop-types';
import { ContextProvider } from '../../contexts';
import client from './../../graphql/client';

function App({ children }) {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <ContextProvider>{children}</ContextProvider>
      </ApolloProvider>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
