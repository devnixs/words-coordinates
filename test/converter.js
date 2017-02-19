import {
  truncate,
  padWithZeros,
  shuffle,
  unshuffle,
  split,
  unsplit,
  combineAsBinary,
  binaryFromLatitudeLongitude,
  setLatInRange,
  setLngInRange,
  unsetLatInRange,
  unsetLngInRange,
  getThreeNumbersFromLatLng,
  getLatLngFromThreeNumbers
} from '../src/converter.js';
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

  it('truncate should limit the number of decimals', () => {
    const result = truncate(carnoux1.lat);
    expect(result).to.equal(43.259);
  });

  it('should pad a number with zeros', () => {
    const result = padWithZeros(43.2589);
    expect(result).to.equal('043.2589');
  });

  it('should set a latitude between 0 and 1800000', () => {
    const result = setLatInRange(43.2589);
    expect(result).to.equal(1332589);
  });

  it('should set a longitude between 0 and 3600000', () => {
    const result = setLngInRange(5.565438);
    expect(result).to.equal(1855654);
  });

  it('should restore a latitude', () => {
    const result = unsetLatInRange(1332589);
    expect(result).to.equal(43.2589);
  });

  it('should restore a longitude', () => {
    const result = unsetLngInRange(1855654);
    expect(result).to.equal(5.5654);
  });

  it('should create a binary version of the latitude and longitude', () => {
    const result = combineAsBinary(1800000, 3600000);
    expect(result).to.equal('1101101110111010000001101101110111010000000');
  });

  it('should recreate latitudes and longitudes from binary', () => {
    const {lat, lng} = binaryFromLatitudeLongitude('1101101110111010000001101101110111010000000');
    expect(lat).to.equal(1800000);
    expect(lng).to.equal(3600000);
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

  it('should generate three numbers from lat lng', () => {
    const result = getThreeNumbersFromLatLng(carnoux1.lat, carnoux1.lng);
    expect(result).to.deep.equal([19543, 29888, 5276]);
  });

  it('should generate three different numbers from different lat lng', () => {
    const result = getThreeNumbersFromLatLng(carnoux2.lat, carnoux2.lng);
    expect(result).to.deep.equal([18519, 25792, 5276]);
  });

  it('should get lat lng back from three numbers', () => {
    const result = getLatLngFromThreeNumbers([19543, 29888, 5276]);
    expect(result).to.deep.equal({
      lat: 43.2589,
      lng: 5.5654
    });
  });

});