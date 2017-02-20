import {
    getSquareCountAtLatitude,
    getAccumulatorAtStep,
    getLatitudeAndStepFromSquareNumber,
    getLatitudeFromStep,
    getPositionFromSquareNumber,
    getStepFromLatitude,
    getSquareNumberFromPosition
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
        const result = getSquareCountAtLatitude(carnoux1.lat);
        expect(result).to.equal(9717503);
    });


    it('should be able to find the number of squares at a latitude', () => {
        const result = getSquareCountAtLatitude(86.667343);
        expect(result).to.equal(775692);
    });

    it('should be the same at an opposite latitude', () => {
        const result1 = getSquareCountAtLatitude(-1 * carnoux1.lat);
        const result2 = getSquareCountAtLatitude(carnoux1.lat);
        expect(result1).to.equal(result2);
    });

    it('should get the current accumulation at a precise step', () => {
        const result1 = getAccumulatorAtStep(123456);
        expect(result1).to.equal(47895026705);
    });

    it('get the latitude of a step', () => {
        const result1 = getLatitudeFromStep(123456);
        expect(result1).to.equal(86.66734);
    });
    it('get the step from a latitude', () => {
        const result1 = getStepFromLatitude(86.66734);
        expect(result1).to.equal(123456);
    });


    it('get square number from a position', () => {
        const result = getSquareNumberFromPosition(86.66734, 0.04641);
        expect(result).to.equal(47895026804);
    });
    it('get square number from a position with 0 lng', () => {
        const result = getSquareNumberFromPosition(86.667343, 0);
        expect(result).to.equal(47895026705);
    });
    it('get square number from a position with negative lng', () => {
        const result = getSquareNumberFromPosition(86.667343, -0.04641);
        expect(result).to.equal(47895802297);
    });

    it('get the latitude of a square number', () => {
        const {lat} = getLatitudeAndStepFromSquareNumber(47895026804);
        expect(lat).to.equal(86.66734);
    });

    it('get the longitude of a square number', () => {
        const {lat, lng} = getPositionFromSquareNumber(47895026804);
        expect(lat).to.equal(86.66734);
        expect(lng).to.equal(0.04641);
    });

    it('get the longitude of a square number', () => {
        const {lat, lng} = getPositionFromSquareNumber(47895026705);
        expect(lat).to.equal(86.66734);
        expect(lng).to.equal(0);
    });

    it('get the longitude of a square number with a negative lng', () => {
        const {lat, lng} = getPositionFromSquareNumber(47895802297);
        expect(lat).to.equal(86.66734);
        expect(lng).to.equal(-0.04641);
    });

    it('two consecutive numbers should get different results', () => {
        const result1 = getPositionFromSquareNumber(47895026804);
        const result2 = getPositionFromSquareNumber(47895026805);
        expect(result1.lat !== result2.lat || result1.lng !== result2.lng).to.equal(true);
    });

    it('two consecutive positions should get different results, in the vertical direction', () => {
        const result1 = getSquareNumberFromPosition(86.66734, 0.04641);
        const result2 = getSquareNumberFromPosition(86.66737, 0.04641);
        expect(result1).not.to.equal(result2);
    });

    it('two consecutive positions should get different results, in the horizontal direction', () => {
        const result1 = getSquareNumberFromPosition(86.66734, 0.04641);
        const result2 = getSquareNumberFromPosition(86.66734, 0.04644);
        expect(result1).not.to.equal(result2);
    });
});
