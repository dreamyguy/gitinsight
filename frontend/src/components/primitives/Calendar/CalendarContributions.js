/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { withContentRect } from 'react-measure';
import { isNotEmptyArray } from './../../../utils/isEmptyUtil';
import { arrayMaxMin } from './../../../utils/arrayMaxMinUtil';
import './CalendarContributions.css';

const CalendarContributions = ({
  weekNames = [],
  monthNames = [],
  baseColor = 'rgba(235, 237, 240, 0.10)', // Based on '#ebedf0' (GH's original), but converted to 'rgba' at 10%
  panelColors = [],
  theme = 'default',
  values = {},
  until = '',
  dateFormat = '',
}) => {
  const [columns, setColumns] = useState(53);
  const [randomTheme, setRandomTheme] = useState('green');
  const [maxWidth] = useState(112);
  // Structural vars
  const monthLabelHeight = 15;
  const weekLabelWidth = 15;
  const panelSize = 11;
  const panelMargin = 2;
  // Themes
  const themeGreen = ['#9be9a8', '#40c463', '#30a14e', '#216e39']; // default
  const themeGray = ['#959da5', '#586069', '#2f363d', '#24292e'];
  const themePink = ['#f9b3dd', '#ec6cb9', '#ea4aaa', '#99306f'];
  const themePurple = ['#d1bcf9', '#8a63d2', '#5a32a3', '#3a1d6e'];
  const themeBlue = ['#79b8ff', '#0366d6', '#044289', '#032f62'];
  const themeYellow = ['#fff5b1', '#ffdf5d', '#f9c513', '#b08800'];
  const themeOrange = ['#ffd1ac', '#ffab70', '#fb8532', '#c24e00'];
  const themeRed = ['#fdaeb7', '#ea4a5a', '#b31d28', '#86181d'];
  const themeHalloween = ['#ffee4a', '#ffc501', '#fe9600', '#03001c'];
  // 4 random colors are selected from the array below, at runtime
  const themePride = ['#f00000', '#ff8000', '#ffff00', '#007940', '#4040ff', '#a000c0'];
  // Array of randomizable themes
  const themes = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

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

  const resolveTheme = th => {
    let output = themeGreen; // default (green)
    if (th === 'default' || th === 'green') {
      return output; // syntax sugar
    }
    if (th === 'gray') {
      output = themeGray;
    }
    if (th === 'pink') {
      output = themePink;
    }
    if (th === 'purple') {
      output = themePurple;
    }
    if (th === 'blue') {
      output = themeBlue;
    }
    if (th === 'yellow') {
      output = themeYellow;
    }
    if (th === 'orange') {
      output = themeOrange;
    }
    if (th === 'red') {
      output = themeRed;
    }
    if (th === 'halloween') {
      output = themeHalloween;
    }
    if (th === 'confetti') {
      const themeRandom = [
        themeGreen,
        themeGray,
        themePink,
        themePurple,
        themeBlue,
        themeYellow,
        themeOrange,
        themeRed,
        themeHalloween,
      ];
      output = themeRandom[Math.floor(Math.random() * themeRandom.length)];
    }
    if (th === 'pride') {
      output = [
        themePride[Math.floor(Math.random() * themePride.length)],
        themePride[Math.floor(Math.random() * themePride.length)],
        themePride[Math.floor(Math.random() * themePride.length)],
        themePride[Math.floor(Math.random() * themePride.length)],
      ];
    }
    return output;
  };

  const resolveColor = level => {
    let color = baseColor;
    const arrayOfValues = Object.values(values);
    const maxValue = arrayMaxMin(arrayOfValues, 'max');
    // * Only support 4 levels of colors, as on GitHub
    // We divide by 16 insted of 4 because peak days create noise that tend
    //  to flatten out the color distribution
    const gap = maxValue / 16;
    if (level > 0 && level < gap) {
      color =
        panelColors && isNotEmptyArray(panelColors)
          ? panelColors[0]
          : theme === 'random'
          ? resolveTheme(randomTheme)[0]
          : resolveTheme(theme)[0];
    }
    if (level >= gap && level < gap * 2) {
      color =
        panelColors && isNotEmptyArray(panelColors)
          ? panelColors[1]
          : theme === 'random'
          ? resolveTheme(randomTheme)[1]
          : resolveTheme(theme)[1];
    }
    if (level >= gap * 2 && level < gap * 3) {
      color =
        panelColors && isNotEmptyArray(panelColors)
          ? panelColors[2]
          : theme === 'random'
          ? resolveTheme(randomTheme)[2]
          : resolveTheme(theme)[2];
    }
    if (level >= gap * 3) {
      color =
        panelColors && isNotEmptyArray(panelColors)
          ? panelColors[3]
          : theme === 'random'
          ? resolveTheme(randomTheme)[3]
          : resolveTheme(theme)[3];
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

  // Upon page load, select a random theme if the theme param equals 'random'
  useEffect(() => {
    if (theme === 'random') {
      setRandomTheme(themes[Math.floor(Math.random() * themes.length)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

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
  panelColors: [],
  dateFormat: 'YYYY-MM-DD',
};

CalendarContributions.propTypes = {
  weekNames: PropTypes.array,
  monthNames: PropTypes.array,
  panelColors: PropTypes.array,
  dateFormat: PropTypes.string,
  theme: PropTypes.oneOf([
    'blue',
    'confetti',
    'default',
    'gray',
    'green',
    'halloween',
    'orange',
    'pink',
    'pride',
    'purple',
    'red',
    'random',
    'yellow',
  ]),
};

export default CalendarContributions;
