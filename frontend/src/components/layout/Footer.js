import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Footer = ({ pageType }) => (
  <footer className={classnames('footer', pageType === 'home' && 'footer--home pt-4')}>
    This is the footer
  </footer>
);

Footer.propTypes = {
  pageType: PropTypes.oneOf(['fullscreen', 'home', 'stats-authors', 'stats-global', 'stats-repos']),
};

export default Footer;
