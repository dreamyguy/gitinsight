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
      commitsPerDayCummulative
      commitsPerDayAverage
      commitsPerMonthDay
      commitsPerMonthNr
      commitsPerYear
      impactPerSecond
      impactByDay
      impactByDayCummulative
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
    statsAuthors(sortBy: staleness, sortDirection: asc, count: 30) {
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

export const statsAuthorsQueryStaleness = gql`
  query StatsAuthorsQueryStaleness {
    statsAuthors(sortBy: staleness, sortDirection: asc) {
      staleness
    }
  }
`;

export const statsReposQueryTop30 = gql`
  query StatsReposQueryTop30 {
    statsRepos(sortBy: staleness, sortDirection: asc, count: 30) {
      # commitDateFirst
      commitDateLast
      commits
      commitsImpactGtThousand
      commitsOnWeekend
      commitsPerContributorAverage
      # commitsPerDay
      # commitsPerDayAverage
      # commitsPerDayCummulative
      # commitsPerHour
      # commitsPerMinute
      # commitsPerMonthDay
      # commitsPerMonthName
      # commitsPerMonthNr
      # commitsPerSecond
      # commitsPerYear
      # commitsWithoutFileChanges
      # commitsWithoutImpact
      contributors
      # contributorsList
      daysActive
      # daysSinceFirstCommit
      daysSinceLastCommit
      # fileChanges
      impact
      # impactByDay
      # impactByDayCummulative
      impactRatio
      repository
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
export const statsReposQueryTop30BySize = gql`
  query StatsReposQueryTop30BySize {
    statsRepos(sortBy: impact, sortDirection: desc, count: 30) {
      # commitDateFirst
      commitDateLast
      commits
      commitsImpactGtThousand
      commitsOnWeekend
      commitsPerContributorAverage
      # commitsPerDay
      # commitsPerDayAverage
      # commitsPerDayCummulative
      # commitsPerHour
      # commitsPerMinute
      # commitsPerMonthDay
      # commitsPerMonthName
      # commitsPerMonthNr
      # commitsPerSecond
      # commitsPerYear
      # commitsWithoutFileChanges
      # commitsWithoutImpact
      contributors
      # contributorsList
      daysActive
      # daysSinceFirstCommit
      daysSinceLastCommit
      # fileChanges
      impact
      # impactByDay
      # impactByDayCummulative
      impactRatio
      repository
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

export const statsReposQueryStaleness = gql`
  query StatsReposQueryStaleness {
    statsRepos(sortBy: staleness, sortDirection: asc) {
      staleness
    }
  }
`;

export const statsAuthorQuery = gql`
  query StatsAuthorQuery($authorEmail: String!) {
    statsAuthor(author_email: $authorEmail, sortBy: staleness, sortDirection: asc) {
      author
      commitDateFirst
      commitDateLast
      commits
      commitsImpactGtThousand
      commitsOnWeekend
      commitsPerDay
      commitsPerDayAverage
      commitsPerDayCummulative
      commitsPerHour
      commitsPerMinute
      commitsPerMonthDay
      commitsPerMonthName
      commitsPerMonthNr
      commitsPerSecond
      commitsPerYear
      commitsWithoutFileChanges
      commitsWithoutImpact
      daysActive
      daysSinceFirstCommit
      daysSinceLastCommit
      fileChanges
      impact
      impactByDay
      impactByDayCummulative
      impactRatio
      repositories
      repositoriesList
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

export const statsRepoQuery = gql`
  query StatsRepoQuery($repoName: String!) {
    statsRepo(repository: $repoName, sortBy: staleness, sortDirection: asc) {
      commitDateFirst
      commitDateLast
      commits
      commitsImpactGtThousand
      commitsOnWeekend
      commitsPerContributorAverage
      commitsPerDay
      commitsPerDayAverage
      commitsPerDayCummulative
      commitsPerHour
      commitsPerMinute
      commitsPerMonthDay
      commitsPerMonthName
      commitsPerMonthNr
      commitsPerSecond
      commitsPerYear
      commitsWithoutFileChanges
      commitsWithoutImpact
      contributors
      contributorsList
      daysActive
      daysSinceFirstCommit
      daysSinceLastCommit
      fileChanges
      impact
      impactByDay
      impactByDayCummulative
      impactRatio
      repository
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

export const commitsSortedByImpactDescQuery = gql`
  query CommitsSortedByImpactDescQuery($count: Int) {
    commitsSorted(sortBy: impact, sortDirection: desc, count: $count) {
      repository
      commit_nr
      commit_hash
      author_name
      author_email
      author_date
      author_date_relative
      author_date_unix_timestamp
      author_date_iso_8601
      subject
      subject_sanitized
      stats
      time_hour
      time_minutes
      time_seconds
      time_gmt
      date_day_week
      date_month_day
      date_month_name
      date_month_number
      date_year
      date_iso_8601
      files_changed
      insertions
      deletions
      impact
    }
  }
`;
