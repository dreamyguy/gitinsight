/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DatesFromUntil from '../content/DatesFromUntil';

const PageTitleWithDate = ({ from, until, title }) => (
  <dl
    className={classnames(
      'flex items-baseline',
      'flex-col justify-start',
      'sm:flex-row sm:justify-between',
      'md:flex-col md:justify-start',
      'lg:flex-row lg:justify-between',
    )}
  >
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    <DatesFromUntil from={from} until={until} />
  </dl>
);

PageTitleWithDate.propTypes = {
  from: PropTypes.string,
  until: PropTypes.string,
  title: PropTypes.string,
};

export default PageTitleWithDate;
