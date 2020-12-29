import React from 'react';
import classnames from 'classnames';
import { config } from './../../config';

const { showResponsiveGuide } = config;

const sharedClasses = {
  'absolute top-4 right-4': true,
  'z-50': true,
  'ml-auto py-0.5 px-3 text-xs font-medium rounded-full': true,
  'bg-green-200 text-green-800': true,
  hidden: true,
};

const Responsive = () => (
  <>
    {showResponsiveGuide ? (
      <>
        <span className={classnames(sharedClasses, 'xs:inline-block', 'sm:hidden')}>xs</span>
        <span className={classnames(sharedClasses, 'sm:inline-block', 'md:hidden')}>sm</span>
        <span className={classnames(sharedClasses, 'md:inline-block', 'lg:hidden')}>md</span>
        <span className={classnames(sharedClasses, 'lg:inline-block', 'xl:hidden')}>lg</span>
        <span className={classnames(sharedClasses, 'xl:inline-block')}>xl</span>
      </>
    ) : null}
  </>
);

export default Responsive;
