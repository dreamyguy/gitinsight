import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from '../../graphql/queries';
import { UiContext } from './../../contexts';
import Loading from '../layout/Loading';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import Card from '../primitives/Card/Card';
import Chart from '../primitives/Chart/Chart';

const PageCuriosa = () => {
  const {
    loading,
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
  const { uiDarkMode, setUiIsLoading } = useContext(UiContext);

  useEffect(() => {
    const isLoading = loading;
    setUiIsLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Wrapper pageType="curiosa">
      {loading ? (
        <Loading
          colorBackgroundDark="dark:bg-gray-900"
          colorBackgroundLight="bg-white"
          colorSpinnerDark="#e46119" // 'fav-orange-dark'
          colorSpinnerLight="#e46119"
          fullHeight
          isDark={uiDarkMode}
          loading
          message="Loading curiosa stats"
          messageDark="dark:text-gray-300"
          messageLight="text-gray-800"
        />
      ) : (
        <>
          {statsGlobal && (
            <>
              <PageTitleWithDate title="Curiosa" from={commitDateFirst} until={commitDateLast} />
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                <Card
                  type="curiosa"
                  heading="Commits impact > thousand"
                  stat={commitsImpactGtThousand}
                  thousandify
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
              </dl>
              <Chart
                categories={Object.keys(commitsPerYear)}
                series={[{ name: '', data: Object.values(commitsPerYear) }]}
                title="Commits per year"
                type="spline"
              />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
export default PageCuriosa;
