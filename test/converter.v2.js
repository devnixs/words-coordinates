import {
    getPositionFromSquareNumber,
    getSquareNumberFromPosition,
    trimDecimals,
    getLatLngFromThreeWords,
    getThreeWordsFromLatLng,
    doWordsExist,
} from '../src/converter.v2.js';
import {expect, should} from 'chai';
import constants from '../src/constants';
should();

describe('Converter', () => {

    it('should trim decimals', () => {
        const result = trimDecimals(43.258996, 5);
        expect(result).to.equal(43.25899);
    });

    it('should trim decimals', () => {
        const result = trimDecimals(43.258, 5);
        expect(result).to.equal(43.258);
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
        const result2 = getSquareNumberFromPosition(86.66736, 0.04646);
        expect(result1).not.to.equal(result2);
    });

    it('should go back and forth in a lot of coordinates', () => {
        // The goal of this test is to prove that we can find 3 words for any location, and then from those three words, find the location back with a certain precision.

        for (let lat = -85; lat < 85; lat += 5) {
            for (let lng = -175; lng < 180; lng += 10) {
                const result = getThreeWordsFromLatLng(lat, lng);
                const localization = getLatLngFromThreeWords(result);
                const circumferenceAtThisLatitude = Math.cos(lat * 2 * Math.PI / 360) * Math.PI * 2 * constants.earthRadius / 360;
                const lngErrorInDegrees = Math.abs(localization.lat-lat);
                const lngErrorInMeters = (lngErrorInDegrees / 360) * circumferenceAtThisLatitude;

                expect(lngErrorInMeters).to.be.below(constants.stepSize);
                expect(lngErrorInMeters).to.be.below(constants.stepSize);
            }
        }
    });

    it('should tell if words exist', () => {
        const result = doWordsExist(["characterized", "needing", "thanks"]);
        expect(result).to.deep.equal(true);
    });

    it('should tell if words don\'t exist', () => {
        const result = doWordsExist(["characterized", "needingtest", "thanks"]);
        expect(result).to.deep.equal(false);
    });

});
