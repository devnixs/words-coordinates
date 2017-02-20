import {
    getNumberOfSquareAtLatitude,
    getAccumulatorAtStep
} from '../src/converter.v2.js';
import {expect} from 'chai';

const carnoux1 = {
    lat: 43.258996,
    lng: 5.565438
}

const carnoux2 = {
    lat: 43.258783,
    lng: 5.564971
}

describe('Converter', () => {
    it('should be able to find the number of squares at a latitude', () => {
        const result = getNumberOfSquareAtLatitude(carnoux1.lat);
        expect(result).to.equal(9717503);
    });

    it('should be the same at an opposite latitude', () => {
        const result1 = getNumberOfSquareAtLatitude(-1 * carnoux1.lat);
        const result2 = getNumberOfSquareAtLatitude(carnoux1.lat);
        expect(result1).to.equal(result2);
    });

    it('should get the current accumulation at a precise step', () => {
        const result1 = getAccumulatorAtStep(123456);
        expect(result1).to.equal(47895802397);
    });


});