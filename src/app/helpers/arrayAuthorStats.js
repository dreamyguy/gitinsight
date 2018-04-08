/* eslint no-prototype-builtins: 0 */
// @todo: remove rule above

import {
  arrayOfValues,
  arrayByKey,
  totalSum,
  itemsSum,
  daysBetween,
  daysSince,
  groupByDuplicatesInArray
} from './lib';

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
      const authorImpact = arrayByKey(objb, 'impact');
      const authorImpactSum = totalSum(authorImpact);
      // calculate total number of commits
      const authorNrCommits = itemsSum(objb);
      // calculate author's commits on a given week day
      const authorDays = arrayByKey(objb, 'date_day_week');
      // calculate days between first and last commits
      const commitDateFirst = objb[0].author_date_unix_timestamp;
      const commitDateLast = objb[objb.length - 1].author_date_unix_timestamp;
      const daysActive = daysBetween(commitDateFirst, commitDateLast);
      // calculate days since first and last commits
      const daysSinceFirstCommit = daysSince(commitDateFirst);
      const daysSinceLastCommit = daysSince(commitDateLast);
      // calculate commits per day
      const commitsPerDay = arrayByKey(objb, 'date_iso_8601');
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
          weekdays: groupByDuplicatesInArray(authorDays)
        });
      } else if (type === 'commitsPerDay') {
        stats.push({
          author: b,
          commitsPerDay: groupByDuplicatesInArray(commitsPerDay)
        });
      } else if (type === 'commitsPerDayYear') {
        stats.push(
          arrayOfValues(Object.keys(groupByDuplicatesInArray(commitsPerDay)))
        );
      } else if (type === 'commitsPerDayNr') {
        stats.push(
          arrayOfValues(groupByDuplicatesInArray(commitsPerDay))
        );
      } else {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          weekdays: groupByDuplicatesInArray(authorDays),
          daysActive,
          commitDateFirst,
          commitDateLast,
          daysSinceFirstCommit,
          daysSinceLastCommit,
          commitsPerDay: groupByDuplicatesInArray(commitsPerDay)
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
