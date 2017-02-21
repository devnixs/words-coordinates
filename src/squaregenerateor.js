require("babel-register");

const fs=require('fs');

const constants = require('./constants').default;
const converter = require('./converter.v2.js');

const start = 90;
const end = 0;


const values = [];
let accumulator = 0;

for (var index = 0; index < constants.numberOfSteps; index++) {
    let numberOfSquaresInThatArea = converter.getSquareCountAtStep(index);

    if(index % constants.saveEveryX === 0){
        values.push(accumulator);
    }


    accumulator += numberOfSquaresInThatArea;
}

console.log("Total number of squares in that hemisphere:", accumulator);

const json = JSON.stringify(values);
fs.writeFile('./src/squaredata.json', json, 'utf8',()=>console.log('done!'));