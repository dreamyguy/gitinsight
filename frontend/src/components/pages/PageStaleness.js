import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  statsAuthorsQueryStaleness,
  statsReposQueryStaleness,
  statsGlobalQuery,
} from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import Card from '../primitives/Card/Card';
import Heat from '../primitives/Heat/Heat';
import { thousandify } from '../../utils/thousandifyUtil';
import { resolveHeatIntensity } from '../../utils/resolveHeatIntensityUtil';

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
  const legendHeat1stAboveOne = list => list.find(l => parseFloat(l.legend) > 1).legend;
  const percentageHighHeat = list => {
    let percentageSum = 0;
    list.forEach(l => {
      if (parseFloat(l.legend) < 1) {
        percentageSum += l.percentage;
      }
      return null;
    });
    return percentageSum.toFixed(2);
  };

  return (
    <Wrapper pageType="staleness">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Staleness" from={commitDateFirst} until={commitDateLast} />
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card type="staleness" heading="Overall staleness" stat={staleness.toFixed(2)} />
            {contributorsHeatList && (
              <Card
                type="staleness"
                heading={`Contributors w/ changes within ${legendHeat1stAboveOne(
                  contributorsHeatList,
                )} years`}
                stat={`${percentageHighHeat(contributorsHeatList)}%`}
              />
            )}
            {reposHeatList && (
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
          <div className="mt-5">
            <h2 className="text-2xl font-semibold text-gray-900">Staleness among repos</h2>
            <Heat statuses={statsReposStaleness} />
            <h2 className="text-2xl font-semibold text-gray-900">Staleness among contributors</h2>
            <Heat statuses={statsAuthorsStaleness} />
          </div>
        </>
      )}
    </Wrapper>
  );
};
export default PageStaleness;
