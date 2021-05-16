## Plugins

Plugins lets you insert functions, libraries and properties into the app object. They are useful for inserting database connections, loggers and other libraries to make them available everywhere in your app.

Add your plugins in the `app/plugins` folder:
```js
// Add libraries here if needed
const database = require('mongowave')

module.exports = async function(app) {
  app.db = await database.connect()
}
```

The plugin can then be used in your pages, layouts, mails, filters and actions, anywhere the `$` or app objects are available:
```js
const result = await $.app.db('project').create({ name: 'infinity' })
```

<div class="nav">
  <div><a href="/doc/middleware.html">&larr; Middleware</a></div>
  <div><a href="/doc/client.html">Client &rarr;</a></div>
</div>