import { isNotEmptyObject } from './isEmptyUtil';

// Add key values to themselves on each object iteration
export const cummulative = obj => {
  let finalObj = {};
  if (obj && isNotEmptyObject(obj)) {
    let sum = 0;
    Object.keys(obj).forEach(item => {
      // Key-value pair to be conditionally added to the object
      const summedItem = { [item]: (sum += parseInt(obj[item], 10)) };
      finalObj = {
        ...finalObj,
        ...summedItem,
      };
    });
    // 'Sort' object by key
    // This logic is available at 'backend/helpers/' as 'sortObjByOnlyKey'
    finalObj = Object.keys(finalObj)
      .sort()
      .reduce((acc, cur) => {
        acc[cur] = finalObj[cur];
        return acc;
      }, {});
  }
  // Return output
  return finalObj;
};

// Usage [see tests]:
// cummulative(theObject);
