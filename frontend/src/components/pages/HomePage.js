import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { statsGlobalQuery } from './../../graphql/queries';
import Wrapper from '../layout/Wrapper';

const HomePage = () => {
  const {
    data: {
      statsGlobal,
      statsGlobal: {
        commits,
        contributors,
        repositories,
        lines,
        fileChanges,
        commitsWithoutFileChanges,
        commitsWithoutImpact,
        commitsImpactGtThousand,
        commitsOnWeekend,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  return (
    <Wrapper pageType="home">
      <p>Homepage</p>
      {statsGlobal && (
        <ul>
          <li>commits: {commits}</li>
          <li>contributors: {contributors}</li>
          <li>repositories: {repositories}</li>
          <li>lines: {lines}</li>
          <li>fileChanges: {fileChanges}</li>
          <li>commitsWithoutFileChanges: {commitsWithoutFileChanges}</li>
          <li>commitsWithoutImpact: {commitsWithoutImpact}</li>
          <li>commitsImpactGtThousand: {commitsImpactGtThousand}</li>
          <li>commitsOnWeekend: {commitsOnWeekend}</li>
        </ul>
      )}
    </Wrapper>
  );
};
export default HomePage;
