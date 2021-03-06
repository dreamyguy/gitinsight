import { addEmptyDays } from './../../frontend/src/utils/getDateUtil';
import { cummulative } from './../../frontend/src/utils/cummulativeUtil';
import arrayByKey from './arrayByKey';
import arrayByKeyFiltered from './arrayByKeyFiltered';
import arrayByKeyFilteredGreaterThan from './arrayByKeyFilteredGreaterThan';
import arrayMaxMin from './arrayMaxMin';
import daysBetween from './daysBetween';
import daysSince from './daysSince';
import groupByDuplicatesInArray from './groupByDuplicatesInArray';
import impactBy from './impactBy';
import itemsSum from './itemsSum';
import totalSum from './totalSum';

// Create global stats object
export const statsGlobal = ({ data }) => {
  // sort datasource array by date
  data.sort(function(a, b) {
    return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
  });

  // --- calculate some global stats and assign them to vars ---/

  // total nr commits
  const totalNrCommits = itemsSum(data);
  // total nr contributors
  const totalNrContributors = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(data, 'author_email')
      )
    )
  );
  // total lines of code
  const totalLinesOfCode = totalSum(
    arrayByKey(data, 'impact')
  );
  // total file changes
  const totalFileChanges = totalSum(
    arrayByKey(data, 'files_changed')
  );
  // total commits without file changes
  const totalCommitsWithoutFileChanges = itemsSum(
    arrayByKeyFiltered(data, 'files_changed', '0')
  );
  // total commits with no impact
  const totalCommitsWithoutImpact = itemsSum(
    arrayByKeyFiltered(data, 'impact', '0')
  );
  // total commits impact greater than 1000
  const totalCommitsImpactGreaterThan = itemsSum(
    arrayByKeyFilteredGreaterThan(data, 'impact', '1000')
  );
  // total commits on weekends
  const totalCommitsOnSaturday = itemsSum(
    arrayByKeyFiltered(data, 'date_day_week', 'Sat')
  );
  const totalCommitsOnSunday = itemsSum(
    arrayByKeyFiltered(data, 'date_day_week', 'Sun')
  );
  const totalCommitsOnWeekends = totalCommitsOnSaturday + totalCommitsOnSunday;
  // variables to pass to final object
  const commits = totalNrCommits;
  const contributors = totalNrContributors;
  const lines = totalLinesOfCode;
  const fileChanges = totalFileChanges;
  const commitsWithoutFileChanges = totalCommitsWithoutFileChanges;
  const commitsWithoutImpact = totalCommitsWithoutImpact;
  const commitsImpactGtThousand = totalCommitsImpactGreaterThan;
  const commitsOnWeekend = totalCommitsOnWeekends;
  // contributors list
  const contributorsList = Object.keys(
    groupByDuplicatesInArray(
      arrayByKey(data, 'author_email')
    )
  ).sort();
  // total nr repositories
  const repositories = itemsSum(
    Object.keys(
      groupByDuplicatesInArray(
        arrayByKey(data, 'repository')
      )
    )
  );
  // repositories list
  const repositoriesList = Object.keys(
    groupByDuplicatesInArray(
      arrayByKey(data, 'repository')
    )
  ).sort();
  // calculate commits on a given week day
  const daysWeek = arrayByKey(data, 'date_day_week');
  const weekdays = groupByDuplicatesInArray(daysWeek);
  // calculate days between first and last commits
  const commitsByAuthorDateUnixtimestamp = arrayByKey(
    data,
    'author_date_unix_timestamp'
  );
  const commitDateFirst = arrayMaxMin(commitsByAuthorDateUnixtimestamp, 'min');
  const commitDateLast = arrayMaxMin(commitsByAuthorDateUnixtimestamp, 'max');
  const daysActive = daysBetween(commitDateFirst, commitDateLast);
  const secondsInActivity = daysActive * 86400; // 86400 = seconds in a day
  // calculate days since first and last commits
  const daysSinceFirstCommit = daysSince(commitDateFirst);
  const daysSinceLastCommit = daysSince(commitDateLast);
  // calculate staleness
  const staleness = daysSinceLastCommit / 365;
  // calculate commits per time unit
  const commitsBySecondsCalendar = arrayByKey(data, 'time_seconds');
  const commitsByMinutesCalendar = arrayByKey(data, 'time_minutes');
  const commitsByHoursCalendar = arrayByKey(data, 'time_hour');
  const commitsByDaysCalendar = arrayByKey(data, 'date_iso_8601');
  const commitsByMonthDay = arrayByKey(data, 'date_month_day');
  const commitsByMonthName = arrayByKey(data, 'date_month_name');
  const commitsByMonthNr = arrayByKey(data, 'date_month_number');
  const commitsByYear = arrayByKey(data, 'date_year');
  const commitsPerContributorAverage = totalNrCommits / totalNrContributors;
  const commitsPerSecond = groupByDuplicatesInArray(commitsBySecondsCalendar);
  const commitsPerMinute = groupByDuplicatesInArray(commitsByMinutesCalendar);
  const commitsPerHour = groupByDuplicatesInArray(commitsByHoursCalendar);
  const commitsPerDay = groupByDuplicatesInArray(commitsByDaysCalendar);
  const commitsPerDayAverage = totalNrCommits / daysActive;
  const commitsPerDayCummulative = cummulative(addEmptyDays({ dayList: commitsPerDay }));
  const commitsPerMonthDay = groupByDuplicatesInArray(commitsByMonthDay);
  const commitsPerMonthName = groupByDuplicatesInArray(commitsByMonthName);
  const commitsPerMonthNr = groupByDuplicatesInArray(commitsByMonthNr);
  const commitsPerYear = groupByDuplicatesInArray(commitsByYear);
  const impactByDay = addEmptyDays({ dayList: impactBy(data, "date_iso_8601") });
  const impactByDayCummulative = cummulative(impactByDay);
  const impactPerSecond = totalLinesOfCode / secondsInActivity;
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
    impactByDay,
    impactByDayCummulative,
    impactPerSecond,
    lines,
    repositories,
    repositoriesList,
    staleness,
    weekdays,
  };
};
