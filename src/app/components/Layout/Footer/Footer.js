import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`footer${classes ? ' ' + classes : ''}`}>
        Footer
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.string
};

export default Footer;
