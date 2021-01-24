import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { statsRepoQuery, statsGlobalQuery } from '../../graphql/queries';
import { UiContext } from './../../contexts';
import Loading from '../layout/Loading';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import { Mail } from './../primitives/Icon';
import CalendarContributions from '../primitives/Calendar/CalendarContributions';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import { addEmptyDays } from '../../utils/getDateUtil';
import { cummulative } from '../../utils/cummulativeUtil';
import { isNotEmptyArray, isNotEmptyObject } from '../../utils/isEmptyUtil';
import { getAvatarFromEmail } from '../../utils/getAvatarFromEmailUtil';
import { getNameFromEmail } from '../../utils/getNameFromEmailUtil';
import { stalenessStatus } from '../../utils/stalenessStatusUtil';

const PageRepository = () => {
  const { uiDarkMode, setUiIsLoading } = useContext(UiContext);
  const { paramRepoName } = useParams();
  const {
    loading,
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commitsPerDay,
        // commitsPerDayCummulative,
        impactByDay,
        // impactByDayCummulative,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  const {
    loading: loadingRepo,
    data: {
      statsRepo,
      statsRepo: [
        {
          // commitDateFirst: commitDateFirstRepo,
          // commitDateLast: commitDateLastRepo,
          commits,
          commitsImpactGtThousand: commitsImpactGtThousandRepo,
          commitsOnWeekend,
          // commitsPerContributorAverage,
          commitsPerDay: commitsPerDayRepo,
          commitsPerDayAverage,
          // commitsPerDayCummulative: commitsPerDayCummulativeRepo,
          commitsPerHour, // obj with single key-value pair
          commitsPerMinute, // obj with single key-value pair
          commitsPerMonthDay, // obj with single key-value pair
          // commitsPerMonthName,
          commitsPerMonthNr, // obj with single key-value pair
          commitsPerSecond, // obj with single key-value pair
          commitsPerYear, // obj with single key-value pair
          // commitsWithoutFileChanges,
          // commitsWithoutImpact,
          contributors,
          // contributorsList, // array list
          repository,
          daysActive,
          daysSinceFirstCommit,
          daysSinceLastCommit,
          // fileChanges,
          // impact,
          impactByDay: impactByDayRepo,
          impactByDayCummulative: impactByDayCummulativeRepo,
          // impactRatio,
          staleness,
          weekdays, // obj with single key-value pair
        } = {},
      ] = [],
    } = {},
  } = useQuery(statsRepoQuery, {
    variables: { repoName: paramRepoName },
  });

  useEffect(() => {
    const isLoading = loading || loadingRepo;
    setUiIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loadingRepo]);

  return (
    <Wrapper pageType="repository">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          isDark={uiDarkMode}
          isOneLine
          loading
          message="Loading page title"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {statsGlobal && (
            <PageTitleWithDate title="Repository" from={commitDateFirst} until={commitDateLast} />
          )}
        </>
      )}
      {loadingRepo ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          fullHeight
          isDark={uiDarkMode}
          loading
          message="Loading repository stats"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {statsRepo && isNotEmptyArray(statsRepo) && (
            <>
              <div className="grid grid-flow-col grid-rows-4 grid-cols-3 gap-5 mt-5">
                <div className="row-span-2 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md px-4 py-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1 flex items-center">
                      <span className="inline-block relative">
                        <img
                          className="h-32 w-32 rounded-full"
                          src={getAvatarFromEmail(repository)}
                          alt={getNameFromEmail(repository)}
                        />
                        <span
                          className={classnames(
                            'absolute bottom-0 right-0 block h-6 w-6 rounded-full ring-4 ring-white dark:ring-gray-800',
                            staleness ? stalenessStatus(staleness, 'color') : '',
                          )}
                        />
                      </span>
                      <div className="min-w-0 flex-1 px-4">
                        <div>
                          <p className="text-medium font-medium text-indigo-600 dark:text-fav-orange-middle truncate">
                            {getNameFromEmail(repository)}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                            <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
                            <span className="truncate">{repository}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-5">
                    <span
                      role="img"
                      aria-label="trophy"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🏆
                    </span>
                    <span
                      role="img"
                      aria-label="military medal"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🎖
                    </span>
                    {/* <span
                      role="img"
                      aria-label="sports medal"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🏅
                    </span> */}
                    {/* <span
                      role="img"
                      aria-label="1st place medal"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🥇
                    </span> */}
                    <span
                      role="img"
                      aria-label="2nd place medal"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🥈
                    </span>
                    {/* <span
                      role="img"
                      aria-label="3rd place medal"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🥉
                    </span> */}
                    <span
                      role="img"
                      aria-label="crystal ball"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🔮
                    </span>
                    {/* <span
                      role="img"
                      aria-label="tropical fish"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🐠
                    </span>
                    <span
                      role="img"
                      aria-label="tropical drink"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🍹
                    </span> */}
                    <span
                      role="img"
                      aria-label="hot beverage"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      ☕
                    </span>
                    {/* <span
                      role="img"
                      aria-label="teacup without handle"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🍵
                    </span> */}
                    <span
                      role="img"
                      aria-label="beer mug"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🍺
                    </span>
                    <span
                      role="img"
                      aria-label="mushroom"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🍄
                    </span>
                    <span
                      role="img"
                      aria-label="brain"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🧠
                    </span>
                    <span
                      role="img"
                      aria-label="superhero"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🦸
                    </span>
                    {/* <span
                      role="img"
                      aria-label="supervillain"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🦹
                    </span>
                    <span
                      role="img"
                      aria-label="zombie"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🧟
                    </span>
                    <span
                      role="img"
                      aria-label="person juggling"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🤹
                    </span> */}
                    <span
                      role="img"
                      aria-label="unicorn"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🦄
                    </span>
                    {/* <span
                      role="img"
                      aria-label="duck"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🦆
                    </span>
                    <span
                      role="img"
                      aria-label="elephant"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🐘
                    </span>
                    <span
                      role="img"
                      aria-label="green heart"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      💚
                    </span>
                    <span
                      role="img"
                      aria-label="purple heart"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      💜
                    </span>
                    <span
                      role="img"
                      aria-label="black heart"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      🖤
                    </span>
                    <span
                      role="img"
                      aria-label="chart increasing"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      📈
                    </span>
                    <span
                      role="img"
                      aria-label="chart decreasing"
                      className="react-emojis mr-1"
                      style={{ lineHeight: '1', fontSize: '24px' }}
                    >
                      📉
                    </span> */}
                  </div>
                </div>
                <div className="row-start-1 col-start-2">
                  <Card
                    type="contributors"
                    heading="Contributors"
                    stat={contributors}
                    thousandify
                  />
                </div>
                <div className="row-start-1 col-start-3">
                  <Card type="code" heading="Commits" stat={commits} thousandify />
                </div>
                <div className="row-start-2 col-start-2">
                  <Card
                    type="calendar"
                    heading="Years active"
                    stat={parseInt((daysActive / 365).toFixed(1), 10)}
                    thousandify
                  />
                </div>
                <div className="row-start-2 col-start-3">
                  <Card
                    type="calendar"
                    heading="Days since first commit"
                    stat={daysSinceFirstCommit}
                    thousandify
                  />
                </div>
                <div className="row-start-3 col-start-1">
                  <Card
                    type="calendar"
                    heading="Days between first and last commit"
                    stat={daysActive}
                    thousandify
                  />
                </div>
                <div className="row-start-3 col-start-2">
                  <Card
                    type="calendar"
                    heading="Days since last commit"
                    stat={daysSinceLastCommit}
                    thousandify
                  />
                </div>
                <div className="row-start-3 col-start-3">
                  <Card
                    type="calendar"
                    heading="Commits on weekends"
                    stat={commitsOnWeekend}
                    thousandify
                  />
                </div>
                <div className="row-start-4 col-start-1">
                  <Card
                    type="trends"
                    heading="Average commits / day"
                    stat={commitsPerDayAverage.toFixed(2)}
                  />
                </div>
                <div className="row-start-4 col-start-2">
                  <Card
                    type="curiosa"
                    heading="Commits impact > thousand"
                    stat={commitsImpactGtThousandRepo}
                    thousandify
                  />
                </div>
                <div className="row-start-4 col-start-3">
                  <Card type="staleness" heading="Staleness" stat={staleness.toFixed(2)} />
                </div>
              </div>
              {commitsPerDayRepo && isNotEmptyObject(commitsPerDayRepo) && (
                <div className="mt-5">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                    Commits per day
                  </h2>
                  <CalendarContributions
                    until={Object.keys(commitsPerDayRepo).pop()}
                    values={commitsPerDayRepo}
                  />
                </div>
              )}
              {impactByDayCummulativeRepo && isNotEmptyObject(impactByDayCummulativeRepo) && (
                <Chart
                  categories={Object.keys(impactByDayCummulativeRepo)}
                  series={[{ name: '', data: Object.values(impactByDayCummulativeRepo) }]}
                  title="Lines of code, over time"
                  type="spline"
                />
              )}
              {impactByDay &&
                isNotEmptyObject(impactByDay) &&
                impactByDayRepo &&
                isNotEmptyObject(impactByDayRepo) && (
                  <Chart
                    categories={Object.keys(
                      addEmptyDays({
                        dayList: impactByDay,
                        firstDay: commitDateFirst,
                        lastDay: commitDateLast,
                      }),
                    )}
                    series={[
                      {
                        name: repository,
                        data: Object.values(
                          cummulative(
                            addEmptyDays({
                              dayList: impactByDayRepo,
                              firstDay: commitDateFirst,
                              lastDay: commitDateLast,
                            }),
                          ),
                        ),
                        color: '#ff0000',
                      },
                      {
                        name: 'All',
                        data: Object.values(
                          cummulative(
                            addEmptyDays({
                              dayList: impactByDay,
                              firstDay: commitDateFirst,
                              lastDay: commitDateLast,
                            }),
                          ),
                        ),
                      },
                    ]}
                    title="Lines of code, over time, compared to absolute total"
                    type="spline"
                  />
                )}
              {commitDateFirst &&
                commitDateLast &&
                commitsPerDay &&
                isNotEmptyObject(commitsPerDay) &&
                commitsPerDayRepo &&
                isNotEmptyObject(commitsPerDayRepo) && (
                  <Chart
                    categories={Object.keys(
                      cummulative(
                        addEmptyDays({
                          dayList: commitsPerDay,
                          firstDay: commitDateFirst,
                          lastDay: commitDateLast,
                        }),
                      ),
                    )}
                    series={[
                      {
                        name: repository,
                        data: Object.values(
                          cummulative(
                            addEmptyDays({
                              dayList: commitsPerDayRepo,
                              firstDay: commitDateFirst,
                              lastDay: commitDateLast,
                            }),
                          ),
                        ),
                        color: '#ff0000',
                      },
                      {
                        name: 'All',
                        data: Object.values(
                          cummulative(
                            addEmptyDays({
                              dayList: commitsPerDay,
                              firstDay: commitDateFirst,
                              lastDay: commitDateLast,
                            }),
                          ),
                        ),
                      },
                    ]}
                    title="Commits per day, over time, compared to absolute total"
                    type="spline"
                  />
                )}
              {/* {commitsPerDayCummulative && isNotEmptyObject(commitsPerDayCummulative) && (
                <Chart
                  categories={Object.keys(commitsPerDayCummulative)}
                  series={[{ name: '', data: Object.values(commitsPerDayCummulative) }]}
                  title="Commits, over time"
                  type="spline"
                />
              )} */}
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
export default PageRepository;
