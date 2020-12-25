import sortObjByOnlyKey from "./sortObjByOnlyKey";

// Return object of date with impact according to passed time unit
// ------------------------------------------------------------
function impactBy(data, timeUnit, testTempOutput) {
  const arrayWithDuplicateDays = [];
  let objFinal = {};
  for (const i in data) {
    if (data[i]["impact"] === undefined) {
      data[i]["impact"] = "0";
    }
    arrayWithDuplicateDays.push({
      [data[i][timeUnit]]: data[i]["impact"],
    });
  }
  arrayWithDuplicateDays.forEach((item) => {
    const theDay = Object.keys(item)[0];
    let changedItem = {};
    if (!objFinal.hasOwnProperty(theDay)) {
      // If the key is not found in the object, add the item to the final object without changes
      objFinal = {
        ...objFinal,
        ...item,
      };
    } else {
      // If the key is found in the object, add the item to the final object with changes
      Object.keys(objFinal).forEach((key) => {
        if (key === theDay) {
          changedItem = {
            [key]: objFinal[key] + Object.values(item)[0],
          };
          objFinal = {
            ...objFinal,
            ...changedItem,
          };
        }
      });
    }
  });
  // Sort final object
  objFinal = sortObjByOnlyKey(objFinal);
  return testTempOutput ? arrayWithDuplicateDays : objFinal;
}

export default impactBy;

// Usage (also see tests):
// impactBy(commits, "date_iso_8601", true);
