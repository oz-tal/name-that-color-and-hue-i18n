/*

+-----------------------------------------------------------------+
|   Created by Chirag Mehta - http://chir.ag/tech/download/ntc    |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. from the orignal code have been written
specifically for the Name that Color JavaScript by Chirag Mehta. The hue feature
has been written by Colblindor and the i18n support by Oz-Tal.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/

Sample Usage:

  <script type='text/javascript' src='ntc.js'></script>

  <script type='text/javascript'>

    // get a match in the 'fr' locale against all dictionaries ('color' and 'shade' by default)
    const n_match = ntc.name('#6195ED', 'fr')

    n_match.color.hex   // This is the RGB value of the closest matching color
    n_match.color.name  // This is the text string for the name of the match
    n_match.color.exact // True if exact color match, False if close-match
    
    n_match.shade.hex   // This is the RGB value for the name of colors shade
    n_match.shade.name  // This is the text string for the name of colors shade
    n_match.shade.exact // True if exact color match, False if close-match

    alert(n_match)

  </script>

*/

// chroma-js for input processing and deltaE calculations
const chroma = require("chroma-js")

const ntc = {
  current_locale: '',
  fallback_locale: 'en',
  dictionary: {},
  dictionaries: {
    shade: './shades',
    color: './colors'
  },

  load_locale: (locale) => {
    // locale already loaded
    if (locale === ntc.current_locale) { return }

    Object.entries(ntc.dictionaries).forEach(entry => {
      const [name, path] = entry

      try {
        ntc.dictionary[name] = require(`${path}/${locale}.json`)
      } catch (error) {
        ntc.dictionary[name] = require(`${path}/${ntc.fallback_locale}.json`)

        console.warn(`ntc: missing '${name}' table for '${locale}' locale, '${ntc.fallback_locale}' locale will be used as fallback`)
      }
    })

    // track currently loaded locale
    ntc.current_locale = locale
  },

  name: (color, locale = ntc.current_locale) => {
    if (!chroma.valid(color)) {
      console.error(`'${color}' is not in a recognized color format`)
      return
    }

    // initial locale is 'en'
    ntc.load_locale(locale)

    const result = {}

    // return a match for each table
    Object.entries(ntc.dictionary).forEach(table => {
      const [name, list] = table

      let bestDeltaE  = -1
      list.find(entry => {
        const entryDeltaE = chroma.deltaE(color, entry[0])

        if (bestDeltaE < 0 || bestDeltaE > entryDeltaE) {
          if (entryDeltaE === 0) {
            // exact match
            result[name] = {
              hex:   '#' + entry[0],
              name:  entry[1],
              exact: true
            }
            return true
          } else {
            // closest match
            bestDeltaE   = entryDeltaE
            result[name] = {
              hex:   '#' + entry[0],
              name:  entry[1],
              exact: false
            }
          }
        }
      })
    })

    return result
  }
}

// load default locale before exporting
ntc.load_locale('en')

module.exports = ntc
