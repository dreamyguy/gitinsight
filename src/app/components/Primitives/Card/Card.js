import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`card${classes ? ' ' + classes : ''}`}>
        Card
      </div>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.string
};

export default Card;
