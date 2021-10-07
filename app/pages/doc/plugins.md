## Plugins

Plugins lets you insert functions, libraries and properties into the `$` object. They are useful for inserting database connections, loggers and other libraries to make them available everywhere in your app.

Add your plugins in the `app/plugins` folder:
```js
// Add libraries here if needed
const database = require('mongowave')

module.exports = async function(app) {
  return await database.connect()
}
```

The plugin can then be used in your pages, layouts, mails, filters and actions, anywhere the orb object `$` is available:
```js
const result = await $.db('project').create({ name: 'infinity' })
```

<div class="nav">
  <div><a href="/doc/middleware">&larr; Middleware</a></div>
  <div><a href="/doc/client">Client &rarr;</a></div>
</div>