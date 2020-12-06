import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const MenuContext = createContext({
  menuIsExpanded: false,
  menuIsAnimating: false,
});

const MenuProvider = ({ children }) => {
  const [menuIsExpanded, setMenuIsExpanded] = useState(false);
  const [menuIsAnimating, setMenuIsAnimating] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        menuIsExpanded,
        setMenuIsExpanded,
        menuIsAnimating,
        setMenuIsAnimating,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node,
};

export { MenuContext, MenuProvider };
