/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { withContentRect } from 'react-measure';
import './CalendarContributions.css';

const CalendarContributions = ({
  weekNames = [],
  monthNames = [],
  panelColors = [],
  values = {},
  until = '',
  dateFormat = '',
}) => {
  const [columns, setColumns] = useState(53);
  const [maxWidth] = useState(106);
  const monthLabelHeight = 15;
  const weekLabelWidth = 15;
  const panelSize = 11;
  const panelMargin = 2;

  const handleUpdateSize = size => {
    if (!size) return;
    const visibleWeeks = Math.floor((size.width - weekLabelWidth) / 13);
    setColumns(Math.min(visibleWeeks, maxWidth));
  };

  const getPanelPosition = (row, col) => {
    const bounds = panelSize + panelMargin;
    return {
      x: weekLabelWidth + bounds * row,
      y: monthLabelHeight + bounds * col,
    };
  };

  const resolveColor = level => {
    let color = panelColors[0];
    if (level > 0 && level < 10) {
      color = panelColors[1];
    }
    if (level >= 10 && level < 30) {
      color = panelColors[2];
    }
    if (level >= 30 && level < 60) {
      color = panelColors[3];
    }
    if (level >= 60 && level < 80) {
      color = panelColors[4];
    }
    if (level >= 80 && level < 120) {
      color = panelColors[5];
    }
    if (level >= 120) {
      color = panelColors[6];
    }
    return color;
  };

  const makeCalendarData = (history, lastDay) => {
    const d = dayjs(lastDay, { format: dateFormat });
    const lastWeekend = d.endOf('week');
    const endDate = d.endOf('day');
    const result = [{}];
    for (let i = 0; i < columns; i++) {
      result[i] = [];
      for (let j = 0; j < 7; j++) {
        const date = lastWeekend.subtract((columns - i - 1) * 7 + (6 - j), 'day');
        if (date <= endDate) {
          result[i][j] = {
            value: history[date.format(dateFormat)] || 0,
            month: date.month(),
          };
        } else {
          result[i][j] = null;
        }
      }
    }
    return result;
  };

  const renderInnerDom = () => {
    const innerDom = [];
    const contributions = makeCalendarData(values, until);

    // Panels
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < 7; j++) {
        const contribution = contributions[i][j];
        // eslint-disable-next-line no-continue
        if (contribution === null) continue;
        const pos = getPanelPosition(i, j);
        const color = resolveColor(contribution.value);
        const dom = (
          <rect
            key={`panel_key_${i}_${j}`}
            className="day"
            x={pos.x}
            y={pos.y}
            width={panelSize}
            height={panelSize}
            fill={color}
          />
        );
        innerDom.push(dom);
      }
    }

    // Week texts
    for (let i = 0; i < weekNames.length; i++) {
      const textBasePos = getPanelPosition(0, i);
      const dom = (
        <text
          key={`week_key_${i}`}
          style={{
            fontSize: 9,
            alignmentBaseline: 'central',
            fill: '#AAA',
          }}
          x={textBasePos.x - panelSize / 2 - 2}
          y={textBasePos.y + panelSize / 2}
          textAnchor="middle"
        >
          {weekNames[i]}
        </text>
      );
      innerDom.push(dom);
    }

    // Month texts
    let prevMonth = -1;
    for (let i = 0; i < columns; i++) {
      const c = contributions[i][0];
      // eslint-disable-next-line no-continue
      if (c === null) continue;
      if (c.month !== prevMonth) {
        const textBasePos = getPanelPosition(i, 0);
        innerDom.push(
          <text
            key={`month_key_${i}`}
            style={{
              fontSize: 10,
              alignmentBaseline: 'central',
              fill: '#AAA',
            }}
            x={textBasePos.x + panelSize / 2}
            y={textBasePos.y - panelSize / 2 - 2}
            textAnchor="middle"
          >
            {monthNames[c.month]}
          </text>,
        );
      }
      prevMonth = c.month;
    }

    return innerDom;
  };

  const MeasureForResize = withContentRect('bounds')(({ measureRef }) => (
    <div ref={measureRef} style={{ width: '100%' }} className="calendar-graph">
      <svg
        style={{
          fontFamily: 'Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif',
          width: '100%',
        }}
        height="110"
      >
        {renderInnerDom()}
      </svg>
    </div>
  ));

  // Return final component and 'watch it' for resize
  return <MeasureForResize onResize={rect => handleUpdateSize(rect.bounds)} />;
};

CalendarContributions.defaultProps = {
  weekNames: ['', 'M', '', 'W', '', 'F', ''],
  monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  panelColors: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39', '#0b5021', '#023a14'],
  dateFormat: 'YYYY-MM-DD',
};

CalendarContributions.propTypes = {
  weekNames: PropTypes.array,
  monthNames: PropTypes.array,
  panelColors: PropTypes.array,
  dateFormat: PropTypes.string,
};

export default CalendarContributions;
