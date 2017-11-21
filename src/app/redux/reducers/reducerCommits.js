export default function reducer(state = {
  commits: [],
  fetchingCommits: false,
  fetchedCommits: false,
  errorCommits: null
}, action) {
  switch (action.type) {
    case 'FETCH_COMMITS':
      {
        return {
          ...state,
          fetchingCommits: true
        };
      }
    case 'FETCH_COMMITS_REJECTED':
      {
        return {
          ...state,
          fetchingCommits: false,
          errorCommits: action.payload
        };
      }
    case 'FETCH_COMMITS_FULFILLED':
      {
        return {
          ...state,
          fetchingCommits: false,
          fetchedCommits: true,
          commits: action.payload
        };
      }
    default:
      return state;
  }
}
