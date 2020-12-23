const files = require('./app/lib/files.js')
module.exports = async function() {
  const urls = files.concat('/', '/docs.html', '/about.html')
  return {
    host: 'http://localhost:5000',
    urls
  }
}
