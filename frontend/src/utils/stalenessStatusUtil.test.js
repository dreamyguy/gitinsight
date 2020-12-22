import { stalenessStatus } from './stalenessStatusUtil';

describe('stalenessStatus', () => {
  it(`should return correct color 'bg-red-600'`, () => {
    const testInput = stalenessStatus(3.095890410958904);
    const testOutput = 'bg-red-600';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-500'`, () => {
    const testInput = stalenessStatus(0.6712328767123288);
    const testOutput = 'bg-lime-500';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-orange-500'`, () => {
    const testInput = stalenessStatus(2.4821917808219176);
    const testOutput = 'bg-orange-500';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-orange-500'`, () => {
    const testInput = stalenessStatus(2.3095890410958906);
    const testOutput = 'bg-orange-500';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-400'`, () => {
    const testInput = stalenessStatus(0.04657534246575343);
    const testOutput = 'bg-lime-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-red-700'`, () => {
    const testInput = stalenessStatus(3.252054794520548);
    const testOutput = 'bg-red-700';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-400'`, () => {
    const testInput = stalenessStatus(0.3561643835616438);
    const testOutput = 'bg-lime-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-400'`, () => {
    const testInput = stalenessStatus(0.0547945205479452);
    const testOutput = 'bg-lime-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-red-600'`, () => {
    const testInput = stalenessStatus(3.0794520547945203);
    const testOutput = 'bg-red-600';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-400'`, () => {
    const testInput = stalenessStatus(0.03561643835616438);
    const testOutput = 'bg-lime-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-amber-400'`, () => {
    const testInput = stalenessStatus(1.3506849315068492);
    const testOutput = 'bg-amber-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-red-600'`, () => {
    const testInput = stalenessStatus(3.0602739726027397);
    const testOutput = 'bg-red-600';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-red-800'`, () => {
    const testInput = stalenessStatus(3.7534246575342465);
    const testOutput = 'bg-red-800';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-red-700'`, () => {
    const testInput = stalenessStatus(3.5287671232876714);
    const testOutput = 'bg-red-700';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-400'`, () => {
    const testInput = stalenessStatus(0.03561643835616438);
    const testOutput = 'bg-lime-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-400'`, () => {
    const testInput = stalenessStatus(0.10684931506849316);
    const testOutput = 'bg-lime-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-amber-400'`, () => {
    const testInput = stalenessStatus(1.1972602739726028);
    const testOutput = 'bg-amber-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-gray-900'`, () => {
    const testInput = stalenessStatus(5.227397260273973);
    const testOutput = 'bg-gray-900';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-amber-500'`, () => {
    const testInput = stalenessStatus(1.7835616438356163);
    const testOutput = 'bg-amber-500';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-lime-400'`, () => {
    const testInput = stalenessStatus(0.04657534246575343);
    const testOutput = 'bg-lime-400';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-gray-900'`, () => {
    const testInput = stalenessStatus(4.917808219178082);
    const testOutput = 'bg-gray-900';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-orange-500'`, () => {
    const testInput = stalenessStatus(2.4575342465753423);
    const testOutput = 'bg-orange-500';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return correct color 'bg-amber-400'`, () => {
    const testInput = stalenessStatus(1.2);
    const testOutput = 'bg-amber-400';
    expect(testInput).toEqual(testOutput);
  });
});
