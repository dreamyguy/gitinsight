// See:
// https://github.com/highcharts/highcharts-react
// https://stackblitz.com/edit/react-nwseym?file=index.js

import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { isNotEmptyArray } from './../../../utils/isEmptyUtil';

const sharedChartOptions = {
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
  global: {
    useUTC: true,
  },
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: `'Ubuntu', sans-serif`,
      fontStyle: 'normal',
      fontWeight: '300',
    },
    spacingRight: 0,
    spacingBottom: 0,
    spacingLeft: 0,
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
    },
  },
  credits: {
    enabled: false,
  },
  title: {
    text: null,
  },
  navigator: {
    enabled: false,
    allButtonsEnabled: false,
  },
  legend: {
    enabled: false,
    layout: 'horizontal',
    verticalAlign: 'bottom',
    borderWidth: 0,
    floating: false,
    align: 'left',
    margin: 40,
    itemMarginBottom: 10,
    padding: 0,
    itemStyle: {
      color: '#000000',
      textDecoration: 'none',
    },
  },
};
const sharedYAxis = [
  {
    title: {
      text: '',
    },
    gridLineWidth: 1,
    lineWidth: 1,
  },
  {
    title: {
      text: '',
    },
    gridLineWidth: 1,
    lineWidth: 1,
    linkedTo: 0,
    opposite: true,
    visible: true,
  },
];
const sharedChartPropsArea = {
  chart: {
    type: 'area',
  },
  plotOptions: {
    column: {},
    line: {
      marker: {
        enabled: false,
      },
    },
  },
};
const sharedChartPropsColumn = {
  chart: {
    type: 'column',
  },
  plotOptions: {
    column: {},
    line: {
      marker: {
        enabled: false,
      },
    },
  },
};
const sharedChartPropsPie = {
  chart: {
    type: 'pie',
  },
  plotOptions: {
    pie: {
      size: '75%',
      slicedOffset: 0,
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '{point.name}: {point.y}',
        style: {
          fontFamily: `'Ubuntu', sans-serif`,
          fontSize: '14px',
          fontWeight: 'normal',
        },
      },
      startAngle: -90,
      endAngle: 270,
    },
  },
};
const sharedChartPropsLine = {
  chart: {
    type: 'line',
  },
  plotOptions: {
    column: {},
    line: {
      marker: {
        enabled: false,
      },
    },
  },
};
const sharedChartPropsSpline = {
  chart: {
    type: 'spline',
  },
  plotOptions: {
    column: {},
    line: {
      marker: {
        enabled: false,
      },
    },
  },
};

const Chart = ({ categories, data, title, type }) => {
  // Set shared 'props' for each chart type
  let sharedChartProps = null;
  switch (type) {
    case 'area':
      sharedChartProps = sharedChartPropsArea;
      break;
    case 'column':
      sharedChartProps = sharedChartPropsColumn;
      break;
    case 'line':
      sharedChartProps = sharedChartPropsLine;
      break;
    case 'spline':
      sharedChartProps = sharedChartPropsSpline;
      break;
    case 'pie':
      sharedChartProps = sharedChartPropsPie;
      break;
    default:
      sharedChartProps = sharedChartPropsColumn; // syntax sugar, we already get it as default when deconstructing 'props'
      console.warn(
        '[Chart] No value was passed for "type" (area, column, line, pie), so we fell back to the default "column"',
      );
  }

  const chartOptions = {
    ...sharedChartOptions,
    ...sharedChartProps,
    xAxis: {
      categories,
    },
    yAxis: sharedYAxis,
    series: [{ name: '', data }],
  };

  return (
    <>
      {categories && isNotEmptyArray(categories) && data && isNotEmptyArray(data) ? (
        <div className="mt-5">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">{title}</h2>
          <div className="bg-white overflow-hidden shadow rounded-lg mb-2 px-2 py-2">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Chart;
