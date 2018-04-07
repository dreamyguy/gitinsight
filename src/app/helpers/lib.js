/* eslint no-prototype-builtins: 0 */
/* eslint max-depth: [2, 6] */

// Calculate number of days between two dates
// ------------------------------------------------------------
export function daysBetween(timeStampA, timeStampB) {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const firstDate = new Date(timeStampA * 1000);
  const secondDate = new Date(timeStampB * 1000);
  const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  return diffDays;
}

// Calculate number of days since one date
// ------------------------------------------------------------
export function daysSince(timeStamp) {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const sinceDate = new Date(timeStamp * 1000);
  const now = Date.now();
  const diffDays = Math.round(Math.abs((sinceDate.getTime() - now) / (oneDay)));
  return diffDays;
}

// Get value of the object's first key
// ------------------------------------------------------------
export function getValueOfFirstOrLastKey(obj, value, mode) {
  // do not use this if you expect your obj to change!
  // this was done this way because the obj was already sorted by unix timestamps
  let v;
  const last = obj.length - 1;
  if (mode === 'first') {
    v = obj[0][value];
  } else if (mode === 'last') {
    v = obj[last][value];
  } else {
    console.log('You have to specify a mode! first | last');
  }
  return v;
}
// const firstAuthor = getValueOfFirstOrLastKey(data, 'author_email', 'first');

// Get max/min number in array: max | min
// ------------------------------------------------------------
export function arrayMaxMin(arr, type) {
  let n;
  if (type === 'max') {
    n = Math.max(...arr);
  } else if (type === 'min') {
    n = Math.min(...arr);
  }
  return n;
}

// Order object by key
// ------------------------------------------------------------
export function sortObjByKey(obj) {
  const objUnordered = obj;
  const objOrdered = {};
  Object.keys(objUnordered).sort().forEach(key => {
    objOrdered[key] = objUnordered[key];
  });
  return objOrdered;
}

// Objects used to be compared to while sorting
// ------------------------------------------------------------
export const sorterWeekday = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7
};
export const sorterMonthName = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
};

// Order object by key with the help of sorter
// ------------------------------------------------------------
export function sortObjByKeyWithSorter(obj, sorter) {
  const tmp = [];
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const index = sorter[key];
    tmp[index] = {
      key,
      value
    };
  });
  const orderedData = {};
  tmp.forEach(k => {
    orderedData[k.key] = k.value;
  });
  return orderedData;
}

// Group by time period - Commits by day | week | month | year
// ------------------------------------------------------------
export function groupByTimePeriod(data, period) {
  const objPeriod = {};
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  for (let i = 0; i < data.length; i++) {
    let d = new Date(data[i].author_date_unix_timestamp * 1000);
    if (period === 'day') {
      d = Math.floor(d.getTime() / oneDay);
    } else if (period === 'week') {
      d = Math.floor(d.getTime() / (oneDay * 7));
    } else if (period === 'month') {
      d = ((d.getFullYear() - 1970) * 12) + d.getMonth();
    } else if (period === 'year') {
      d = d.getFullYear();
    } else {
      console.log('groupByTimePeriod: You have to set a period! day | week | month | year');
    }
    // define object key
    objPeriod[d] = objPeriod[d] || [];
    objPeriod[d].push(data[i]);
  }
  return objPeriod;
}

// Group by time period - Commits by day | week | month | year
// ------------------------------------------------------------
export function groupByTime(data, moment) {
  const objMoment = {};
  let t = '';
  for (let i = 0; i < data.length; i++) {
    if (moment === 'hour') {
      t = data[i].time_hour;
    } else if (moment === 'minutes') {
      t = data[i].time_minutes;
    } else if (moment === 'seconds') {
      t = data[i].time_seconds;
    } else if (moment === 'gmt') {
      t = data[i].time_gmt;
    } else if (moment === 'day-week') {
      t = data[i].date_day_week;
    } else if (moment === 'month-day') {
      t = data[i].date_month_day;
    } else if (moment === 'month-name') {
      t = data[i].date_month_name;
    } else if (moment === 'month-number') {
      t = data[i].date_month_number;
    } else if (moment === 'year') {
      t = data[i].date_year;
    } else if (moment === 'iso-8601') {
      t = data[i].date_iso_8601;
    } else {
      console.log('groupByTime: You have to set a time! hour | minutes | seconds | gmt | day_week | month_day | month_name | month_number | year | iso_8601');
    }
    // define object key
    objMoment[t] = objMoment[t] || [];
    objMoment[t].push(data[i]);
  }
  return objMoment;
}

