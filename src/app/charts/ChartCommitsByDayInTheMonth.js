/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalChart} from '../base/GlobalChart';
import {
  arrayMaxMin,
  arrayOfValues,
  groupByTime,
  itemsValuesSum,
  sortObjByKey
} from '../helpers/oxo';

export class ChartCommitsByDayInTheMonth extends Component {
  render() {
    const {commits} = this.props;
    const objTimeMonthDay = sortObjByKey(
      groupByTime(commits, 'month-day')
    );
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
    return (
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
    );
  }
}

ChartCommitsByDayInTheMonth.propTypes = {
  commits: PropTypes.array
};
