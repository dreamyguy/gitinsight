/* eslint-disable */
import { getDate } from './getDateUtil';

describe('getDate', () => {
  it(`should return expected date from '1382432573' + 'en-US'`, () => {
    const testInput = getDate('1382432573', 'en-US');
    const testOutput = 'Tuesday, October 22, 2013';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected date from '1382432573'`, () => {
    const testInput = getDate('1382432573');
    const testOutput = 'Tuesday, October 22, 2013';
    expect(testInput).toEqual(testOutput);
  });
});

// Other examples (not included as tests because Travis doesn't support all these locales):
// getDate('1382432573', 'pt-BR'); // terça-feira, 22 de outubro de 2013
// getDate('1382432573', 'no-NB'); // tirsdag 22. oktober 2013
// getDate('1382432573', 'sr-RS'); // уторак, 22. октобар 2013.
