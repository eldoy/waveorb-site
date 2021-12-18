## Pages

The pages are async Javascript functions that return HTML markup. They will be inserted into layouts if you are using that.

```js
module.exports = async function($) {
  // Set the name of the layout, defaults to 'default'
  $.page.layout = 'default',

  // The page title
  $.page.title = 'home'

  return /* html */`
    <h1>home</h1>
    <p>
      This is your page content.
    </p>
  `
}
```
The orb object `$` is sent through here and then sent to the layout. That means that the layout has access to anything you add to it in your page function. `$.page.title` and `$.page.description` are usually set here and used in the layout.

You can [set the layout](/doc/layout) of the page with `$.page.layout = 'name'`, where `name` corresponds to the file name in the `app/layouts` folder. Default is `app/layouts/default.js`.

The orb object `$` also contains the `$.page.name` property, which is the name of the current page you're on. It can be used together with `$.page.name` to determine the link of the current page and language:
```js
`<a href="${$.link($.page.name)}">`
```

### Page routes

The routes of your pages are defined by the folder structure under `app/pages`. A file in `app/pages/index.js` will be matched by `/` in the browser. If you want the route URL to be `/projects/list/` you place a file in `app/pages/projects/list/index.js`.

The file `app/pages/about.js` will have the route URL `/about` and the file `app/pages/projects/users.js` can be found at `/projects/users`.

Dynamic URLs can be achieved by using an underscore (`_`) in front of the folder name or the file name. For example, the structure `/posts/_id` will match the URL `/posts/hello` and `$.req.query.id` will have the value `hello` inside your page.

You can also have routes share the same page which is very convenient if you want to have your pages in multiple languages. Have a look at [the route config info](/doc/locales#route-config) for more on that.

### HTML
Create HTML tags using template literals, or include your own template library.
```js
`<div>Hello ${name}</div>`
```

You don't really need a HTML DOM library, but the examples uses [Haka,](/doc/haka) where you can find and manipulate HTML elements with `html`, `text`, `q` and `qa`, as well as cookie and form handling functions.

You can also use libraries like [JQuery](https://jquery.com) if you want, it's up to you.

### Page functions

Functions can be run on the server or in the browser. They can also be shared between server and browser. Functions using the DOM can't be run on the server, like `document.querySelector`, `alert` and `window`. Likewise, file access and NodeJS specific APIs don't run in the browser.

Functions that simply return strings or does plain Javascript can be shared. Let me show you how:
```js
module.exports = async function($) {
  function serverOnly() {
    // Do NodeJS stuff that doesn't run in the browser
    return `<div>server</div>`
  }

  function browserOnly() {
    // Do browser things
    return `<div>browser</div>`
  }

  function shared() {
    // Do things that work everywhere
    return `<div>shared</div>`
  }

  return /* html */`
    <h1>home</h1>
    <p>
      This is your home page.
      <!-- Call the shared function, happens on the server -->
      ${shared()}
      ${serverOnly()}
    </p>
    <script>
      // This will embed the functions in the HTML
      ${browserOnly}
      ${shared}

      // You can then call the functions
      browserOnly()

      // Happens in the browser
      shared()
    </script>
  `
}
```
This will allow you to control exactly what happens on the server and what happens in the browser. It is very useful for SEO and page speed. Create what you need on the server and load the rest from the browser.

### Components

It is easy to create functional components:
```js
// Some data from your server API
const items = ['Milk', 'Meat', 'Butter']

// Create the list component
function list(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`)}</ul>`
}

// Use the list component somewhere else
`<div>${list(items)}</div>`

// Will give you this
<div><ul><li>Milk</li><li>Meat</li><li>Butter</li></ul></div>
```

You can create a folder in `app/components` if you need to separate concerns:
```js
// Create a component in app/components/contactForm.js
module.exports = async function($) {
  return /* html */`
    <form>
      ...
    </form>
  `
}

// Include component in your page in app/pages
const contactForm = require('../components/contactForm.js')

module.exports = async function($) {
  return /* html */`
    <h1>Contact form</h1>
    <!-- Insert form component -->
    ${await contactForm($)}
  `
}
```
Properties (props) can be sent as normal javascript function arguments. The component is just a simple Javascript function that returns a string of HTML.
```js
// Prepare the function for receiving props
module.exports = async function($, props) {
  // Use the props
  return `Name: ${props.name}<br>Email: ${props.email}`
}

// With destructuring
module.exports = async function($, { name, email }) {
  // Use the props
  return `Name: ${name}<br>Email: ${email}`
}
```

### Markdown support

You can also use [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for your pages. This is a very nice option if you don't need a backend like for writing articles or static pages. In `app/pages` simply add a file ending in `.md`, for example `article.md`:

```markdown
# Article title
This is the articles content.
```

It will be converted to HTML automatically. Code snippets will be automatically syntax highlighted using [Prism](https://prismjs.com), just make sure you add the Prism CSS file to `app/assets/css` to make it work.

The title of the generated HTML page will be the same as the markdown file name. You can also add some data to the top of your Markdown file to override this:
```markdown
---
title: The new article title
description: Meta description for this article
---
```

### Cookies
Waveorb has cookie support for storing data between pages.
```js
// On the server
// Set cookie, expires in 30 days
$.req.cookie('name', 'hello')

// Set cookie with custom expiry in days
$.req.cookie('name', 'hello', 365)

// Get cookie
$.req.cookie('name')

// Delete cookie
$.req.cookie('name', '', -1)

// just remove the $.req in front using Haka in the browser
cookie('name', 'hello')
```

Read more about how to use cookies in the browser on [the Haka page.](https://github.com/eldoy/haka#cookies)

<div class="nav">
  <div><a href="/doc/how-it-works">&larr; How it works</a></div>
  <div><a href="/doc/actions">Actions &rarr;</a></div>
</div>