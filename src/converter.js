import _ from 'lodash';

const numberOfDecimals = 4;
const numberOfIntegerNumbers = 3;
const powerOften = Math.pow(10, numberOfDecimals);

export function truncate(number) {
    return Math.floor(number * powerOften) / powerOften
}

export function padWithZeros(number) {
    return _.padStart(String(number), numberOfDecimals + 1 + numberOfIntegerNumbers, '0'); // 4 decimals + dot + integer part
}

export function convertToString(lat, lng) {
    const latTruncated = padWithZeros(truncate(lat));
    const lngTruncated = padWithZeros(truncate(lng));

    return latTruncated.replace('.', '') + lngTruncated.replace('.', '');
}

export function convertToLatLng(input) {
    const firstIntegerPart = input.substr(0, numberOfIntegerNumbers);
    const firstDecimalPart = input.substr(numberOfIntegerNumbers, numberOfDecimals);

    const secondIntegerPart = input.substr(numberOfIntegerNumbers + numberOfDecimals, numberOfIntegerNumbers);
    const secondDecimalPart = input.substr(numberOfIntegerNumbers * 2 + numberOfDecimals, numberOfDecimals);

    return {
        lat: Number(firstIntegerPart)+Number(firstDecimalPart)/powerOften,
        lng: Number(secondIntegerPart)+Number(secondDecimalPart)/powerOften,
    }
}