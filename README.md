[![Build Status](https://travis-ci.org/devnixs/words-coordinates.svg?branch=master)](https://travis-ci.org/devnixs/words-coordinates)

# A global coordinate system, with words

Converts Lat 43.258783, Lng 5.564971 to => brown, cat, house. Which is easier to remember or share.

It has an average precision of **1.45 meters**. Take a look at [the tests](https://travis-ci.org/devnixs/words-coordinates) for a proof!

### [Try me!](https://devnixs.github.io/words-coordinates/)

## How does it work?

Note: The algorithm has changed and this is not the current implementation.

This algorithm only gives a precision of 5 meters.

I'll write the description of the new algorithm soon.


| Step  		                        | Result |
| ------------------------------------ | ------------- |
| Start with the base coordinates  | 43.258783, 5.564971  |
| Round to 4 digits after the dot  | 43.2587, 5.5649  |
| Add 180 to the latitude, and 90 to the longitude in order to have only positive values | 133.2587, 185.5649 |
| Multiply by 10000, to have only integers  | 1332587, 1855649  |
| Convert that to binary and concatenate them  | 1010001010101011011010111000101000010100110  |
| Shuffle the bits  | 1001100010101111110100110000001010010011100  |
| Split that into three binary numbers  | 100110001010111, 111010011000000, 1010010011100  |
| Convert them back to base 10  | 19543, 29888, 5276  |
| Assign each number a word  | brown, cat, house  |

## Contributing

Feel free to contribute, I love pull requests!

To run the project : 
```
npm install
npm start
```

To build :
```
npm install
npm run build
```