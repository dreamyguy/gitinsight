import { isArray, isObject } from './../utils/isUtil';
import { isNotEmptyArray, isNotEmptyObject } from './isEmptyUtil';

export const mergeErrors = ({ error, errorArray, log }) => {
  const debug = false;
  debug && console.log(`🐛 ~ [${log}] error`, error);
  debug && console.log(`🐛 ~ [${log}] error type`, typeof error);
  debug && console.log(`🐛 ~ [${log}] error JSON`, JSON.stringify(error));
  debug && console.log(`🐛 ~ [${log}] errorArray`, errorArray);
  debug && log && console.log(`🐛 ~ file: errorAxiosUtil.js ~ [${log}]`);
  let output = [];
  const localErrorArray = errorArray;
  if (
    error &&
    isObject(error) &&
    isNotEmptyObject(error) &&
    localErrorArray &&
    isNotEmptyArray(localErrorArray)
  ) {
    if (
      localErrorArray.some(s => s.config) &&
      !localErrorArray.some(s => s.config.url === error.config.url)
    ) {
      debug && log && console.log(`🐛 ~ file: errorAxiosUtil.js ~ [${log}] ~ mergeErrors ~ case 1`);
      localErrorArray.push(error);
    }
    output = localErrorArray;
  } else if (error && localErrorArray && isArray(localErrorArray)) {
    localErrorArray.push({
      error,
    });
    debug && log && console.log(`🐛 ~ file: errorAxiosUtil.js ~ [${log}] ~ mergeErrors ~ case 2`);
    output = localErrorArray;
    debug && console.log('🐛 ~ file: errorAxiosUtil.js ~ line 32 ~ mergeErrors ~ output', output);
  }
  return output;
};

export const handleErrorAxios = err => {
  // See: https://github.com/axios/axios#handling-errors
  let explanation = 'The error was not even handled';
  if (err.response) {
    explanation =
      'The request was made and the server responded with a status code that falls out of the range of 2xx';
  } else if (err.request) {
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    explanation = 'The request was made but no response was received';
  } else {
    explanation =
      'The data is invalid, empty or null - or something happened while setting up the request.';
  }
  return {
    err,
    explanation,
  };
};
