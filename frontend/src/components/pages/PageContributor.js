/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { statsAuthorQuery, statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import { Mail } from './../primitives/Icon';
import CalendarContributions from '../primitives/Calendar/CalendarContributions';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import { isNotEmptyArray, isNotEmptyObject } from '../../utils/isEmptyUtil';
import { getAvatarFromEmail } from '../../utils/getAvatarFromEmailUtil';
import { getNameFromEmail } from '../../utils/getNameFromEmailUtil';
import { stalenessStatus } from '../../utils/stalenessStatusUtil';
import { thousandify } from '../../utils/thousandifyUtil';

const PageContributor = () => {
  const { paramAuthorEmail } = useParams();
  const {
    data: { statsGlobal, statsGlobal: { commitDateFirst, commitDateLast } = {} } = {},
  } = useQuery(statsGlobalQuery);
  const {
    data: {
      statsAuthor,
      statsAuthor: [
        {
          author,
          // commitDateFirst: commitDateFirstAuthor,
          // commitDateLast: commitDateLastAuthor,
          commits,
          // commitsImpactGtThousand,
          commitsOnWeekend,
          commitsPerDay,
          commitsPerDayAverage,
          commitsPerDayCummulative,
          commitsPerHour, // obj with single key-value pair
          commitsPerMinute, // obj with single key-value pair
          commitsPerMonthDay, // obj with single key-value pair
          // commitsPerMonthName,
          commitsPerMonthNr, // obj with single key-value pair
          commitsPerSecond, // obj with single key-value pair
          commitsPerYear, // obj with single key-value pair
          // commitsWithoutFileChanges,
          // commitsWithoutImpact,
          daysActive,
          daysSinceFirstCommit,
          daysSinceLastCommit,
          // fileChanges,
          // impact,
          // impactByDay,
          impactByDayCummulative,
          // impactRatio,
          repositories,
          // repositoriesList, // array list
          staleness,
          weekdays, // obj with single key-value pair
        } = {},
      ] = [],
    } = {},
  } = useQuery(statsAuthorQuery, {
    variables: { authorEmail: paramAuthorEmail },
  });
  return (
    <Wrapper pageType="contributor">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Contributor" from={commitDateFirst} until={commitDateLast} />
        </>
      )}
      {statsAuthor && isNotEmptyArray(statsAuthor) && (
        <>
          <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 flex items-center">
                <span className="inline-block relative">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={getAvatarFromEmail(author)}
                    alt={getNameFromEmail(author)}
                  />
                  <span
                    className={classnames(
                      'absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white',
                      staleness ? stalenessStatus(staleness, 'color') : '',
                    )}
                  />
                </span>
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {getNameFromEmail(author)}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span className="truncate">{author}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <Card type="repositories" heading="Repositories" stat={thousandify(repositories)} />
            <Card type="code" heading="Commits" stat={thousandify(commits)} />
            <Card
              type="calendar"
              heading="Years active"
              stat={thousandify((daysActive / 365).toFixed(1))}
            />
            <Card
              type="calendar"
              heading="Days since first commit"
              stat={thousandify(daysSinceFirstCommit)}
            />
            <Card
              type="calendar"
              heading="Days between first and last commit"
              stat={thousandify(daysActive)}
            />
            <Card
              type="calendar"
              heading="Days since last commit"
              stat={thousandify(daysSinceLastCommit)}
            />
            <Card
              type="calendar"
              heading="Commits on weekends"
              stat={thousandify(commitsOnWeekend)}
            />
            <Card
              type="trends"
              heading="Average commits / day"
              stat={commitsPerDayAverage.toFixed(2)}
            />
            <Card type="staleness" heading="Staleness" stat={staleness.toFixed(2)} />
          </dl>
          {commitsPerDay && isNotEmptyObject(commitsPerDay) && (
            <div className="mt-5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-5">Commits per day</h2>
              <CalendarContributions
                until={Object.keys(commitsPerDay).pop()}
                values={commitsPerDay}
              />
            </div>
          )}
          {impactByDayCummulative && isNotEmptyObject(impactByDayCummulative) && (
            <Chart
              categories={Object.keys(impactByDayCummulative)}
              data={Object.values(impactByDayCummulative)}
              title="Lines of code, over time"
              type="spline"
            />
          )}
          {commitsPerDayCummulative && isNotEmptyObject(commitsPerDayCummulative) && (
            <Chart
              categories={Object.keys(commitsPerDayCummulative)}
              data={Object.values(commitsPerDayCummulative)}
              title="Commits, over time"
              type="spline"
            />
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
          <Chart
            categories={Object.keys(weekdays)}
            data={Object.values(weekdays)}
            title="Commits per weekday"
            type="spline"
          />
          <Chart
            categories={Object.keys(commitsPerHour)}
            data={Object.values(commitsPerHour)}
            title="Commits per hour"
            type="spline"
          />
          <Chart
            categories={Object.keys(commitsPerMinute)}
            data={Object.values(commitsPerMinute)}
            title="Commits per minute"
            type="spline"
          />
          <Chart
            categories={Object.keys(commitsPerSecond)}
            data={Object.values(commitsPerSecond)}
            title="Commits per second"
            type="spline"
          />
        </>
      )}
    </Wrapper>
  );
};
export default PageContributor;
