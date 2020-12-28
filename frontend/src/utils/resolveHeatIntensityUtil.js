import { stalenessStatus } from './stalenessStatusUtil';
import { isNotEmptyArray } from './isEmptyUtil';

// Set staleness output based on 'staleness' value
// ------------------------------------------------------------
export const resolveHeatIntensity = ({ list }) => {
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
