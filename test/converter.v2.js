import {
  
} from '../src/converter.v2.js';
import { expect } from 'chai';

const carnoux1 = {
  lat: 43.258996,
  lng: 5.565438
}

const carnoux2 = {
  lat: 43.258783,
  lng: 5.564971
}

describe('Converter', () => {
  it('should convert to integers', () => {
    const result = convertToInteger(carnoux1.lat);
    expect(result).to.equal(432590);
  });

});