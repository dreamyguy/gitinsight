import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`header${classes ? ' ' + classes : ''}`}>
        Header
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.string
};

export default Header;
