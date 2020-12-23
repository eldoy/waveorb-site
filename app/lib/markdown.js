const fs = require('fs')
const fspath = require('path')
const marked = require('marked')
const Prism = require('prismjs')

// Load all languages
require('prismjs/components/')()

// List available languages:
// console.log(Object.keys(Prism.languages))

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang = 'md') {
    return Prism.highlight(code, Prism.languages[lang], lang)
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

module.exports = function(name) {
  const path = fspath.join(__dirname, '..', 'markdown', `${name}.md`)
  try {
    const md = fs.readFileSync(path, 'utf-8')
    return marked(md)
  } catch(e) {
    return '<h1>Not found...</h1><p>Try another link, this one is not working.</p>'
  }
}
