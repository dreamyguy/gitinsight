import sortObjByOnlyKey from "./sortObjByOnlyKey";

// Count duplicate keys within an array
// ------------------------------------------------------------
const groupByDuplicatesInArray = array => {
  if(array.length === 0) {
    return null;
  }
  var counts = {};
  array.forEach(function(x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  return sortObjByOnlyKey(counts);
};

export default groupByDuplicatesInArray;
