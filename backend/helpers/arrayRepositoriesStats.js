var arrayByKey = require('./arrayByKey');
var daysBetween = require('./daysBetween');
var daysSince = require('./daysSince');
var groupByDuplicatesInArray = require('./groupByDuplicatesInArray');
var itemsSum = require('./itemsSum');
var sortArrayByKey = require('./sortArrayByKey');
var totalSum = require('./totalSum');

// Get repositories stats and output it on a dedicated array, with options
// ------------------------------------------------------------
module.exports = function(data, type) {
  var obja = {};
  for (var i in data) {
    if (!obja.hasOwnProperty(data[i].repository)) {
      obja[data[i].repository] = [];
    }
    obja[data[i].repository].push(data[i]);
  }
  // create an object to receive customised author stats
  var stats = [];
  // iterate through 'obja' object

  for (var b in obja) {
     if (obja.hasOwnProperty(b)) {
      var objb = obja[b];
      // calculate total impact
      var repoImpact = arrayByKey(objb, 'impact');
      var repoImpactSum = totalSum(repoImpact);
      // calculate total number of commits
      var repoNrCommits = itemsSum(objb);
      // calculate the ratio of impact per commit
      var repoImpactRatio = repoImpactSum / repoNrCommits;
      // calculate repo's commits on a given week day
      var repoDays = arrayByKey(objb, 'date_day_week');
      // calculate days between first and last commits
      var commitDateFirst = objb[0].author_date_unix_timestamp;
      var commitDateLast = objb[objb.length - 1].author_date_unix_timestamp;
      var daysActive = daysBetween(commitDateFirst, commitDateLast);
      // calculate days since first and last commits
      var daysSinceFirstCommit = daysSince(commitDateFirst);
      var daysSinceLastCommit = daysSince(commitDateLast);
      // calculate staleness
      var staleness = daysSinceLastCommit / 365;
      // calculate commits per day
      var commitsPerDay = arrayByKey(objb, 'date_iso_8601');
      // total nr contributors
      var totalNrContributors = itemsSum(
        Object.keys(
          groupByDuplicatesInArray(
            arrayByKey(objb, 'author_email')
          )
        )
      );
      // push new data to array
      if (type == 'repo') {
        stats.push(b);
      } else if (type == 'commits') {
        stats.push(repoNrCommits);
      } else if (type == 'impact') {
        stats.push(repoImpactSum);
      } else if (type == 'daysActive') {
        stats.push(daysActive);
      } else if (type == 'daysSinceFirstCommit') {
        stats.push(daysSinceFirstCommit);
      } else if (type == 'daysSinceLastCommit') {
        stats.push(daysSinceLastCommit);
      } else if (type == 'weekdays') {
        stats.push({
          repository: b,
          weekdays: groupByDuplicatesInArray(authorDays)
        });
      } else if (type == 'commitsPerDay') {
        stats.push({
          author: b,
          commitsPerDay: groupByDuplicatesInArray(commitsPerDay)
        });
      } else if (type == 'commitsPerDayYear') {
        stats.push(
          arrayOfValues(Object.keys(groupByDuplicatesInArray(commitsPerDay)))
        );
      } else if (type == 'commitsPerDayNr') {
        stats.push(
          arrayOfValues(groupByDuplicatesInArray(commitsPerDay))
        );
      } else if (type == 'simple-by-commits') {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors
        });
        stats = sortArrayByKey(stats, 'commits', 'desc');
      } else if (type == 'simple-by-impact') {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors
        });
        stats = sortArrayByKey(stats, 'impact', 'desc');
      } else if (type == 'simple-by-impact-ratio') {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors
        });
        stats = sortArrayByKey(stats, 'impactRatio', 'desc');
      } else if (type == 'simple-by-days-since-last-commit') {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors
        });
        stats = sortArrayByKey(stats, 'daysSinceLastCommit', 'desc');
      } else if (type == 'simple-by-staleness') {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors
        });
        stats = sortArrayByKey(stats, 'staleness', 'desc');
      } else if (type == 'simple-by-days-active') {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors
        });
        stats = sortArrayByKey(stats, 'daysActive', 'desc');
      } else if (type == 'simple-by-contributors-nr') {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors
        });
        stats = sortArrayByKey(stats, 'totalNrContributors', 'desc');
      } else {
        stats.push({
          repository: b,
          commits: repoNrCommits,
          impact: repoImpactSum,
          impactRatio: repoImpactRatio,
          daysActive : daysActive,
          weekdays: groupByDuplicatesInArray(repoDays),
          commitDateFirst: commitDateFirst,
          commitDateLast: commitDateLast,
          daysSinceFirstCommit: daysSinceFirstCommit,
          daysSinceLastCommit: daysSinceLastCommit,
          staleness: staleness,
          totalNrContributors: totalNrContributors,
          commitsPerDay: groupByDuplicatesInArray(commitsPerDay)
        });
      }
    }
  }
  return stats;
};
