var arrayByKey = require('./arrayByKey');
var daysBetween = require('./daysBetween');
var daysSince = require('./daysSince');
var groupByDuplicatesInArray = require('./groupByDuplicatesInArray');
var itemsSum = require('./itemsSum');
var sortArrayByKey = require('./sortArrayByKey');
var totalSum = require('./totalSum');

// Get author stats and output it on a dedicated array, with options
// ------------------------------------------------------------
module.exports = function(data, type) {
  var obja = {};
  for (var i in data) {
    if (!obja.hasOwnProperty(data[i].author_email)) {
      obja[data[i].author_email] = [];
    }
    obja[data[i].author_email].push(data[i]);
  }
  // create an object to receive customised author stats
  var stats = [];
  // iterate through 'obja' object

  for (var b in obja) {
     if (obja.hasOwnProperty(b)) {
      var objb = obja[b];
      // calculate total impact
      var authorImpact = arrayByKey(objb, 'impact');
      var authorImpactSum = totalSum(authorImpact);
      // calculate total number of commits
      var authorNrCommits = itemsSum(objb);
      // calculate the ratio of impact per commit
      var authorImpactRatio = authorImpactSum / authorNrCommits;
      // calculate author's commits on a given week day
      var authorDays = arrayByKey(objb, 'date_day_week');
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
      // total nr repositories
      var totalNrRepositories = itemsSum(
        Object.keys(
          groupByDuplicatesInArray(
            arrayByKey(objb, 'repository')
          )
        )
      );
      // push new data to array
      if (type == 'author') {
        stats.push(b);
      } else if (type == 'commits') {
        stats.push(authorNrCommits);
      } else if (type == 'impact') {
        stats.push(authorImpactSum);
      } else if (type == 'daysActive') {
        stats.push(daysActive);
      } else if (type == 'daysSinceFirstCommit') {
        stats.push(daysSinceFirstCommit);
      } else if (type == 'daysSinceLastCommit') {
        stats.push(daysSinceLastCommit);
      } else if (type == 'weekdays') {
        stats.push({
          author : b,
          weekdays: groupByDuplicatesInArray(authorDays)
        });
      } else if (type == 'commitsPerDay') {
        stats.push({
          author : b,
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
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories
        });
        stats = sortArrayByKey(stats, 'commits', 'desc');
      } else if (type == 'simple-by-impact') {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories
        });
        stats = sortArrayByKey(stats, 'impact', 'desc');
      } else if (type == 'simple-by-impact-ratio') {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories
        });
        stats = sortArrayByKey(stats, 'impactRatio', 'desc');
      } else if (type == 'simple-by-days-since-last-commit') {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories
        });
        stats = sortArrayByKey(stats, 'daysSinceLastCommit', 'desc');
      } else if (type == 'simple-by-staleness') {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories
        });
        stats = sortArrayByKey(stats, 'staleness', 'desc');
      } else if (type == 'simple-by-days-active') {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories
        });
        stats = sortArrayByKey(stats, 'daysActive', 'desc');
      } else if (type == 'simple-by-repositories-nr') {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories
        });
        stats = sortArrayByKey(stats, 'totalNrRepositories', 'desc');
      } else {
        stats.push({
          author: b,
          commits: authorNrCommits,
          impact: authorImpactSum,
          impactRatio: authorImpactRatio,
          daysActive : daysActive,
          weekdays : groupByDuplicatesInArray(authorDays),
          commitDateFirst : commitDateFirst,
          commitDateLast : commitDateLast,
          daysSinceFirstCommit : daysSinceFirstCommit,
          daysSinceLastCommit : daysSinceLastCommit,
          staleness: staleness,
          totalNrRepositories: totalNrRepositories,
          commitsPerDay: groupByDuplicatesInArray(commitsPerDay)
        });
      }
    }
  }
  return stats;
};
