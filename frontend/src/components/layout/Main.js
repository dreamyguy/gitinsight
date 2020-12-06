import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Main({ children, pageType }) {
  return (
    <main
      className={classnames('relative', 'flex flex-wrap', pageType === 'home' && 'pt-4 md:pt-8')}
    >
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  pageType: PropTypes.oneOf(['fullscreen', 'home', 'stats-authors', 'stats-global', 'stats-repos']),
};

export default Main;
