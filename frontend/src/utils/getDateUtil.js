import { isNotEmptyObject } from './isEmptyUtil';

// Output date based on a valid date value and locale
export const getDate = (date, locale) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dtFormat = new Intl.DateTimeFormat(locale || 'en-US', options);
  return dtFormat.format(date * 1e3);
};

// Usage:
// getDate('1382432573', 'en-US'); // Tuesday, October 22, 2013
// getDate('1382432573', 'pt-BR'); // terça-feira, 22 de outubro de 2013
// getDate('1382432573', 'no-NB'); // tirsdag 22. oktober 2013
// getDate('1382432573', 'sr-RS'); // уторак, 22. октобар 2013.
// getDate('1382432573'); // Tuesday, October 22, 2013

const getAllDaysArray = (start, end) => {
  const arr = [];
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Intl.DateTimeFormat('fr-CA').format(dt));
  }
  return arr;
};

// Add empty days to the array of days
export const addEmptyDays = ({ dayList }) => {
  let finalObj = {};
  if (dayList && isNotEmptyObject(dayList)) {
    const daysArray = Object.keys(dayList);
    const firstDay = daysArray[0];
    const lastDay = daysArray[daysArray.length - 1];
    const firstDayDate = new Date(firstDay);
    const lastDayDate = new Date(lastDay);
    const allDays = getAllDaysArray(firstDayDate, lastDayDate);
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
