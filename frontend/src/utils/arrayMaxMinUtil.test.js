/* eslint-disable */
import { arrayMaxMin } from './arrayMaxMinUtil';

const arr = [1, 6, 234234, 23];
const arrOfObjs = {
  '2010-03-22': 42,
  '2010-03-23': 43,
  '2010-03-24': 422,
  '2010-03-27': 242,
};

describe('arrayMaxMin', () => {
  it(`should return correct value (234234) when passing 'max' as type`, () => {
    const testInput = arrayMaxMin(arr, 'max');
    const testOutput = 234234;
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct value (422) when passing 'max' as type`, () => {
    const testInput = arrayMaxMin(Object.values(arrOfObjs), 'max');
    const testOutput = 422;
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct value (1) when passing 'min' as type`, () => {
    const testInput = arrayMaxMin(arr, 'min');
    const testOutput = 1;
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct value (42) when passing 'min' as type`, () => {
    const testInput = arrayMaxMin(Object.values(arrOfObjs), 'min');
    const testOutput = 42;
    expect(testInput).toEqual(testOutput);
  });
});