// Count duplicate keys within an array
// ------------------------------------------------------------
export function groupByDuplicatesInArray(array) {
  if (array.length === 0) {
    return null;
  }
  const counts = {};
  array.forEach(x => {
    counts[x] = (counts[x] || 0) + 1;
  });
  return counts;
}

// Create object array based on key and its value
// ------------------------------------------------------------
export function arrayByKeyAndValue(data, key, val) {
  const arr = [];
  for (const i in data) {
    if (data[i][key] === val) {
      arr.push(data[i]);
    }
  }
  return arr;
}
// const weekMonday = arrayByKeyAndValue(datasrc, 'date_day_week', 'Mon');

// Create array based on values
// ------------------------------------------------------------
export function arrayOfValues(data) {
  const arr = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      arr.push(data[i]);
    }
  }
  return arr;
}

// Create array based on keys
// ------------------------------------------------------------
export function arrayOfKeys(data) {
  const arr = [];
  for (const i in data.keys()) {
    if (data.keys().hasOwnProperty(i)) {
      arr.push(data[i]);
    }
  }
  return arr;
}

// Create object array based on key
// ------------------------------------------------------------
export function objByKey(data, key) {
  const obj = {};
  for (const i in data) {
    if (!obj.hasOwnProperty(data[i][key])) {
      obj[data[i][key]] = [];
    }
    obj[data[i][key]].push(data[i]);
  }
  return obj;
}
// const objRepository = objByKey(datasrc, 'repository');

// Create object array based on author
// ------------------------------------------------------------
export function objByAuthors(data, author) {
  const obj = {};
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      // const a = data[i][author].match(/[^@]*/);
      if (!obj.hasOwnProperty(data[i][author])) {
        obj[data[i][author]] = [];
      }
      obj[data[i][author]].push(data[i]);
    }
  }
  return obj;
}
// const objByAuthorsconst = objByAuthors(datasrc, 'author_email');

// Create array based on key value
// ------------------------------------------------------------
export function arrayByKey(data, key) {
  const arr = [];
  for (const i in data) {
    if (data[i][key] === undefined) {
      data[i][key] = '0';
    }
    arr.push(data[i][key]);
  }
  return arr;
}
// const arrayImpact = arrayByKey(data, 'impact');

// Create array based on key value filtered by a value
// ------------------------------------------------------------
export function arrayByKeyFiltered(data, key, value) {
  const arr = [];
  for (const i in data) {
    if (data[i][key] === value) {
      arr.push(data[i][key]);
    }
  }
  return arr;
}
// const arrayImpactFiltered = arrayByKeyFiltered(data, 'impact', '0');

// Create array based on key value filtered by a value greater than
// ------------------------------------------------------------
export function arrayByKeyFilteredGreaterThan(data, key, value) {
  const arr = [];
  value = parseInt(value, 10);
  for (const i in data) {
    if (data[i][key] > value) {
      arr.push(data[i][key]);
    }
  }
  return arr;
}
// const arrayImpactFilteredGreaterThan = arrayByKeyFilteredGreaterThan(data, 'impact', '1000');

// Create array based on key value filtered by a value smaller than
// ------------------------------------------------------------
export function arrayByKeyFilteredSmallerThan(data, key, value) {
  const arr = [];
  value = parseInt(value, 10);
  for (const i in data) {
    if (data[i][key] < value) {
      arr.push(data[i][key]);
    }
  }
  return arr;
}
// const arrayImpactFilteredSmallerThan = arrayByKeyFilteredSmallerThan(data, 'impact', '1000');

// Create array based on key value, sorted
// ------------------------------------------------------------
export function arrayByKeySorted(data, key) {
  const arr = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      arr.push(data[i][key]);
    }
  }
  arr.sort((a, b) => {
    return a - b;
  });
  return arr;
}

// Return number that results from adding a key to itself
// ------------------------------------------------------------
export function totalSum(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += parseInt(data[i], 10);
    // console.log(sum);
  }
  return sum;
}
// const arrayImpactTotal = totalSum(arrayImpact);

// Return number of items in an object
// ------------------------------------------------------------
export function itemsSum(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += 1;
  }
  return sum;
}
// const arrayTotal = itemsSum(data);

