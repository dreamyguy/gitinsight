/* eslint react/jsx-closing-bracket-location: 0 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GlobalTotal} from './GlobalTotal';
import {
  arrayByKey,
  groupByDuplicatesInArray,
  itemsSum
} from './oxo';
import './Home.scss';

export class TotalNrContributors extends Component {
  render() {
    const {data} = this.props;
    if (typeof data !== 'undefined' && data !== null && data.length === 0) {
      return (
        <GlobalTotal
          total={0}
          detail="Contributors"
          color="teal"
        />
      );
    }
    const totalNrContributors = itemsSum(
      Object.keys(
        groupByDuplicatesInArray(
          arrayByKey(data, 'author_email')
        )
      )
    );
    return (
      <GlobalTotal
        total={totalNrContributors}
        detail="Contributors"
        color="teal"
      />
    );
  }
}

TotalNrContributors.propTypes = {
  data: PropTypes.array
};

