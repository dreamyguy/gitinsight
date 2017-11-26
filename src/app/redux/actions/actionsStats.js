/* eslint max-params: ["error", 6] */

import axios from 'axios';

const SERVER = 'localhost:7000'; // local
const API_ROOT = `http://${SERVER}/api`;

// An object with global stats
export function fetchGlobalStats() {
  return dispatch => {
    dispatch({type: 'FETCH_GLOBAL_STATS'});
    axios.get(`${API_ROOT}/stats`)
      .then(response => {
        dispatch({type: 'FETCH_GLOBAL_STATS_FULFILLED', payload: response.data[0]});
      })
      .catch(err => {
        dispatch({type: 'FETCH_GLOBAL_STATS_REJECTED', payload: err});
      });
  };
}
