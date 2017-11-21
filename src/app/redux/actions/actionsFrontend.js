export function lastUpdated() {
  return {
    type: 'LAST_UPDATED',
    payload: Date.now()
  };
}

export function headerMenuToggler(status) {
  return {
    type: 'MENU_STATE',
    payload: status
  };
}

export function fetchHeaderMenu() {
  return {
    type: 'FETCH_HEADER_MENU_FULFILLED',
    payload: {
      1: {Id: 1, Name: 'Global Stats', Url: '/global-stats'},
      2: {Id: 2, Name: 'All Repositories', Url: '/all-repos'},
      3: {Id: 3, Name: 'All Contributors', Url: '/all-contributors'}
    }
  };
}
