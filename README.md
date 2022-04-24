# Name That Color And Hue with I18n

Convert hexadecimal, RGB, HSL, LCH or CMYK color to a name and a shade with i18n support.

## Installation

Install directly:
```
npm i ntc-hi-js
```

Or add to your package.json
```
"ntc-hi-js": "^3.0.3"
```

## Getting Started

```javascript
const ntc = require('ntc-hi-js')

const n_match = ntc.name('#6195ED', 'en')

n_match.color.hex   // This is the RGB value of the closest matching color
n_match.color.name  // This is the text string for the name of the match
n_match.color.exact // True if exact color match, False if close-match

n_match.shade.hex   // This is the RGB value for the name of colors shade
n_match.shade.name  // This is the text string for the name of colors shade
n_match.shade.exact // True if exact color match, False if close-match

console.log(n_match) // [ '#6495ED', 'Cornflower Blue', false ]
```

## Example

Supported formats:
```javascript
ntc.name('619')                     // hex
ntc.name('#619')                    // hex
ntc.name('6195ED')                  // hex
ntc.name('#6195ED')                 // hex
ntc.name(0xff3399)                  // hex
ntc.name(16777215)                  // int
ntc.name([97, 149, 237])            // rgb
ntc.name({ r:97, g:149, g:237})     // rgb
ntc.name({ h:120, s:1, l:0.75})     // hsl
ntc.name({ l:80, c:25, h:200 })     // lch
ntc.name({ c:1, m:0.5, y:0, k:0.2}) // cmyk
```

## Live Demo

Live demo of the original ntcjs library

http://chir.ag/projects/name-that-color/#6195ED

Live demo of the Colblindor's version with the hue feature

https://www.color-blindness.com/color-name-hue/

## Running the Tests

Make sure you install the necessary dev dependencies needed to run the tests:

```
npm install
```

Then run the tests

```
npm test
```

## Disclaimer

All credit goes to [Chirag Mehta](http://chir.ag/about) for creating the original ntc.js library.

Some credit goes to [Colblindor](https://www.color-blindness.com/color-name-hue/) for his
hue modification.

## Contributing

ntc-hi-js is an open source project and we encourage contributions.

## To-Do

* Support more locales
* Test and expand support for externally provided locales/dictionaries
* Review fr locale for the quality of some translations
