/* eslint no-prototype-builtins: 0 */

import {data} from '../test/data';
import {
  arrayByKey,
  arrayMaxMin,
  arrayOfKeys,
  arrayOfValues,
  arrayYearChanges,
  groupByTime,
  itemsValuesSum,
  // sortObjByKey,
  // sortObjByKeyWithSorter,
  sumArray,
  totalSum
} from './lib';

const arrayImpact = arrayByKey(data, 'impact');
const arrayFirstThree = data.slice(0, 3);

describe('Test data', () => {
  test('data is being imported', () => {
    expect(data).toBeTruthy();
  });
  test('data length is correct', () => {
    expect(data.length).toBe(406);
  });
});

describe('Test helpers', () => {
  test('arrayByKey', () => {
    expect(arrayImpact.slice(0, 10)).toEqual([5481, 64, -1595, 150, 6524, 24, -2, 25, 84, 0]);
  });
  test('arrayMaxMin - max', () => {
    expect(arrayMaxMin(arrayImpact, 'max')).toEqual(6189591);
  });
  test('arrayMaxMin - min', () => {
    expect(arrayMaxMin(arrayImpact, 'min')).toEqual(-6189586);
  });
  test('arrayOfKeys', () => {
    expect(arrayOfKeys(data[0])).toEqual(['repository', 'commit_nr', 'commit_hash', 'author_name', 'author_email', 'author_date', 'author_date_relative', 'author_date_unix_timestamp', 'author_date_iso_8601', 'subject', 'subject_sanitized', 'stats', 'time_hour', 'time_minutes', 'time_seconds', 'time_gmt', 'date_day_week', 'date_month_day', 'date_month_name', 'date_month_number', 'date_year', 'date_iso_8601', 'files_changed', 'insertions', 'deletions', 'impact']);
  });
  test('arrayOfValues', () => {
    expect(arrayOfValues(data[0])).toEqual(['color-consolidator', 1, 'e9c3b11616e8fada23f5bac42cbaebfedf0cf2aa', 'dreamyguy', 'i@dreamyguy.com', 'Wed Jan 1 16:41:34 2014 +0100', '4 years, 3 months ago', '1388590894', '2014-01-01 16:41:34 +0100', 'Initialize app with Go! boilerplate', 'Initialize-app-with-Go-boilerplate', ' 50 files changed, 5481 insertions(+)', 16, 41, 34, '+0100', 'Wed', 1, 'Jan', 1, '2014', '2014-01-01', 50, 5481, 0, 5481]);
  });
  test('arrayYearChanges', () => {
    expect(arrayYearChanges(data, 'date_year').slice(0, 10)).toEqual(['2014', '2014', '2014', '2014', '2014', '2014', '2014', '2014', '2014', '2014']);
  });
  test('groupByTime (hour)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'hour'))).toEqual(['14', '16', '22']);
  });
  test('groupByTime (minutes)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'minutes'))).toEqual(['16', '39', '41']);
  });
  test('groupByTime (seconds)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'seconds'))).toEqual(['34', '41', '56']);
  });
  test('groupByTime (gmt)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'gmt'))).toEqual(['+0100']);
  });
  test('groupByTime (day-week)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'day-week'))).toEqual(['Wed', 'Fri']);
  });
  test('groupByTime (month-day)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'month-day'))).toEqual(['1', '3']);
  });
  test('groupByTime (month-name)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'month-name'))).toEqual(['Jan']);
  });
  test('groupByTime (month-number)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'month-number'))).toEqual(['1']);
  });
  test('groupByTime (year)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'year'))).toEqual(['2014']);
  });
  test('groupByTime (iso-8601)', () => {
    expect(arrayOfKeys(groupByTime(arrayFirstThree, 'iso-8601'))).toEqual(['2014-01-01', '2014-01-03']);
  });
  test('itemsValuesSum', () => {
    expect(itemsValuesSum(data[0]).slice(0, 10)).toEqual([18, 0, 40, 9, 15, 29, 21, 10, 25, 35]);
  });
  // test('sortObjByKey [time_seconds]', () => {
  //   // To avoid asserting to a lengthy value, assert against a specific value
  //   expect(sortObjByKey(arrayFirstThree, 'time_seconds')[0].time_seconds).toEqual(34);
  //   // expect(sortObjByKey(arrayFirstThree)[0].time_seconds).toEqual(34);
  // });
  // test('sortObjByKey [impact]', () => {
  //   // To avoid asserting to a lengthy value, assert against a specific value
  //   expect(sortObjByKey(arrayFirstThree, 'impact')[0].impact).toEqual(5481);
  //   // expect(sortObjByKey(arrayFirstThree)[0].impact).toEqual(5481);
  // });
  // test('sortObjByKeyWithSorter [time_seconds]', () => {
  //   expect(sortObjByKeyWithSorter(arrayFirstThree, 'time_seconds')[0].impact).toEqual(34);
  // });
  test('sumArray', () => {
    expect(sumArray(arrayImpact.slice(0, 10))).toEqual([5481, 5545, 3950, 4100, 10624, 10648, 10646, 10671, 10755, 10755]);
  });
  test('totalSum', () => {
    expect(totalSum(arrayImpact)).toBe(236939);
  });
});

// // ============================================================
// // UNUSED
// // ============================================================

// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayByKeyAndValue(data, key, val)
// // // const weekMonday = arrayByKeyAndValue(datasrc, 'date_day_week', 'Mon');
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayByKeyFiltered(data, key, value)
// // // const arrayImpactFiltered = arrayByKeyFiltered(data, 'impact', '0');
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayByKeyFilteredGreaterThan(data, key, value)
// // // const arrayImpactFilteredGreaterThan = arrayByKeyFilteredGreaterThan(data, 'impact', '1000');
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayByKeyFilteredSmallerThan(data, key, value)
// // // const arrayImpactFilteredSmallerThan = arrayByKeyFilteredSmallerThan(data, 'impact', '1000');
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayByKeySorted(data, key)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayOfExtractedCommitNrPerDay(data)
// // // const arrayOfExtractedCommitNrPerDayconst = arrayOfExtractedCommitNrPerDay(arrayAuthorsStatsVarCommitsPerDayNr);
// // // const arrayCommitPerDaySum = sumArray(arrayOfExtractedCommitNrPerDayVar);
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayOfExtractedYearsCommits(data)
// // // const arrayOfExtractedYearsCommitsconst = arrayOfExtractedYearsCommits(arrayAuthorsStatsVarCommitsPerDayYear);
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arrayOfKeys(data)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // arraysMerge(keys, values)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // daysBetween(timeStampA, timeStampB)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // daysSince(timeStamp)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // getValueOfFirstOrLastKey(obj, value, mode)
// // // const firstAuthor = getValueOfFirstOrLastKey(data, 'author_email', 'first');
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // groupByDuplicatesInArray(array)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // groupByTimePeriod(data, period)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // itemsAverage(data)
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // itemsSum(data)
// // // const arrayTotal = itemsSum(data);
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // objByAuthors(data, author)
// // // const objByAuthorsconst = objByAuthors(datasrc, 'author_email');
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
// // objByKey(data, key)
// // // const objRepository = objByKey(datasrc, 'repository');
// test('12', () => {
//   expect(12(12)).toBe('something');
// });
