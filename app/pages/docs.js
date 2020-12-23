const markdown = require('../lib/markdown.js')

module.exports = async function($) {
  $.page.title = 'Waveorb Documentation'
  return markdown('docs')
}
