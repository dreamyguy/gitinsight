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

export class ChartCommitsByDay extends Component {
  render() {
    const {commits} = this.props;
    const objTimeIso8601 = sortObjByKey(
      groupByTime(commits, 'iso-8601')
    );
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
    return (
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
    );
  }
}

ChartCommitsByDay.propTypes = {
  commits: PropTypes.array
};
