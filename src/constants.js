const start = 90;
const end = 0;

const earthPerimeter = 40007864;
const earthRadius = 6371000;
const stepSize = 3;

const percentToAchieve = stepSize/earthPerimeter;
const stepSizeInDegree = percentToAchieve * 360;
const numberOfSteps = Math.abs(end-start) / stepSizeInDegree;

const values = [];
let accumulator = 0;
const saveEveryX=1000;

module.exports = {
    earthPerimeter,
    earthRadius,
    stepSize,
    saveEveryX,
}