import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from '../../graphql/queries';
import { UiContext } from './../../contexts';
import Loading from '../layout/Loading';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import CalendarContributions from '../primitives/Calendar/CalendarContributions';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import { isNotEmptyObject } from '../../utils/isEmptyUtil';

const PageCommits = () => {
  const {
    loading,
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
  const { uiDarkMode } = useContext(UiContext);
  return (
    <Wrapper pageType="commits">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          fullHeight
          isDark={uiDarkMode}
          loading
          message="Loading commits stats"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {statsGlobal && (
            <>
              <PageTitleWithDate title="Commits" from={commitDateFirst} until={commitDateLast} />
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                <Card type="commits" heading="Commits" stat={commits} thousandify />
                <Card type="code" heading="Lines of code" stat={lines} thousandify />
                <Card
                  type="calendar"
                  heading="Days between first and last commit"
                  stat={daysActive}
                  thousandify
                />
                <Card type="code" heading="File changes" stat={fileChanges} thousandify />
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
        </>
      )}
    </Wrapper>
  );
};
export default PageCommits;
