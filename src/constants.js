const earthRadius = 6371000;
const earthPerimeter = 40007864;
//const earthPerimeter = 2 * Math.PI * earthRadius;


// This is not chosen randomly. This gives 17196163978422 squares on the northen hemisphere.
// Which can be stored in 44 bits, plus the bit sign, leads to 45 bits.
// This can then easily be divided into 3, 15 bits numbers, that can be transformed into words.
const stepSize = 3.85;
const numberOfBits = 45;

// this describes how the data is splitted in 3 words. The total must match the number of bits
const wordBitsLengths = [15, 15, 15];

const stepSizeInDegree = stepSize / (earthPerimeter) * 360;

const numberOfSteps = Math.floor(90 / stepSizeInDegree);
const stepPaddingInMeters = (90 / stepSizeInDegree - numberOfSteps) * stepSize;
const stepPaddingInDegree = (90 / stepSizeInDegree - numberOfSteps) * stepSizeInDegree;
const latitudeRangeInDegree = 90 - stepPaddingInDegree;

console.log("NbSteps", numberOfSteps);
const saveEveryX = 1000;

const precisionDigits = 7;

export default {
    earthPerimeter,
    earthRadius,
    stepSize,
    saveEveryX,
    stepSizeInDegree,
    numberOfSteps,
    precisionDigits,
    numberOfBits,
    wordBitsLengths,
    stepPaddingInMeters,
    stepPaddingInDegree,
    latitudeRangeInDegree
}