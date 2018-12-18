import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`error${classes ? ' ' + classes : ''}`}>
        {/* Error */}
      </div>
    );
  }
}

Error.propTypes = {
  classes: PropTypes.string
};

export default Error;
