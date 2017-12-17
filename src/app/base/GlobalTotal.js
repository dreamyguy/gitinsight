import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class GlobalTotal extends Component {
  dynaClass() {
    return 'widget widget-' + this.props.widgetClass + ' flexy-item open-sans-light';
  }
  renderResult(total, decimals) {
    if (!total) {
      return <h3 className="total">Laster...</h3>;
    }
    let result = total;
    if (decimals) {
      result = parseFloat(total.toFixed(2)).toLocaleString('en');
    } else {
      result = parseFloat(total.toFixed(0)).toLocaleString('en');
    }
    return <h3 className="total">{result}</h3>;
  }
  render() {
    const {color, detail, total, decimals} = this.props;
    return (
      <div className={this.dynaClass()} style={{borderLeftColor: color}}>
        {this.renderResult(total, decimals)}
        <p className="detail">{detail}</p>
      </div>
    );
  }
}

GlobalTotal.defaultProps = {
  widgetClass: 'global-total',
  total: 0,
  detail: 'Did not get expected data!',
  color: 'red',
  decimals: false
};

GlobalTotal.propTypes = {
  widgetClass: PropTypes.string,
  total: PropTypes.number,
  detail: PropTypes.string,
  color: PropTypes.string,
  decimals: PropTypes.bool
};
