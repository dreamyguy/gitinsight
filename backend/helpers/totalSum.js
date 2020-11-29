// Return number that results from adding a key to itself
// ------------------------------------------------------------
module.exports = function(data) {
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += parseInt(data[i]);
    //console.log(sum);
  }
  return sum;
};
// var arrayImpactTotal = totalSum(arrayByKey(data, 'impact'));
