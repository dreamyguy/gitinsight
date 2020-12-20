import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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

const NavItem = ({ badge, name, pageType, type, url }) => {
  const resolveIcon = () => {
    let output = null;
    switch (type) {
      case 'dashboard':
        output = (
          <Home
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-orange-middle',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      case 'calendar':
        output = (
          <Calendar
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-green-light',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      case 'commits':
        output = (
          <Code
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-green-dark',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      case 'staleness':
        output = (
          <Flag
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-pink-shock',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      case 'repositories':
        output = (
          <Folder
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-purple-middle',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      case 'curiosa':
        output = (
          <Sparkles
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-yellow',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      case 'trends':
        output = (
          <TrendingUp
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-turquoise',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      case 'contributors':
        output = (
          <UserGroup
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-orange-dark',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
      default:
        // Syntax sugar, we default to 'commits'
        output = (
          <Code
            className={classnames(
              pageType === type ? '' : 'group-hover:text-gray-300',
              'text-fav-green-dark',
              'mr-3 h-6 w-6',
            )}
          />
        );
        break;
    }
    return output;
  };
  return (
    <Link
      to={url}
      className={classnames(
        pageType === type
          ? 'bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md',
      )}
    >
      {resolveIcon(type)}
      {name}
      {badge && (
        <span
          className={classnames(
            pageType === type
              ? 'bg-gray-800 group-hover:bg-gray-700 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full'
              : 'bg-gray-900 group-hover:bg-gray-800 ml-auto inline-block py-0.5 px-3 text-xs font-medium rounded-full',
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
};

const SidebarDesktop = ({ commits, contributors, pageType, repositories, stats }) => (
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
                <NavItem name="Dashboard" pageType={pageType} type="dashboard" url="/" />
                <NavItem
                  badge={thousandify(contributors)}
                  name="Contributors"
                  pageType={pageType}
                  type="contributors"
                  url="/contributors"
                />
                <NavItem
                  badge={thousandify(repositories)}
                  name="Repositories"
                  pageType={pageType}
                  type="repositories"
                  url="/repositories"
                />
                <NavItem
                  badge={thousandify(commits)}
                  name="Commits"
                  pageType={pageType}
                  type="commits"
                  url="/commits"
                />
                <NavItem name="Calendar" pageType={pageType} type="calendar" url="/calendar" />
                <NavItem name="Trends" pageType={pageType} type="trends" url="/trends" />
                <NavItem name="Staleness" pageType={pageType} type="staleness" url="/staleness" />
                <NavItem name="Curiosa" pageType={pageType} type="curiosa" url="/curiosa" />
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

export default SidebarDesktop;
