// Calculate number of days between two dates
// ------------------------------------------------------------
module.exports = function(timeStampA, timeStampB) {
  var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  var firstDate = new Date(timeStampA * 1000);
  var secondDate = new Date(timeStampB * 1000);
  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  return diffDays;
};
