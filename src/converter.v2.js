import _ from 'lodash';

import dictionnary from './words.json';
import constants from './constants';
import squaredata from './squaredata.json';

export function getSquareCountAtLatitude(lat) {
    const colatitudeInDegrees = 90 - Math.abs(lat);
    const colatitudeInRad = colatitudeInDegrees * Math.PI / 180;
    let currentCircumference = Math.sin(colatitudeInRad) * constants.earthRadius * 2 * Math.PI;
    let numberOfSquaresInThatArea = Math.round(currentCircumference / constants.stepSize);
    return numberOfSquaresInThatArea;
}

export function getLatitudeFromStep(step) {
    const steps = constants.numberOfSteps;
    const colatitudeInDeg = (step / steps) * 90;
    const latitude = trimDecimals(90 - colatitudeInDeg);
    return latitude;
}


export function getStepFromLatitude(latitude) {
    const colatitudeInDeg = 90 - latitude;
    const step = Math.floor((colatitudeInDeg / 90) * constants.numberOfSteps);
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
    return {lat, step: foundStep};
}

export function trimDecimals(input, precision = constants.precisionDigits) {
    const powerOfTen = Math.pow(10, precision);
    return Number((Math.floor(input * powerOfTen) / powerOfTen).toFixed(precision));
}

export function getPositionFromSquareNumber(squareNumber) {
    const {lat, step} = getLatitudeAndStepFromSquareNumber(squareNumber);
    const squareCount = getSquareCountAtStep(step);
    const accumulationAtThisLatitude = getAccumulatorAtStep(step);
    const longitudeStep = squareNumber - accumulationAtThisLatitude;
    const percent = longitudeStep / squareCount;
    let degrees = percent * 360;

    if (degrees > 180) {
        const degreesDenormalized = 360 - degrees;
        const lng = -1 * trimDecimals(degreesDenormalized);
        return {lat, lng};
    } else {
        const lng = trimDecimals(degrees);
        return {lat, lng};
    }
}

export function getSquareNumberFromPosition(lat, lng) {
    const step = getStepFromLatitude(lat);
    const accumulator = getAccumulatorAtStep(step);

    let normalizedLng;
    if (lng >= 0) {
        normalizedLng = lng;
    } else {
        normalizedLng = (360 + lng);
    }

    const numberOfSquaresAtThisLatitude = getSquareCountAtStep(step);
    const lngPercent = normalizedLng / 360;
    let longitudeStep = Math.floor(lngPercent * numberOfSquaresAtThisLatitude);

    return accumulator + longitudeStep;
}

