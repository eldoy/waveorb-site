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
              <a href="${$.link('index')}" title="Home page">
                <img src="/img/waveorb-sideways.svg" height="56" width="146" alt="waveorb home logo">
              </a>
            </div>
            <div>
              <a href="${$.link('docs')}" title="Documentation">docs</a>
              <a href="${$.link('about')}" title="About page">about</a>
              <a href="https://github.com/eldoy/waveorb" title="Source Code">code</a>
            </div>
          </nav>
        </header>
        <script>setActiveLink()</script>
        <main>${$.page.content}</main>
      </body>
    </html>
  `
}
