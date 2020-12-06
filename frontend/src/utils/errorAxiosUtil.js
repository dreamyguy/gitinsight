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
