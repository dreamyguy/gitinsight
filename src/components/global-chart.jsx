import React from 'react'
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';

export default class GlobalChart extends React.Component {
    static propTypes = {
        chartType: React.PropTypes.string,
        chartClass: React.PropTypes.string,
        title: React.PropTypes.string,
        detail: React.PropTypes.string,
        color: React.PropTypes.string,
        chartColor: React.PropTypes.string,
        arrayLabels: React.PropTypes.array,
        arraySeries: React.PropTypes.array,
        height: React.PropTypes.string
    };
    static defaultProps = {
        chartType: 'Line',
        chartClass: 'global-chart',
        title: 'Title is undefined',
        detail: 'Detail is undefined',
        color: 'red',
        chartColor: 'deepPink',
        arrayLabels: ['a', 'b', 'c'],
        arraySeries: [1, 2, 3],
        height: '300px',
        high: 900000,
        low: 0,
        axisXShowLabel: true,
        axisXShowGrid: true
    };
    dynaClass() {
        return this.props.chartClass + ' open-sans-light'
    }
    labelInterpolation(value, index) {
        return index % 2 === 0 ? value : null;
    }
    render() {
        let data = {
            labels: this.props.arrayLabels,
            series: [
                this.props.arraySeries
            ]
        };
        let options = {
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
        let type = this.props.chartType
        return (
            <div className={this.dynaClass()} style={{ borderLeftColor: this.props.color }}>
                <h3 className='heading-four centered'>{this.props.title}</h3>
                <p className='detail gutter-bottom'>{this.props.detail}</p>
                <ChartistGraph data={data} options={options} type={type} />
            </div>
        )
    }
}
