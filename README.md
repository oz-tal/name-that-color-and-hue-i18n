# Name That Color And Hue with I18n

Convert hexadecimal, RGB, HSL, LCH or CMYK color to a name and a shade with i18n support.

ntc-hi-js is a complete overhaul of [Chirag Mehta](http://chir.ag/about) and [Colblindor](https://www.color-blindness.com/color-name-hue/) work.

ntc-hi-js leverage the powerful [chroma.js](https://gka.github.io/chroma.js/) library to support a wider range of formats and offer more accurate matching.

## Installation

Install directly:
```
npm i ntc-hi-js
```

Or add to your package.json
```
"ntc-hi-js": "^3.2.0"
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

## Usage

### Supported Formats

ntc-hi.js leverage the powerful [chroma.js](https://gka.github.io/chroma.js/) library to support a variety of formats. Any color information that fit into a single variable can be used directly:
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
If none of these format is satisfactory, it's also possible to directly pass a [chroma.js](https://gka.github.io/chroma.js) color object. Please refer to their documentation for further information.
```javascript
ntc.name(chroma(330, 1, 0.6, 'hsl'))
```

### Translate into a target locale

Retrieving a translation is a simple parameter with the locale code.
```javascript
ntc.name('#6195ED', 'fr')
```

If a locale table is not present, the fallback locale will be used. To change this fallback:
```javascript
ntc.fallback_locale = 'en' // 'en' is the default fallback
```

### Add your own color dictionary

A color dictionary is structured as a folder with a json object for each locale.
```bash
├── my_dictionary
│   ├── en.json
│   ├── fr.json
│   └── ...
```

The json object for a locale is a list of hex/name combos.
```javascript
[
["FF0000", "Red"],
["FFA500", "Orange"],
["FFFF00", "Yellow"],
["008000", "Green"]
]
```

Once this is setup, you must register your dictionary path and launch a rebuild. The example also include the usage of a absolute path, which might be handy for moving the object around modules.
```javascript
// with a relative path
ntc.dictionaries_path.my_dictionary = './my_dictionary'
// with an absolute path
ntc.dictionaries_path.my_dictionary = require('path').resolve('my_dictionary')
ntc.build_dictionaries()
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
* Review current locale for the quality of some translations
