import React from 'react';
import PropTypes from 'prop-types';
import logo from './../../images/logo.png';
import Nr from './../primitives/Nr/Nr';
import SidebarItem from './SidebarItem';

const SidebarDesktop = ({ commits, contributors, pageType, repositories, stats }) => (
  <div className="hidden lg:flex lg:flex-shrink-0">
    {/* <!-- Static sidebar for desktop --> */}
    <div className="flex flex-col w-64">
      {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
      <div className="flex flex-col h-0 flex-1">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <img className="h-8 w-auto" src={logo} alt="Gitinsight" />
          <span className="text-white px-2 py-2 text-2xl font-semibold">Gitinsight</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
            {stats && (
              <>
                <SidebarItem name="Dashboard" pageType={pageType} type="dashboard" url="/" />
                <SidebarItem
                  badge={<Nr value={contributors} size="md" thousandify />}
                  name="Contributors"
                  pageType={pageType}
                  type="contributors"
                  url="/contributors"
                />
                <SidebarItem
                  badge={<Nr value={repositories} size="md" thousandify />}
                  name="Repositories"
                  pageType={pageType}
                  type="repositories"
                  url="/repositories"
                />
                <SidebarItem
                  badge={<Nr value={commits} size="md" thousandify />}
                  name="Commits"
                  pageType={pageType}
                  type="commits"
                  url="/commits"
                />
                <SidebarItem name="Calendar" pageType={pageType} type="calendar" url="/calendar" />
                <SidebarItem name="Trends" pageType={pageType} type="trends" url="/trends" />
                <SidebarItem
                  name="Staleness"
                  pageType={pageType}
                  type="staleness"
                  url="/staleness"
                />
                <SidebarItem name="Curiosa" pageType={pageType} type="curiosa" url="/curiosa" />
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  </div>
);

SidebarDesktop.propTypes = {
  stats: PropTypes.object,
  commits: PropTypes.number,
  contributors: PropTypes.number,
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
  repositories: PropTypes.number,
};

export default SidebarDesktop;
