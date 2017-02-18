import {
  truncate,
  padWithZeros,
  shuffle,
  unshuffle,
  split,
  unsplit,
  combineAsBinary,
  binaryFromLatitudeLongitude
} from '../src/converter.js';
import { expect } from 'chai';

const carnoux = {
  lat: 43.258996,
  lng: 5.565438
}

describe('Converter', () => {

  it('truncate should limit the number of decimals', () => {
    const result = truncate(carnoux.lat);
    expect(result).to.equal(43.2589);
  });

  it('should pad a number with zeros', () => {
    const result = padWithZeros(43.2589);
    expect(result).to.equal('043.2589');
  });

  it('should create a binary version of the latitude and longitude', () => {
    const result = combineAsBinary(360, 180);
    expect(result).to.equal('1101101110111010000000110110111011101000000');
  });

  it('should recreate latitudes and longitudes from binary', () => {
    const {lat, lng} = binaryFromLatitudeLongitude('1101101110111010000000110110111011101000000');
    expect(lat).to.equal(360);
    expect(lng).to.equal(180);
  });

  it('should shuffle', () => {
    const result = shuffle('1101101110111010000000110110111011101000000');
    expect(result).to.equal('1001011101001101100001000110111011000111001');
  });

  it('should shuffle back', () => {
    const result = unshuffle('1001011101001101100001000110111011000111001');
    expect(result).to.equal('1101101110111010000000110110111011101000000');
  });

  it('should split into 3 numbers', () => {
    const results = split('1001011101001101100001000110111011000111001');
    expect(results).to.deep.equal(['100101110100110', '110000100011011', '1011000111001']);
  });

  it('should regroup 3 numbers', () => {
    const results = unsplit(['100101110100110', '110000100011011', '1011000111001']);
    expect(results).to.equal('1001011101001101100001000110111011000111001');
  });
});