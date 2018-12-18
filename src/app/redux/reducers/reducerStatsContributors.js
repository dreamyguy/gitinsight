export default function reducer(state = {
  statsContributors: {
    author: null,
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
    totalNrRepositories: null,
    commitsPerDay: null
  },
  fetchingStatsContributors: false,
  fetchedStatsContributors: false,
  errorStatsContributors: null
}, action) {
  switch (action.type) {
    case 'FETCH_STATS_CONTRIBUTORS':
      {
        return {
          ...state,
          fetchingStatsContributors: true
        };
      }
    case 'FETCH_STATS_CONTRIBUTORS_REJECTED':
      {
        return {
          ...state,
          fetchingStatsContributors: false,
          errorStatsContributors: action.payload
        };
      }
    case 'FETCH_STATS_CONTRIBUTORS_FULFILLED':
      {
        return {
          ...state,
          fetchingStatsContributors: false,
          fetchedStatsContributors: true,
          statsContributors: {
            ...state.statsContributors,
            author: action.payload.author,
            commits: action.payload.commits,
            impact: action.payload.impact,
            impactRatio: action.payload.impactRatio,
            daysActive: action.payload.daysActive,
            weekdays: {
              ...state.statsContributors.weekdays,
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
            totalNrRepositories: action.payload.totalNrRepositories,
            commitsPerDay: action.payload.commitsPerDay
          }
        };
      }
    default:
      return state;
  }
}
