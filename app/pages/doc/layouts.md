## Layouts

Layouts surround [your pages](/doc/pages) and [mails](/doc/mail). It is where your title, head, nav and footer usually goes. You can have multiple layouts if you want.

You specify the layout to use in your page with `$.page.layout = 'blog'`, where `'blog'` is the name of the layout. In this case it would match the layout file `app/layouts/blog.js`. If none is specified, it defaults to `main`.

Mail layouts usually contain the signature and things you want included with every outgoing email.

This minimal example layout is based on the one found in `app/layouts/main.js` after running `waveorb create`, read the comments to see what each section does:
```js
// Layouts must export an async function($)
module.exports = async function($) {

  // Return the layout HTML as string
  return /* html */`
    <!doctype html>
    <!-- Set the language, default language is 'en' (English) -->
    <html lang="${$.lang}">
      <head>
        <!-- Meta tags go here -->
        <meta http-equiv="content-type" content="text/html; charset=utf-8">

        <!-- Set the page title with fallback -->
        <title>${$.page.title || '♥'} - Waveorb</title>

        <!-- Stylesheets and favicon from assets -->
        <link rel="stylesheet" href="/css/app.css" type="text/css">
        <link rel="icon" type="image/png" href="/img/favicon.png">
      </head>
      <body>

        <!-- The page content will be shown here -->
        <div class="main">${$.page.content}</div>

        <!-- Add scripts here -->
        <script src="/js/app.js"></script>
        <script src="/js/haka.js"></script>
      </body>
    </html>
  `
}
```

Mail layouts work in a similar way to page layouts. Read more [about mail layouts here.](/doc/mail#mail-layouts)

<div class="nav">
  <div><a href="/doc/filters">&larr; Filters</a></div>
  <div><a href="/doc/locales">Locales &rarr;</a></div>
</div>