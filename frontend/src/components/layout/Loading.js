import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const renderSpinner = ({ colorSpinnerDark, colorSpinnerLight, isDark, isOneLine, spinnerSize }) => {
  const size = isOneLine ? 20 : spinnerSize || 40;
  const sizeVb = 50;
  const sizeVbHalf = sizeVb / 2;
  const viewBox = `0 0 ${sizeVb} ${sizeVb}`;
  const from = `0 ${sizeVbHalf} ${sizeVbHalf}`;
  const to = `360 ${sizeVbHalf} ${sizeVbHalf}`;
  return (
    <svg
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox={viewBox}
    >
      <path
        fill={isDark ? colorSpinnerDark : colorSpinnerLight}
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from={from}
          to={to}
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

const Loading = ({
  absolute,
  colorBackgroundDark,
  colorBackgroundLight,
  colorSpinnerDark,
  colorSpinnerLight,
  fullHeight,
  isDark,
  isOneLine,
  loading,
  message,
  messageDark,
  messageLight,
}) => {
  const classesWrapperAbsolute = [
    'fixed',
    'flex items-center justify-center',
    'w-full',
    'h-full',
    'z-10',
    'bg-opacity-50',
    colorBackgroundLight || 'bg-white',
    colorBackgroundDark || 'dark:bg-gray-900',
  ];
  const classesWrapperDefault = [
    'flex items-center justify-center',
    'w-full',
    fullHeight && 'h-full',
    fullHeight && 'absolute',
    fullHeight && '-top-0',
    fullHeight && '-left-0',
    !fullHeight && 'mt-4 mb-4',
    'z-10',
  ];
  const classesWrapper = absolute ? classesWrapperAbsolute : classesWrapperDefault;
  const classesMessage = [
    'sm:text-sm',
    messageLight || 'text-gray-900',
    messageDark || 'dark:text-white',
    !isOneLine ? 'mb-2' : 'mr-2',
  ];
  const classesSpinner = [
    absolute && 'absolute',
    'flex',
    !isOneLine && 'flex-col',
    'items-center justify-center',
    'z-50',
  ];
  return (
    <>
      {loading && (
        <div className={classnames(classesWrapper)}>
          <div className={classnames(fullHeight && 'flex-grow')}>
            <div className={classnames(classesSpinner)}>
              <p className={classnames(classesMessage)}>{message}</p>
              {renderSpinner({ colorSpinnerDark, colorSpinnerLight, isDark, isOneLine })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
