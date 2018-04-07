/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalChart} from '../base/GlobalChart';
import {
  arrayByKey,
  arrayMaxMin,
  arrayYearChanges
} from '../helpers/lib';

export class ChartNrFilesChanged extends Component {
  render() {
    const {commits} = this.props;
    // array for yearly labels - this one will work well as long as the range is full
    const yearsGoneBy = arrayYearChanges(commits, 'date_year');
    // the data
    const chartFilesChanged = arrayByKey(commits, 'files_changed');
    // high
    const filesChangedMax = arrayMaxMin(
      arrayByKey(commits, 'files_changed'), 'max'
    );
    // low
    const filesChangedMin = arrayMaxMin(
      arrayByKey(commits, 'files_changed'), 'min'
    );
    return (
      <GlobalChart
        title="Files Changed"
        detail="Files changed on a given commit"
        color="deepPink"
        chartColor="deepPink"
        arrayLabels={yearsGoneBy}
        arraySeries={chartFilesChanged}
        height="300px"
        high={filesChangedMax}
        low={filesChangedMin}
        axisXShowLabel
        axisXShowGrid={false}
      />
    );
  }
}

ChartNrFilesChanged.propTypes = {
  commits: PropTypes.array
};
