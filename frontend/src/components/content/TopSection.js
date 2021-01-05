import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MenuContext } from './../../contexts';
import { MenuAlt2, Search } from './../primitives/Icon';
// import Notifications from './Notifications';
// import ProfileDropdown from './ProfileDropdown';

const TopSection = ({ pageType }) => {
  const { menuIsExpanded, setMenuIsExpanded } = useContext(MenuContext);
  const handleClick = () => {
    setMenuIsExpanded(!menuIsExpanded);
  };
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        className={classnames(
          'px-4 border-r border-gray-200 text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500',
          'lg:hidden',
        )}
        onClick={() => handleClick()}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2 className="h-6 w-6" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search_field" className="sr-only">
              Search{pageType !== 'dashboard' ? ` for ${pageType}` : ''}
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
};

TopSection.propTypes = {
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

export default TopSection;
