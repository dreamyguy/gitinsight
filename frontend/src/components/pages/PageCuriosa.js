import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';
import { thousandify } from '../../utils/thousandifyUtil';

const PageCuriosa = () => {
  const {
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commitsImpactGtThousand,
        commitsPerYear, // obj with single key-value pair
        commitsWithoutFileChanges,
        commitsWithoutImpact,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="curiosa">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Curiosa" from={commitDateFirst} until={commitDateLast} />
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            <Card
              type="curiosa"
              heading="Commits impact > thousand"
              stat={thousandify(commitsImpactGtThousand)}
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
          </dl>
          <Chart
            categories={Object.keys(commitsPerYear)}
            data={Object.values(commitsPerYear)}
            title="Commits per year"
            type="spline"
          />
        </>
      )}
    </Wrapper>
  );
};
export default PageCuriosa;
