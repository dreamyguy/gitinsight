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

export class ChartCommitsByMinute extends Component {
  render() {
    const {commits} = this.props;
    const objTimeMinutes = sortObjByKey(
      groupByTime(commits, 'minutes')
    );
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
    return (
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
    );
  }
}

ChartCommitsByMinute.propTypes = {
  commits: PropTypes.array
};
