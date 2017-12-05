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

export class ChartCommitsByYear extends Component {
  render() {
    const {commits} = this.props;
    const objTimeYear = sortObjByKey(
      groupByTime(commits, 'year')
    );
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
    return (
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
    );
  }
}

ChartCommitsByYear.propTypes = {
  commits: PropTypes.array
};
