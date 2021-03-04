## Middleware

Server middleware are async Javascript functions that are run before each request on the server. They are run before each AJAX request, and once when connecting to a web socket.

These are great for logging, authentication, rate limiting and other things you need on the server. You can use them to bypass your server filters and actions.

Example file in `app/middleware/logger.js`:
```js
module.exports = async function(req, res) {
  console.log(req.pathname)
}
```

You can control the order of the middleware by prefixing them with a number or naming them alphabetically: `1-logger.js`, `2-cache.js`.
