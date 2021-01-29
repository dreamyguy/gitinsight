import sortArrayByKey from "./sortArrayByKey";

// Get author stats and output it on a dedicated array, with options
// ------------------------------------------------------------
export const commitsSorted = ({ data, sortBy, sortDirection, count }) => {
  let output = null;
  if (sortBy && sortDirection) {
    output = sortArrayByKey(data, sortBy, sortDirection);
  } else if (sortBy && !sortDirection) {
    output = sortArrayByKey(data, sortBy);
  } else {
    output = data;
  }
  if (count) {
    output = output.slice(0, count);
  }
  return output;
};
