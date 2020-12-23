const fs = require('fs')
const fspath = require('path')

const base = fspath.join(process.cwd(), 'app', 'markdown', 'doc')
const files = fs.readdirSync(base).map(f => `/doc/${f.replace('.md', '')}.html`)

module.exports = files