import _ from 'lodash';

const numberOfDecimals = 4;
const numberOfIntegerNumbers = 3;
const powerOften = Math.pow(10, numberOfDecimals);

const shuffleVector = [28, 9, 42, 22, 20, 32, 33, 1, 2, 29, 37, 19, 10, 23, 41, 14, 6, 40, 21, 17, 27, 4, 35, 24, 38, 3, 26, 5, 36, 7, 0, 39, 30, 11, 16, 15, 31, 34, 8, 12, 18, 13, 25];


export function getThreeWordsBinariesLengths() {
    return [15, 15, 13]; // 43 characters
}

export function getLatLngBinariesLengths() {
    return [21, 22]; // 43 characters
}


export function truncate(number) {
    return Number(number.toFixed(numberOfDecimals));
}

export function padWithZeros(number) {
    return _.padStart(String(number), numberOfDecimals + 1 + numberOfIntegerNumbers, '0'); // 4 decimals + dot + integer part
}

export function setLatInRange(input) {
    return truncate(input + 90) * powerOften;
}
export function setLngInRange(input) {
    return truncate(input + 180) * powerOften;
}

export function unsetLatInRange(input) {
    return truncate((input) / powerOften - 90);
}
export function unsetLngInRange(input) {
    return truncate(input / powerOften - 180);
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

export function binaryFromLatitudeLongitude(binary) {
    const binariesLengths = getLatLngBinariesLengths();
    
    const lat = binary.substr(0, binariesLengths[0]);
    const lng = binary.substr(binariesLengths[0], binariesLengths[1]);

    return {
        lat: truncate(parseInt(lat, 2)),
        lng: truncate(parseInt(lng, 2))
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

    console.log(splitted);
    return splitted.map(i => parseInt(i, 2));
}

export function getLatLngFromThreeNumbers(numbers) {
    const binariesLengths = getThreeWordsBinariesLengths();
    const binaries = numbers.map(i => i.toString(2));
    const padded = binaries.map((i, index) => setLength(i, binariesLengths[index]))

    const shuffled = unsplit(padded);
    const binary = unshuffle(shuffled);

    const {lat, lng} = binaryFromLatitudeLongitude(binary);

    return {
        lat: unsetLatInRange(lat),
        lng: unsetLngInRange(lng),
    }
}