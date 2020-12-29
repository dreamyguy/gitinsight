/* jshint esversion: 6 */

// Get max/min number in array: max | min
// ------------------------------------------------------------
module.exports = function(arr, type) {
  var n;
  if (type == 'max') {
    n = Math.max(...arr);
  } else if (type == 'min') {
    n = Math.min(...arr);
  }
  return n;
};
