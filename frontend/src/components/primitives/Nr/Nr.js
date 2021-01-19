/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { UiContext } from '../../../contexts';
import { thousandify } from '../../../utils/thousandifyUtil';
import { isNotEmptyArray } from '../../../utils/isEmptyUtil';
import AnimatedNumber from './AnimatedNumber/AnimatedNumber';
import { config } from '../../../config';
import './Nr.scss';

const { animateNumbers, animateNumbersDuration, animateNumbersInit } = config;

const Nr = ({ mode, value, size, thousandify: thousand }) => {
  const { uiIsAnimating, setUiIsAnimating } = useContext(UiContext);
  const timeoutRef = useRef(null); // Keep track of the timeout (for changing 'nr')
  const [nr, setNr] = useState(0);

  const handleCompleteAnimation = () => {
    if (animateNumbers && uiIsAnimating) {
      setUiIsAnimating(false);
    }
  };

  const convertStringToArraysOfChars = str => {
    const output = [];
    if (str) {
      const arr = str.split('');
      if (arr && isNotEmptyArray(arr)) {
        arr.map(a => {
          if (a === ' ' || a === ',') {
            // It's a space
            output.push(
              <span key={uuidv4()} className="ns">
                {a}
              </span>,
            );
          } else {
            // It's a number
            output.push(
              <span key={uuidv4()} className="n">
                {a}
              </span>,
            );
          }
          return null;
        });
      }
    }
    const sizeClass = `n-${size}`;
    return <span className={sizeClass}>{output}</span>;
  };

  const formatValue = n => {
    if (n) {
      const formattedNr = thousand ? thousandify(n.toFixed(0), 'en') : n.toFixed(0);
      if (mode === 'currency') {
        // If you have a language context, pass it as the last param instead of 'en'
        // ('thousandify()' has support for both English and Norwegian)
        return convertStringToArraysOfChars(formattedNr);
      }
      return formattedNr;
    }
    return 0;
  };

  // Run this once
  useEffect(() => {
    // Set 'value' to 'nr' under certain conditions
    if (value && (!nr || nr === null || nr !== 0)) {
      setNr(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Run this after change in value
  useEffect(() => {
    // Only do any of this if the value we're receiving differs from the one we have
    if (value !== nr) {
      // Set a timeout
      timeoutRef.current = setTimeout(() => {
        // Reset ref to null when it runs
        timeoutRef.current = null;
        setNr(value);
        return null;
      }, animateNumbersInit);
      // If there's a running timeout...
      if (timeoutRef.current !== null) {
        // ...cancel it
        clearTimeout(timeoutRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      {nr ? (
        animateNumbers ? (
          <AnimatedNumber
            animate={uiIsAnimating}
            value={nr}
            formatValue={formatValue}
            complete={handleCompleteAnimation}
            duration={animateNumbersDuration}
          />
        ) : (
          formatValue(nr)
        )
      ) : (
        <span>0</span>
      )}
    </>
  );
};

Nr.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Nr;
