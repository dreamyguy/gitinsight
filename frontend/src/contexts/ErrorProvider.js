import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ErrorContext = createContext({
  errors: [],
});

const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  return (
    <ErrorContext.Provider
      value={{
        errors,
        setErrors,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node,
};

export { ErrorContext, ErrorProvider };