// Return number of items in an object's value
// ------------------------------------------------------------
export function itemsValuesSum(obj) {
  const arr = [];
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      let sum = 0; // because sum is reset on each loop
      for (let y = 0; y < obj[i].length; y++) {
        sum += 1;
      }
      arr.push(sum);
    }
  }
  return arr;
}
// const arrayTotalValue = itemsValueSum(data);

// Return average value based on number of items in an object
// ------------------------------------------------------------
export function itemsAverage(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += parseInt(data[i], 10);
  }
  const avg = sum / data.length;
  return avg;
}

// Create array based on key values added to themselves
// ------------------------------------------------------------
export function sumArray(data) {
  let sum = 0;
  const arr = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      sum += parseInt(data[i], 10);
      arr.push(sum);
      // console.log(sum);
    }
  }
  return arr;
}
// const arrayImpactSum = sumArray(arrayImpact);

// Merge two arrays of identical length
// ------------------------------------------------------------
export function arraysMerge(keys, values) {
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

// Create array with year changes
// ------------------------------------------------------------
export function arrayYearChanges(data, year) {
  const arr = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      const currentYear = data[i][year];
      let previousYear = '';
      if (previousYear === currentYear) {
        arr.push('');
      } else {
        arr.push(data[i][year]);
      }
      previousYear = data[i][year];
    }
  }
  return arr;
}
// const arrayYearChangesconst = arrayYearChanges(data, 'date_year');

// Get author stats and output it on a dedicated array, with options
// ------------------------------------------------------------
export function arrayAuthorsStats(data, type) {
  const obja = {};
  for (const i in data) {
    if (!obja.hasOwnProperty(data[i].author_email)) {
      obja[data[i].author_email] = [];
    }
    obja[data[i].author_email].push(data[i]);
  }
  // create an object to receive customised author stats
  const stats = [];
  // iterate through 'obja' object

  for (const b in obja) {
    if (obja.hasOwnProperty(b)) {
      const objb = obja[b];
      // calculate total impact
      const authorImpact = this.arrayByKey(objb, 'impact');
      const authorImpactSum = this.totalSum(authorImpact);
      // calculate total number of commits
      const authorNrCommits = this.itemsSum(objb);
      // calculate author's commits on a given week day
      const authorDays = this.arrayByKey(objb, 'date_day_week');
      // calculate days between first and last commits
      const commitDateFirst = objb[0].author_date_unix_timestamp;
      const commitDateLast = objb[objb.length - 1].author_date_unix_timestamp;
      const daysActive = this.daysBetween(commitDateFirst, commitDateLast);
      // calculate days since first and last commits
      const daysSinceFirstCommit = this.daysSince(commitDateFirst);
      const daysSinceLastCommit = this.daysSince(commitDateLast);
      // calculate commits per day
      const commitsPerDay = this.arrayByKey(objb, 'date_iso_8601');
      // push new data to array
      if (type === 'author') {
        stats.push(b);
      } else if (type === 'commits') {
        stats.push(authorNrCommits);
      } else if (type === 'impact') {
        stats.push(authorImpactSum);
      } else if (type === 'daysActive') {
        stats.push(daysActive);
      } else if (type === 'daysSinceFirstCommit') {
        stats.push(daysSinceFirstCommit);
      } else if (type === 'daysSinceLastCommit') {
        stats.push(daysSinceLastCommit);
      } else if (type === 'weekdays') {
        stats.push({
          author: b,
          weekdays: this.groupByDuplicatesInArray(authorDays)
        });
      } else if (type === 'commitsPerDay') {
        stats.push({
          author: b,
          commitsPerDay: this.groupByDuplicatesInArray(commitsPerDay)
        });
      } else if (type === 'commitsPerDayYear') {
        stats.push(
          arrayOfValues(Object.keys(this.groupByDuplicatesInArray(commitsPerDay)))
        );
      } else if (type === 'commitsPerDayNr') {
        stats.push(
          arrayOfValues(this.groupByDuplicatesInArray(commitsPerDay))
        );
      } else {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          weekdays: this.groupByDuplicatesInArray(authorDays),
          daysActive,
          commitDateFirst,
          commitDateLast,
          daysSinceFirstCommit,
          daysSinceLastCommit,
          commitsPerDay: this.groupByDuplicatesInArray(commitsPerDay)
        });
      }
    }
  }
  return stats;
}
// const arrayAuthorsStatsVarAll = arrayAuthorsStats(data);
// console.log(arrayAuthorsStatsVarAll);
// const arrayAuthorsStatsVarAuthor = arrayAuthorsStats(data, 'author');
// const arrayAuthorsStatsVarCommits = arrayAuthorsStats(data, 'commits');
// const arrayAuthorsStatsVarImpact = arrayAuthorsStats(data, 'impact');
// const arrayAuthorsStatsVarWeekdays = arrayAuthorsStats(data, 'weekdays');
// const arrayAuthorsStatsVarDaysActive = arrayAuthorsStats(data, 'daysActive');
// const arrayAuthorsStatsVarDaysSinceFirstCommit = arrayAuthorsStats(data, 'daysSinceFirstCommit');
// const arrayAuthorsStatsVarDaysSinceLastCommit = arrayAuthorsStats(data, 'daysSinceLastCommit');
// const arrayAuthorsStatsVarCommitsPerDay = arrayAuthorsStats(data, 'commitsPerDay');
// const arrayAuthorsStatsVarCommitsPerDayYear = arrayAuthorsStats(data, 'commitsPerDayYear');
// const arrayAuthorsStatsVarCommitsPerDayNr = arrayAuthorsStats(data, 'commitsPerDayNr');

