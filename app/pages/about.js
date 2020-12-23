const markdown = require('../lib/markdown.js')

module.exports = async function($) {
  $.page.title = 'About Waveorb'
  return markdown('about')
}