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

  <script type="text/javascript" src="ntc.js"></script>

  <script type="text/javascript">

    const n_match  = ntc.name("#6195ED")
    n_rgb        = n_match[0] // This is the RGB value of the closest matching color
    n_name       = n_match[1] // This is the text string for the name of the match
    n_shade_rgb  = n_match[2] // This is the RGB value for the name of colors shade
    n_shade_name = n_match[3] // This is the text string for the name of colors shade
    n_exactmatch = n_match[4] // True if exact color match, False if close-match

    alert(n_match)

  </script>

*/

const ntc = {

  load_locale: function(locale) {
    ntc.shades = require(`./shades/${locale}.json`)
    ntc.names  = require(`./colors/${locale}.json`)

    let color, rgb, hsl
    for (let i = 0; i < ntc.names.length; i++) {
      color = '#' + ntc.names[i][0]
      rgb   = ntc.rgb(color)
      hsl   = ntc.hsl(color)
      ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2])
    }
  },

  name: function(color, locale = 'en') {

    // try to parse into #000000 format
    if (color.length % 3 === 0) {
      color = "#" + color
    }
    if (color.length === 4) {
      color = color.split('').map((item) => {
        if (item === "#") return item
        return item + item
      }).join("")
    }
    // validate
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
      return ["#000000", "Invalid Color: " + color, "#000000", "", false]
    }

    // set target locale, default to 'en'
    ntc.load_locale(locale)

    const [r, g, b] = ntc.rgb(color)
    const [h, s, l] = ntc.hsl(color)
    let ndf1 = ndf2 = ndf = 0
    let cl = df = -1

    for (let i = 0; i < ntc.names.length; i++) {
      if(color === "#" + ntc.names[i][0]) {
        return ["#" + ntc.names[i][0], ntc.names[i][1], ntc.shadergb(ntc.names[i][2]), ntc.names[i][2], true]
      }

      ndf1 = Math.pow(r - ntc.names[i][3], 2) + Math.pow(g - ntc.names[i][4], 2) + Math.pow(b - ntc.names[i][5], 2)
      ndf2 = Math.abs(Math.pow(h - ntc.names[i][6], 2)) + Math.pow(s - ntc.names[i][7], 2) + Math.abs(Math.pow(l - ntc.names[i][8], 2))
      ndf  = ndf1 + ndf2 * 2
      if (df < 0 || df > ndf) {
        df = ndf
        cl = i
      }
    }

    return (cl < 0 ? ["#000000", "Invalid Color: " + color, "#000000", "", false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], ntc.shadergb(ntc.names[cl][2]), ntc.names[cl][2], false])
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  hsl: function (color) {

    let min, max, delta, h, s, l
    const [r, g, b] = [
      parseInt('0x' + color.substring(1, 3)) / 255,
      parseInt('0x' + color.substring(3, 5)) / 255,
      parseInt('0x' + color.substring(5, 7)) / 255
    ]

    min   = Math.min(r, Math.min(g, b))
    max   = Math.max(r, Math.max(g, b))
    delta = max - min
    l     = (min + max) / 2

    s = 0
    if(l > 0 && l < 1)
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l))

    h = 0
    if (delta > 0) {
      if (max == r && max != g) h += (g - b) / delta
      if (max == g && max != b) h += (2 + (b - r) / delta)
      if (max == b && max != r) h += (4 + (r - g) / delta)
      h /= 6
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)]
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  rgb: function(color) {
    return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))]
  },
  
  shadergb: function (shadename) {
    for (let i = 0; i < ntc.shades.length; i++) {
      if(shadename == ntc.shades[i][1])
        return "#" + ntc.shades[i][0]
    }
    return "#000000"
  },
  
  shades: require('./shades/en.json'),

  names: require('./colors/en.json')

}

module.exports = ntc
