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

const PageCalendar = () => {
  const {
    loading,
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commitsOnWeekend,
        commitsPerSecond, // obj with single key-value pair
        commitsPerMinute, // obj with single key-value pair
        commitsPerHour, // obj with single key-value pair
        commitsPerDay,
        commitsPerDayAverage,
        commitsPerMonthDay, // obj with single key-value pair
        commitsPerMonthNr, // obj with single key-value pair
        commitsPerYear, // obj with single key-value pair
        daysActive,
        daysSinceFirstCommit,
        daysSinceLastCommit,
        staleness,
        weekdays, // obj with single key-value pair
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
    <Wrapper pageType="calendar">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          fullHeight
          isDark={uiDarkMode}
          loading
          message="Loading calendar stats"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {statsGlobal && (
            <>
              <PageTitleWithDate title="Calendar" from={commitDateFirst} until={commitDateLast} />
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
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
                <Card
                  type="calendar"
                  heading="Commits on weekends"
                  stat={commitsOnWeekend}
                  thousandify
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
                categories={Object.keys(commitsPerYear)}
                series={[{ name: '', data: Object.values(commitsPerYear) }]}
                title="Commits per year"
                type="spline"
              />
              <Chart
                categories={Object.keys(commitsPerMonthNr)}
                series={[{ name: '', data: Object.values(commitsPerMonthNr) }]}
                title="Commits per month"
                type="spline"
              />
              <Chart
                categories={Object.keys(commitsPerMonthDay)}
                series={[{ name: '', data: Object.values(commitsPerMonthDay) }]}
                title="Commits per day in a month"
                type="spline"
              />
              <Chart
                categories={Object.keys(weekdays)}
                series={[{ name: '', data: Object.values(weekdays) }]}
                title="Commits per weekday"
                type="spline"
              />
              <Chart
                categories={Object.keys(commitsPerHour)}
                series={[{ name: '', data: Object.values(commitsPerHour) }]}
                title="Commits per hour"
                type="spline"
              />
              <Chart
                categories={Object.keys(commitsPerMinute)}
                series={[{ name: '', data: Object.values(commitsPerMinute) }]}
                title="Commits per minute"
                type="spline"
              />
              <Chart
                categories={Object.keys(commitsPerSecond)}
                series={[{ name: '', data: Object.values(commitsPerSecond) }]}
                title="Commits per second"
                type="spline"
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default PageCalendar;
