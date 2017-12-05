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

export class ChartCommitsByHour extends Component {
  render() {
    const {commits} = this.props;
    const objTimeHour = sortObjByKey(
      groupByTime(commits, 'hour')
    );
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
    return (
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
    );
  }
}

ChartCommitsByHour.propTypes = {
  commits: PropTypes.array
};
