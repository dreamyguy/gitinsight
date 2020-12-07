// All queries are defined on this file. When making requests from React page components,
//  or directly from 'requests.js' file, we only use the exported 'gql' template literal tags from this file.

import gql from 'graphql-tag';

export const statsGlobalQuery = gql`
  query StatsGlobalQuery {
    statsGlobal {
      commits
      contributors
      repositories
      lines
      fileChanges
      commitsWithoutFileChanges
      commitsWithoutImpact
      commitsImpactGtThousand
      commitsOnWeekend
      weekdays {
        Mon
        Tue
        Wed
        Thu
        Sat
        Sun
      }
      daysActive
      commitDateFirst
      commitDateLast
      daysSinceFirstCommit
      daysSinceLastCommit
      staleness
      commitsPerDay
    }
  }
`;
