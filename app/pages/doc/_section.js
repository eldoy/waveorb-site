const markdown = require('../../lib/markdown.js')

module.exports = async function($) {
  const section = $.query.section
  $.page.title = (section[0].toUpperCase() + section.slice(1)).replace(/-/g, ' ')
  return markdown(`doc/${section}`)
}
