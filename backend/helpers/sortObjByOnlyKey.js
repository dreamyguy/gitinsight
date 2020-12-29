// Sort object by key (asc)
// ------------------------------------------------------------
function sortObjByOnlyKey(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, cur) => {
      acc[cur] = obj[cur];
      return acc;
    }, {});
}

export default sortObjByOnlyKey;
// const sortDailyImpactByDate = sortObjByOnlyKey(data);
