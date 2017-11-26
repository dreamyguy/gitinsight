import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class GlobalTotal extends Component {
  dynaClass() {
    return 'widget widget-' + this.props.widgetClass + ' flexy-item open-sans-light';
  }
  render() {
    const {color, total, detail} = this.props;
    return (
      <div className={this.dynaClass()} style={{borderLeftColor: color}}>
        <h3 className="total">{total}</h3>
        <p className="detail">{detail}</p>
      </div>
    );
  }
}

GlobalTotal.defaultProps = {
  widgetClass: 'global-total',
  total: 0,
  detail: 'Did not get expected data!',
  color: 'red'
};

GlobalTotal.propTypes = {
  widgetClass: PropTypes.string,
  total: PropTypes.number,
  detail: PropTypes.string,
  color: PropTypes.string
};
