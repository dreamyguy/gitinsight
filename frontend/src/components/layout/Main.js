import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Main({ children, pageType }) {
  return (
    <main
      className={classnames(
        'flex-1 relative overflow-y-auto focus:outline-none',
        pageType === 'dashboard' && '', // TODO: eventually replace it with something
      )}
    >
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  pageType: PropTypes.oneOf([
    'calendar',
    'commits',
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

export default Main;
