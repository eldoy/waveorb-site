## How it works

In the browser, a minimal page looks like this, stored in `app/pages/hello.js`:
```js
module.exports = async function($){
  $.page.title = 'Hello world'
  return /* html */`
    <h1>Hello World!</h1>
  `
}
```
Access this page at `/hello.js` in your browser. The `app/pages` directory is your app's web root.

This function returns an HTML string in backticks. These are [Javascript template literals.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) They are a new feature of Javascript ES6 which is what we use to create HTML.

Of course you don't have to use backticks, any string will do, but it is convenient when you want to return HTML. Adding the `/* html */` comment in front of the backtick will let your editor know it's HTML and add [syntax highlighting.](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)

When you start your app with `waveorb serve`, or if you're in development using `npm run dev`, everything in the app folder will be loaded into the app object.

### The orb object
The page function receives a single object, the orb object `$`, which contains all of your built in properties and functions:

* __$.app__ - Your entire app as an object
* __$.params__ - Parameters you sent from the client
* __$.query__ - Query parameters from the URL
* __$.files__ - Uploaded files as an array
* __$.req__ - Request object, a NodeJS [http.ServerResponse instance](https://nodejs.org/api/http.html#http_class_http_serverresponse)
* __$.res__ - Response object, a NodeJS [http.ClientRequest instance](https://nodejs.org/api/http.html#http_class_http_clientrequest)
* __$.socket__ - Socket object from the [ws project](https://github.com/websockets/ws)
* __$.server__ - Underlying [server instance](https://github.com/eldoy/furu)
* __$.tools__ - Built in [tools you may need](https://github.com/eldoy/extras)
* __$.lang__ - The request language like _en_ or _no_, two character ISO code.
* __$.link__ - Link translation function
* __$.t__ - Language translation function
* __$.env__ - Environment variable substitution
* __$.redirect__ - Redirect request

Anything you add to the orb object `$`, either during the request or with plugins, will be available later. For example, the `$.page.title` will be available in your layout. Later we will show how it is also used with [filters](/doc/filters), [actions](/doc/actions) and [plugins.](/doc/plugins)

### Return values

On the server, [middleware](/doc/middleware), [filters](/doc/filters) and [actions](/doc/actions) return data. If they return an object, string or false, execution is halted and the result is sent back to your page in the browser. If they don't return anything (undefined), execution continues.

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

<div class="nav">
  <div><a href="/doc/getting-started">&larr; Getting started</a></div>
  <div><a href="/doc/pages">Pages &rarr;</a></div>
</div>