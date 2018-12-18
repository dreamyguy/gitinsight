import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes = '', // accepts CSS classNames as string
      number = ''
    } = this.props;
    return (
      <div className={`badge__wrapper${classes ? ' ' + classes : ''}`}>
        <div className="badge">
          {number}
        </div>
      </div>
    );
  }
}

Badge.propTypes = {
  number: PropTypes.number,
  classes: PropTypes.string
};

export default Badge;
