import { resolveHeatIntensity } from './resolveHeatIntensityUtil';
import {
  resolveHeatIntensityList,
  resolveHeatIntensityResponse,
} from './resolveHeatIntensityUtil.mock';

describe('resolveHeatIntensity', () => {
  it(`return expected object`, () => {
    const testInput = resolveHeatIntensity({ list: resolveHeatIntensityList });
    const testOutput = resolveHeatIntensityResponse;
    expect(testInput).toEqual(testOutput);
  });
});
