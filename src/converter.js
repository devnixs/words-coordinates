import _ from 'lodash';

const numberOfDecimals = 4;
const numberOfIntegerNumbers = 3;
const powerOften = Math.pow(10, numberOfDecimals);

const shuffleMatrix = [28, 9, 42, 22, 20, 32, 33, 1, 2, 29, 37, 19, 10, 23, 41, 14, 6, 40, 21, 17, 27, 4, 35, 24, 38, 3, 26, 5, 36, 7, 0, 39, 30, 11, 16, 15, 31, 34, 8, 12, 18, 13, 25];

export function truncate(number) {
    return Number(number.toFixed(numberOfDecimals));
}

export function padWithZeros(number) {
    return _.padStart(String(number), numberOfDecimals + 1 + numberOfIntegerNumbers, '0'); // 4 decimals + dot + integer part
}

export function setLatInRange(input) {
    return truncate(input + 180) * powerOften;
}
export function setLngInRange(input) {
    return truncate(input + 90) * powerOften;
}

export function unsetLatInRange(input) {
    return truncate((input) / powerOften - 180);
}
export function unsetLngInRange(input) {
    return truncate(input / powerOften - 90);
}

function setLength(input, length) {
    return _.padStart(_.trimStart(input, '0'), length, '0');
}

export function combineAsBinary(lat, lng) {
    const latInteger = Math.floor(lat * powerOften);
    const lngInteger = Math.floor(lng * powerOften);
    const latAsBinary = latInteger.toString(2);
    const lngAsBinary = lngInteger.toString(2);

    const latCorrectLength = setLength(latAsBinary, 22);
    const lngCorrectLength = setLength(lngAsBinary, 21);

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

export function getThreeNumbersFromLatLng(lat, lng) {
    const latInRange = setLatInRange(lat);
    const lngInRange = setLngInRange(lng);

    const binary = combineAsBinary(latInRange, lngInRange);
    console.log(binary);
    const shuffled = shuffle(binary);
    const splitted = split(shuffled);

    return splitted.map(i => parseInt(i, 2));
}

export function getLatLngFromThreeNumbers(numbers) {
    const shuffled = unsplit(numbers.map(i => setLength(i.toString(2), i == 2 ? 13 : 15)));
    const binary = unshuffle(shuffled);
    console.log(binary);

    const {lat, lng} = binaryFromLatitudeLongitude(binary);

    return {
        lat: unsetLatInRange(lat),
        lng: unsetLatInRange(lng),
    }
}