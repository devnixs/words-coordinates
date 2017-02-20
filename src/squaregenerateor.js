require("babel-register");

const fs=require('fs');

const constants = require('./constants').default;
const converter = require('./converter.v2.js');

const start = 90;
const end = 0;


const values = [];
let accumulator = 0;

for (var index = 0; index < constants.numberOfSteps; index++) {
    let latitude = 90 - (index / constants.numberOfSteps) * 90;
    let numberOfSquaresInThatArea = converter.getSquareCountAtLatitude(latitude);


    if(index===123456){
        console.log(accumulator);
        console.log("last:", values[values.length-1]);
        console.log("diff:", accumulator- values[values.length-1]);
    }


    if(index % constants.saveEveryX === 0){
        values.push(accumulator);
    }


    accumulator += numberOfSquaresInThatArea;
}

console.log(accumulator);

const json = JSON.stringify(values);
fs.writeFile('./src/squaredata.json', json, 'utf8',()=>console.log('done!'));