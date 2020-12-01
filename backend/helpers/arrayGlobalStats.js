var arrayAuthorsStats = require('./arrayAuthorsStats');
var arrayByKey = require('./arrayByKey');
var arrayByKeyFiltered = require('./arrayByKeyFiltered');
var arrayByKeyFilteredGreaterThan = require('./arrayByKeyFilteredGreaterThan');
var arraysMerge = require('./arraysMerge');
var daysBetween = require('./daysBetween');
var daysSince = require('./daysSince');
var groupByDuplicatesInArray = require('./groupByDuplicatesInArray');
var itemsSum = require('./itemsSum');
var totalSum = require('./totalSum');

// Get global stats and output it on a dedicated array, with options
// ------------------------------------------------------------
module.exports = function(data, type) {
  var stats = [];
  // var data = data;

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
  // total nr repositories
  var totalNrRepositories = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(data, 'repository')
      )
    )
  );
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
  var weekdays = arrayByKey(data, 'date_day_week');
  // calculate days between first and last commits
  var commitDateFirst = data[0].author_date_unix_timestamp;
  var commitDateLast = data[data.length - 1].author_date_unix_timestamp;
  var daysActive = daysBetween(commitDateFirst, commitDateLast);
  // calculate days since first and last commits
  var daysSinceFirstCommit = daysSince(commitDateFirst);
  var daysSinceLastCommit = daysSince(commitDateLast);
  // calculate staleness
  var staleness = daysSinceLastCommit / 365;
  // calculate commits per day
  var commitsPerContributor = (totalNrCommits / totalNrContributors);
  // calculate commits per day
  var commitsPerDay = (daysActive / totalNrCommits);
  // calculate commits by day
  var commitsByDay = arrayByKey(data, 'date_iso_8601');
  // contributor + commits
  var arrayAuthorsStatsAuthorAndCommits = arraysMerge(arrayAuthorsStats(data, 'author'), arrayAuthorsStats(data, 'commits'));
  // contributor + impact
  var arrayAuthorsStatsAuthorAndImpact = arraysMerge(arrayAuthorsStats(data, 'author'), arrayAuthorsStats(data, 'impact'));

  stats.push({
    commits: totalNrCommits,
    contributors: totalNrContributors,
    repositories: totalNrRepositories,
    lines: totalLinesOfCode,
    fileChanges: totalFileChanges,
    commitsWithoutFileChanges: totalCommitsWithoutFileChanges,
    commitsWithoutImpact: totalCommitsWithoutImpact,
    commitsImpactGtThousand: totalCommitsImpactGreaterThan,
    commitsOnWeekend: totalCommitsOnWeekends,
    weekdays: groupByDuplicatesInArray(weekdays),
    daysActive: daysActive,
    commitDateFirst: commitDateFirst,
    commitDateLast: commitDateLast,
    daysSinceFirstCommit: daysSinceFirstCommit,
    daysSinceLastCommit: daysSinceLastCommit,
    staleness: staleness,
    commitsPerDay: commitsPerDay,
    commitsPerContributor: commitsPerContributor,
    commitsByContributor: arrayAuthorsStatsAuthorAndCommits,
    impactByContributor: arrayAuthorsStatsAuthorAndImpact,
    commitsByDay: groupByDuplicatesInArray(commitsByDay)
  });

  return stats;
};
