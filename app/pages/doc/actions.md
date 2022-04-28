## Actions

Actions are async Javascript functions that run on your app server. They are primarily used for building APIs by receiving JSON data from the browser. This is usually where you use your database, send emails or other things that can't happen in the browser directly.

### Create JSON APIs

Creating a JSON API with Waveorb server actions is very easy and should be familiar if you've used NodeJS before. An action usually has a name instead of a URL path. The name is what you use with [the client](/doc/client) to access it.

AJAX, uploads and websockets all connect to the actions in the same way. This is how an action may look:
```js
module.exports = async function($) {
  await $.filters(['authenticate', 'login-required'])
  await $.validate({
    values: {
      project_id: {
        is: 'id',
        required: true
      },
      content: {
        min: 3,
        required: true
      }
    }
  })
  const { values = {} } = $.params
  return await $.db('comment').create(values)
}
```
Normally you run filters first, then validations and then the rest of the function.

Return or throw stops the execution flow and return data to the client as JSON data.

### Validations
Most of the time we need to validate the parameters sent to a server action. Here's a list of the built in validations:

```js
// This is the name of the parameter
query: {
  // Run validations on specified fields
  name: {
    required: true,  // this means can not be undefined
    eq: 5,           // Equal to
    ne: 5,           // Not equal to
    gt: 5,           // Greater than
    lt: 5,           // Less than
    gte: 5,          // Greater than or equal to
    lte: 5,          // Less than or equal to
    in: [1, 2, 3],   // Must be in list
    nin: [1, 2, 3],  // Must not be in list
    length: 5,       // Length of string must be
    min: 5,          // Minimum length of string
    max: 5,          // Maximum length of string
    match: /regex/,  // Must match regex
    unique: 'user',  // Unique field in db model
    exist: 'user',   // Check if model exists in db
    matcher: async function(val, $) {
      // Validation fails on truthy value
      if (!val) {
        return $.t('some_error')
      }
      // Return nothing or undefined to pass
    },
    is: 'boolean',   // Must be true or false
    is: 'string',    // Must be a string
    is: 'number',    // Must be a number, integer or decimal (float)
    is: 'integer',   // Must be an integer
    is: 'decimal',   // Must be a decimal number
    is: 'date',      // Must be a date
    is: 'id',        // Must be an id
    is: 'object',    // Must be an object
    is: 'array',     // Must an array
    is: 'email',     // Must be an email address
    is: 'undefined', // Must be undefined
    is: 'url'        // Must be a URL
  }
}
```

If the any of the validations doesn't pass, an error message is returned. Have a look at [the default translations](/doc/locales#default-translations) for a complete list of the messages.

The error message then looks like this, with each failing field and errors as an array:
```js
{
  error: { message: 'validation error' },
  query: { name: ['must be a URL'] }
}
```

### Full usage example

In `app/actions/project` create a file called `create.js` with the following content:
```js
module.exports = async function($) {
  await $.validate({
    values: {
      title: {
        required: true
      }
    }
  })
  return { status: 'OK' }
}
```

Then in one of your [app's pages](/doc/pages) use this HTML:
```html
<form onsubmit="return false">
  <label for="title">Title</label>
  <input id="title" type="text" name="title">
  <em class="error-title"></em>
  <button onclick="handleSubmit(this)">Save</button>
</form>

<script>
// Set up the Waveorb client
var api = waveorb('https://waveorb.com/api')

// Define your submit function
function handleSubmit(btn) {
  // Using the Haka form serializer to gather the data
  var values = serialize(btn.form)

  // Send the data to the action
  var result = await api('/project/create', { values })
  if (result.error) {
    // Join all the errors and display under the right input
    Object.keys(result.values).forEach(function(key) {
      text(`.error-${key}`, result.values[key].join(', '))
    })
  } else {
    // Redirect to project list
    window.location = '/projects'
  }
}
</script>
```

### Default actions

By default Waveorb comes with default actions built in so you can start development without worrying about your API design.

To set up your backend using default actions simply create an empty action file. If you need to save your data, create an empty file called `create.js` in `app/actions/model` and it just works.

The default actions are as follows:

#### Create action

Use this action when you want to create a new document.

```js
module.exports = async function($) {
  const { values = {} } = $.params
  return await $.db('model').create(values)
}
```

#### Update action

Use this action when you want to update a document.

```js
module.exports = async function($) {
  const { query = {}, values = {} } = $.params
  return await $.db('model').update(query, values)
}
```

#### Get action

Use this action when you want to get a single document.

```js
module.exports = async function($) {
  const { query = {}, fields = {} } = $.params
  return await $.db('model').get(query)
}
```

#### Find action

Use this action when you want to find documents. Supports fields, sort, skip and limit, and can be used for pagination.

```js
module.exports = async function($) {
  const { query = {}, fields = {}, sort = {}, skip = 0, limit = 0 } = $.params
  return await $.db('model').find(query, { fields, sort, skip, limit })
}
```

#### Count action

Use this action to count documents.

```js
module.exports = async function($) {
  const { query = {} } = $.params
  return { n: await $.db('model').count(query) }
}
```

#### Delete action

Use this action to delete documents.

```js
module.exports = async function($) {
  const { query = {} } = $.params
  return await $.db('model').delete(query)
}
```

The `model` in the database queries here are automatically replaced with the name of the directory your action file lives in.

Once you need to customize your backend, just write your own actions to replace the default ones.

### Web hooks

If you need to use Waveorb actions without the Waveorb client you can access your actions via URL too. If your action is in `app/actions/project/create.js`, you can access it via the URL `/api/project/create` using a `POST` request.

In development testing you remove the `/api` to make it just `/project/create`.

<div class="nav">
  <div><a href="/doc/pages">&larr; Pages</a></div>
  <div><a href="/doc/assets">Assets &rarr;</a></div>
</div>
