import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Header = ({ pageType }) => (
  <header className={classnames('header', pageType === 'home' && 'header--home pt-4')}>
    This is the header
  </header>
);

Header.propTypes = {
  pageType: PropTypes.oneOf(['fullscreen', 'home', 'stats-authors', 'stats-global', 'stats-repos']),
};

export default Header;
