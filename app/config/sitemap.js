const path = require('path')
const { tree } = require('extras')
const root = path.join(process.cwd(), 'app', 'pages')
const files = tree('app/pages').map(f => {
  return f.replace(root, '').replace(/\.(md|js)/, '.html')
})

const lastmodfile = 'app/pages/index.js'
const urls = [
  { url: '/', lastmodfile, changefreq: 'daily', priority: 1.0 },
  { url: '/about.html', lastmodfile, changefreq: 'weekly', priority: 0.6 }
]

files.forEach(function(url) {
  urls.push({ url, lastmodfile, changefreq: 'weekly', priority: 0.5 })
})

module.exports = { hostname: 'https://waveorb.com',  urls }
