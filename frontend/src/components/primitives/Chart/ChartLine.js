// See:
// https://github.com/highcharts/highcharts-react
// https://stackblitz.com/edit/react-nwseym?file=index.js

import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const ChartLine = () => {
  const [hoverData, setHoverData] = useState(null);
  const chartOptions = {
    xAxis: {
      categories: ['A', 'B', 'C'],
    },
    series: [{ data: [1, 2, 3] }],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              setHoverData(e.target.category);
            },
          },
        },
      },
    },
  };

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg mb-2">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
      <h3>Hovering over {hoverData}</h3>
    </>
  );
};

export default ChartLine;
