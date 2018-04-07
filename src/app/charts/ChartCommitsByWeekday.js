/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalChart} from '../base/GlobalChart';
import {
  arrayMaxMin,
  arrayOfValues,
  groupByTime,
  itemsValuesSum,
  sorterWeekday,
  sortObjByKeyWithSorter
} from '../helpers/lib';

export class ChartCommitsByWeekday extends Component {
  render() {
    const {commits} = this.props;
    const objTimeDayWeek = sortObjByKeyWithSorter(
      groupByTime(commits, 'day-week'), sorterWeekday
    );
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
    return (
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
    );
  }
}

ChartCommitsByWeekday.propTypes = {
  commits: PropTypes.array
};
