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
    for (var step = start + 1; step <= finalStep; step++) {
        complement += getNumberOfSquareAtStep(step);
    }
    console.log(base, complement);
    return base + complement;
}


/*
 let found = null;

 for (var index = 0; index < squaredata.length; index++) {
 var accumulation = squaredata[index];
 var nextAccumulation = squaredata[index + 1];

 if (next === undefined || (accumulation <= step && step < nextAccumulation)) {
 found = index;
 break;
 }
 }

 let realStep = found * constants.saveEveryX;

 for(const )

 const accumulator = squaredata[currentLatitude];

 for (let step=found; step < found+constants.saveEveryX; step++) {
 accumulator+=
 }*/

export function getSquareNumberLatitude(squareNumber) {

}