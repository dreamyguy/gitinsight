/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalChart} from '../base/GlobalChart';
import {
  arrayByKey,
  arrayYearChanges,
  sumArray,
  totalSum
} from '../helpers/oxo';

export class ChartCumulativeLinesOfCode extends Component {
  render() {
    const {commits} = this.props;
    // array for yearly labels - this one will work well as long as the range is full
    const yearsGoneBy = arrayYearChanges(commits, 'date_year');
    // the data
    const chartImpactCumulative = sumArray(
      arrayByKey(commits, 'impact')
    );
    // high
    const impactCumulativeMax = totalSum(
      arrayByKey(commits, 'impact')
    );
    return (
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
    );
  }
}

ChartCumulativeLinesOfCode.propTypes = {
  commits: PropTypes.array
};
