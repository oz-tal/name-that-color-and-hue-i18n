# Name That Color And Hue with I18n

A Node CommonJS compatible wrapper for the ntc library with Colblindor's hue and support for i18n.

Original project: Name That Color library (ntc js) - http://chir.ag/projects/ntc/

Colblindor's hue modification - https://www.color-blindness.com/color-name-hue/

## Installation

Install directly:
```
npm i ntc-hi-js
```

Or add to your package.json
```
"ntc-hi-js": "^2.0.5"
```

## Getting Started

```javascript
const ntc = require('ntc-hi-js')

const n_match = ntc.name('#6195ED', 'fr')
n_rgb         = n_match[0] // RGB value of the closest matching color
n_name        = n_match[1] // string for the name of the match
n_shade_rgb   = n_match[2] // RGB value for the name of colors shade
n_shade_name  = n_match[3] // string for the name of colors shade
n_exactmatch  = n_match[4] // True if exact color match, False if close-match

console.log(n_match) // [ '#6495ED', 'Cornflower Blue', false ]
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

## Contributing

ntc-hi-js is an open source project and we encourage contributions.

## To-Do

* Support more locales
* Support for externally provided locale translations
* Review fr locale for the quality of some translations
* Support for RGB, HSL and HSV formats as an input
