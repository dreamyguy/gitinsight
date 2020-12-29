/* eslint-disable jsx-a11y/anchor-is-valid */
// ! This HOC component's purpose:
// - Fetch the data
// - Set data to relevant context(s)
// - Wrap the layout

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { sidebarQuery } from './../../graphql/queries';
import Main from './Main';
import Responsive from './Responsive';
import OffCanvasMenuMobile from './../content/OffCanvasMenuMobile';
import SidebarDesktop from './../content/SidebarDesktop';
import TopSection from './../content/TopSection';
// Import font 'ubuntu'
import 'fontsource-ubuntu';

const Wrapper = ({ pageType, children }) => {
  const {
    data: { statsGlobal, statsGlobal: { commits, contributors, repositories } = {} } = {},
  } = useQuery(sidebarQuery);
  return (
    <>
      <div className="antialiased font-sans bg-gray-200 h-screen">
        {pageType !== 'fullscreen' ? (
          <>
            <div className="h-screen flex overflow-hidden bg-gray-100">
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
    </>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  pageType: PropTypes.oneOf([
    'calendar',
    'commits',
    'contributors',
    'curiosa',
    'repositories',
    'staleness',
    'trends',
    'dashboard',
    // This page type strips the wrapper, good for modal-like pages
    'fullscreen',
  ]),
};

export default Wrapper;
