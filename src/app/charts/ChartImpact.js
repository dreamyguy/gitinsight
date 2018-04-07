/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalChart} from '../base/GlobalChart';
import {
  arrayByKey,
  arrayMaxMin,
  arrayYearChanges
} from '../helpers/lib';

export class ChartImpact extends Component {
  render() {
    const {commits} = this.props;
    // array for yearly labels - this one will work well as long as the range is full
    const yearsGoneBy = arrayYearChanges(commits, 'date_year');
    // the data
    const chartImpact = arrayByKey(commits, 'impact');
    // high
    const impactCommitMax = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'max'
    );
    // low
    const impactCommitMin = arrayMaxMin(
      arrayByKey(commits, 'impact'), 'min'
    );
    return (
      <GlobalChart
        title="Impact"
        detail="Additions minus Deletions on a given commit"
        color="red"
        chartColor="deepPink"
        arrayLabels={yearsGoneBy}
        arraySeries={chartImpact}
        height="300px"
        high={impactCommitMax}
        low={impactCommitMin}
        axisXShowLabel
        axisXShowGrid={false}
      />
    );
  }
}

ChartImpact.propTypes = {
  commits: PropTypes.array
};
