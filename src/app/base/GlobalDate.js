import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export class GlobalDate extends Component {
  dynaClass() {
    return 'widget widget-' + this.props.widgetClass + ' flexy-item open-sans-light';
  }
  render() {
    const {color, date, detail} = this.props;
    return (
      <div className={this.dynaClass()} style={{borderLeftColor: color}}>
        <h3 className="date">{moment.unix(date).locale('eu').format('L')}</h3>
        <p className="detail">{detail}</p>
      </div>
    );
  }
}

GlobalDate.defaultProps = {
  widgetClass: 'global-date',
  date: 0,
  detail: 'Did not get expected data!',
  color: 'red'
};

GlobalDate.propTypes = {
  widgetClass: PropTypes.string,
  date: PropTypes.string,
  detail: PropTypes.string,
  color: PropTypes.string
};
