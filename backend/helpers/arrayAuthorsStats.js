import arrayByKey from './arrayByKey';
import daysBetween from './daysBetween';
import daysSince from './daysSince';
import groupByDuplicatesInArray from './groupByDuplicatesInArray';
import itemsSum from './itemsSum';
import sortArrayByKey from './sortArrayByKey';
import totalSum from './totalSum';

// Create author stats object
const authorStats = ({ author, authorData }) => {
  // calculate total number of commits
  const authorNrCommits = itemsSum(authorData);
  // calculate total impact
  const authorImpact = arrayByKey(authorData, 'impact');
  const authorImpactSum = totalSum(authorImpact);
  // calculate the ratio of impact per commit
  const authorImpactRatio = authorImpactSum / authorNrCommits;
  // variables to pass to final object
  const commits = authorNrCommits;
  const impact = authorImpactSum;
  const impactRatio = authorImpactRatio;
  // calculate author's commits on a given week day
  const daysWeek = arrayByKey(authorData, 'date_day_week');
  const weekdays = groupByDuplicatesInArray(daysWeek);
  // calculate days between first and last commits
  const commitDateFirst = authorData[0].author_date_unix_timestamp;
  const commitDateLast = authorData[authorData.length - 1].author_date_unix_timestamp;
  const daysActive = daysBetween(commitDateFirst, commitDateLast);
  // calculate days since first and last commits
  const daysSinceFirstCommit = daysSince(commitDateFirst);
  const daysSinceLastCommit = daysSince(commitDateLast);
  // calculate staleness
  const staleness = daysSinceLastCommit / 365;
  // calculate commits per time unit
  const commitsByDaysCalendar = arrayByKey(authorData, 'date_iso_8601');
  const commitsByMonthDay = arrayByKey(authorData, 'date_month_day');
  const commitsByMonthNr = arrayByKey(authorData, 'date_month_number');
  const commitsByYear = arrayByKey(authorData, 'date_year');
  const commitsPerDay = groupByDuplicatesInArray(commitsByDaysCalendar);
  const commitsPerMonthDay = groupByDuplicatesInArray(commitsByMonthDay);
  const commitsPerMonthNr = groupByDuplicatesInArray(commitsByMonthNr);
  const commitsPerYear = groupByDuplicatesInArray(commitsByYear);
  // total nr repositories
  const totalNrRepositories = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(authorData, 'repository')
      )
    )
  );
  return {
    author,
    commitDateFirst,
    commitDateLast,
    commits,
    commitsPerDay,
    commitsPerMonthDay,
    commitsPerMonthNr,
    commitsPerYear,
    daysActive,
    daysSinceFirstCommit,
    daysSinceLastCommit,
    impact,
    impactRatio,
    staleness,
    totalNrRepositories,
    weekdays,
  }
};

// Get author stats and output it on a dedicated array, with options
// ------------------------------------------------------------
export const arrayAuthorsStats = ({ data, sortBy, sortDirection, count }) => {
  let output = null;
  var obja = {};
  for (var i in data) {
    if (!obja.hasOwnProperty(data[i].author_email)) {
      obja[data[i].author_email] = [];
    }
    obja[data[i].author_email].push(data[i]);
  }
  // Create an array to receive customised author stats
  var stats = [];
  // Iterate through 'obja' object
  for (var b in obja) {
     if (obja.hasOwnProperty(b)) {
      var objb = obja[b];
      // Push new data to array
      stats.push(authorStats({ author: b, authorData: objb }));
    }
  }
  if (sortBy && sortDirection) {
    output = sortArrayByKey(stats, sortBy, sortDirection);
  } else if (sortBy && !sortDirection) {
    output = sortArrayByKey(stats, sortBy);
  } else {
    output = stats;
  }
  if (count) {
    output = output.slice(0, count);
  }
  return output;
};
