// Check if object is empty or not
export function isEmptyObject(verifyObject) {
  if (verifyObject && verifyObject.constructor === Object) {
    return Object.keys(verifyObject).length === 0;
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(`[isEmptyObject]: The object being verified is not an object: ${verifyObject}`);
  }
  return undefined;
}

// Check if object is NOT empty
export function isNotEmptyObject(verifyObject) {
  if (verifyObject && verifyObject.constructor === Object) {
    return Object.keys(verifyObject).length > 0;
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(
      `[isNotEmptyObject]: The object being verified is not an object: ${verifyObject}`,
    );
  }
  return undefined;
}

// Check if array is empty or not
export function isEmptyArray(verifyArray) {
  if (verifyArray && Array.isArray(verifyArray)) {
    return verifyArray.length === 0;
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(`[isEmptyArray]: The array being verified is not an array: ${verifyArray}`);
  }
  return undefined;
}

// Check if array is NOT empty
export function isNotEmptyArray(verifyArray) {
  if (verifyArray && verifyArray.constructor === Array) {
    return verifyArray.length > 0;
  }
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    console.error(`[isNotEmptyArray]: The array being verified is not an array: ${verifyArray}`);
  }
  return undefined;
}
