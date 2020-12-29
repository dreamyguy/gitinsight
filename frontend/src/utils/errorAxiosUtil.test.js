import { mergeErrors } from './errorAxiosUtil';
import {
  errorNew,
  errorsArraySrcAppended,
  errorsArraySrcComplete,
  errorsArraySrcNoYears,
} from './errorAxiosUtil.mock';

describe('mergeErrors', () => {
  it(`don't merge error when it's already present in the 'errors' array`, () => {
    const testInput = mergeErrors({
      error: errorNew,
      errorArray: errorsArraySrcComplete,
    });
    const testOutput = errorsArraySrcComplete;
    expect(testInput).toEqual(testOutput);
  });
  it(`merge error when it's not yet present in the 'errors' array`, () => {
    const testInput = mergeErrors({
      error: errorNew,
      errorArray: errorsArraySrcNoYears,
    });
    const testOutput = errorsArraySrcAppended;
    expect(testInput).toEqual(testOutput);
  });
  it(`error is not an object, it's a string`, () => {
    const testInput = mergeErrors({
      error: 'Request failed with status code 404',
      errorArray: errorsArraySrcNoYears,
    });
    const testOutput = [
      {
        message: 'Request failed with status code 404',
        name: 'Error',
        stack:
          'Error: Request failed with status code 404\n    at createError (http://localhost:3000/static/js/5.chunk.js:96673:15)\n    at settle (http://localhost:3000/static/js/5.chunk.js:96907:12)\n    at XMLHttpRequest.handleLoad (http://localhost:3000/static/js/5.chunk.js:96150:7)',
        config: {
          url: 'https://uat.nbim.no/api/investments/data.json?year=2019',
          method: 'get',
          headers: { Accept: 'application/json, text/plain, */*' },
          transformRequest: [null],
          transformResponse: [null],
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          maxBodyLength: -1,
        },
      },
      {
        message: 'Request failed with status code 404',
        name: 'Error',
        stack:
          'Error: Request failed with status code 404\n    at createError (http://localhost:3000/static/js/5.chunk.js:96673:15)\n    at settle (http://localhost:3000/static/js/5.chunk.js:96907:12)\n    at XMLHttpRequest.handleLoad (http://localhost:3000/static/js/5.chunk.js:96150:7)',
        config: {
          url: 'https://uat.nbim.no/api/investments/history.json?year=2019',
          method: 'get',
          headers: { Accept: 'application/json, text/plain, */*' },
          transformRequest: [null],
          transformResponse: [null],
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          maxBodyLength: -1,
        },
      },
      {
        config: {
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
          maxBodyLength: -1,
          maxContentLength: -1,
          method: 'get',
          timeout: 0,
          transformRequest: [null],
          transformResponse: [null],
          url: 'https://uat.nbim.no/api/investments/years?language=no',
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
        },
        message: 'Request failed with status code 404',
        name: 'Error',
        stack:
          'Error: Request failed with status code 404\n    at createError (http://localhost:3000/static/js/5.chunk.js:96673:15)\n    at settle (http://localhost:3000/static/js/5.chunk.js:96907:12)\n    at XMLHttpRequest.handleLoad (http://localhost:3000/static/js/5.chunk.js:96150:7)',
      },
      { error: 'Request failed with status code 404' },
    ];
    expect(testInput).toEqual(testOutput);
  });
});
