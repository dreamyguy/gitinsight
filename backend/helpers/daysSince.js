// Calculate number of days since one date
// ------------------------------------------------------------
module.exports = function(timeStamp) {
  var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  var sinceDate = new Date(timeStamp * 1000);
  var now = Date.now();
  var diffDays = Math.round(Math.abs((sinceDate.getTime() - now) / (oneDay)));
  return diffDays;
};
