/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { thousandify } from './../../utils/thousandifyUtil';
import { getDate } from './../../utils/getDateUtil';
import { statsGlobalQuery } from './../../graphql/queries';
import Wrapper from '../layout/Wrapper';

const HeroIconUsers = () => (
  <svg
    className="h-6 w-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    {/* <!-- Heroicon name: users --> */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

// const HeroIconMailOpen = () => (
//   <svg
//     className="h-6 w-6 text-white"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     aria-hidden="true"
//   >
//     {/* <!-- Heroicon name: mail-open --> */}
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
//     />
//   </svg>
// );

const HeroIconCursorClick = () => (
  <svg
    className="h-6 w-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    {/* <!-- Heroicon name: cursor-click --> */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    />
  </svg>
);

const StatsItem = ({ icon, heading, stat, statIncreasedBy, statDecreasedBy }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-sm font-medium text-gray-500 truncate">{heading}</dt>
          <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900">{stat}</div>
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

const DatesFromUntil = ({ from, until }) => (
  <div>
    <span>{getDate(from)}</span> - <span>{getDate(until)}</span>
  </div>
);

const HomePage = () => {
  const {
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commits,
        commitsImpactGtThousand,
        commitsOnWeekend,
        commitsPerContributorAverage,
        // commitsPerDay,
        commitsPerDayAverage,
        // commitsPerMonthDay,
        // commitsPerMonthNr,
        // commitsPerYear,
        commitsWithoutFileChanges,
        commitsWithoutImpact,
        contributors,
        // contributorsList,
        daysActive,
        daysSinceFirstCommit,
        daysSinceLastCommit,
        fileChanges,
        lines,
        repositories,
        // repositoriesList,
        staleness,
        // weekdays,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="home">
      <dl className="flex items-baseline md:flex-col lg:flex-row lg:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Global Stats</h1>
        <DatesFromUntil from={commitDateFirst} until={commitDateLast} />
      </dl>
      {statsGlobal && (
        <>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Repositories"
              stat={thousandify(repositories)}
            />
            <StatsItem
              icon={<HeroIconUsers />}
              heading="Contributors"
              stat={thousandify(contributors)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Commits"
              stat={thousandify(commits)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Commits impact > thousand"
              stat={thousandify(commitsImpactGtThousand)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Commits on weekends"
              stat={thousandify(commitsOnWeekend)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Average commits / contributor"
              stat={commitsPerContributorAverage.toFixed(2)}
            />
            {/* <StatsItem
              icon={<HeroIconCursorClick />}
              heading="commitsPerDay"
              stat={commitsPerDay}
            /> */}
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Average commits / day"
              stat={commitsPerDayAverage.toFixed(2)}
            />
            {/* <StatsItem
              icon={<HeroIconCursorClick />}
              heading="commitsPerMonthDay"
              stat={commitsPerMonthDay}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="commitsPerMonthNr"
              stat={commitsPerMonthNr}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="commitsPerYear"
              stat={commitsPerYear}
            /> */}
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Commits without file changes"
              stat={thousandify(commitsWithoutFileChanges)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Commits without impact"
              stat={thousandify(commitsWithoutImpact)}
            />
            {/* <StatsItem
              icon={<HeroIconCursorClick />}
              heading="contributorsList"
              stat={contributorsList}
            /> */}
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Days between first and last commit"
              stat={thousandify(daysActive)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Days since first commit"
              stat={thousandify(daysSinceFirstCommit)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Days since last commit"
              stat={thousandify(daysSinceLastCommit)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="File changes"
              stat={thousandify(fileChanges)}
            />
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Lines of code"
              stat={thousandify(lines)}
            />
            {/* <StatsItem
              icon={<HeroIconCursorClick />}
              heading="repositoriesList"
              stat={repositoriesList}
            /> */}
            <StatsItem
              icon={<HeroIconCursorClick />}
              heading="Staleness"
              stat={staleness.toFixed(2)}
            />
            {/* <StatsItem icon={<HeroIconCursorClick />} heading="weekdays" stat={weekdays} /> */}
          </dl>
        </>
      )}
    </Wrapper>
  );
};
export default HomePage;
