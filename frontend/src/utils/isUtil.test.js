/* eslint-disable */
import { isObject, isArray } from './isUtil';

describe('isUtil', () => {
  describe('isObject', () => {
    it('should return true if object is empty', () => {
      const testObject = {};
      expect(isObject(testObject)).toEqual(true);
    });
    it('should return true if object is not empty', () => {
      const testObject = {
        user: 'Getting tested',
      };
      expect(isObject(testObject)).toEqual(true);
    });
    it('should return false if what is passed to the util is a non-empty array of objects', () => {
      const testObject = [
        {
          keya: 'lol',
          keyb: 'foo',
        },
        {
          keya: 'yup',
          keyb: 'nay',
        },
      ];
      expect(isObject(testObject)).toEqual(false);
    });
    it('should return false if what is passed to the util is null', () => {
      const testObject = null;
      expect(isObject(testObject)).toEqual(false);
    });
    it('should return false if what is passed to the util is a string', () => {
      const testObject = 'lol';
      expect(isObject(testObject)).toEqual(false);
    });
  });
  describe('isArray', () => {
    it('should return true if array is empty', () => {
      const testArray = [];
      expect(isArray(testArray)).toEqual(true);
    });
    it('should return true if array is not empty', () => {
      const testArray = ['Getting tested'];
      expect(isArray(testArray)).toEqual(true);
    });
    it('should return true if what is passed to the util is an array of objects', () => {
      const testArray = [
        {
          keya: 'lol',
          keyb: 'foo',
        },
        {
          keya: 'yup',
          keyb: 'nay',
        },
      ];
      expect(isArray(testArray)).toEqual(true);
    });
    it('should return false if what is passed to the util is null', () => {
      const testArray = null;
      expect(isArray(testArray)).toEqual(false);
    });
    it('should return false if what is passed to the util is a string', () => {
      const testArray = 'lol';
      expect(isArray(testArray)).toEqual(false);
    });
    it('should return false if what is passed to the util is an empty object', () => {
      const testArray = {};
      expect(isArray(testArray)).toEqual(false);
    });
    it('should return false if what is passed to the util is an non-empty object', () => {
      const testArray = {
        key: 'value',
      };
      expect(isArray(testArray)).toEqual(false);
    });
  });
});
