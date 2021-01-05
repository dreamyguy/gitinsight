import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Footer = ({ pageType }) => (
  <footer className={classnames('footer', pageType === 'dashboard' && 'footer--dashboard pt-4')}>
    This is the footer
  </footer>
);

Footer.propTypes = {
  pageType: PropTypes.oneOf([
    'calendar',
    'commits',
    'contributor',
    'contributors',
    'curiosa',
    'repositories',
    'repository',
    'staleness',
    'trends',
    'dashboard',
    // This page type strips the wrapper, good for modal-like pages
    'fullscreen',
  ]),
};

export default Footer;
