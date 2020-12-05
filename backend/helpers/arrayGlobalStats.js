var arrayByKey = require('./arrayByKey');
var arrayByKeyFiltered = require('./arrayByKeyFiltered');
var arrayByKeyFilteredGreaterThan = require('./arrayByKeyFilteredGreaterThan');
var daysBetween = require('./daysBetween');
var daysSince = require('./daysSince');
var groupByDuplicatesInArray = require('./groupByDuplicatesInArray');
var itemsSum = require('./itemsSum');
var totalSum = require('./totalSum');

// Get global stats and output it on a dedicated array, with options
// ------------------------------------------------------------
module.exports = function({ data }) {

  // sort datasource array by date
  data.sort(function(a, b) {
    return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
  });

  // --- calculate some global stats and assign them to vars ---/

  // total nr commits
  var totalNrCommits = itemsSum(data);
  // total nr contributors
  var totalNrContributors = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(data, 'author_email')
      )
    )
  );
  // contributors list
  var contributorsList = Object.keys(
    groupByDuplicatesInArray(
      arrayByKey(data, 'author_email')
    )
  ).sort();
  // total nr repositories
  var repositories = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(data, 'repository')
      )
    )
  );
  // repositories list
  var repositoriesList = Object.keys(
    groupByDuplicatesInArray(
      arrayByKey(data, 'repository')
    )
  ).sort();
  // total lines of code
  var totalLinesOfCode = totalSum(
    arrayByKey(data, 'impact')
  );
  // total file changes
  var totalFileChanges = totalSum(
    arrayByKey(data, 'files_changed')
  );
  // total commits without file changes
  var totalCommitsWithoutFileChanges = itemsSum(
    arrayByKeyFiltered(data, 'files_changed', '0')
  );
  // total commits with no impact
  var totalCommitsWithoutImpact = itemsSum(
    arrayByKeyFiltered(data, 'impact', '0')
  );
  // total commits impact greater than 1000
  var totalCommitsImpactGreaterThan = itemsSum(
    arrayByKeyFilteredGreaterThan(data, 'impact', '1000')
  );
  // total commits on weekends
  var totalCommitsOnSaturday = itemsSum(
    arrayByKeyFiltered(data, 'date_day_week', 'Sat')
  );
  var totalCommitsOnSunday = itemsSum(
    arrayByKeyFiltered(data, 'date_day_week', 'Sun')
  );
  var totalCommitsOnWeekends = totalCommitsOnSaturday + totalCommitsOnSunday;
  // calculate commits on a given week day
  const daysWeek = arrayByKey(data, 'date_day_week');
  const weekdays = groupByDuplicatesInArray(daysWeek);
  // calculate days between first and last commits
  var commitDateFirst = data[0].author_date_unix_timestamp;
  var commitDateLast = data[data.length - 1].author_date_unix_timestamp;
  var daysActive = daysBetween(commitDateFirst, commitDateLast);
  // calculate days since first and last commits
  var daysSinceFirstCommit = daysSince(commitDateFirst);
  var daysSinceLastCommit = daysSince(commitDateLast);
  // calculate staleness
  var staleness = daysSinceLastCommit / 365;
  // calculate commits per contributor, average
  var commitsPerContributorAverage = (totalNrCommits / totalNrContributors);
  // calculate commits per day, average
  var commitsPerDayAverage = (daysActive / totalNrCommits);
  // calculate commits per time unit
  const commitsByDaysCalendar = arrayByKey(data, 'date_iso_8601');
  const commitsByMonthDay = arrayByKey(data, 'date_month_day');
  const commitsByMonthNr = arrayByKey(data, 'date_month_number');
  const commitsByYear = arrayByKey(data, 'date_year');
  const commitsPerDay = groupByDuplicatesInArray(commitsByDaysCalendar);
  const commitsPerMonthDay = groupByDuplicatesInArray(commitsByMonthDay);
  const commitsPerMonthNr = groupByDuplicatesInArray(commitsByMonthNr);
  const commitsPerYear = groupByDuplicatesInArray(commitsByYear);

  return {
    commits: totalNrCommits,
    contributors: totalNrContributors,
    contributorsList: contributorsList,
    repositories: repositories,
    repositoriesList: repositoriesList,
    lines: totalLinesOfCode,
    fileChanges: totalFileChanges,
    commitsWithoutFileChanges: totalCommitsWithoutFileChanges,
    commitsWithoutImpact: totalCommitsWithoutImpact,
    commitsImpactGtThousand: totalCommitsImpactGreaterThan,
    commitsOnWeekend: totalCommitsOnWeekends,
    weekdays: weekdays,
    daysActive: daysActive,
    commitDateFirst: commitDateFirst,
    commitDateLast: commitDateLast,
    daysSinceFirstCommit: daysSinceFirstCommit,
    daysSinceLastCommit: daysSinceLastCommit,
    staleness: staleness,
    commitsPerDay: commitsPerDay,
    commitsPerMonthDay: commitsPerMonthDay,
    commitsPerMonthNr: commitsPerMonthNr,
    commitsPerYear: commitsPerYear,
    commitsPerDayAverage: commitsPerDayAverage,
    commitsPerContributorAverage: commitsPerContributorAverage,
  };
};
