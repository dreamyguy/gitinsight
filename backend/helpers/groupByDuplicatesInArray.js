// Count duplicate keys within an array
// ------------------------------------------------------------
module.exports = function(array) {
  if(array.length === 0) {
    return null;
  }
  var counts = {};
  array.forEach(function(x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  return counts;
};
