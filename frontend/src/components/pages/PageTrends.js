import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';

const PageTrends = () => {
  const {
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commitsPerContributorAverage,
        commitsPerDayAverage,
        impactByDay, // obj with single key-value pair
        impactByDayCummulative, // obj with single key-value pair
        impactPerSecond,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="trends">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Trends" from={commitDateFirst} until={commitDateLast} />
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
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
              type="trends"
              heading="Lines of code per second"
              stat={impactPerSecond.toFixed(2)}
            />
          </dl>
          <Chart
            categories={Object.keys(impactByDayCummulative)}
            data={Object.values(impactByDayCummulative)}
            title="Lines of code, over time"
            type="spline"
          />
          <Chart
            categories={Object.keys(impactByDay)}
            data={Object.values(impactByDay)}
            title="Impact per day"
            type="spline"
          />
        </>
      )}
    </Wrapper>
  );
};
export default PageTrends;
