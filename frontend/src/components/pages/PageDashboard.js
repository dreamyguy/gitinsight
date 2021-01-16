/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import CalendarContributions from '../primitives/Calendar/CalendarContributions';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import Nr from '../primitives/Nr/Nr';
import { isNotEmptyObject } from '../../utils/isEmptyUtil';

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
        commitsPerDay,
        commitsPerDayAverage,
        impactByDayCummulative, // obj with single key-value pair
        commitsWithoutFileChanges,
        commitsWithoutImpact,
        contributors,
        daysActive,
        daysSinceFirstCommit,
        daysSinceLastCommit,
        fileChanges,
        lines,
        repositories,
        staleness,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="dashboard">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Dashboard" from={commitDateFirst} until={commitDateLast} />
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <Card
              type="contributors"
              heading="Contributors"
              stat={<Nr value={contributors} size="md" thousandify />}
            />
            <Card
              type="repositories"
              heading="Repositories"
              stat={<Nr value={repositories} size="md" thousandify />}
            />
            <Card
              type="code"
              heading="Commits"
              stat={<Nr value={commits} size="md" thousandify />}
            />
            <Card
              type="curiosa"
              heading="Commits impact > thousand"
              stat={<Nr value={commitsImpactGtThousand} size="md" thousandify />}
            />
            <Card
              type="calendar"
              heading="Commits on weekends"
              stat={<Nr value={commitsOnWeekend} size="md" thousandify />}
            />
            <Card
              type="trends"
              heading="Average commits / contributor"
              stat={commitsPerContributorAverage.toFixed(2)}
            />
            <Card
              type="trends"
              heading="Average commits / day"
              stat={commitsPerDayAverage.toFixed(2)}
            />
            <Card
              type="curiosa"
              heading="Commits without file changes"
              stat={<Nr value={commitsWithoutFileChanges} size="md" thousandify />}
            />
            <Card
              type="curiosa"
              heading="Commits without impact"
              stat={<Nr value={commitsWithoutImpact} size="md" thousandify />}
            />
            <Card
              type="calendar"
              heading="Days since first commit"
              stat={<Nr value={daysSinceFirstCommit} size="md" thousandify />}
            />
            <Card
              type="calendar"
              heading="Days between first and last commit"
              stat={<Nr value={daysActive} size="md" thousandify />}
            />
            <Card
              type="calendar"
              heading="Days since last commit"
              stat={<Nr value={daysSinceLastCommit} size="md" thousandify />}
            />
            <Card
              type="code"
              heading="File changes"
              stat={<Nr value={fileChanges} size="md" thousandify />}
            />
            <Card
              type="code"
              heading="Lines of code"
              stat={<Nr value={lines} size="md" thousandify />}
            />
            <Card type="staleness" heading="Staleness" stat={staleness.toFixed(2)} />
          </dl>
          {commitsPerDay && isNotEmptyObject(commitsPerDay) && (
            <div className="mt-5">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Commits per day
              </h2>
              <CalendarContributions
                until={Object.keys(commitsPerDay).pop()}
                values={commitsPerDay}
              />
            </div>
          )}
          <Chart
            categories={Object.keys(impactByDayCummulative)}
            series={[{ name: '', data: Object.values(impactByDayCummulative) }]}
            title="Lines of code, over time"
            type="spline"
          />
        </>
      )}
    </Wrapper>
  );
};
export default PageDashboard;
