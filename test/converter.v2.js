import {
    getNumberOfSquareAtLatitude,
    getAccumulatorAtStep,
    getSquareNumberLatitude,
    getStepLatitude,
    getSquareNumberPosition,
    getLatitudeStep
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


    it('should be able to find the number of squares at a latitude', () => {
        const result = getNumberOfSquareAtLatitude(86.667343);
        expect(result).to.equal(775692);
    });

    it('should be the same at an opposite latitude', () => {
        const result1 = getNumberOfSquareAtLatitude(-1 * carnoux1.lat);
        const result2 = getNumberOfSquareAtLatitude(carnoux1.lat);
        expect(result1).to.equal(result2);
    });

    it('should get the current accumulation at a precise step', () => {
        const result1 = getAccumulatorAtStep(123456);
        expect(result1).to.equal(47895026705);
    });

    it('get the latitude of a step', () => {
        const result1 = getStepLatitude(123456);
        expect(result1).to.equal(86.667343);
    });
    it('get the step from a latitude', () => {
        const result1 = getLatitudeStep(86.667343);
        expect(result1).to.equal(123456);
    });

    it('get the latitude of a square number', () => {
        const result1 = getSquareNumberLatitude(47895026705);
        expect(result1).to.equal(86.667343);
    });

    it('get the longitude of a square number', () => {
        const {lat, lng} = getSquareNumberPosition(47895026805);
        expect(lat).to.equal(86.667343);
        expect(lng).to.equal(0.04641);
    });

    it('get the longitude of a square number', () => {
        const {lat, lng} = getSquareNumberPosition(47895026705);
        expect(lat).to.equal(86.667343);
        expect(lng).to.equal(0);
    });

    it('get the longitude of a square number with a negative lng', () => {
        const {lat, lng} = getSquareNumberPosition(47895802297);
        expect(lat).to.equal(86.667343);
        expect(lng).to.equal(-0.04641);
    });
});
