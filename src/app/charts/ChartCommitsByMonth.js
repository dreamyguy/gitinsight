/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalChart} from '../base/GlobalChart';
import {
  arrayMaxMin,
  arrayOfValues,
  groupByTime,
  itemsValuesSum,
  sorterMonthName,
  sortObjByKeyWithSorter
} from '../helpers/lib';

export class ChartCommitsByMonth extends Component {
  render() {
    const {commits} = this.props;
    const objTimeMonthName = sortObjByKeyWithSorter(
      groupByTime(commits, 'month-name'), sorterMonthName
    );
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
    return (
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
    );
  }
}

ChartCommitsByMonth.propTypes = {
  commits: PropTypes.array
};
