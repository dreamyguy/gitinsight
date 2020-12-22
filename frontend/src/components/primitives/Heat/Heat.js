import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import { stalenessStatus } from './../../../utils/stalenessStatusUtil';
import { isNotEmptyArray } from './../../../utils/isEmptyUtil';

const resolveHeatIntensity = ({ list }) => {
  const output = [];
  const listTemp = [];
  if (list && isNotEmptyArray(list)) {
    list.map(l => {
      const { staleness } = l;
      listTemp.push(stalenessStatus(staleness, 'staleness'));
      return null;
    });
    const totalItems = listTemp.length;
    const uniqueItems = [...new Set(listTemp)];
    uniqueItems.forEach(ui => {
      const numItems = listTemp.filter(f => f === ui);
      output.push({
        bgColor: stalenessStatus(ui, 'color'),
        legend: ui.toFixed(1),
        percentage: (numItems.length * 100) / totalItems,
      });
    });
  }
  return output;
};

const HeatIntensity = ({ list }) => {
  const output = [];
  const theList = resolveHeatIntensity({ list });
  if (theList && isNotEmptyArray(theList)) {
    theList.map(l => {
      const { bgColor, percentage } = l;
      output.push(
        <div
          key={uuidv4()}
          style={{ width: `${percentage}%` }}
          className={classnames(
            'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center',
            bgColor || '',
          )}
        />,
      );
      return null;
    });
  }
  return output;
};

const HeatIntensityLegend = ({ list }) => {
  const output = [];
  const theList = resolveHeatIntensity({ list });
  if (theList && isNotEmptyArray(theList)) {
    theList.map((l, i) => {
      const { bgColor, legend } = l;
      output.push(
        <div className="flex items-center mr-2">
          <span
            className={classnames(
              'flex-shrink-0 h-3 w-3 rounded-full ring-2 ring-white mr-1',
              bgColor || '',
            )}
          />
          <span className="text-gray-400">
            {i === 0 ? '< ' : '> '} {legend}
          </span>
        </div>,
      );
      return null;
    });
  }
  return (
    <div className="hidden xl:flex xl:items-center xl:justify-end text-gray-400">
      {output} (years)
    </div>
  );
};

const Heat = ({ statuses }) => (
  <div className="text-xs mt-5">
    <HeatIntensityLegend list={statuses} />
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
        <HeatIntensity list={statuses} />
      </div>
    </div>
  </div>
);

export default Heat;
