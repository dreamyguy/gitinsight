// All queries are defined on this file. When making requests from React page components,
//  or directly from 'requests.js' file, we only use the exported 'gql' template literal tags from this file.

import gql from 'graphql-tag';

export const statsGlobalQuery = gql`
  query StatsGlobalQuery {
    statsGlobal {
      commitDateFirst
      commitDateLast
      commits
      commitsImpactGtThousand
      commitsOnWeekend
      commitsPerContributorAverage
      commitsPerDay
      commitsPerDayAverage
      commitsPerMonthDay
      commitsPerMonthNr
      commitsPerYear
      commitsWithoutFileChanges
      commitsWithoutImpact
      contributors
      contributorsList
      daysActive
      daysSinceFirstCommit
      daysSinceLastCommit
      fileChanges
      lines
      repositories
      repositoriesList
      staleness
      weekdays {
        Mon
        Tue
        Wed
        Thu
        Sat
        Sun
      }
    }
  }
`;
