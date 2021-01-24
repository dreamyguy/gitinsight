import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from '../../graphql/queries';
import { UiContext } from './../../contexts';
import Loading from '../layout/Loading';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';

const PageTrends = () => {
  const {
    loading,
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
  const { uiDarkMode } = useContext(UiContext);
  return (
    <Wrapper pageType="trends">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          fullHeight
          isDark={uiDarkMode}
          loading
          message="Loading trends stats"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
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
                series={[{ name: '', data: Object.values(impactByDayCummulative) }]}
                title="Lines of code, over time"
                type="spline"
              />
              <Chart
                categories={Object.keys(impactByDay)}
                series={[{ name: '', data: Object.values(impactByDay) }]}
                title="Impact per day"
                type="spline"
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default PageTrends;
