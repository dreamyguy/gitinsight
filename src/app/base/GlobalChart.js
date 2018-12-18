import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';

export class GlobalChart extends Component {
  dynaClass() {
    return this.props.chartClass + ' font-opensans-light';
  }
  labelInterpolation(value, index) {
    return index % 2 === 0 ? value : null;
  }
  render() {
    const data = {
      labels: this.props.arrayLabels,
      series: [
        this.props.arraySeries
      ]
    };
    const options = {
      height: this.props.height,
      high: this.props.high,
      low: this.props.low,
      showArea: true,
      showLine: true,
      showPoint: false,
      fullWidth: true,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 20
      },
      axisX: {
        showLabel: this.props.axisXShowLabel,
        showGrid: this.props.axisXShowGrid
      }
    };
    const type = this.props.chartType;
    return (
      <div className={this.dynaClass()} style={{borderLeftColor: this.props.color}}>
        <h3 className="heading-four centered">{this.props.title}</h3>
        <p className="detail gutter-bottom">{this.props.detail}</p>
        <ChartistGraph data={data} options={options} type={type}/>
      </div>
    );
  }
}

GlobalChart.defaultProps = {
  chartType: 'Line',
  chartClass: 'global-chart',
  title: 'Title is undefined',
  detail: 'Detail is undefined',
  color: 'red',
  // chartColor: 'deepPink',
  arrayLabels: ['a', 'b', 'c'],
  arraySeries: [1, 2, 3],
  height: '300px',
  high: 900000,
  low: 0,
  axisXShowLabel: true,
  axisXShowGrid: true
};

GlobalChart.propTypes = {
  chartType: PropTypes.string,
  chartClass: PropTypes.string,
  title: PropTypes.string,
  detail: PropTypes.string,
  color: PropTypes.string,
  // chartColor: PropTypes.string,
  arrayLabels: PropTypes.array,
  arraySeries: PropTypes.array,
  height: PropTypes.string,
  high: PropTypes.number,
  low: PropTypes.number,
  axisXShowLabel: PropTypes.bool,
  axisXShowGrid: PropTypes.bool
};
