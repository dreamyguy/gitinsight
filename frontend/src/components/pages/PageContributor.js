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
import { addEmptyDays } from '../../utils/getDateUtil';
import { cummulative } from '../../utils/cummulativeUtil';
import { isNotEmptyArray, isNotEmptyObject } from '../../utils/isEmptyUtil';
import { getAvatarFromEmail } from '../../utils/getAvatarFromEmailUtil';
import { getNameFromEmail } from '../../utils/getNameFromEmailUtil';
import { stalenessStatus } from '../../utils/stalenessStatusUtil';

const PageContributor = () => {
  const { paramAuthorEmail } = useParams();
  const {
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
    data: {
      statsAuthor,
      statsAuthor: [
        {
          author,
          // commitDateFirst: commitDateFirstAuthor,
          // commitDateLast: commitDateLastAuthor,
          commits,
          commitsImpactGtThousand: commitsImpactGtThousandAuthor,
          commitsOnWeekend,
          commitsPerDay: commitsPerDayAuthor,
          commitsPerDayAverage,
          // commitsPerDayCummulative: commitsPerDayCummulativeAuthor,
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
          impactByDay: impactByDayAuthor,
          impactByDayCummulative: impactByDayCummulativeAuthor,
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
          <div className="grid grid-flow-col grid-rows-4 grid-cols-3 gap-5 mt-5">
            <div className="row-span-2 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md px-4 py-4 sm:p-6">
              <div className="flex items-center">
                <div className="min-w-0 flex-1 flex items-center">
                  <span className="inline-block relative">
                    <img
                      className="h-32 w-32 rounded-full"
                      src={getAvatarFromEmail(author)}
                      alt={getNameFromEmail(author)}
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
                        {getNameFromEmail(author)}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
                        <span className="truncate">{author}</span>
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
              <Card type="repositories" heading="Repositories" stat={repositories} thousandify />
            </div>
            <div className="row-start-1 col-start-3">
              <Card type="code" heading="Commits" stat={commits} thousandify />
            </div>
            <div className="row-start-2 col-start-2">
              <Card
                type="calendar"
                heading="Years active"
                stat={(daysActive / 365).toFixed(1)}
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
                stat={commitsImpactGtThousandAuthor}
                thousandify
              />
            </div>
            <div className="row-start-4 col-start-3">
              <Card type="staleness" heading="Staleness" stat={staleness.toFixed(2)} />
            </div>
          </div>
          {commitsPerDayAuthor && isNotEmptyObject(commitsPerDayAuthor) && (
            <div className="mt-5">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Commits per day
              </h2>
              <CalendarContributions
                until={Object.keys(commitsPerDayAuthor).pop()}
                values={commitsPerDayAuthor}
              />
            </div>
          )}
          {impactByDayCummulativeAuthor && isNotEmptyObject(impactByDayCummulativeAuthor) && (
            <Chart
              categories={Object.keys(impactByDayCummulativeAuthor)}
              series={[{ name: '', data: Object.values(impactByDayCummulativeAuthor) }]}
              title="Lines of code, over time"
              type="spline"
            />
          )}
          {impactByDay &&
            isNotEmptyObject(impactByDay) &&
            impactByDayAuthor &&
            isNotEmptyObject(impactByDayAuthor) && (
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
                    name: author,
                    data: Object.values(
                      cummulative(
                        addEmptyDays({
                          dayList: impactByDayAuthor,
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
            commitsPerDayAuthor &&
            isNotEmptyObject(commitsPerDayAuthor) && (
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
                    name: author,
                    data: Object.values(
                      cummulative(
                        addEmptyDays({
                          dayList: commitsPerDayAuthor,
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
    </Wrapper>
  );
};
export default PageContributor;
