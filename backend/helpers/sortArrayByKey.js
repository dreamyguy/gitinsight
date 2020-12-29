// Order array by key
// ------------------------------------------------------------
module.exports = function(array, key, ascdesc) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    if (ascdesc == 'asc') {
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    } else if (ascdesc == 'desc') {
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
  });
};
// var impactDescending = sortArrayByKey(data, 'impact', 'desc');
