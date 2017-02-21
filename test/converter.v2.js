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
import _ from 'lodash';
should();

function getErrors(lat, lng, expectedLat, expectedLng) {
    const circumferenceAtThisLatitude = Math.cos(expectedLat * 2 * Math.PI / 360) * Math.PI * 2 * constants.earthRadius;
    const lngErrorInDegrees = Math.abs(lng - expectedLng);
    const lngErrorInMeters = (lngErrorInDegrees / 360) * circumferenceAtThisLatitude;

    const latErrorInDegrees = Math.abs(lat - expectedLat);
    const latErrorInMeters = (latErrorInDegrees / 360) * constants.earthPerimeter;
    const combinedErrorInMeters = Math.sqrt(latErrorInMeters * latErrorInMeters + lngErrorInMeters * lngErrorInMeters);

    return {latErrorInMeters, lngErrorInMeters, combinedErrorInMeters};
}

describe('Converter', () => {

    xit('should trim decimals', () => {
        const result = trimDecimals(43.258996, 5);
        expect(result).to.equal(43.259);
    });

    xit('should trim decimals', () => {
        const result = trimDecimals(43.258, 5);
        expect(result).to.equal(43.258);
    });

    xit('two consecutive numbers should get different results', () => {
        const result1 = getPositionFromSquareNumber(47895026804);
        const result2 = getPositionFromSquareNumber(47895026805);
        expect(result1.lat !== result2.lat || result1.lng !== result2.lng).to.equal(true);
    });

    xit('two consecutive positions should get different results, in the vertical direction', () => {
        const result1 = getSquareNumberFromPosition(86.66734, 0.04641);
        const result2 = getSquareNumberFromPosition(86.66737, 0.04641);
        expect(result1).not.to.equal(result2);
    });

    xit('two consecutive positions should get different results, in the horizontal direction', () => {
        const result1 = getSquareNumberFromPosition(46.66734, 0.04641);
        const result2 = getSquareNumberFromPosition(46.66734, 0.04647);
        expect(result1).not.to.equal(result2);
    });

    it('High error debug 1:', () => {
        const expectedLat = -82.37850061605604;
        const expectedLng = -112.1172430680108;
        const squareNumber = getSquareNumberFromPosition(expectedLat, expectedLng);
        // console.log("-------------");
        const {lat, lng} = getPositionFromSquareNumber(squareNumber);
        // console.log("final:",lat, lng);
        const err = getErrors(lat, lng, expectedLat, expectedLng);
        expect(err.combinedErrorInMeters).to.be.below(20);
    });


    it('High error debug 2:', () => {
        const expectedLat = -64.26015975057226;
        const expectedLng = -138.47593787513506;
        const squareNumber = getSquareNumberFromPosition(expectedLat, expectedLng);
        // console.log("-------------");
        const {lat, lng} = getPositionFromSquareNumber(squareNumber);
        // console.log("final:",lat, lng);
        const err = getErrors(lat, lng, expectedLat, expectedLng);
        expect(err.combinedErrorInMeters).to.be.below(20);
    });

    xit('High error debug 3:', () => {
        const expectedLat = -62.16890050964321;
        const expectedLng = 109.70528170724356;
        const squareNumber = getSquareNumberFromPosition(expectedLat, expectedLng);
        console.log("-------------");
        const {lat, lng} = getPositionFromSquareNumber(squareNumber);
        console.log("final:", lat, lng);
        console.log("expected:", expectedLat, expectedLng);
        const err = getErrors(lat, lng, expectedLat, expectedLng);
        console.log("errors:",err);
        expect(err.combinedErrorInMeters).to.be.below(20);
    });


    it('should compute the average error and ensure the individual errors aren\'t too high', function () {
        // The goal of this test is to prove that we can find 3 words for any location, and then from those three words, find the location back with a certain precision.

        this.timeout(50000);

        var seed = 1;

        function random() {
            var x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        }

        const latErrors = [];
        const lngErrors = [];
        const combinedErrors = [];

        for (let lat = -85; lat < 85; lat += 2) {
            for (let lng = -175; lng < 180; lng += 2) {
                const randomizedLat = lat + random();
                const randomizedLng = lng + random();

                const result = getThreeWordsFromLatLng(randomizedLat, randomizedLng);
                const localization = getLatLngFromThreeWords(result);

                const {latErrorInMeters, lngErrorInMeters, combinedErrorInMeters} = getErrors(localization.lat, localization.lng, randomizedLat, randomizedLng);

                latErrors.push(latErrorInMeters);
                lngErrors.push(lngErrorInMeters);
                combinedErrors.push(combinedErrorInMeters);

                if (latErrorInMeters >= 4.38) {
                    console.log(randomizedLat, randomizedLng);
                }

                expect(lngErrorInMeters).to.be.below(constants.stepSize * 1.3, `Lng error too high. ExpLat=${randomizedLat}, ResLat=${localization.lat}, ExpLng=${randomizedLng}, ResLng=${localization.lng}, `);
                expect(latErrorInMeters).to.be.below(constants.stepSize * 1.3, `Lat error too high. ExpLat=${randomizedLat}, ResLat=${localization.lat}, ExpLng=${randomizedLng}, ResLng=${localization.lng}, `);
            }
        }

        console.log("Average latitude error in meters : ", (_.sum(latErrors) / latErrors.length).toFixed(2));
        console.log("Average longitude error in meters : ", (_.sum(lngErrors) / lngErrors.length).toFixed(2));
        console.log("Average combined error in meters : ", (_.sum(combinedErrors) / lngErrors.length).toFixed(2));
        console.log("Max latitude error in meters : ", _.max(latErrors).toFixed(2));
        console.log("Max Longitude error in meters : ", _.max(lngErrors).toFixed(2));
        console.log("Max combined error in meters : ", _.max(combinedErrors).toFixed(2));
        console.log("Sample size : ", latErrors.length);
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
