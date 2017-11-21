/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCommits} from '../redux/actions/actionsCommits';
import {GlobalTotal} from './GlobalTotal';
import {GlobalChart} from './GlobalChart';
import {TotalNrContributors} from './TotalNrContributors';
import {TotalNrRepositories} from './TotalNrRepositories';
import {
  arrayByKey,
  arrayByKeyFiltered,
  arrayByKeyFilteredGreaterThan,
  arrayMaxMin,
  arrayOfValues,
  arrayYearChanges,
  // groupByDuplicatesInArray,
  groupByTime,
  itemsSum,
  itemsValuesSum,
  sorterWeekday,
  sorterMonthName,
  sortObjByKey,
  sortObjByKeyWithSorter,
  sumArray,
  totalSum
} from './oxo';
import './Home.scss';

class Home extends Component {
  componentWillMount() {
    const {commits} = this.props;
    // When accessing the page directly for the first time, the 'commits' array
    // is defined, but is empty. In those cases we should fetch the data. This
    // check also prevents a new fetch in case 'commits' already has data.
    if (typeof commits !== 'undefined' && commits !== null && commits.length === 0) {
      this.props.dispatch(fetchCommits());
    }
  }
  render() {
    // - ////////////////////////////////////

    const {commits} = this.props;

    // // sort datasource array by date
    // // @todo: this is no longer an array, commenting out...
    // data.sort((a, b) => {
    //   return a.author_date_unix_timestamp - b.author_date_unix_timestamp;
    // });

    // --- calculate some global stats and assign them to vars ---/

    // total nr commits
    const totalNrCommits = itemsSum(commits);
    // // total nr contributors
    // const totalNrContributors = itemsSum(
    //   Object.keys(
    //     groupByDuplicatesInArray(
    //       arrayByKey(commits, 'author_email')
    //     )
    //   )
    // );
    // total nr repositories
    // const totalNrRepositories = itemsSum(
    //   Object.keys(
    //     groupByDuplicatesInArray(
    //       arrayByKey(commits, 'repository')
    //     )
    //   )
    // );
    // total lines of code
    const totalLinesOfCode = totalSum(
      arrayByKey(commits, 'impact')
    );
    // total file changes
    const totalFileChanges = totalSum(
      arrayByKey(commits, 'files_changed')
    );
    // total commits without file changes
    const totalCommitsWithoutFileChanges = itemsSum(
      arrayByKeyFiltered(commits, 'files_changed', '0')
    );
    // total commits with no impact
    const totalCommitsWithoutImpact = itemsSum(
      arrayByKeyFiltered(commits, 'impact', '0')
    );
    // total commits impact greater than 1000
    const totalCommitsImpactGreaterThan = itemsSum(
      arrayByKeyFilteredGreaterThan(commits, 'impact', '1000')
    );
    // total commits on weekends
    const totalCommitsOnSaturday = itemsSum(
      arrayByKeyFiltered(commits, 'date_day_week', 'Sat')
    );
    const totalCommitsOnSunday = itemsSum(
      arrayByKeyFiltered(commits, 'date_day_week', 'Sun')
    );
    const totalCommitsOnWeekends = totalCommitsOnSaturday + totalCommitsOnSunday;
    // // get first and last commit dates
    // const commitTheFirst = getValueOfFirstOrLastKey(commits, 'date_iso_8601', 'first');
    // const commitTheLast = getValueOfFirstOrLastKey(commits, 'date_iso_8601', 'last');

    // const objTimePeriodDay = groupByTimePeriod(commits, 'day');
    // const objTimePeriodWeek = groupByTimePeriod(commits, 'week');
    // const objTimePeriodMonth = groupByTimePeriod(commits, 'month');
    // const objTimePeriodYear = groupByTimePeriod(commits, 'year');
    // console.log(objTimePeriodDay);
    // console.log(objTimePeriodWeek);
    // console.log(objTimePeriodMonth);
    // console.log(objTimePeriodYear);

    const objTimeHour = sortObjByKey(
      groupByTime(commits, 'hour')
    );
    const objTimeMinutes = sortObjByKey(
      groupByTime(commits, 'minutes')
    );
    const objTimeSeconds = sortObjByKey(
      groupByTime(commits, 'seconds')
    );
    const objTimeGmt = sortObjByKey(
      groupByTime(commits, 'gmt')
    );
    const objTimeDayWeek = sortObjByKeyWithSorter(
      groupByTime(commits, 'day-week'), sorterWeekday
    );
    const objTimeMonthDay = sortObjByKey(
      groupByTime(commits, 'month-day')
    );
    const objTimeMonthName = sortObjByKeyWithSorter(
      groupByTime(commits, 'month-name'), sorterMonthName
    );
    // const objTimeMonthNumber = sortObjByKey(
    //   groupByTime(commits, 'month-number')
    // );
    const objTimeYear = sortObjByKey(
      groupByTime(commits, 'year')
    );
    const objTimeIso8601 = sortObjByKey(
      groupByTime(commits, 'iso-8601')
    );

    // console.log(objTimeHour);
    // console.log(objTimeMinutes);
    // console.log(objTimeSeconds);
    // console.log(objTimeGmt);
    // console.log(objTimeDayWeek);
    // console.log(objTimeMonthDay);
    // console.log(objTimeMonthName);
    // console.log(objTimeMonthNumber);
    // console.log(objTimeYear);
    // console.log(objTimeIso8601);

    // array for yearly labels - this one will work well as long as the range is full
    const yearsGoneBy = arrayYearChanges(commits, 'date_year');

    // --- chart - impact --- /
    // the data
    const chartImpact = arrayByKey(commits, 'impact');
    // high
    const impactCommitMax = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'max'
    );
    // low
    const impactCommitMin = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'min'
    );

    // --- chart - impact --- /
    // the data
    const chartImpactCumulative = sumArray(
      arrayByKey(commits, 'impact')
    );
    // high
    const impactCumulativeMax = totalSum(
      arrayByKey(commits, 'impact')
    );

    // --- chart - files changed --- /
    // the data
    const chartFilesChanged = arrayByKey(commits, 'files_changed');
    // high
    const filesChangedMax = arrayMaxMin(
      arrayByKey(commits, 'files_changed'), 'max'
    );
    // low
    const filesChangedMin = arrayMaxMin(
      arrayByKey(commits, 'files_changed'), 'min'
    );

    // --- chart - commits by hours --- /
    // the data
    const chartCommitsByHourKeys = arrayOfValues(
      Object.keys(objTimeHour)
    );
    const chartCommitsByHourValues = arrayOfValues(
      itemsValuesSum(objTimeHour)
    );
    // high
    const chartCommitsByHourMax = arrayMaxMin(
      chartCommitsByHourValues, 'max'
    );
    // low
    const chartCommitsByHourMin = arrayMaxMin(
      chartCommitsByHourValues, 'min'
    );

    // --- chart - commits by minutes --- /
    // the data
    const chartCommitsByMinutesKeys = arrayOfValues(
      Object.keys(objTimeMinutes)
    );
    const chartCommitsByMinutesValues = arrayOfValues(
      itemsValuesSum(objTimeMinutes)
    );
    // high
    const chartCommitsByMinutesMax = arrayMaxMin(
      chartCommitsByMinutesValues, 'max'
    );
    // low
    const chartCommitsByMinutesMin = arrayMaxMin(
      chartCommitsByMinutesValues, 'min'
    );

    // --- chart - commits by seconds --- /
    // the data
    const chartCommitsBySecondsKeys = arrayOfValues(
      Object.keys(objTimeSeconds)
    );
    const chartCommitsBySecondsValues = arrayOfValues(
      itemsValuesSum(objTimeSeconds)
    );
    // high
    const chartCommitsBySecondsMax = arrayMaxMin(
      chartCommitsBySecondsValues, 'max'
    );
    // low
    const chartCommitsBySecondsMin = arrayMaxMin(
      chartCommitsBySecondsValues, 'min'
    );

    // --- chart - commits by timezone --- /
    // the data
    const chartCommitsByGmtKeys = arrayOfValues(
      Object.keys(objTimeGmt)
    );
    const chartCommitsByGmtValues = arrayOfValues(
      itemsValuesSum(objTimeGmt)
    );
    // high
    const chartCommitsByGmtMax = arrayMaxMin(
      chartCommitsByGmtValues, 'max'
    );
    // low
    const chartCommitsByGmtMin = arrayMaxMin(
      chartCommitsByGmtValues, 'min'
    );

    // --- chart - commits by weekdays --- /
    // the data
    const chartCommitsByDayWeekKeys = arrayOfValues(
      Object.keys(objTimeDayWeek)
    );
    const chartCommitsByDayWeekValues = arrayOfValues(
      itemsValuesSum(objTimeDayWeek)
    );
    // high
    const chartCommitsByDayWeekMax = arrayMaxMin(
      chartCommitsByDayWeekValues, 'max'
    );
    // low
    const chartCommitsByDayWeekMin = arrayMaxMin(
      chartCommitsByDayWeekValues, 'min'
    );

    // --- chart - commits by day in the month --- /
    // the data
    const chartCommitsByMonthDayKeys = arrayOfValues(
      Object.keys(objTimeMonthDay)
    );
    const chartCommitsByMonthDayValues = arrayOfValues(
      itemsValuesSum(objTimeMonthDay)
    );
    // high
    const chartCommitsByMonthDayMax = arrayMaxMin(
      chartCommitsByMonthDayValues, 'max'
    );
    // low
    const chartCommitsByMonthDayMin = arrayMaxMin(
      chartCommitsByMonthDayValues, 'min'
    );

    // --- chart - commits by month --- /
    // the data
    const chartCommitsByMonthNameKeys = arrayOfValues(
      Object.keys(objTimeMonthName)
    );
    const chartCommitsByMonthNameValues = arrayOfValues(
      itemsValuesSum(objTimeMonthName)
    );
    // high
    const chartCommitsByMonthNameMax = arrayMaxMin(
      chartCommitsByMonthNameValues, 'max'
    );
    // low
    const chartCommitsByMonthNameMin = arrayMaxMin(
      chartCommitsByMonthNameValues, 'min'
    );

    // --- chart - commits by year --- /
    // the data
    const chartCommitsByYearKeys = arrayOfValues(
      Object.keys(objTimeYear)
    );
    const chartCommitsByYearValues = arrayOfValues(
      itemsValuesSum(objTimeYear)
    );
    // high
    const chartCommitsByYearMax = arrayMaxMin(
      chartCommitsByYearValues, 'max'
    );
    // low
    const chartCommitsByYearMin = arrayMaxMin(
      chartCommitsByYearValues, 'min'
    );

    // --- chart - commits on a given day --- /
    // the data
    const chartCommitsByIso8601Keys = arrayOfValues(
      Object.keys(objTimeIso8601)
    );
    const chartCommitsByIso8601Values = arrayOfValues(
      itemsValuesSum(objTimeIso8601)
    );
    // high
    const chartCommitsByIso8601Max = arrayMaxMin(
      chartCommitsByIso8601Values, 'max'
    );
    // low
    const chartCommitsByIso8601Min = arrayMaxMin(
      chartCommitsByIso8601Values, 'min'
    );
    // - ////////////////////////////////////
    return (
      <div className="wrapper light">
        <div className="flexy">
          <GlobalTotal
            total={totalNrCommits}
            detail="Commits"
            color="green"
          />
          <TotalNrContributors data={commits}/>
          <TotalNrRepositories data={commits}/>
          {/* <GlobalTotal
            total={totalNrContributors}
            detail="Contributors"
            color="teal"
          /> */}
          {/* <GlobalTotal
            total={totalNrRepositories}
            detail="Repositories"
            color="purple"
          /> */}
          <GlobalTotal
            total={totalLinesOfCode}
            detail="Lines of Code"
            color="cyan"
          />
          <GlobalTotal
            total={totalFileChanges}
            detail="File Changes"
            color="orange"
          />
          <GlobalTotal
            total={totalCommitsWithoutFileChanges}
            detail="Commits w/o File Changes"
            color="violet"
          />
          <GlobalTotal
            total={totalCommitsWithoutImpact}
            detail="Commits w/o Impact"
            color="deepPink"
          />
          <GlobalTotal
            total={totalCommitsImpactGreaterThan}
            detail="Commits w/ Impact > 1000"
            color="red"
          />
          <GlobalTotal
            total={totalCommitsOnWeekends}
            detail="Commits on weekends"
            color="gold"
          />
          <GlobalTotal
            total={filesChangedMax}
            detail="Max. number of files changed on a single commit"
            color="magenta"
          />
          <GlobalTotal
            total={impactCommitMax}
            detail="Commit with highest Impact"
            color="maroon"
          />
          <GlobalTotal
            total={impactCommitMin}
            detail="Commit with lowest Impact"
            color="lime"
          />
        </div>
        <GlobalChart
          title="Commits by Hour"
          detail="Commits done at certain hours"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByHourKeys}
          arraySeries={chartCommitsByHourValues}
          height="300px"
          high={chartCommitsByHourMax}
          low={chartCommitsByHourMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Minute"
          detail="Commits done at a certain minute"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByMinutesKeys}
          arraySeries={chartCommitsByMinutesValues}
          height="300px"
          high={chartCommitsByMinutesMax}
          low={chartCommitsByMinutesMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Second"
          detail="Commits done at a certain second"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsBySecondsKeys}
          arraySeries={chartCommitsBySecondsValues}
          height="300px"
          high={chartCommitsBySecondsMax}
          low={chartCommitsBySecondsMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Timezone"
          detail="Commits done at a certain timezone"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByGmtKeys}
          arraySeries={chartCommitsByGmtValues}
          height="300px"
          high={chartCommitsByGmtMax}
          low={chartCommitsByGmtMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Weekdays"
          detail="Commits done at a certain weekday"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByDayWeekKeys}
          arraySeries={chartCommitsByDayWeekValues}
          height="300px"
          high={chartCommitsByDayWeekMax}
          low={chartCommitsByDayWeekMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Day in the Month"
          detail="Commits done at a certain calendar day"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByMonthDayKeys}
          arraySeries={chartCommitsByMonthDayValues}
          height="300px"
          high={chartCommitsByMonthDayMax}
          low={chartCommitsByMonthDayMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Month"
          detail="Commits done at a certain month"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByMonthNameKeys}
          arraySeries={chartCommitsByMonthNameValues}
          height="300px"
          high={chartCommitsByMonthNameMax}
          low={chartCommitsByMonthNameMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Year"
          detail="Commits done during a year"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByYearKeys}
          arraySeries={chartCommitsByYearValues}
          height="300px"
          high={chartCommitsByYearMax}
          low={chartCommitsByYearMin}
          axisXShowLabel
          axisXShowGrid
        />
        <GlobalChart
          title="Commits by Day"
          detail="Commits done on a single day"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={chartCommitsByIso8601Keys}
          arraySeries={chartCommitsByIso8601Values}
          height="300px"
          high={chartCommitsByIso8601Max}
          low={chartCommitsByIso8601Min}
          axisXShowLabel={false}
          axisXShowGrid={false}
        />
        <GlobalChart
          title="Lines of Code"
          detail="Cummulative graph on Lines of Code"
          color="orangeYellow"
          chartColor="deepPink"
          arrayLabels={yearsGoneBy}
          arraySeries={chartImpactCumulative}
          height="300px"
          high={impactCumulativeMax}
          axisXShowLabel
          axisXShowGrid={false}
        />
        <GlobalChart
          title="Impact"
          detail="Additions minus Deletions on a given commit"
          color="red"
          chartColor="deepPink"
          arrayLabels={yearsGoneBy}
          arraySeries={chartImpact}
          height="300px"
          high={impactCommitMax}
          low={impactCommitMin}
          axisXShowLabel
          axisXShowGrid={false}
        />
        <GlobalChart
          title="Files Changed"
          detail="Files changed on a given commit"
          color="deepPink"
          chartColor="deepPink"
          arrayLabels={yearsGoneBy}
          arraySeries={chartFilesChanged}
          height="300px"
          high={filesChangedMax}
          low={filesChangedMin}
          axisXShowLabel
          axisXShowGrid={false}
        />
      </div>
    );
  }
}

Home.propTypes = {
  commits: PropTypes.array,
  dispatch: PropTypes.func
};

export default connect(store => {
  return {
    commits: store.commits.commits
  };
})(Home);
