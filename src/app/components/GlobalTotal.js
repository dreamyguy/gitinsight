import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class GlobalTotal extends Component {
  dynaClass() {
    return 'widget widget-' + this.props.widgetClass + ' flexy-item open-sans-light';
  }
  render() {
    return (
      <div className={this.dynaClass()} style={{borderLeftColor: this.props.color}}>
        <h3 className="total">{this.props.total}</h3>
        <p className="detail">{this.props.detail}</p>
      </div>
    );
  }
}

GlobalTotal.defaultProps = {
  widgetClass: 'global-total',
  total: 'N/A',
  detail: 'Did not get expected data!',
  color: 'red'
};

GlobalTotal.propTypes = {
  widgetClass: PropTypes.string,
  total: PropTypes.number,
  detail: PropTypes.string,
  color: PropTypes.string
};
