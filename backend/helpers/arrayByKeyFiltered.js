// Create array based on key value filtered by a value
// ------------------------------------------------------------
module.exports = function(data, key, value) {
  var arr = [];
  for (var i in data) {
    if (data[i][key] == value) {
      arr.push(data[i][key]);
    }
  }
  return arr;
};
// var arrayImpactFiltered = arrayByKeyFiltered(data, 'impact', '0');
