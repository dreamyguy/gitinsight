export default function reducer(state = {
  statsRepo: {
    repository: null,
    commits: null,
    impact: null,
    impactRatio: null,
    daysActive: null,
    weekdays: {
      Mon: null,
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Sat: null,
      Sun: null
    },
    commitDateFirst: null,
    commitDateLast: null,
    daysSinceFirstCommit: null,
    daysSinceLastCommit: null,
    staleness: null,
    totalNrContributors: null,
    commitsPerDay: null
  },
  fetchingStatsRepos: false,
  fetchedStatsRepos: false,
  errorStatsRepos: null
}, action) {
  switch (action.type) {
    case 'FETCH_STATS_REPO':
      {
        return {
          ...state,
          fetchingStatsRepos: true
        };
      }
    case 'FETCH_STATS_REPO_REJECTED':
      {
        return {
          ...state,
          fetchingStatsRepos: false,
          errorStatsRepos: action.payload
        };
      }
    case 'FETCH_STATS_REPO_FULFILLED':
      {
        return {
          ...state,
          fetchingStatsRepos: false,
          fetchedStatsRepos: true,
          statsRepo: {
            ...state.statsRepo,
            repository: action.payload.repository,
            commits: action.payload.commits,
            impact: action.payload.impact,
            impactRatio: action.payload.impactRatio,
            daysActive: action.payload.daysActive,
            weekdays: {
              ...state.statsRepo.weekdays,
              Mon: action.payload.Mon,
              Tue: action.payload.Tue,
              Wed: action.payload.Wed,
              Thu: action.payload.Thu,
              Fri: action.payload.Fri,
              Sat: action.payload.Sat,
              Sun: action.payload.Sun
            },
            commitDateFirst: action.payload.commitDateFirst,
            commitDateLast: action.payload.commitDateLast,
            daysSinceFirstCommit: action.payload.daysSinceFirstCommit,
            daysSinceLastCommit: action.payload.daysSinceLastCommit,
            staleness: action.payload.staleness,
            totalNrContributors: action.payload.totalNrContributors,
            commitsPerDay: action.payload.commitsPerDay
          }
        };
      }
    default:
      return state;
  }
}
