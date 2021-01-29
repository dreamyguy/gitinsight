/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery, commitsSortedByImpactDescQuery } from '../../graphql/queries';
import { UiContext } from './../../contexts';
import Loading from '../layout/Loading';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import { Code, Folder, Mail } from './../primitives/Icon';
import CalendarContributions from '../primitives/Calendar/CalendarContributions';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import { isNotEmptyArray, isNotEmptyObject } from '../../utils/isEmptyUtil';
import { getAvatarFromEmail } from '../../utils/getAvatarFromEmailUtil';
import { getDate } from '../../utils/getDateUtil';
import { getNameFromEmail } from '../../utils/getNameFromEmailUtil';
import { thousandify } from '../../utils/thousandifyUtil';
import { config } from './../../config';

const { githubOrg } = config;

const renderRepositories = ({ commitsSorted, handleNavigation }) => {
  const output = [];
  if (commitsSorted && isNotEmptyArray(commitsSorted)) {
    commitsSorted.map(item => {
      const {
        repository,
        commit_hash,
        author_date_unix_timestamp,
        author_email,
        impact,
        subject,
      } = item;
      output.push(
        <li key={uuidv4()}>
          <div className="block hover:bg-gray-50 dark:hover:bg-gray-700">
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 flex items-center">
                <Link to={`contributor/${author_email}`}>
                  <span className="inline-block relative">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={getAvatarFromEmail(author_email)}
                      alt={getNameFromEmail(author_email)}
                    />
                  </span>
                </Link>
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <a
                      href={`https://github.com/${githubOrg}/${repository
                        .toLowerCase()
                        .replace(/.git/g, '')}/commit/${commit_hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="text-sm font-medium text-indigo-600 truncate">{subject}</p>
                    </a>
                    <Link to={`contributor/${author_email}`}>
                      <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200">
                        <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
                        <span className="truncate">{author_email}</span>
                      </p>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        <span className="text-gray-400 dark:text-gray-300">Date: </span>
                        <time dateTime={getDate(author_date_unix_timestamp)}>
                          {getDate(author_date_unix_timestamp)}
                        </time>
                      </p>
                      <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-2 lg:gap-4 flex items-center text-sm text-gray-500 dark:text-gray-200 mt-2">
                        <div className="flex items-center">
                          <Code className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-green-dark" />
                          <span className="mr-3">{thousandify(impact)}</span>
                        </div>
                        <div className="flex items-center">
                          <Link to={`repository/${repository}`}>
                            <Folder className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-purple-middle" />
                            <span className="mr-3">
                              {repository.toLowerCase().replace(/.git/g, '')}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>,
      );
      return null;
    });
  }
  return output;
};

const Commits = ({ commitsSorted, handleNavigation }) => (
  <>
    {commitsSorted && isNotEmptyArray(commitsSorted) ? (
      <div className="bg-white dark:bg-gray-900 shadow overflow-hidden sm:rounded-md mt-5">
        <ul className="divide-y divide-gray-200 dark:divide-gray-900">
          {renderRepositories({ commitsSorted })}
        </ul>
      </div>
    ) : null}
  </>
);

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
  const { loading: loadingCommitsSorted, data: { commitsSorted } = {} } = useQuery(
    commitsSortedByImpactDescQuery,
    {
      variables: { count: 100 },
    },
  );
  const { uiDarkMode, uiIsAnimating, setUiIsAnimating, setUiIsLoading } = useContext(UiContext);
  const handleNavigation = () => {
    // Trigger number animation
    if (!uiIsAnimating) {
      setUiIsAnimating(true);
    }
  };

  useEffect(() => {
    const isLoading = loading;
    setUiIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Wrapper pageType="commits">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          isOneLine
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
      {loadingCommitsSorted ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          isDark={uiDarkMode}
          isOneLine
          loading
          message="Loading commits sorted by impact"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {commitsSorted && (
            <Commits commitsSorted={commitsSorted} handleNavigation={handleNavigation} />
          )}
        </>
      )}
    </Wrapper>
  );
};
export default PageCommits;
