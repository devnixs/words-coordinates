import { convertToString, truncate, convertToLatLng, padWithZeros } from '../src/converter.js';
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

  it('should convert latitudes and longitudes to string', () => {
    const result = convertToString(carnoux.lat, carnoux.lng);
    expect(result).to.equal('04325890055654');
  });

  it('should convert strings to lat and lng', () => {
    const {lat, lng} = convertToLatLng('04325890055654');
    expect(lat).to.equal(43.2589);
    expect(lng).to.equal(5.5654);
  });


  it('should shuffle', () => {
    const result = convertToLatLng('04325890055654');
    
  });
});