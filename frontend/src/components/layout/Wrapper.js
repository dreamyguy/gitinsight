// ! This HOC component's purpose:
// - Fetch the data
// - Set data to relevant context(s)
// - Wrap the layout

import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const Wrapper = ({ pageType, children }) => (
  <div id="wrapper-outer">
    <>
      {pageType !== 'fullscreen' ? (
        <>
          <Header pageType={pageType} />
          <div
            id="wrapper-inner"
            className="
              relative
              w-full max-w-9xl
              mx-auto
              px-4 xl:px-8 xxl:px-16
              z-10
            "
          >
            <Main pageType={pageType}>{children}</Main>
          </div>
          <Footer pageType={pageType} />
        </>
      ) : (
        children
      )}
    </>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node,
  pageType: PropTypes.oneOf(['fullscreen', 'home', 'stats-authors', 'stats-global', 'stats-repos']),
};

export default Wrapper;
