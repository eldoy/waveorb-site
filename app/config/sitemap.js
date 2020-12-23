const files = require('../lib/files.js')

const urls = [
  { url: '/', lastmodfile: 'dist/index.html', changefreq: 'daily', priority: 1.0 },
  { url: '/about.html', lastmodfile: 'dist/index.html', changefreq: 'weekly', priority: 0.6 }
]

files.forEach(function(url) {
  urls.push({ url, lastmodfile: 'dist/index.html', changefreq: 'weekly', priority: 0.5 })
})

module.exports = { hostname: 'https://waveorb.com',  urls }