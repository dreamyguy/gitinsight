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
} from '../helpers/lib';

export class ChartCommitsBySecond extends Component {
  render() {
    const {commits} = this.props;
    const objTimeSeconds = sortObjByKey(
      groupByTime(commits, 'seconds')
    );
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
    return (
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
    );
  }
}

ChartCommitsBySecond.propTypes = {
  commits: PropTypes.array
};

