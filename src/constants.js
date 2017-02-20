const start = 90;
const end = 0;

const earthPerimeter = 40007864;
const earthRadius = 6371000;
const stepSize = 3;

const percentToAchieve = stepSize/earthPerimeter;
const stepSizeInDegree = percentToAchieve * 360;
const numberOfSteps = Math.abs(end-start) / stepSizeInDegree;

const saveEveryX=1000;

const precisionDigits = 5;

export default {
    earthPerimeter,
    earthRadius,
    stepSize,
    saveEveryX,
    percentToAchieve,
    stepSizeInDegree,
    numberOfSteps,
    precisionDigits
}