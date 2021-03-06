/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */

// Copied and modified from 'animated-number-react'
// Changes: Introduce 'animate' prop, which triggers animation conditionally
// See: https://github.com/Leocardoso94/animated-number-react

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import anime from './anime';

const defaultFunction = () => {};

class AnimatedNumber extends Component {
  static propTypes = {
    animate: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    duration: PropTypes.number,
    delay: PropTypes.number,
    formatValue: PropTypes.func,
    begin: PropTypes.func,
    complete: PropTypes.func,
    run: PropTypes.func,
    update: PropTypes.func,
    easing: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    animate: true,
    duration: 1000,
    formatValue: value => value,
    easing: 'linear',
    run: defaultFunction,
    complete: defaultFunction,
    update: defaultFunction,
    begin: defaultFunction,
    delay: 0,
    className: null,
  };

  state = {
    animatedValue: 0,
  };

  target = {
    animatedValue: 0,
  };

  componentDidMount = () => {
    this.animateValue();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.value !== this.props.value) this.animateValue();
  };

  updateValue = anima => {
    this.props.update(anima);
    const { animatedValue } = this.target;
    this.setState({ animatedValue });
  };

  animateValue = () => {
    const { duration, begin, easing, complete, run, delay, value } = this.props;
    anime({
      targets: this.target,
      animatedValue: value,
      duration,
      update: this.updateValue,
      easing,
      begin,
      complete,
      run,
      delay,
    });
  };

  render() {
    return (
      <span className={this.props.className}>
        {this.props.animate && this.state.animatedValue !== 0
          ? this.props.formatValue(Number(this.state.animatedValue))
          : this.props.formatValue(Number(this.props.value))}
      </span>
    );
  }
}

export default AnimatedNumber;
