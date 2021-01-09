import dayjs from 'dayjs';
import { isNotEmptyObject } from './isEmptyUtil';

// Output date based on a valid date value and locale
export const getDate = (date, mode) =>
  dayjs.unix(date).format(mode === 'compact' ? 'ddd, MMM D, YYYY' : 'dddd, MMMM D, YYYY');

// Usage:
// getDate('1382432573'); // Tuesday, October 22, 2013

export const getAllDaysArray = (start, end) => {
  const arr = [];
  const startDate = dayjs.unix(start).toDate();
  const endDate = dayjs.unix(end).toDate();
  for (let dt = startDate; dt <= endDate; dt.setDate(dt.getDate() + 1)) {
    arr.push(dayjs(dt).format('YYYY-MM-DD'));
  }
  return arr;
};

// Add empty days to the array of days
export const addEmptyDays = ({ dayList, firstDay, lastDay, test }) => {
  let finalObj = {};
  if (dayList && isNotEmptyObject(dayList)) {
    const daysArray = Object.keys(dayList);
    const firstDayFinal = firstDay || daysArray[0];
    const lastDayFinal = lastDay || daysArray[daysArray.length - 1];
    const allDays = getAllDaysArray(firstDayFinal, lastDayFinal);
    test && console.log('addEmptyDays ~ allDays', allDays);
    allDays.map(ad => {
      // Key-value pair to be conditionally added to the object
      const zeroObj = { [ad]: 0 };
      // If the key is not found in the object, add the key-value pair above
      if (!Object.keys(dayList).some(s => s === ad)) {
        finalObj = {
          ...finalObj,
          ...zeroObj,
        };
      }
      return null;
    });
    // Merge output with original object
    finalObj = {
      ...dayList,
      ...finalObj,
    };
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
// addEmptyDays({ dayList: days });
