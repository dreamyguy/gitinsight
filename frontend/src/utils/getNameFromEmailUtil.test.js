/* eslint-disable */
import { getNameFromEmail } from './getNameFromEmailUtil';

describe('getDate', () => {
  it(`should return expected name from email: 'knut@netliferesearch.com'`, () => {
    const testInput = getNameFromEmail('knut@netliferesearch.com');
    const testOutput = 'Knut';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'thomas@netliferesearch.com'`, () => {
    const testInput = getNameFromEmail('thomas@netliferesearch.com');
    const testOutput = 'Thomas';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'nils@thunki.com'`, () => {
    const testInput = getNameFromEmail('nils@thunki.com');
    const testOutput = 'Nils';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'jorgen.blindheim@gmail.com'`, () => {
    const testInput = getNameFromEmail('jorgen.blindheim@gmail.com');
    const testOutput = 'Jorgen Blindheim';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'andreas-naustdal@netlife.com'`, () => {
    const testInput = getNameFromEmail('andreas-naustdal@netlife.com');
    const testOutput = 'Andreas Naustdal';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'fredrik@netliferesearch.com'`, () => {
    const testInput = getNameFromEmail('fredrik@netliferesearch.com');
    const testOutput = 'Fredrik';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'kristoffer@brabrand.no'`, () => {
    const testInput = getNameFromEmail('kristoffer@brabrand.no');
    const testOutput = 'Kristoffer';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'haakon.borch@netlife.com'`, () => {
    const testInput = getNameFromEmail('haakon.borch@netlife.com');
    const testOutput = 'Haakon Borch';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'robin@netliferesearch.com'`, () => {
    const testInput = getNameFromEmail('robin@netliferesearch.com');
    const testOutput = 'Robin';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'adne.forslund@gmail.com'`, () => {
    const testInput = getNameFromEmail('adne.forslund@gmail.com');
    const testOutput = 'Adne Forslund';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'audun@netliferesearch.com'`, () => {
    const testInput = getNameFromEmail('audun@netliferesearch.com');
    const testOutput = 'Audun';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'marius.hauken@gmail.com'`, () => {
    const testInput = getNameFromEmail('marius.hauken@gmail.com');
    const testOutput = 'Marius Hauken';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'raymond.julin@gmail.com'`, () => {
    const testInput = getNameFromEmail('raymond.julin@gmail.com');
    const testOutput = 'Raymond Julin';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'joakim@netliferesearch.com'`, () => {
    const testInput = getNameFromEmail('joakim@netliferesearch.com');
    const testOutput = 'Joakim';
    expect(testInput).toEqual(testOutput);
  });
  it(`should return expected name from email: 'i@dreamyguy.com'`, () => {
    const testInput = getNameFromEmail('i@dreamyguy.com');
    const testOutput = 'I';
    expect(testInput).toEqual(testOutput);
  });
});
