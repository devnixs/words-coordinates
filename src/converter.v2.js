import _ from 'lodash';

import dictionnary from './words.json';
import constants from './constants';
import squaredata from './squaredata.json';

export function getNumberOfSquareAtLatitude(lat) {
    const colatitudeInDegrees = 90 - Math.abs(lat);
    const colatitudeInRad = colatitudeInDegrees * Math.PI / 180;
    let currentCircumference = Math.sin(colatitudeInRad) * constants.earthRadius * 2 * Math.PI;
    let numberOfSquaresInThatArea = Math.round(currentCircumference / constants.stepSize);
    return numberOfSquaresInThatArea;
}

export function getStepLatitude(step) {
    const steps = constants.numberOfSteps;
    const colatitudeInDeg = Number(((step / steps) * 90).toFixed(6));
    const latitude = 90 - colatitudeInDeg;
    return latitude;
}


export function getLatitudeStep(latitude) {
    const colatitudeInDeg = 90 - latitude;
    const step = Math.floor((colatitudeInDeg / 90) * constants.numberOfSteps);
    return step;
}

export function getNumberOfSquareAtStep(step) {
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
        complement += getNumberOfSquareAtStep(step);
    }
    return base + complement;
}


export function getSquareNumberLatitude(squareNumber) {
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
        let numberOfSquares = getNumberOfSquareAtStep(step);
        if (accumulator <= squareNumber && squareNumber < accumulator + numberOfSquares) {
            foundStep = step;
            break;
        }
        accumulator += numberOfSquares;
    }

    if (foundStep == -1) {
        throw new Error("Could not find this location")
    }
    const lat = getStepLatitude(foundStep);
    return lat;
}

export function getSquareNumberPosition(squareNumber) {
    const lat = getSquareNumberLatitude(squareNumber);
    const step = getLatitudeStep(lat);
    const squareCount = getNumberOfSquareAtStep(step);
    const accumulationAtThisLatitude = getAccumulatorAtStep(step);
    const longitudeStep = squareNumber - accumulationAtThisLatitude;

    const percent = longitudeStep / squareCount;

    let degrees = percent * 360;
    degrees = Number(degrees.toFixed(6));
    console.log(degrees);
    if (degrees > 180) {
        const lng = -1 * Number((360 - degrees).toFixed(6));
        return {lat, lng};
    } else {
        return {lat, lng: degrees};
    }
}