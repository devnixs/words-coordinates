const start = 90;
const end = 0;

const earthPerimeter = 40007864;
const earthRadius = 6371000;

// This is not chosen randomly. This gives 17196163978422 squares on the northen hemisphere.
// Which can be stored in 44 bits, plus the bit sign, leads to 45 bits.
// This can then easily be divided into 3, 15 bits numbers, that can be transformed into words.
const stepSize = 3.85;
const numberOfBits = 45;

// this describes how the data is splitted in 3 words. The total must match the number of bits
const wordBitsLengths = [15,15,15];

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
    precisionDigits,
    numberOfBits,
    wordBitsLengths
}