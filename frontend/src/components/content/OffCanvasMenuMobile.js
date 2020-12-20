/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Calendar,
  Code,
  Flag,
  Folder,
  Home,
  Sparkles,
  TrendingUp,
  UserGroup,
  X,
} from './../primitives/Icon';

const OffCanvasMenuMobile = ({ pageType }) => (
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

OffCanvasMenuMobile.propTypes = {
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

export default OffCanvasMenuMobile;
