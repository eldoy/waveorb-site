## Client

To communicate with the server, use [the Waveorb Client.](https://github.com/eldoy/waveorb-client)

### Install

```bash
npm i waveorb-client
```

### Usage

The Waveorb client is included when you use `waveorb create` to make an application. If you're setting it up from scratch, copy the [/dist/waveorb-min.js](https://raw.githubusercontent.com/eldoy/waveorb-client/master/dist/waveorb-min.js) file to `app/assets/js` and include it in your layout:
```html
<script src="/js/waveorb-min.js"></script>
```
or add it to your `app/config/assets.yml` file to bundle it.

For use on the server or the command line:
```js
const waveorb = require('waveorb-client')

const api = waveorb('https://example.com/api')
```

The `/api` at the end is used if you used [Waveorb server](https://github.com/eldoy/waveorb-server) to set up your production server.

Import the Waveorb client like this if you're using Webpack:
```js
// Include in webpack app
import waveorb from 'waveorb-client'
const api = waveorb('http://localhost:5000')
```
It works the exact same way in the browser as on the server, it is isomorphic.

### HTTP Ajax

The most common way to use the client is over async HTTP Ajax. It initiates a new connection on each request, and gets a result back from your [server API actions.](/doc/actions)

Set it up like this:
```js
// Set up HTTP connection
var api = waveorb('http://localhost:5000')

// HTTP with SSL
var api = waveorb('https://localhost:5000')

// Send through http
var result = await api({
  action: 'project/create',
  values: { name: 'Celebration' }
})
```

### Websockets

When using websockets you set up a single connection which is re-used for each new request. This has the advantage of being a bit faster and allows you to send data from the server to the browser whenever you need to or multiple times per request. As such it is perfect for subscriptions or real-time data.

Waveorb websockets automatically reconnects on failure, set it up like this:
```js
// Websocket with SSL, needs to await connection
window.socket = await waveorb('wss://localhost:5000')

// Use Promises if you're not in an async function
waveorb('wss://localhost:5000').then(function(socket) {
  window.socket = socket
})

// Set up websocket connection, with default options shown
var socket = await waveorb('ws://localhost:5000', {
  // Reconnect timeout in ms, set to false to not automatically reconnect
  reconnect: 1000
})

// Listen for close events
socket.on('close', (event) => {
  console.log('Connection closed')
})

// Listen for error events
socket.on('error', (event) => {
  console.log('Connection error')
})

// This is where you receive messages
socket.on('message', (data, event) => {
  console.log('Received message', data)
})

// Send values to the 'project/create' action
socket.send({
  action: 'project/create',
  values: { name: 'Festival' }
})
```
The Waveorb client for websockets is based on the [wsrecon library.](https://github.com/eldoy/wsrecon)

In your action on the server, you can find your websocket connections like this:
```js
module.exports = async function($) {
  // ...
  const clients = $.server.websocket.clients
  // ...
}
```

### Connecting client and server
The action name and parameters in the client matches the server action name and validation. If your server action looks like this:
```js
// app/actions/project/create.js
module.exports = async function($) {
    // The values parameter will be validated like this
  await $.validate({
    values: {
      name: {
        is: 'string'
      }
    }
  })

  // The values parameter is available in $.params:
  $.params.values

  // Extract like this
  const { values } = $.params

  // Create new project and return the result
  return await $.db('project').create(values)
}
```
then from the browser, run the action on the server like this and validate the `values` parameter:
```js
const result = await api({
  action: 'project/create',
  values: { name: 'Hello' }
})
```

### Uploads

Uploads are dead simple. Just attach it to a click event in the browser and pass the upload input's files as options.

Create the upload handler:
```js
// Upload from browser
function handleUpload() {
  var input = q('input[type="file"]')
  var urls = await api('/upload/create', {}, { files: input.files })
}
```

Create the HTML input element:
```html
<input type="file" onchange="handleUpload()" onclick="this.value=''">
```

To track the progress, do this:
```js
var urls = await api('/upload/create',
  {}, // Empty params
  {
    files: input.files,
    progress: function(event) {
      var { loaded, total, percent } = event
    }
  }
)
```

Options for accept types and selecting multiple files can be be specified like this on the input element, as is just standard HTML:
```html
<input ... multiple accept="image/*">
```

The files will be available in `$.files` on the server:
```js
// Array of files, stored in the tmp folder
$.files
```

You can also upload from a script or the command line:
```js
const waveorb = require('waveorb-client')
const api = waveorb('https://example.com/api')

// Use the files option to upload to your server
const urls = await api('/upload/create',
  {}, // Empty params
  { files: ['app/assets/file.png'] }
)
```
You can upload multiple files by adding more names to the files array.

### CDN, thumbnails and resize

You can set up image manipulation on the server using the [dugg library](https://github.com/eldoy/dugg), in case you want to auto-resize, crop and create thumbnails of your images. It uses [Jimp](https://github.com/oliver-moran/jimp) for this behind the scenes.

Dugg can also upload your files to [Amazon S3.](https://aws.amazon.com/s3/) and return the CDN URLs:
```js
// Set up dugg for upload to Amazon S3
const dugg = require('dugg')({
  key: 'amazon_key',
  secret: 'amazon_secret',
  bucket: 'amazon_bucket'
})

// Jimp options
const config = {
  resize: [120, 120],
  greyscale: []
}

// Convert files
await dugg.convert($.files, config)

// Upload files to CDN
const urls = await dugg.upload($.files)

// Or alternatively in one line
const urls = await dugg.upload($.files, config)

// Return URLs to client
return urls
```

<div class="nav">
  <div><a href="/doc/plugins">&larr; Plugins</a></div>
  <div><a href="/doc/haka">Haka &rarr;</a></div>
</div>