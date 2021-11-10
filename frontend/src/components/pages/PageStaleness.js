import React, { useContext, useEffect } from 'react';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import {
  statsAuthorsStalenessQuery,
  statsReposQueryStaleness,
  statsGlobalQuery,
} from '../../graphql/queries';
import { UiContext } from './../../contexts';
import Loading from '../layout/Loading';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import Heat from '../primitives/Heat/Heat';
import { resolveHeatIntensity } from '../../utils/resolveHeatIntensityUtil';
import { isNotEmptyArray } from '../../utils/isEmptyUtil';

const PageStaleness = () => {
  const {
    loading,
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commitsImpactGtThousand,
        daysSinceLastCommit,
        staleness,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  const {
    loading: loadingAuthorsStaleness,
    data: { statsAuthors: statsAuthorsStaleness } = {},
  } = useQuery(statsAuthorsStalenessQuery);
  const {
    loading: loadingReposStaleness,
    data: { statsRepos: statsReposStaleness } = {},
  } = useQuery(statsReposQueryStaleness);
  const { uiDarkMode, setUiIsLoading } = useContext(UiContext);
  // Some calculations within this page...
  const contributorsHeatList = resolveHeatIntensity({ list: statsAuthorsStaleness });
  const reposHeatList = resolveHeatIntensity({ list: statsReposStaleness });
  const legendHeat1stAboveOne = list => {
    if (list && isNotEmptyArray(list)) {
      return list.find(l => parseFloat(l.legend) > 1).legend;
    }
    return null;
  };
  const percentageHighHeat = list => {
    let percentageSum = 0;
    if (list && isNotEmptyArray(list)) {
      list.forEach(l => {
        if (parseFloat(l.legend) < 1) {
          percentageSum += l.percentage;
        }
        return null;
      });
    }
    return percentageSum.toFixed(2);
  };

  useEffect(() => {
    const isLoading = loading || loadingAuthorsStaleness || loadingReposStaleness;
    setUiIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loadingAuthorsStaleness, loadingReposStaleness]);

  return (
    <Wrapper pageType="staleness">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          fullHeight
          isDark={uiDarkMode}
          loading
          message="Loading staleness stats"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {statsGlobal && (
            <>
              <PageTitleWithDate title="Staleness" from={commitDateFirst} until={commitDateLast} />
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                <Card type="staleness" heading="Overall staleness" stat={staleness.toFixed(2)} />
                {loadingAuthorsStaleness ? (
                  <Loading
                    colorBackgroundDark="dark:bg-gray-900"
                    colorBackgroundLight="bg-white"
                    colorSpinnerDark="#e46119" // 'fav-orange-dark'
                    colorSpinnerLight="#e46119"
                    isDark={uiDarkMode}
                    isOneLine
                    loading
                    message="Loading contributors staleness card"
                    messageDark="dark:text-gray-300"
                    messageLight="text-gray-800"
                  />
                ) : (
                  <>
                    {statsAuthorsStaleness && contributorsHeatList && (
                      <Card
                        type="staleness"
                        heading={`Contributors w/ changes within ${legendHeat1stAboveOne(
                          contributorsHeatList,
                        )} years`}
                        stat={`${percentageHighHeat(contributorsHeatList)}%`}
                      />
                    )}
                  </>
                )}
                {loadingReposStaleness ? (
                  <Loading
                    colorBackgroundDark="dark:bg-gray-900"
                    colorBackgroundLight="bg-white"
                    colorSpinnerDark="#e46119" // 'fav-orange-dark'
                    colorSpinnerLight="#e46119"
                    isDark={uiDarkMode}
                    isOneLine
                    loading
                    message="Loading repos staleness card"
                    messageDark="dark:text-gray-300"
                    messageLight="text-gray-800"
                  />
                ) : (
                  <>
                    {statsReposStaleness && reposHeatList && (
                      <Card
                        type="staleness"
                        heading={`Repos w/ changes within ${legendHeat1stAboveOne(
                          reposHeatList,
                        )} years`}
                        stat={`${percentageHighHeat(reposHeatList)}%`}
                      />
                    )}
                  </>
                )}
                <Card
                  type="calendar"
                  heading="Days since last commit"
                  stat={daysSinceLastCommit}
                  thousandify
                />
                <Card
                  type="curiosa"
                  heading="Commits impact > thousand"
                  stat={commitsImpactGtThousand}
                  thousandify
                />
              </dl>
              <div
                className={classnames(statsReposStaleness || statsAuthorsStaleness ? 'mt-5' : '')}
              >
                {loadingReposStaleness ? (
                  <Loading
                    colorBackgroundDark="dark:bg-gray-900"
                    colorBackgroundLight="bg-white"
                    colorSpinnerDark="#e46119" // 'fav-orange-dark'
                    colorSpinnerLight="#e46119"
                    isDark={uiDarkMode}
                    isOneLine
                    loading
                    message="Loading repos staleness bar"
                    messageDark="dark:text-gray-300"
                    messageLight="text-gray-800"
                  />
                ) : (
                  <>
                    {statsReposStaleness && (
                      <>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                          Staleness among repos
                        </h2>
                        <Heat statuses={statsReposStaleness} />
                      </>
                    )}
                  </>
                )}
                {loadingAuthorsStaleness ? (
                  <Loading
                    colorBackgroundDark="dark:bg-gray-900"
                    colorBackgroundLight="bg-white"
                    colorSpinnerDark="#e46119" // 'fav-orange-dark'
                    colorSpinnerLight="#e46119"
                    isDark={uiDarkMode}
                    isOneLine
                    loading
                    message="Loading contributors staleness bar"
                    messageDark="dark:text-gray-300"
                    messageLight="text-gray-800"
                  />
                ) : (
                  <>
                    {statsAuthorsStaleness && (
                      <>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                          Staleness among contributors
                        </h2>
                        <Heat statuses={statsAuthorsStaleness} />
                      </>
                    )}
                  </>
                )}
              </div>
              {loadingReposStaleness ? (
                <Loading
                  colorBackgroundDark="dark:bg-gray-900"
                  colorBackgroundLight="bg-white"
                  colorSpinnerDark="#e46119" // 'fav-orange-dark'
                  colorSpinnerLight="#e46119"
                  isDark={uiDarkMode}
                  isOneLine
                  loading
                  message="Loading repos staleness chart"
                  messageDark="dark:text-gray-300"
                  messageLight="text-gray-800"
                />
              ) : (
                <>
                  {statsReposStaleness && (
                    <Chart
                      categories={Object.values(statsReposStaleness).map((m, i) => i)}
                      series={[
                        {
                          name: '',
                          data: Object.values(statsReposStaleness).map(m => m.staleness),
                        },
                      ]}
                      title="Staleness among repos, plotted"
                      type="spline"
                    />
                  )}
                </>
              )}
              {loadingAuthorsStaleness ? (
                <Loading
                  colorBackgroundDark="dark:bg-gray-900"
                  colorBackgroundLight="bg-white"
                  colorSpinnerDark="#e46119" // 'fav-orange-dark'
                  colorSpinnerLight="#e46119"
                  isDark={uiDarkMode}
                  isOneLine
                  loading
                  message="Loading contributors staleness chart"
                  messageDark="dark:text-gray-300"
                  messageLight="text-gray-800"
                />
              ) : (
                <>
                  {statsAuthorsStaleness && (
                    <Chart
                      categories={Object.values(statsAuthorsStaleness).map((m, i) => i)}
                      series={[
                        {
                          name: '',
                          data: Object.values(statsAuthorsStaleness).map(m => m.staleness),
                        },
                      ]}
                      title="Staleness among contributors, plotted"
                      type="spline"
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default PageStaleness;
