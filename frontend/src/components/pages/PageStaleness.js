import React from 'react';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import {
  statsAuthorsQueryStaleness,
  statsReposQueryStaleness,
  statsGlobalQuery,
} from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import Heat from '../primitives/Heat/Heat';
import { thousandify } from '../../utils/thousandifyUtil';
import { resolveHeatIntensity } from '../../utils/resolveHeatIntensityUtil';
import { isNotEmptyArray } from '../../utils/isEmptyUtil';

const PageStaleness = () => {
  const {
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
  const { data: { statsAuthors: statsAuthorsStaleness } = {} } = useQuery(
    statsAuthorsQueryStaleness,
  );
  const { data: { statsRepos: statsReposStaleness } = {} } = useQuery(statsReposQueryStaleness);
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
  return (
    <Wrapper pageType="staleness">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Staleness" from={commitDateFirst} until={commitDateLast} />
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <Card type="staleness" heading="Overall staleness" stat={staleness.toFixed(2)} />
            {statsAuthorsStaleness && contributorsHeatList && (
              <Card
                type="staleness"
                heading={`Contributors w/ changes within ${legendHeat1stAboveOne(
                  contributorsHeatList,
                )} years`}
                stat={`${percentageHighHeat(contributorsHeatList)}%`}
              />
            )}
            {statsReposStaleness && reposHeatList && (
              <Card
                type="staleness"
                heading={`Repos w/ changes within ${legendHeat1stAboveOne(reposHeatList)} years`}
                stat={`${percentageHighHeat(reposHeatList)}%`}
              />
            )}
            <Card
              type="calendar"
              heading="Days since last commit"
              stat={thousandify(daysSinceLastCommit)}
            />
            <Card
              type="curiosa"
              heading="Commits impact > thousand"
              stat={thousandify(commitsImpactGtThousand)}
            />
          </dl>
          <div className={classnames(statsReposStaleness || statsAuthorsStaleness ? 'mt-5' : '')}>
            {statsReposStaleness && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Staleness among repos
                </h2>
                <Heat statuses={statsReposStaleness} />
              </>
            )}
            {statsAuthorsStaleness && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Staleness among contributors
                </h2>
                <Heat statuses={statsAuthorsStaleness} />
              </>
            )}
          </div>
          {statsReposStaleness && (
            <Chart
              categories={Object.values(statsReposStaleness).map((m, i) => i)}
              series={[
                { name: '', data: Object.values(statsReposStaleness).map(m => m.staleness) },
              ]}
              title="Staleness among repos, plotted"
              type="spline"
            />
          )}
          {statsAuthorsStaleness && (
            <Chart
              categories={Object.values(statsAuthorsStaleness).map((m, i) => i)}
              series={[
                { name: '', data: Object.values(statsAuthorsStaleness).map(m => m.staleness) },
              ]}
              title="Staleness among contributors, plotted"
              type="spline"
            />
          )}
        </>
      )}
    </Wrapper>
  );
};
export default PageStaleness;
