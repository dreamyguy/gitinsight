import sortObjByOnlyKey from "./sortObjByOnlyKey";

describe("sortObjByOnlyKey", () => {
  it(`should return expected date from '1382432573' + 'en-US'`, () => {
    const input = { "2019-09-25": 811, "2016-08-01": 953, "2016-08-02": 344 };
    const output = { "2016-08-01": 953, "2016-08-02": 344, "2019-09-25": 811 };
    const testInput = sortObjByOnlyKey(input);
    const testOutput = output;
    expect(testInput).toEqual(testOutput);
  });
});
