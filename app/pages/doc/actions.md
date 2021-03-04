## Actions

Actions are async Javascript functions that run on your app server. They are primarily used for receiving and sending JSON data to and from the browser. This is usually where you use your database, send emails or other things that can't happen in the browser.

### Create JSON APIs

Creating a JSON API with Waveorb server actions is very easy and should be familiar if you've used NodeJS before. An action usually has a name instead of a URL path. The name is what you use with [the client](/doc/client.html) to access it.

AJAX, uploads and websockets all connect to the actions in the same way. This is how an action may look:
```js
// Add your actions to this object
const actions = {}

// The action name can be whatever you want
actions.createProjectAsAdmin = {

  // Filters are run in the order you define them
  filters: ['user', 'admin'],

  // Before is being run after the filters and before validation
  before: async function($) {
    console.log('Before validation')
  },

  // Validations for parameters
  validation: {
    data: {
      name: {
        required: true
      }
    }
  }

  // Main is being run after validation
  main: async function($) {
    // Send result by return or put in '$.result'
    $.result = await $.app.db('project').insert($.params.data)
  },

  // After is being run after the main function
  after: async function($) {
    console.log('Request done')
  }
}

// Export the action object so Waveorb can pick it up
module.exports = actions
```
First filters are run, then before, validations, main and after. In any of the functions you can add to the orb object `$` for use later. Adding to the special `$.result` will return the value of that property, unless you do a return or throw before that.

If you do a return in the main function, then after will not be run. Return or throw stops the execution flow and return data to the client. As each of the functions are async functions, you can fetch data and wait for it anywhere.

### Validations
Most of the time we need to validate the parameters sent to a server action. Here's a list of the built in validations:

```js
// This is the name of the parameter
data: {
  // Run validations on data values
  name: {
    required: true, // this means can not be undefined
    eq: 5,          // Equal to
    ne: 5,          // Not equal to
    gt: 5,          // Greater than
    lt: 5,          // Less than
    gte: 5,         // Greater than or equal to
    lte: 5,         // Less than or equal to
    in: [1, 2, 3],  // Must be in list
    nin: [1, 2, 3], // Must not be in list
    length: 5,      // Length of string must be
    minlength: 5,   // Minimum length of string
    maxlength: 5,   // Maximum length of string
    match: /regex/, // Must match regex
    matcher: async function(val, $) {
      // Validation fails on truthy value
      if (!val) {
        return $.t('some_error')
      }
      // Return nothing or undefined to pass
    },
    is: '$boolean', // Must be true or false
    is: '$string',  // Must be a string
    is: '$number',  // Must be a number, integer or decimal (float)
    is: '$integer', // Must be an integer
    is: '$decimal', // Must be a decimal number
    is: '$date',    // Must be a date
    is: '$id',      // Must be an id
    is: '$object',  // Must be an object
    is: '$array',   // Must an array
    is: '$email',   // Must be an email address
    is: '$url'      // Must be a URL
  }
}
```

If the data doesn't validate, an error message is returned. Have a look at [the default translations](/doc/locales.html#default-translations) for a complete list of the messages.

The error message then looks like this, with each failing field and errors as an array:
```js
{ error: { message: 'validation error' }, name: ['must be a URL'] }
```

### Full usage example

In `app/actions` create a file called `user-actions.js` with the following content:
```js
const actions = {}
actions.userCreate = {
  validate: {
    data: {
      email: {
        is: '$email'
      }
    }
  },
  main: async function($) {
    // Handle password reset here
    return { status: 'OK' }
  }
}
```

Then in one of your [app's pages](/doc/pages.html) use this HTML:
```html
<form onsubmit="handleSubmit(this); return false">
  <label for="email">Enter your email</label>
  <input id="email" type="text" name="email">
  <div class="error error-email"></div>
  <button>Submit</button>
</form>

<script>
// Set up the Waveorb client
var api = waveorb('https://waveorb.com/api')

// Define your submit function
function handleSubmit(form) {
  // Using the Haka form serializer to gather the data
  var data = serialize(form)

  // Send the data to the action
  var result = await api('createUser', { data })
  if (result.error) {
    // Join all the errors and display under the right input
    Object.keys(result.data).forEach(function(key) {
      text(`.${key}-error`, result.data[key].join(', '))
    })
  } else {
    // Redirect to login
    window.location = '/login.html'
  }
}
</script>
```
