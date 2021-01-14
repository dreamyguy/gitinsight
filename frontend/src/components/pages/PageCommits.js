import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import CalendarContributions from '../primitives/Calendar/CalendarContributions';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import { thousandify } from '../../utils/thousandifyUtil';
import { isNotEmptyObject } from '../../utils/isEmptyUtil';

const PageCommits = () => {
  const {
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commits,
        commitsPerContributorAverage,
        commitsPerDay,
        commitsPerDayCummulative,
        commitsPerDayAverage,
        daysActive,
        fileChanges,
        lines,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="commits">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Commits" from={commitDateFirst} until={commitDateLast} />
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <Card type="commits" heading="Commits" stat={thousandify(commits)} />
            <Card type="code" heading="Lines of code" stat={thousandify(lines)} />
            <Card
              type="calendar"
              heading="Days between first and last commit"
              stat={thousandify(daysActive)}
            />
            <Card type="code" heading="File changes" stat={thousandify(fileChanges)} />
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
            categories={Object.keys(commitsPerDayCummulative)}
            series={[{ name: '', data: Object.values(commitsPerDayCummulative) }]}
            title="Commits, over time"
            type="spline"
          />
        </>
      )}
    </Wrapper>
  );
};
export default PageCommits;
