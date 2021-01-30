import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UiContext = createContext({
  uiDarkMode: true,
  uiIsLoading: false,
  uiIsAnimating: false,
});

const UiProvider = ({ children }) => {
  const [uiDarkMode, setUiDarkMode] = useState(true);
  const [uiIsLoading, setUiIsLoading] = useState(false);
  const [uiIsAnimating, setUiIsAnimating] = useState(false);

  return (
    <UiContext.Provider
      value={{
        uiDarkMode,
        setUiDarkMode,
        uiIsLoading,
        setUiIsLoading,
        uiIsAnimating,
        setUiIsAnimating,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

UiProvider.propTypes = {
  children: PropTypes.node,
};

export { UiContext, UiProvider };
