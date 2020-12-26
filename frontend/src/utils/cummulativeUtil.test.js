import { cummulative } from './cummulativeUtil';
import { cummulativeOutput } from './cummulativeUtil.mock';
import { addEmptyDaysOutput } from './getDateUtil.mock';

describe('cummulative', () => {
  it(`should return object with object values added to themselves`, () => {
    const testInput = cummulative(addEmptyDaysOutput);
    const testOutput = cummulativeOutput;
    expect(testInput).toEqual(testOutput);
  });
});
