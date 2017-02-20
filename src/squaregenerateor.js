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

console.log(numberOfSteps);

for (var index = 0; index < numberOfSteps; index++) {
    let currentPosInRadians = Math.PI * (index / numberOfSteps) / 2;
    let currentCircumference = Math.sin(currentPosInRadians) * earthRadius * 2 * Math.PI;
    let numberOfSquaresInThatArea = Math.round(currentCircumference / stepSize);
    accumulator += numberOfSquaresInThatArea;
    
    if(index % saveEveryX === 0){
        values.push(accumulator);
    }
}

console.log(values.length);
console.log(accumulator);