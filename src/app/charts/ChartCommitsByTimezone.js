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

export class ChartCommitsByTimezone extends Component {
  render() {
    const {commits} = this.props;
    const objTimeGmt = sortObjByKey(
      groupByTime(commits, 'gmt')
    );
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
    return (
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
    );
  }
}

ChartCommitsByTimezone.propTypes = {
  commits: PropTypes.array
};
