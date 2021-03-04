module.exports = async function($) {
  return /* html */`
    <!doctype html>
    <html lang="en">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Waveorb - Javascript framework for creating incredible web apps">
        <title>${$.page.title || '♥'} - Waveorb</title>
        <link rel="icon" type="image/png" href="/img/favicon.png">
        ${$.script('/bundle.js')}
        ${$.style('/bundle.css')}
        <link rel="stylesheet" href="/css/prism.css" type="text/css" media="print" onload="this.media='all'">
        ${process.env.NODE_ENV == 'development' ? $.script('/js/dev.js') : ''}
      </head>
      <body>
        <header>
          <nav>
            <div>
              <a class="navbar-homelink" href="/">
                <img class="navbar-logo-badge" src="/img/waveorb-badge.svg" alt="Waveorb badge">
                <img class="navbar-logo-text" src="/img/waveorb-textonly.svg" alt="Waveorb header">
              </a>
            </div>
            <div>
              <a class="navlink" href="/about.html">about</a>
              <a class="navlink" href="/docs.html">docs</a>
            </div>
            <script>
              document.querySelectorAll('nav a').forEach(function(a) {
                if (a.pathname == location.pathname) {
                  a.classList.add('active-link')
                }
              })
            </script>
          </nav>
        </header>
        <main>${$.page.content}</main>
      </body>
    </html>
  `
}
