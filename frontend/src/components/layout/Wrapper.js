/* eslint-disable jsx-a11y/anchor-is-valid */
// ! This HOC component's purpose:
// - Fetch the data
// - Set data to relevant context(s)
// - Wrap the layout

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { sidebarQuery } from './../../graphql/queries';
import { thousandify } from './../../utils/thousandifyUtil';
import {
  // Bell,
  Calendar,
  Code,
  Flag,
  Folder,
  Home,
  MenuAlt2,
  Search,
  Sparkles,
  TrendingUp,
  UserGroup,
  X,
} from './../primitives/Icon';
import Main from './Main';

// const Notifications = () => (
//   <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//     <span className="sr-only">View notifications</span>
//     <Bell className="h-6 w-6" />
//   </button>
// );

// const ProfileDropdown = () => (
//   <div className="ml-3 relative">
//     <div>
//       <button
//         className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         id="user-menu"
//         aria-haspopup="true"
//       >
//         <span className="sr-only">Open user menu</span>
//         <img
//           className="h-8 w-8 rounded-full"
//           src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//           alt=""
//         />
//       </button>
//     </div>
//     {/* <!--
//       Profile dropdown panel, show/hide based on dropdown state.

//       Entering: "transition ease-out duration-100"
//         From: "transform opacity-0 scale-95"
//         To: "transform opacity-100 scale-100"
//       Leaving: "transition ease-in duration-75"
//         From: "transform opacity-100 scale-100"
//         To: "transform opacity-0 scale-95"
//     --> */}
//     <div
//       className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
//       role="menu"
//       aria-orientation="vertical"
//       aria-labelledby="user-menu"
//     >
//       <a
//         href="#"
//         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//         role="menuitem"
//       >
//         Your Profile
//       </a>
//       <a
//         href="#"
//         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//         role="menuitem"
//       >
//         Settings
//       </a>
//       <a
//         href="#"
//         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//         role="menuitem"
//       >
//         Sign out
//       </a>
//     </div>
//   </div>
// );

const SidebarDesktop = ({ commits, contributors, repositories, stats }) => (
  <div className="hidden md:flex md:flex-shrink-0">
    {/* <!-- Static sidebar for desktop --> */}
    <div className="flex flex-col w-64">
      {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
      <div className="flex flex-col h-0 flex-1">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
          />
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

const OffCanvasMenuMobile = () => (
  <div className="md:hidden">
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
      <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="flex-shrink-0 flex items-center px-4">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
          />
        </div>
        <div className="mt-5 flex-1 h-0 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <a
              href="#"
              className="bg-gray-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              {/* <!-- Current: "text-gray-300", Default: "text-gray-400 group-hover:text-gray-300" --> */}
              <Home className="text-fav-orange-middle mr-4 h-6 w-6" />
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <UserGroup className="text-fav-orange-dark group-hover:text-gray-300 mr-4 h-6 w-6" />
              Contributors
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <Folder className="text-fav-purple-middle group-hover:text-gray-300 mr-4 h-6 w-6" />
              Repositories
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <Code className="text-fav-green-dark group-hover:text-gray-300 mr-4 h-6 w-6" />
              Commits
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <Calendar className="text-fav-green-light group-hover:text-gray-300 mr-4 h-6 w-6" />
              Calendar
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <TrendingUp className="text-fav-turquoise group-hover:text-gray-300 mr-4 h-6 w-6" />
              Trends
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <Flag className="text-fav-pink-shock group-hover:text-gray-300 mr-4 h-6 w-6" />
              Staleness
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <Sparkles className="text-fav-yellow group-hover:text-gray-300 mr-4 h-6 w-6" />
              Curiosa
            </a>
          </nav>
        </div>
      </div>
      <div className="flex-shrink-0 w-14" aria-hidden="true">
        {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
      </div>
    </div>
  </div>
);

const TopSection = () => (
  <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
    <button className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
      <span className="sr-only">Open sidebar</span>
      <MenuAlt2 className="h-6 w-6" />
    </button>
    <div className="flex-1 px-4 flex justify-between">
      <div className="flex-1 flex">
        <form className="w-full flex md:ml-0" action="#" method="GET">
          <label htmlFor="search_field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <Search className="h-5 w-5" />
            </div>
            <input
              id="search_field"
              className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </form>
      </div>
      {/* <div className="ml-4 flex items-center md:ml-6">
        <Notifications />
        <ProfileDropdown />
      </div> */}
    </div>
  </div>
);

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
              <OffCanvasMenuMobile stats={statsGlobal} />
              <SidebarDesktop
                stats={statsGlobal}
                commits={commits}
                contributors={contributors}
                repositories={repositories}
              />
              <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <TopSection />
                <Main pageType={pageType}>{children}</Main>
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
  pageType: PropTypes.oneOf(['fullscreen', 'home', 'stats-authors', 'stats-global', 'stats-repos']),
};

export default Wrapper;
