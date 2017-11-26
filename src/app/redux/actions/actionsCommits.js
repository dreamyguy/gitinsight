/* eslint max-params: ["error", 6] */

import axios from 'axios';

const SERVER = 'localhost:7000'; // local
const API_ROOT = `http://${SERVER}/api`;

// An object with all commits - avoid using it as it's huge
export function fetchCommits() {
  return dispatch => {
    dispatch({type: 'FETCH_COMMITS'});
    axios.get(`${API_ROOT}/all`)
      .then(response => {
        dispatch({type: 'FETCH_COMMITS_FULFILLED', payload: response.data});
      })
      .catch(err => {
        dispatch({type: 'FETCH_COMMITS_REJECTED', payload: err});
      });
  };
}
