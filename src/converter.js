import _ from 'lodash';

const numberOfDecimals = 4;
const numberOfIntegerNumbers = 3;
const powerOften = Math.pow(10, numberOfDecimals);

const shuffleMatrix = [28, 9, 42, 22, 20, 32, 33, 1, 2, 29, 37, 19, 10, 23, 41, 14, 6, 40, 21, 17, 27, 4, 35, 24, 38, 3, 26, 5, 36, 7, 0, 39, 30, 11, 16, 15, 31, 34, 8, 12, 18, 13, 25];

export function truncate(number) {
    return Math.floor(number * powerOften) / powerOften
}

export function padWithZeros(number) {
    return _.padStart(String(number), numberOfDecimals + 1 + numberOfIntegerNumbers, '0'); // 4 decimals + dot + integer part
}

export function combineAsBinary(lat, lng) {
    const latInteger = Math.floor(lat * powerOften);
    const lngInteger = Math.floor(lng * powerOften);
    const latAsBinary = latInteger.toString(2);
    const lngAsBinary = lngInteger.toString(2);

    const latCorrectLength = _.padStart(_.trimStart(latAsBinary, '0'), 22, '0');
    const lngCorrectLength = _.padStart(_.trimStart(lngAsBinary, '0'), 21, '0');

    return latCorrectLength + lngCorrectLength;
}

export function binaryFromLatitudeLongitude(binary) {
    const lat = binary.substr(0, 22);
    const lng = binary.substr(22, 21);

    return {
        lat: truncate(parseInt(lat, 2) / powerOften),
        lng: truncate(parseInt(lng, 2) / powerOften)
    }
}

export function shuffle(input) {
    let result = '';
    for (let i = 0; i < shuffleMatrix.length; i++) {
        result += input.substr(shuffleMatrix[i], 1);
    }
    return result;
}

export function unshuffle(input) {
    let result = '';
    for (let i = 0; i < shuffleMatrix.length; i++) {
        result += input.substr(shuffleMatrix.indexOf(i), 1);
    }
    return result;
}


export function split(input) {
    return [
        input.substr(0, 15),
        input.substr(15, 15),
        input.substr(30, 15),
    ]
}

export function unsplit(inputs) {
    return inputs.join('');
}