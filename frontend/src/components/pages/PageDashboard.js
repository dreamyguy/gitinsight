import React, { useContext, useEffect } from 'react';
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

const PageDashboard = () => {
  const {
    loading,
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
  const { uiDarkMode, setUiIsLoading } = useContext(UiContext);

  useEffect(() => {
    const isLoading = loading;
    setUiIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Wrapper pageType="dashboard">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          fullHeight
          isDark={uiDarkMode}
          loading
          message="Loading global stats"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {statsGlobal && (
            <>
              <PageTitleWithDate title="Dashboard" from={commitDateFirst} until={commitDateLast} />
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                <Card type="contributors" heading="Contributors" stat={contributors} thousandify />
                <Card type="repositories" heading="Repositories" stat={repositories} thousandify />
                <Card type="code" heading="Commits" stat={commits} thousandify />
                <Card
                  type="curiosa"
                  heading="Commits impact > thousand"
                  stat={commitsImpactGtThousand}
                  thousandify
                />
                <Card
                  type="calendar"
                  heading="Commits on weekends"
                  stat={commitsOnWeekend}
                  thousandify
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
                  stat={commitsWithoutFileChanges}
                  thousandify
                />
                <Card
                  type="curiosa"
                  heading="Commits without impact"
                  stat={commitsWithoutImpact}
                  thousandify
                />
                <Card
                  type="calendar"
                  heading="Days since first commit"
                  stat={daysSinceFirstCommit}
                  thousandify
                />
                <Card
                  type="calendar"
                  heading="Days between first and last commit"
                  stat={daysActive}
                  thousandify
                />
                <Card
                  type="calendar"
                  heading="Days since last commit"
                  stat={daysSinceLastCommit}
                  thousandify
                />
                <Card type="code" heading="File changes" stat={fileChanges} thousandify />
                <Card type="code" heading="Lines of code" stat={lines} thousandify />
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
        </>
      )}
    </Wrapper>
  );
};
export default PageDashboard;
