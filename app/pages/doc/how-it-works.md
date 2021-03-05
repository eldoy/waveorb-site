## How it works

Layouts and pages are javascript files that must export an async function that returns a string of HTML.

A minimal page looks like this, stored in the `app/pages` folder:
```js
module.exports = async function($){
  $.page.title = 'Hello world'
  return /* html */`
    <h1>Hello World!</h1>
  `
}
```
This function returns an HTML string in backticks. These are [Javascript template literals.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) They are a new feature of Javascript ES6 which is what we use to create HTML.

Of course you don't have to use backticks, any string will do, but it is convenient when you want to return HTML. Adding the `/* html /*` comment in front of the backtick will let your editor know it's HTML and add [syntax highlighting.](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)

When you start your app with `waveorb serve`, or if you're using the [nodemon script](/doc/getting-started.html) with `npm run serve`, everything in the `app` folder will be [loaded](https://github.com/eldoy/waveorb-core/blob/master/lib/loader.js) into the `app` object.

### The orb object
The page function receives a single object, the orb object `$`, which contains all of your built in properties and functions:

* `$.app` - Your entire app as an object
* `$.params` - Parameters you sent from the client
* `$.query` - Query parameters from the URL
* `$.files` - Uploaded files as an array
* `$.req` - Request object, a NodeJS [http.ServerResponse instance](https://nodejs.org/api/http.html#http_class_http_serverresponse)
* `$.res` - Response object, a NodeJS [http.ClientRequest instance](https://nodejs.org/api/http.html#http_class_http_clientrequest)
* `$.socket` - Socket object from the [ws project](https://github.com/websockets/ws)
* `$.server` - Underlying [server object](https://github.com/eldoy/sirloin)
* `$.tools` - Built in [tools you may need](https://github.com/eldoy/extras)
* `$.lang` - The request language like `en` or `no`, two character ISO code.
* `$.link` - Link translation function
* `$.t` - Language translation function
* `$.env` - Environment variable substitution

Anything you add to the orb object `$` will be available later. For example, the `$.page.title` will be available in your layout. Later we will show how it is also used with filters, actions and plugins.

### Return values

Middleware, filters and server action functions can all return data. If they return an object, string or `false`, execution is halted. If they don't return anything or `undefined`, execution continues.

```js
async function($) {
  // Return object
  return { status: 'OK' }

  // Return a string
  return 'OK'

  // Returns empty string
  return false

  // Continue execution if more to do (default)
  return undefined

  // Throw error to return error message
  throw Error('must be an admin')

  // or return an error like this
  return { error: { message: 'must be admin', name: 'authError' } }
}
```
The server will return a `200 SUCCESS` status code no matter what happens.

### Error messages
Code errors and exceptions will also return a 200, but the response will contain an object with the property `error` set:
```js
// Error message
{ error: { message: 'Some error', name: 'Error', stack: 'line1...' } }
```

The only time you will get something else than a 200 is when a page is not found, then you will get a 404 status code and response.
