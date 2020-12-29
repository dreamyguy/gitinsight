import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { X } from './../primitives/Icon';
import logo from './../../images/logo.png';
import { MenuContext } from './../../contexts';
import SidebarItem from './SidebarItem';
import { thousandify } from './../../utils/thousandifyUtil';

const OffCanvasMenuMobile = ({ commits, contributors, pageType, repositories, stats }) => {
  const { menuIsExpanded, setMenuIsExpanded } = useContext(MenuContext);
  const handleClick = () => {
    setMenuIsExpanded(!menuIsExpanded);
  };
  return (
    <>
      {menuIsExpanded && (
        <div className="lg:hidden">
          {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
          <div className="fixed inset-0 flex z-40">
            {/* <!--
              Off-canvas menu overlay, show/hide based on off-canvas menu state.

              Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
            <div className="fixed inset-0" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-600 opacity-75" />
            </div>
            {/* <!--
              Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "-translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "-translate-x-full"
            --> */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full pb-4 bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className={classnames(
                    'ml-1 flex items-center justify-center',
                    'h-10 w-10 rounded-full',
                    'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white',
                  )}
                  onClick={() => handleClick()}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center h-16 px-4 bg-gray-900">
                <img className="h-8 w-auto" src={logo} alt="Gitinsight" />
                <span className="text-white px-2 py-2 text-2xl font-semibold">Gitinsight</span>
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
                  {stats && (
                    <>
                      <SidebarItem name="Dashboard" pageType={pageType} type="dashboard" url="/" />
                      <SidebarItem
                        badge={thousandify(contributors)}
                        name="Contributors"
                        pageType={pageType}
                        type="contributors"
                        url="/contributors"
                      />
                      <SidebarItem
                        badge={thousandify(repositories)}
                        name="Repositories"
                        pageType={pageType}
                        type="repositories"
                        url="/repositories"
                      />
                      <SidebarItem
                        badge={thousandify(commits)}
                        name="Commits"
                        pageType={pageType}
                        type="commits"
                        url="/commits"
                      />
                      <SidebarItem
                        name="Calendar"
                        pageType={pageType}
                        type="calendar"
                        url="/calendar"
                      />
                      <SidebarItem name="Trends" pageType={pageType} type="trends" url="/trends" />
                      <SidebarItem
                        name="Staleness"
                        pageType={pageType}
                        type="staleness"
                        url="/staleness"
                      />
                      <SidebarItem
                        name="Curiosa"
                        pageType={pageType}
                        type="curiosa"
                        url="/curiosa"
                      />
                    </>
                  )}
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

OffCanvasMenuMobile.propTypes = {
  stats: PropTypes.object,
  commits: PropTypes.number,
  contributors: PropTypes.number,
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
  repositories: PropTypes.number,
};

export default OffCanvasMenuMobile;
