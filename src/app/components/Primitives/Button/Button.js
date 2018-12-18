import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Import primitive
import Icon from '../Icon/Icon';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 0
    };
  }
  render() {
    const {
      type = '', // primary | secondary | download
      classes = '', // accepts CSS classNames as string
      title = '',
      icon = '',
      disabled
    } = this.props;
    return (
      <button
        className={`button button${type ? '--' + type : '--primary'}${classes ? ' ' + classes : ''}`}
        disabled={disabled}
        {...this.props}
        >
        {title} {icon && <Icon classes="button__icon" icon={icon}/>}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
