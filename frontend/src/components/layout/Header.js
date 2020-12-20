import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Header = ({ pageType }) => (
  <header className={classnames('header', pageType === 'dashboard' && 'header--dashboard pt-4')}>
    This is the header
  </header>
);

Header.propTypes = {
  pageType: PropTypes.oneOf([
    'calendar',
    'code',
    'contributors',
    'curiosa',
    'repositories',
    'staleness',
    'trends',
    // 'home'
    'dashboard',
    // This page type strips the wrapper, good for modal-like pages
    'fullscreen',
  ]),
};

export default Header;
