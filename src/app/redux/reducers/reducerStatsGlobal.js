export default function reducer(state = {
  statsGlobal: {
    commits: null,
    contributors: null,
    repositories: null,
    lines: null,
    fileChanges: null,
    commitsWithoutFileChanges: null,
    commitsWithoutImpact: null,
    commitsImpactGtThousand: null,
    commitsOnWeekend: null,
    weekdays: {
      Tue: null,
      Wed: null,
      Thu: null,
      Fri: null,
      Mon: null,
      Sun: null,
      Sat: null
    },
    daysActive: null,
    commitDateFirst: null,
    commitDateLast: null,
    daysSinceFirstCommit: null,
    daysSinceLastCommit: null,
    staleness: null,
    commitsPerDay: null,
    commitsPerContributor: null
  },
  fetchingStatsGlobal: false,
  fetchedStatsGlobal: false,
  errorStatsGlobal: null
}, action) {
  switch (action.type) {
    case 'FETCH_STATS_GLOBAL':
      {
        return {
          ...state,
          fetchingStatsGlobal: true
        };
      }
    case 'FETCH_STATS_GLOBAL_REJECTED':
      {
        return {
          ...state,
          fetchingStatsGlobal: false,
          errorStatsGlobal: action.payload
        };
      }
    case 'FETCH_STATS_GLOBAL_FULFILLED':
      {
        return {
          ...state,
          fetchingStatsGlobal: false,
          fetchedStatsGlobal: true,
          statsGlobal: {
            ...state.statsGlobal,
            commits: action.payload.commits,
            contributors: action.payload.contributors,
            repositories: action.payload.repositories,
            lines: action.payload.lines,
            fileChanges: action.payload.fileChanges,
            commitsWithoutFileChanges: action.payload.commitsWithoutFileChanges,
            commitsWithoutImpact: action.payload.commitsWithoutImpact,
            commitsImpactGtThousand: action.payload.commitsImpactGtThousand,
            commitsOnWeekend: action.payload.commitsOnWeekend,
            weekdays: {
              ...state.statsGlobal.weekdays,
              Tue: action.payload.Tue,
              Wed: action.payload.Wed,
              Thu: action.payload.Thu,
              Fri: action.payload.Fri,
              Mon: action.payload.Mon,
              Sun: action.payload.Sun,
              Sat: action.payload.Sat
            },
            daysActive: action.payload.daysActive,
            commitDateFirst: action.payload.commitDateFirst,
            commitDateLast: action.payload.commitDateLast,
            daysSinceFirstCommit: action.payload.daysSinceFirstCommit,
            daysSinceLastCommit: action.payload.daysSinceLastCommit,
            staleness: action.payload.staleness,
            commitsPerDay: action.payload.commitsPerDay,
            commitsPerContributor: action.payload.commitsPerContributor
          }
        };
      }
    default:
      return state;
  }
}
