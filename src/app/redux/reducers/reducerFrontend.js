export default function reducer(state = {
  lastUpdated: null,
  menuState: 'collapsed',
  menuItems: {}
}, action) {
  switch (action.type) {
    case 'LAST_UPDATED':
      {
        return {
          ...state,
          lastUpdated: action.payload
        };
      }
    case 'MENU_STATE':
      {
        return {
          ...state,
          menuState: action.payload
        };
      }
    case 'FETCH_HEADER_MENU_FULFILLED':
      {
        return {
          ...state,
          menuItems: action.payload
        };
      }
    default:
      return state;
  }
}
