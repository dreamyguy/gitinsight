/* eslint-disable jsx-a11y/anchor-is-valid */
// ! This HOC component's purpose:
// - Fetch the data
// - Set data to relevant context(s)
// - Wrap the layout

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import { sidebarQuery } from './../../graphql/queries';
import { UiContext } from './../../contexts';
import Main from './Main';
import Responsive from './Responsive';
import OffCanvasMenuMobile from './../content/OffCanvasMenuMobile';
import SidebarDesktop from './../content/SidebarDesktop';
import TopSection from './../content/TopSection';
// Import font 'ubuntu'
import 'fontsource-ubuntu';

const Wrapper = ({ pageType, children }) => {
  const { uiDarkMode } = useContext(UiContext);
  const {
    data: { statsGlobal, statsGlobal: { commits, contributors, repositories } = {} } = {},
  } = useQuery(sidebarQuery);
  return (
    <div className={classnames(uiDarkMode ? 'dark' : '')}>
      <div className="antialiased font-sans dark:bg-gray-800 bg-gray-200 h-screen">
        {pageType !== 'fullscreen' ? (
          <>
            <div className="h-screen flex overflow-hidden dark:bg-gray-900 bg-gray-100">
              <OffCanvasMenuMobile
                stats={statsGlobal}
                commits={commits}
                contributors={contributors}
                repositories={repositories}
                pageType={pageType}
              />
              <SidebarDesktop
                stats={statsGlobal}
                commits={commits}
                contributors={contributors}
                repositories={repositories}
                pageType={pageType}
              />
              <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <TopSection pageType={pageType} />
                <Main pageType={pageType}>
                  <Responsive />
                  {children}
                </Main>
              </div>
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
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

export default Wrapper;
