import _ from 'lodash';

import dictionnary from './words.json';

const numberOfDecimals = 4;
const numberOfIntegerNumbers = 3;
const powerOften = Math.pow(10, numberOfDecimals);

const shuffleMatrix = [
    [0, 20, 40, 17, 37, 14, 34, 11, 31, 8, 28, 5, 25, 22, 24],
    [1, 19, 41, 16, 38, 13, 35, 10, 32, 7, 29, 4, 26, 23, 27],
    [21, 18, 42, 15, 39, 12, 36, 9, 33, 6, 30, 2, 3],
]
const shuffleVector = _.flatten(shuffleMatrix);


export function getThreeWordsBinariesLengths() {
    return [15, 15, 13]; // 43 characters
}

export function getLatLngBinariesLengths() {
    return [21, 22]; // 43 characters
}


export function convertToInteger(number) {
    return Math.round(number * powerOften);
}

export function limitDecimals(number) {
    return Number(number.toFixed(numberOfDecimals));
}

export function padWithZeros(number) {
    return _.padStart(String(number), numberOfDecimals + 1 + numberOfIntegerNumbers, '0'); // 4 decimals + dot + integer part
}

export function setLatInRange(input) {
    if (input >= 0) {
        return convertToInteger(input);
    } else {
        return convertToInteger(90 + Math.abs(input));
    }
}
export function setLngInRange(input) {
    return convertToInteger(input + 180);
}

export function unsetLatInRange(input) {
    if (input >= 90 * powerOften) {
        return -1 * limitDecimals((input) / powerOften - 90);
    } else {
        return limitDecimals((input) / powerOften);
    }
}
export function unsetLngInRange(input) {
    return limitDecimals(input / powerOften - 180);
}

function setLength(input, length) {
    return _.padStart(_.trimStart(input, '0'), length, '0');
}

export function combineAsBinary(lat, lng) {
    const binariesLengths = getLatLngBinariesLengths();

    const latInteger = Math.floor(lat);
    const lngInteger = Math.floor(lng);
    const latAsBinary = latInteger.toString(2);
    const lngAsBinary = lngInteger.toString(2);

    const latCorrectLength = setLength(latAsBinary, binariesLengths[0]);
    const lngCorrectLength = setLength(lngAsBinary, binariesLengths[1]);

    return latCorrectLength + lngCorrectLength;
}

export function binaryToLatitudeLongitude(binary) {
    const binariesLengths = getLatLngBinariesLengths();

    const lat = binary.substr(0, binariesLengths[0]);
    const lng = binary.substr(binariesLengths[0], binariesLengths[1]);

    return {
        lat: (parseInt(lat, 2)),
        lng: (parseInt(lng, 2))
    }
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


export function split(input) {
    const binariesLengths = getThreeWordsBinariesLengths();
    return [
        input.substr(0, binariesLengths[0]),
        input.substr(binariesLengths[0], binariesLengths[1]),
        input.substr(binariesLengths[0] + binariesLengths[1], binariesLengths[2]),
    ]
}

export function unsplit(inputs) {
    return inputs.join('');
}

export function getThreeNumbersFromLatLng(lat, lng) {
    const latInRange = setLatInRange(lat);
    const lngInRange = setLngInRange(lng);

    const binary = combineAsBinary(latInRange, lngInRange);
    const shuffled = shuffle(binary);
    const splitted = split(shuffled);

    return splitted.map(i => parseInt(i, 2));
}

export function getLatLngFromThreeNumbers(numbers) {
    const binariesLengths = getThreeWordsBinariesLengths();
    const binaries = numbers.map(i => i.toString(2));
    const padded = binaries.map((i, index) => setLength(i, binariesLengths[index]));

    const shuffled = unsplit(padded);
    const binary = unshuffle(shuffled);

    const {lat, lng} = binaryToLatitudeLongitude(binary);

    return {
        lat: unsetLatInRange(lat),
        lng: unsetLngInRange(lng),
    }
}


export function getThreeWordsFromLatLng(lat, lng) {
    return getThreeNumbersFromLatLng(lat,lng).map(i=>dictionnary[i]);
}

export function getLatLngFromThreeWords(words) {
    return getLatLngFromThreeNumbers(words.map(i=>dictionnary.indexOf(i)));
}

export function doWordsExist(words) {
    return !words.find(i=> dictionnary.indexOf(i)===-1)
}