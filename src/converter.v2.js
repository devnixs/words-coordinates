import _ from 'lodash';

import dictionnary from './words.json';
import constants from './constants';
import squaredata from './squaredata.json';


const shuffleMatrix = [
    [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42,],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43,],
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44,],
]

const shuffleVector = _.flatten(shuffleMatrix);

export function getLatitudeFromStep(step) {
    const steps = constants.numberOfSteps;
    const colatitudeInDeg = (step / steps) * constants.latitudeRangeInDegree;
    const latitude = trimDecimals(constants.latitudeRangeInDegree - colatitudeInDeg);
    return latitude;
}


export function getStepFromLatitude(latitude) {
    const colatitudeInDeg = constants.latitudeRangeInDegree - latitude;
    const step = Math.round((colatitudeInDeg / constants.latitudeRangeInDegree) * constants.numberOfSteps);
    return step;
}

export function getSquareCountAtStep(step) {
    const steps = constants.numberOfSteps;
    const colatitudeInRad = (step / steps) * Math.PI / 2;
    let currentCircumference = Math.sin(colatitudeInRad) * constants.earthRadius * 2 * Math.PI;
    let numberOfSquaresInThatArea = Math.round(currentCircumference / constants.stepSize);
    return numberOfSquaresInThatArea;
}

export function getAccumulatorAtStep(finalStep) {
    const start = Math.floor(finalStep / constants.saveEveryX) * constants.saveEveryX;
    const base = squaredata[Math.floor(finalStep / constants.saveEveryX)];

    let complement = 0;
    for (let step = start; step < finalStep; step++) {
        complement += getSquareCountAtStep(step);
    }
    return base + complement;
}


export function getLatitudeAndStepFromSquareNumber(squareNumber) {
    let stepToStartWith = -1;
    let accumulator;
    for (let stepMultiplied = 0; stepMultiplied < squaredata.length; stepMultiplied++) {
        if (squaredata[stepMultiplied] <= squareNumber && (squaredata[stepMultiplied + 1] === undefined || squareNumber < squaredata[stepMultiplied + 1])) {
            stepToStartWith = stepMultiplied * constants.saveEveryX;
            accumulator = squaredata[stepMultiplied];
            break;
        }
    }

    if (stepToStartWith == -1) {
        throw new Error("Could not find the location in the cache")
    }

    let foundStep = -1;
    for (let step = stepToStartWith; step < stepToStartWith + constants.saveEveryX; step++) {
        let numberOfSquares = getSquareCountAtStep(step);
        if (accumulator <= squareNumber && squareNumber < accumulator + numberOfSquares) {
            foundStep = step;
            break;
        }
        accumulator += numberOfSquares;
    }

    if (foundStep == -1) {
        throw new Error("Could not find this location")
    }
    const lat = getLatitudeFromStep(foundStep);
    return {lat, step: foundStep, accumulator};
}

export function trimDecimals(input, precision = constants.precisionDigits) {
    return Number(input.toFixed(precision));
}

export function getPositionFromSquareNumber(squareNumber) {
    const sign = Math.sign(squareNumber) || 1;
    const positiveSquareNumber = Math.abs(squareNumber);
    const {lat, step, accumulator} = getLatitudeAndStepFromSquareNumber(positiveSquareNumber);
    const squareCount = getSquareCountAtStep(step);
    const longitudeStep = positiveSquareNumber - accumulator;
    const percent = longitudeStep / squareCount;
    let degrees = percent * 360;
    if (degrees > 180) {
        const degreesDenormalized = 360 - degrees;
        const lng = -1 * trimDecimals(degreesDenormalized);
        return {lat: lat * sign, lng};
    } else {
        const lng = trimDecimals(degrees);
        return {lat: lat * sign, lng};
    }
}

export function getSquareNumberFromPosition(lat, lng) {
    const sign = Math.sign(lat) || 1;
    const positiveLat = Math.abs(lat);
    const step = getStepFromLatitude(positiveLat);
    const accumulator = getAccumulatorAtStep(step);

    let normalizedLng;
    if (lng >= 0) {
        normalizedLng = lng;
    } else {
        normalizedLng = (360 + lng);
    }

    const numberOfSquaresAtThisLatitude = getSquareCountAtStep(step);
    const lngPercent = normalizedLng / 360;
    let longitudeStep = Math.round(lngPercent * numberOfSquaresAtThisLatitude);

    return sign * (accumulator + longitudeStep);
}

function setLength(input, length) {
    return _.padStart(_.trimStart(input, '0'), length, '0');
}

export function convertSquareNumberToBinary(squareNumber) {
    const sign = squareNumber >= 0 ? 0 : 1;
    const squareNumberPositive = Math.abs(squareNumber);
    const squareNumberAsBinary = squareNumberPositive.toString(2);

    const binaryWithoutSign = setLength(squareNumberAsBinary, constants.numberOfBits - 1);
    return sign + binaryWithoutSign;
}

export function binaryToSquareNumber(binary) {
    const adjustedBinary = setLength(binary, constants.numberOfBits);

    const sign = adjustedBinary.substr(0, 1);
    const rest = adjustedBinary.substr(1);

    const squareNumber = parseInt(rest, 2);
    if (Number(sign) === 0) {
        return squareNumber;
    } else {
        return -1 * squareNumber;
    }
}

export function split(input) {
    const binariesLengths = constants.wordBitsLengths;
    return [
        input.substr(0, binariesLengths[0]),
        input.substr(binariesLengths[0], binariesLengths[1]),
        input.substr(binariesLengths[0] + binariesLengths[1], binariesLengths[2]),
    ]
}

export function unsplit(inputs) {
    return inputs.join('');
}


export function shuffle(input) {
    let result = '';
    for (let i = 0; i < shuffleVector.length; i++) {
        result += input.substr(shuffleVector[i], 1);
    }
    return result;
}

export function unshuffle(input) {
    let result = '';
    for (let i = 0; i < shuffleVector.length; i++) {
        result += input.substr(shuffleVector.indexOf(i), 1);
    }
    return result;
}

export function getThreeNumbersFromLatLng(lat, lng) {
    const squareNumber = getSquareNumberFromPosition(lat, lng);
    const binary = convertSquareNumberToBinary(squareNumber);
    const shuffled = shuffle(binary);
    const splitted = split(shuffled);

    return splitted.map(i => parseInt(i, 2));
}

export function getPositionFromThreeNumbers(numbers) {
    const binariesLengths = constants.wordBitsLengths;
    const binaries = numbers.map(i => i.toString(2));
    const padded = binaries.map((i, index) => setLength(i, binariesLengths[index]));

    const shuffled = unsplit(padded);
    const binary = unshuffle(shuffled);

    const squareNumber = binaryToSquareNumber(binary);

    return getPositionFromSquareNumber(squareNumber);
}


export function getThreeWordsFromLatLng(lat, lng) {
    return getThreeNumbersFromLatLng(lat, lng).map(i => dictionnary[i]);
}

export function getLatLngFromThreeWords(words) {
    const numbers = words.map(i => dictionnary.indexOf(i));
    return getPositionFromThreeNumbers(numbers);
}

export function doWordsExist(words) {
    return !words.find(i => dictionnary.indexOf(i) === -1)
}