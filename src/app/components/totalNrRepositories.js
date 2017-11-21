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

export class TotalNrRepositories extends Component {
  render() {
    const {data} = this.props;
    if (typeof data !== 'undefined' && data !== null && data.length === 0) {
      return (
        <GlobalTotal
          total={0}
          detail="Repositories"
          color="purple"
        />
      );
    }
    const totalNrRepositories = itemsSum(
      Object.keys(
        groupByDuplicatesInArray(
          arrayByKey(data, 'repository')
        )
      )
    );
    return (
      <GlobalTotal
        total={totalNrRepositories}
        detail="Repositories"
        color="purple"
      />
    );
  }
}

TotalNrRepositories.propTypes = {
  data: PropTypes.array
};

