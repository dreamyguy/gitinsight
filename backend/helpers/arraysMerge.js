// Merge two arrays of identical length
// ------------------------------------------------------------
module.exports = function(keys, values) {
  var obj = {};
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
};
