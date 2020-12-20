/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { thousandify } from './../../utils/thousandifyUtil';
import {
  Calendar,
  Code,
  Flag,
  Folder,
  Home,
  Sparkles,
  TrendingUp,
  UserGroup,
} from './../primitives/Icon';
import logo from './../../images/logo.png';

const SidebarDesktop = ({ commits, contributors, repositories, stats }) => (
  <div className="hidden md:flex md:flex-shrink-0">
    {/* <!-- Static sidebar for desktop --> */}
    <div className="flex flex-col w-64">
      {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
      <div className="flex flex-col h-0 flex-1">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <img className="h-8 w-auto" src={logo} alt="Workflow" />
          <span className="text-white px-2 py-2 text-2xl font-semibold">Gitinsight</span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
            {stats && (
              <>
                {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
                <a
                  href="#"
                  className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  {/* <!-- Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" --> */}
                  <Home className="text-fav-orange-middle mr-3 h-6 w-6" />
                  Dashboard
                  {/* <span className="bg-gray-800 group-hover:bg-gray-700 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                    000
                  </span> */}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <UserGroup className="text-fav-orange-dark group-hover:text-gray-300 mr-3 h-6 w-6" />
                  Contributors
                  <span className="bg-gray-900 group-hover:bg-gray-800 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                    {thousandify(contributors)}
                  </span>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Folder className="text-fav-purple-middle group-hover:text-gray-300 mr-3 h-6 w-6" />
                  Repositories
                  <span className="bg-gray-900 group-hover:bg-gray-800 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                    {thousandify(repositories)}
                  </span>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Code className="text-fav-green-dark group-hover:text-gray-300 mr-3 h-6 w-6" />
                  Commits
                  <span className="bg-gray-900 group-hover:bg-gray-800 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full">
                    {thousandify(commits)}
                  </span>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Calendar className="text-fav-green-light group-hover:text-gray-300 mr-3 h-6 w-6" />
                  Calendar
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <TrendingUp className="text-fav-turquoise group-hover:text-gray-300 mr-3 h-6 w-6" />
                  Trends
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Flag className="text-fav-pink-shock group-hover:text-gray-300 mr-3 h-6 w-6" />
                  Staleness
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Sparkles className="text-fav-yellow group-hover:text-gray-300 mr-3 h-6 w-6" />
                  Curiosa
                </a>
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
  repositories: PropTypes.number,
};

export default SidebarDesktop;
