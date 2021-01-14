import React from 'react';
import classnames from 'classnames';

const Toggler = ({ title, status, handleTogglerStatus, bgOn, bgOff, fgOn, fgOff }) => (
  <button
    type="button"
    aria-pressed={status}
    className={classnames(
      status ? bgOn : bgOff,
      'relative',
      'inline-flex flex-shrink-0',
      'h-6 w-11',
      'border-2 border-transparent rounded-full',
      'cursor-pointer',
      'transition-colors ease-in-out duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    )}
    onClick={handleTogglerStatus}
  >
    <span className="sr-only">Toggle {title}</span>
    <span
      aria-hidden={!status}
      className={classnames(
        'translate-x-0',
        status ? 'translate-x-5' : 'translate-x-0',
        status ? fgOn : fgOff,
        'inline-block h-5 w-5',
        'rounded-full',
        'shadow',
        'transform ring-0 transition ease-in-out duration-200',
      )}
    />
  </button>
);

export default Toggler;
