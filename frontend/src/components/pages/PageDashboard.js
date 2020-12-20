/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CalendarContributions from '../primitives/Calendar/CalendarContributions';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import { thousandify } from '../../utils/thousandifyUtil';
import { getDate } from '../../utils/getDateUtil';
import { isNotEmptyObject } from '../../utils/isEmptyUtil';
import { statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';

const DatesFromUntil = ({ from, until }) => (
  <>
    {from && until ? (
      <div>
        <span>{getDate(from)}</span> - <span>{getDate(until)}</span>
      </div>
    ) : null}
  </>
);

const PageDashboard = () => {
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
        commitsPerSecond, // obj with single key-value pair
        commitsPerMinute, // obj with single key-value pair
        commitsPerHour, // obj with single key-value pair
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
        weekdays, // obj with single key-value pair
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="dashboard">
      {statsGlobal && (
        <>
          <dl className="flex items-baseline md:flex-col lg:flex-row lg:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Global Stats</h1>
            <DatesFromUntil from={commitDateFirst} until={commitDateLast} />
          </dl>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card type="repositories" heading="Repositories" stat={thousandify(repositories)} />
            <Card type="contributors" heading="Contributors" stat={thousandify(contributors)} />
            <Card type="code" heading="Commits" stat={thousandify(commits)} />
            <Card
              type="curiosa"
              heading="Commits impact > thousand"
              stat={thousandify(commitsImpactGtThousand)}
            />
            <Card
              type="calendar"
              heading="Commits on weekends"
              stat={thousandify(commitsOnWeekend)}
            />
            <Card
              type="trends"
              heading="Average commits / contributor"
              stat={commitsPerContributorAverage.toFixed(2)}
            />
            {/* <Card
              type="repositories"
              heading="Commits per day"
              stat={commitsPerDay}
            /> */}
            <Card
              type="trends"
              heading="Average commits / day"
              stat={commitsPerDayAverage.toFixed(2)}
            />
            {/* <Card
              type="repositories"
              heading="commitsPerMonthDay"
              stat={commitsPerMonthDay}
            />
            <Card
              type="repositories"
              heading="commitsPerMonthNr"
              stat={commitsPerMonthNr}
            />
            <Card
              type="repositories"
              heading="commitsPerYear"
              stat={commitsPerYear}
            /> */}
            <Card
              type="code"
              heading="Commits without file changes"
              stat={thousandify(commitsWithoutFileChanges)}
            />
            <Card
              type="curiosa"
              heading="Commits without impact"
              stat={thousandify(commitsWithoutImpact)}
            />
            {/* <Card
              type="repositories"
              heading="contributorsList"
              stat={contributorsList}
            /> */}
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
            <Card type="code" heading="File changes" stat={thousandify(fileChanges)} />
            <Card type="code" heading="Lines of code" stat={thousandify(lines)} />
            {/* <Card
              type="repositories"
              heading="repositoriesList"
              stat={repositoriesList}
            /> */}
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
export default PageDashboard;
