/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import CalendarContributions from './../primitives/Calendar/CalendarContributions';
import Chart from './../primitives/Chart/Chart';
import {
  Calendar,
  Code,
  Flag,
  Folder,
  Sparkles,
  TrendingUp,
  UserGroup,
} from './../primitives/Icon';
import { thousandify } from './../../utils/thousandifyUtil';
import { getDate } from './../../utils/getDateUtil';
import { isNotEmptyObject } from './../../utils/isEmptyUtil';
import { statsGlobalQuery } from './../../graphql/queries';
import Wrapper from '../layout/Wrapper';

const StatsItem = ({ bgColor, icon, heading, stat, statIncreasedBy, statDecreasedBy }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className={classnames('flex-shrink-0', 'rounded-md p-3', bgColor || 'bg-indigo-500')}>
          {icon}
        </div>
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
  <>
    {from && until ? (
      <div>
        <span>{getDate(from)}</span> - <span>{getDate(until)}</span>
      </div>
    ) : null}
  </>
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
        commitsPerDay,
        commitsPerDayAverage,
        commitsPerMonthDay, // obj with single key-value pair
        commitsPerMonthNr, // obj with single key-value pair
        commitsPerYear, // obj with single key-value pair
        commitsWithoutFileChanges,
        commitsWithoutImpact,
        contributors,
        // contributorsList, // array list
        daysActive,
        daysSinceFirstCommit,
        daysSinceLastCommit,
        fileChanges,
        lines,
        repositories,
        // repositoriesList, // array list
        staleness,
        // weekdays, // obj with single key-value pair
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="home">
      {statsGlobal && (
        <>
          <dl className="flex items-baseline md:flex-col lg:flex-row lg:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Global Stats</h1>
            <DatesFromUntil from={commitDateFirst} until={commitDateLast} />
          </dl>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatsItem
              bgColor="bg-fav-purple-middle"
              icon={<Folder className="h-6 w-6 text-white" />}
              heading="Repositories"
              stat={thousandify(repositories)}
            />
            <StatsItem
              bgColor="bg-fav-orange-dark"
              icon={<UserGroup className="h-6 w-6 text-white" />}
              heading="Contributors"
              stat={thousandify(contributors)}
            />
            <StatsItem
              bgColor="bg-fav-green-dark"
              icon={<Code className="h-6 w-6 text-white" />}
              heading="Commits"
              stat={thousandify(commits)}
            />
            <StatsItem
              bgColor="bg-fav-yellow"
              icon={<Sparkles className="h-6 w-6 text-white" />}
              heading="Commits impact > thousand"
              stat={thousandify(commitsImpactGtThousand)}
            />
            <StatsItem
              bgColor="bg-fav-green-light"
              icon={<Calendar className="h-6 w-6 text-white" />}
              heading="Commits on weekends"
              stat={thousandify(commitsOnWeekend)}
            />
            <StatsItem
              bgColor="bg-fav-turquoise"
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              heading="Average commits / contributor"
              stat={commitsPerContributorAverage.toFixed(2)}
            />
            {/* <StatsItem
              bgColor="bg-fav-purple-middle"
              icon={<Folder className="h-6 w-6 text-white" />}
              heading="Commits per day"
              stat={commitsPerDay}
            /> */}
            <StatsItem
              bgColor="bg-fav-turquoise"
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              heading="Average commits / day"
              stat={commitsPerDayAverage.toFixed(2)}
            />
            {/* <StatsItem
              bgColor="bg-fav-purple-middle"
              icon={<Folder className="h-6 w-6 text-white" />}
              heading="commitsPerMonthDay"
              stat={commitsPerMonthDay}
            />
            <StatsItem
              bgColor="bg-fav-purple-middle"
              icon={<Folder className="h-6 w-6 text-white" />}
              heading="commitsPerMonthNr"
              stat={commitsPerMonthNr}
            />
            <StatsItem
              bgColor="bg-fav-purple-middle"
              icon={<Folder className="h-6 w-6 text-white" />}
              heading="commitsPerYear"
              stat={commitsPerYear}
            /> */}
            <StatsItem
              bgColor="bg-fav-green-dark"
              icon={<Code className="h-6 w-6 text-white" />}
              heading="Commits without file changes"
              stat={thousandify(commitsWithoutFileChanges)}
            />
            <StatsItem
              bgColor="bg-fav-yellow"
              icon={<Sparkles className="h-6 w-6 text-white" />}
              heading="Commits without impact"
              stat={thousandify(commitsWithoutImpact)}
            />
            {/* <StatsItem
              bgColor="bg-fav-purple-middle"
              icon={<Folder className="h-6 w-6 text-white" />}
              heading="contributorsList"
              stat={contributorsList}
            /> */}
            <StatsItem
              bgColor="bg-fav-green-light"
              icon={<Calendar className="h-6 w-6 text-white" />}
              heading="Days between first and last commit"
              stat={thousandify(daysActive)}
            />
            <StatsItem
              bgColor="bg-fav-green-light"
              icon={<Calendar className="h-6 w-6 text-white" />}
              heading="Days since first commit"
              stat={thousandify(daysSinceFirstCommit)}
            />
            <StatsItem
              bgColor="bg-fav-green-light"
              icon={<Calendar className="h-6 w-6 text-white" />}
              heading="Days since last commit"
              stat={thousandify(daysSinceLastCommit)}
            />
            <StatsItem
              bgColor="bg-fav-green-dark"
              icon={<Code className="h-6 w-6 text-white" />}
              heading="File changes"
              stat={thousandify(fileChanges)}
            />
            <StatsItem
              bgColor="bg-fav-green-dark"
              icon={<Code className="h-6 w-6 text-white" />}
              heading="Lines of code"
              stat={thousandify(lines)}
            />
            {/* <StatsItem
              bgColor="bg-fav-purple-middle"
              icon={<Folder className="h-6 w-6 text-white" />}
              heading="repositoriesList"
              stat={repositoriesList}
            /> */}
            <StatsItem
              bgColor="bg-fav-pink-shock"
              icon={<Flag className="h-6 w-6 text-white" />}
              heading="Staleness"
              stat={staleness.toFixed(2)}
            />
          </dl>
          {/* <StatsItem
            bgColor="bg-fav-green-light"
            icon={<Calendar className="h-6 w-6 text-white" />}
            heading="Weekdays"
            stat={weekdays}
          /> */}
          {commitsPerDay && isNotEmptyObject(commitsPerDay) && (
            <div className="mt-5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-5">Commits per day</h2>
              <CalendarContributions
                until={Object.keys(commitsPerDay).pop()}
                values={commitsPerDay}
              />
            </div>
          )}
          <Chart
            categories={Object.keys(commitsPerYear)}
            data={Object.values(commitsPerYear)}
            title="Commits per year"
            type="spline"
          />
          <Chart
            categories={Object.keys(commitsPerMonthNr)}
            data={Object.values(commitsPerMonthNr)}
            title="Commits per month"
            type="spline"
          />
          <Chart
            categories={Object.keys(commitsPerMonthDay)}
            data={Object.values(commitsPerMonthDay)}
            title="Commits per day in a month"
            type="spline"
          />
        </>
      )}
    </Wrapper>
  );
};
export default HomePage;
