// All queries are defined on this file. When making requests from React page components,
//  or directly from 'requests.js' file, we only use the exported 'gql' template literal tags from this file.

import gql from 'graphql-tag';

export const sidebarQuery = gql`
  query SidebarQuery {
    statsGlobal {
      commits
      contributors
      repositories
    }
  }
`;

export const statsGlobalQuery = gql`
  query StatsGlobalQuery {
    statsGlobal {
      commitDateFirst
      commitDateLast
      commits
      commitsImpactGtThousand
      commitsOnWeekend
      commitsPerContributorAverage
      commitsPerSecond
      commitsPerMinute
      commitsPerHour
      commitsPerDay
      commitsPerDayAverage
      commitsPerMonthDay
      commitsPerMonthNr
      commitsPerYear
      commitsWithoutFileChanges
      commitsWithoutImpact
      contributors
      # contributorsList
      daysActive
      daysSinceFirstCommit
      daysSinceLastCommit
      fileChanges
      lines
      repositories
      # repositoriesList
      staleness
      weekdays {
        Mon
        Tue
        Wed
        Thu
        Fri
        Sat
        Sun
      }
    }
  }
`;

export const statsAuthorsQueryTop30 = gql`
  query StatsAuthorsQueryTop30 {
    statsAuthors(sortBy: commits, sortDirection: desc, count: 30) {
      author
      # commitDateFirst
      commitDateLast
      commits
      # commitsPerSecond
      # commitsPerMinute
      # commitsPerHour
      # commitsPerDay
      # commitsPerDayAverage
      # commitsPerMonthDay
      # commitsPerMonthName
      # commitsPerMonthNr
      # commitsPerYear
      daysActive
      # daysSinceFirstCommit
      daysSinceLastCommit
      impact
      impactRatio
      repositories
      # repositoriesList
      staleness
      # weekdays {
      #   Mon
      #   Tue
      #   Wed
      #   Thu
      #   Fri
      #   Sat
      #   Sun
      # }
    }
  }
`;
