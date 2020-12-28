import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import DatesFromUntil from '../content/DatesFromUntil';
import Card from '../primitives/Card/Card';
import { thousandify } from '../../utils/thousandifyUtil';
import { statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';

const PageStaleness = () => {
  const {
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commits,
        commitsImpactGtThousand,
        commitsOnWeekend,
        commitsPerContributorAverage,
        commitsPerDayAverage,
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
  return (
    <Wrapper pageType="staleness">
      {statsGlobal && (
        <>
          <dl className="flex items-baseline md:flex-col lg:flex-row lg:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Staleness</h1>
            <DatesFromUntil from={commitDateFirst} until={commitDateLast} />
          </dl>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card type="contributors" heading="Contributors" stat={thousandify(contributors)} />
            <Card type="repositories" heading="Repositories" stat={thousandify(repositories)} />
            <Card type="code" heading="Commits" stat={thousandify(commits)} />
            <Card
              type="curiosa"
              heading="Commits impact > thousand"
              stat={thousandify(commitsImpactGtThousand)}
            />
            <Card
              type="calendar"
              heading="Commits on weekends"
              stat={thousandify(commitsOnWeekend)}
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
              stat={thousandify(commitsWithoutFileChanges)}
            />
            <Card
              type="curiosa"
              heading="Commits without impact"
              stat={thousandify(commitsWithoutImpact)}
            />
            <Card
              type="calendar"
              heading="Days since first commit"
              stat={thousandify(daysSinceFirstCommit)}
            />
            <Card
              type="calendar"
              heading="Days between first and last commit"
              stat={thousandify(daysActive)}
            />
            <Card
              type="calendar"
              heading="Days since last commit"
              stat={thousandify(daysSinceLastCommit)}
            />
            <Card type="code" heading="File changes" stat={thousandify(fileChanges)} />
            <Card type="code" heading="Lines of code" stat={thousandify(lines)} />
            <Card type="staleness" heading="Staleness" stat={staleness.toFixed(2)} />
          </dl>
        </>
      )}
    </Wrapper>
  );
};
export default PageStaleness;