// Create array - commit nr each day
// ------------------------------------------------------------
export function arrayOfExtractedCommitNrPerDay(data) {
  const arr = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      for (const nr in data[i]) {
        if (data[i].hasOwnProperty(nr)) {
          // console.log(data[i][nr]);
          arr.push(data[i][nr]);
        }
      }
    }
  }
  return arr;
}
// const arrayOfExtractedCommitNrPerDayconst = arrayOfExtractedCommitNrPerDay(arrayAuthorsStatsVarCommitsPerDayNr);
// const arrayCommitPerDaySum = sumArray(arrayOfExtractedCommitNrPerDayVar);

// Create array - years vs commits to be used as graph labels
// ------------------------------------------------------------
export function arrayOfExtractedYearsCommits(data) {
  const arr = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      for (const y in data[i]) {
        if (data[i].hasOwnProperty(y)) {
          // console.log(data[i][y]);
          const z = data[i][y].toString().slice(0, 4);
          let previousYear = '';
          const currentYear = z;
          if (previousYear === currentYear) {
            arr.push('');
          } else {
            arr.push(z);
          }
          previousYear = z;
        }
      }
    }
  }
  return arr;
}
// const arrayOfExtractedYearsCommitsconst = arrayOfExtractedYearsCommits(arrayAuthorsStatsVarCommitsPerDayYear);

// Some jazz
// ------------------------------------------------------------
// const arrayAuthorsStatsVarDaysActiveAverage = itemsAverage(arrayAuthorsStatsVarDaysActive);
// // console.log('The average number of active days of a single committer is ' + arrayAuthorsStatsVarDaysActiveAverage + ', which is the equivalent to ' + arrayAuthorsStatsVarDaysActiveAverage / 365 + ' years');
// const arrayAuthorsStatsVarCommitsAverage = itemsAverage(arrayAuthorsStatsVarCommits);
// // console.log('The average number of commits by a single committer is ' + arrayAuthorsStatsVarCommitsAverage + ', which is the equivalent to ' + arrayAuthorsStatsVarCommitsAverage / arrayAuthorsStatsVarDaysActiveAverage + ' a day');
// const arrayAuthorsStatsVarImpactAverage = itemsAverage(arrayAuthorsStatsVarImpact);
// // console.log('The average impact by a single committer is ' + arrayAuthorsStatsVarImpactAverage + ' lines of code');

// const arrayAuthorsStatsAuthorAndCommits = arraysMerge(arrayAuthorsStatsVarAuthor, arrayAuthorsStatsVarCommits);
// // console.log(arrayAuthorsStatsAuthorAndCommits);
// const arrayAuthorsStatsAuthorAndImpact = arraysMerge(arrayAuthorsStatsVarAuthor, arrayAuthorsStatsVarImpact);
// // console.log(arrayAuthorsStatsAuthorAndImpact);

// Create array of objects with authors and their impact
// ------------------------------------------------------------
export function arrayAuthorImpact(data, author, impact) {
  const arr = [];
  for (const i in data) {
    if (data.hasOwnProperty(i)) {
      const a = data[i][author].match(/[^@]*/);
      arr.push('{ "author":"' + a + '", "impact":"' + data[i][impact] + '"},');
    }
  }
  return arr;
}
// const arrayAuthorImpactconst = arrayAuthorImpact(datasrc, 'author_email', 'impact');
