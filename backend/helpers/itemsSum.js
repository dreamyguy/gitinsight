// Return number of items in an object
// ------------------------------------------------------------
module.exports = function(data) {
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += 1;
  }
  return sum;
};
// var arrayTotal = itemsSum(data);
