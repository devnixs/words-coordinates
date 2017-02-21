import {
    getPositionFromSquareNumber,
    getSquareNumberFromPosition,
    trimDecimals,
    getLatLngFromThreeWords,
    getThreeWordsFromLatLng,
    doWordsExist,
} from '../src/converter.v2.js';
import {expect, should} from 'chai';
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
        for (let lat = -60; lat < 60; lat += 5) {
            for (let lng = -100; lng < 180; lng += 10) {
                const result = getSquareNumberFromPosition(lat, lng);
                const localization = getPositionFromSquareNumber(result);
                localization.lat.should.be.closeTo(lat, 0.00003, "latitude is incorrect");
                localization.lng.should.be.closeTo(lng, 0.00008, `longitude is incorrect (lat=${localization.lat}, expected=${lat})`);
            }
        }
    });


    it('should get three words from coordinates', () => {
        const result = getThreeWordsFromLatLng(86.66736, 0.04646);
        expect(result).to.deep.equal(["following", "basis", "pressing"]);
    });

    it('should get coordinates from three words', () => {
        const localization = getLatLngFromThreeWords(["following", "basis", "pressing"]);
        localization.lat.should.be.closeTo(86.66736, 0.00003, `latitude is incorrect`);
        localization.lng.should.be.closeTo(0.04646, 0.00007, `longitude is incorrect`);
    });



    it('Test', () => {
        const localization1 = getLatLngFromThreeWords(["spies", "fiercely" ,"numerals"]);
        const localization2 = getLatLngFromThreeWords(["spies", "fiercely", "peppers"]);
        console.log(localization1);
        console.log(localization2);
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
