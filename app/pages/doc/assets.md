## Assets

The `app/assets` folder contains your static files like Javascript, CSS and images. It is public and should not contain files you don't want to share.

If your file is in `app/assets/file.js`, then it will be available at `http://localhost:5000/file.js`, the `app/assets` folder is at your URL root.

When you build your app with `waveorb build`, all the files here will be copied to the `dist` folder. The default setup with NGINX uses etags for caching so your cached content will always be fresh.

### Bundling and packing

When your app hits the browser it's important to speed things up by reducing the number of requests to the server. One of the techniques we can use is to pack all your assets into just one file.

Waveorb has automatic bundling of your CSS and Javascript files built right in. To enable it, add your bundle assets to the `app/config/assets.yml` file:
```yml
bundle:
  js:
    - /js/haka.js
    - /js/app.js
  css:
    - /css/reset.css
    - /css/app.css
```

Then in your layout, usually `app/layouts/default.js`, use the `$.script` and `$.style` functions:
```js
// For Javascript
${$.script('/bundle.js')}

// For CSS
${$.style('/bundle.css')}
```

This will produce a list of HTML tags in the order you specified if you are in development, or a single tag if you are in production mode or running a build:
```html
<!-- In development mode -->
<script src="/js/haka.js"></script>
<script src="/js/app.js"></script>

<link href="/css/reset.css" rel="stylesheet" type="text/css">
<link href="/css/app.css" rel="stylesheet" type="text/css">

<!-- Not in development mode -->
<script src="/bundle.js"></script>

<link href="/bundle.css" rel="stylesheet" type="text/css">
```

You can also use the `script` and `style` functions instead of HTML tags as a convenience:
```js
${$.script('/js/app.js')}
${$.style('/css/app.css')}
```

Will give you this HTML markup:
```html
<script src="/js/app.js"></script>
<link href="/css/app.css" rel="stylesheet" type="text/css">
```

It also works for multiple assets:
```js
${$.script('/js/haka.js', '/js/waveorb.js', '/js/app.js')}
${$.style('/css/reset.css', '/css/app.css')}
```

This will create tags for all of them in the order specified.

<div class="nav">
  <div><a href="/doc/actions">&larr; Actions</a></div>
  <div><a href="/doc/config">Config &rarr;</a></div>
</div>