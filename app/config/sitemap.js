const path = require('path')
const root = path.join(process.cwd(), 'app', 'pages')
const files = require('extras').tree('app/pages').map(f => {
  return f.replace(root, '').replace(/\.(md|js)/, '.html')
})

const urls = [
  { url: '/', lastmodfile: 'dist/index.html', changefreq: 'daily', priority: 1.0 },
  { url: '/about.html', lastmodfile: 'dist/index.html', changefreq: 'weekly', priority: 0.6 }
]

files.forEach(function(url) {
  urls.push({ url, lastmodfile: 'dist/index.html', changefreq: 'weekly', priority: 0.5 })
})

module.exports = { hostname: 'https://waveorb.com',  urls }