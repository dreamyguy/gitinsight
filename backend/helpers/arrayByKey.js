// Create array based on key value
// ------------------------------------------------------------
module.exports = function(data, key) {
  var arr = [];
  for (var i in data) {
    if (data[i][key] === undefined) {
      data[i][key] = '0';
    }
    arr.push(data[i][key]);
  }
  return arr;
};
// var arrayImpact = arrayByKey(data, 'impact');
