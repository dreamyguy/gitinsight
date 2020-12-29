// Check if array is an array or not
export function isArray(verifyArray) {
  if (verifyArray && Array.isArray(verifyArray)) {
    return true;
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(`[isArray]: The array being verified is not an array: ${verifyArray}`);
  }
  return false;
}

// Check if object is an object or not
export function isObject(verifyObject) {
  if (verifyObject && typeof verifyObject === 'object' && verifyObject.constructor === Object) {
    return true;
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(`[isObject]: The object being verified is not an object: ${verifyObject}`);
  }
  return false;
}
