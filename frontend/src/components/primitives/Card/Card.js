/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classnames from 'classnames';
import { Calendar, Code, Flag, Folder, Sparkles, TrendingUp, UserGroup } from './../Icon';
import Nr from '../Nr/Nr';

const classesIcon = 'h-6 w-6 text-white';

const resolveIcon = (type, mode) => {
  let output = null;
  switch (type) {
    case 'calendar':
      output = [<Calendar className={classesIcon} />, 'bg-fav-green-light'];
      break;
    case 'commits':
      output = [<Code className={classesIcon} />, 'bg-fav-green-dark'];
      break;
    case 'staleness':
      output = [<Flag className={classesIcon} />, 'bg-fav-pink-shock'];
      break;
    case 'repositories':
      output = [<Folder className={classesIcon} />, 'bg-fav-purple-middle'];
      break;
    case 'curiosa':
      output = [<Sparkles className={classesIcon} />, 'bg-fav-yellow'];
      break;
    case 'trends':
      output = [<TrendingUp className={classesIcon} />, 'bg-fav-turquoise'];
      break;
    case 'contributors':
      output = [<UserGroup className={classesIcon} />, 'bg-fav-orange-dark'];
      break;
    default:
      // Syntax sugar, we default to 'commits'
      output = [<Code className={classesIcon} />, 'bg-fav-green-dark'];
      break;
  }
  return mode === 'color' ? output[1] : output[0];
};

const Card = ({ type, heading, stat, statIncreasedBy, statDecreasedBy, thousandify }) => (
  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div
          className={classnames(
            'flex-shrink-0',
            'rounded-md p-3',
            resolveIcon(type, 'color') || 'bg-indigo-500',
          )}
        >
          {resolveIcon(type)}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 truncate">
            {heading}
          </dt>
          <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {thousandify ? <Nr value={stat} size="md" thousandify /> : stat}
            </div>
            {statIncreasedBy && (
              <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                <svg
                  className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Increased by</span>
                {statIncreasedBy}
              </div>
            )}
            {statDecreasedBy && (
              <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                <svg
                  className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Decreased by</span>
                {statDecreasedBy}
              </div>
            )}
          </dd>
        </div>
      </div>
    </div>
    {/* <div className="bg-gray-50 px-4 py-4 sm:px-6">
      <div className="text-sm">
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
          {' '}
          View all<span className="sr-only"> {heading} stats</span>
        </a>
      </div>
    </div> */}
  </div>
);

export default Card;
