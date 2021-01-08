import { addEmptyDays } from './../../frontend/src/utils/getDateUtil';
import { cummulative } from './../../frontend/src/utils/cummulativeUtil';
import arrayByKey from './arrayByKey';
import arrayMaxMin from './arrayMaxMin';
import daysBetween from './daysBetween';
import daysSince from './daysSince';
import groupByDuplicatesInArray from './groupByDuplicatesInArray';
import impactBy from './impactBy';
import itemsSum from './itemsSum';
import sortArrayByKey from './sortArrayByKey';
import totalSum from './totalSum';

// Create repository stats object
const repositoryStats = ({ repository, objData }) => {
  // calculate total number of commits
  const totalNrCommits = itemsSum(objData);
  // total nr contributors
  const totalNrContributors = itemsSum(
    Object.keys(groupByDuplicatesInArray(arrayByKey(objData, 'author_email')))
  );
  // calculate total impact
  const totalImpact = arrayByKey(objData, 'impact');
  const totalImpactSum = totalSum(totalImpact);
  // calculate the ratio of impact per commit
  const totalImpactRatio = totalImpactSum / totalNrCommits;
  // variables to pass to final object
  const commits = totalNrCommits;
  const impact = totalImpactSum;
  const impactRatio = totalImpactRatio;
  // calculate repository's commits on a given week day
  const daysWeek = arrayByKey(objData, 'date_day_week');
  const weekdays = groupByDuplicatesInArray(daysWeek);
  // calculate days between first and last commits
  const commitsByAuthorDateUnixtimestamp = arrayByKey(
    objData,
    'author_date_unix_timestamp'
  );
  const commitDateFirst = arrayMaxMin(commitsByAuthorDateUnixtimestamp, 'min');
  const commitDateLast = arrayMaxMin(commitsByAuthorDateUnixtimestamp, 'max');
  const daysActive = daysBetween(commitDateFirst, commitDateLast);
  // calculate days since first and last commits
  const daysSinceFirstCommit = daysSince(commitDateFirst);
  const daysSinceLastCommit = daysSince(commitDateLast);
  // calculate staleness
  const staleness = daysSinceLastCommit / 365;
  // miscellaneous
  // total file changes
  const totalFileChanges = totalSum(
    arrayByKey(objData, 'files_changed')
  );
  // total commits without file changes
  const totalCommitsWithoutFileChanges = itemsSum(
    arrayByKeyFiltered(objData, 'files_changed', '0')
  );
  // total commits with no impact
  const totalCommitsWithoutImpact = itemsSum(
    arrayByKeyFiltered(objData, 'impact', '0')
  );
  // total commits impact greater than 1000
  const totalCommitsImpactGreaterThan = itemsSum(
    arrayByKeyFilteredGreaterThan(objData, 'impact', '1000')
  );
  // total commits on weekends
  const totalCommitsOnSaturday = itemsSum(
    arrayByKeyFiltered(objData, 'date_day_week', 'Sat')
  );
  const totalCommitsOnSunday = itemsSum(
    arrayByKeyFiltered(objData, 'date_day_week', 'Sun')
  );
  const totalCommitsOnWeekends = totalCommitsOnSaturday + totalCommitsOnSunday;
  const fileChanges = totalFileChanges;
  const commitsWithoutFileChanges = totalCommitsWithoutFileChanges;
  const commitsWithoutImpact = totalCommitsWithoutImpact;
  const commitsImpactGtThousand = totalCommitsImpactGreaterThan;
  const commitsOnWeekend = totalCommitsOnWeekends;
  // calculate commits per time unit
  const commitsBySecondsCalendar = arrayByKey(objData, 'time_seconds');
  const commitsByMinutesCalendar = arrayByKey(objData, 'time_minutes');
  const commitsByHoursCalendar = arrayByKey(objData, 'time_hour');
  const commitsByDaysCalendar = arrayByKey(objData, 'date_iso_8601');
  const commitsByMonthDay = arrayByKey(objData, 'date_month_day');
  const commitsByMonthName = arrayByKey(objData, 'date_month_name');
  const commitsByMonthNr = arrayByKey(objData, 'date_month_number');
  const commitsByYear = arrayByKey(objData, 'date_year');
  const commitsPerContributorAverage = totalNrCommits / totalNrContributors;
  const commitsPerSecond = groupByDuplicatesInArray(commitsBySecondsCalendar);
  const commitsPerMinute = groupByDuplicatesInArray(commitsByMinutesCalendar);
  const commitsPerHour = groupByDuplicatesInArray(commitsByHoursCalendar);
  const commitsPerDay = groupByDuplicatesInArray(commitsByDaysCalendar);
  const commitsPerDayAverage = daysActive / totalNrCommits;
  const commitsPerDayCummulative = cummulative(addEmptyDays({ dayList: commitsPerDay }));
  const commitsPerMonthDay = groupByDuplicatesInArray(commitsByMonthDay);
  const commitsPerMonthName = groupByDuplicatesInArray(commitsByMonthName);
  const commitsPerMonthNr = groupByDuplicatesInArray(commitsByMonthNr);
  const commitsPerYear = groupByDuplicatesInArray(commitsByYear);
  const impactByDay = addEmptyDays({ dayList: impactBy(objData, "date_iso_8601") });
  const impactByDayCummulative = cummulative(impactByDay);
  // total nr contributors
  var contributors = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(objData, 'author_email')
      )
    )
  );
  // contributors list
  var contributorsList = Object.keys(
    groupByDuplicatesInArray(
      arrayByKey(objData, 'author_email')
    )
  ).sort();
  return {
    commitDateFirst,
    commitDateLast,
    commits,
    commitsImpactGtThousand,
    commitsOnWeekend,
    commitsPerContributorAverage,
    commitsPerDay,
    commitsPerDayAverage,
    commitsPerDayCummulative,
    commitsPerHour,
    commitsPerMinute,
    commitsPerMonthDay,
    commitsPerMonthName,
    commitsPerMonthNr,
    commitsPerSecond,
    commitsPerYear,
    commitsWithoutFileChanges,
    commitsWithoutImpact,
    contributors,
    contributorsList,
    daysActive,
    daysSinceFirstCommit,
    daysSinceLastCommit,
    fileChanges,
    impact,
    impactByDay,
    impactByDayCummulative,
    impactRatio,
    repository,
    staleness,
    weekdays,
  };
};

// Get repositories stats and output it on a dedicated array, with options
// ------------------------------------------------------------
export const statsRepos = ({ data, sortBy, sortDirection, count }) => {
  let output = null;
  var obja = {};
  for (var i in data) {
    if (!obja.hasOwnProperty(data[i].repository)) {
      obja[data[i].repository] = [];
    }
    obja[data[i].repository].push(data[i]);
  }
  // Create an array to receive customised stats
  var stats = [];
  // Iterate through 'obja' object
  for (var b in obja) {
    if (obja.hasOwnProperty(b)) {
      var objb = obja[b];
      // Push new data to array
      stats.push(repositoryStats({ repository: b, objData: objb }));
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
