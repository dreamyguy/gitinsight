import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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

const SidebarItem = ({ badge, name, pageType, type, url }) => {
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

SidebarItem.propTypes = {
  badge: PropTypes.string,
  name: PropTypes.string,
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
  type: PropTypes.string,
  url: PropTypes.string,
};

export default SidebarItem;
