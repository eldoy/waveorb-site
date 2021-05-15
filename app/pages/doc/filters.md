## Filters

The filters are run before your server actions. They are async Javascript functions that can be used to check login status, do logging or other setup. They can also return data directly to bypass the server actions.

For example, add a file in `app/filters/authenticate.js` with the following content:
```js
module.exports = async function($) {
  // Check for token in cookies
  const token = $.req.cookie('token')

  // Find session in database
  const session = await $.app.db('session').get({ token })
  if (session && session.user_id) {
    // Put data in '$' and use it in the server action later
    $.user = await $.app.db('user').get({ _id: session.userId })
  }
  // Continue to next filter or server action
}
```

Add another file in `app/filters/admin.js`:
```js
module.exports = async function($) {
  // Use the $.user value from the previous filter
  if (!$.user || !$.user.admin) {
    // Return error to return error message
    return { error: { message: 'must be an admin' } }
  }
  // Continue to next filter or server action
}
```

In the server action you use the filters like this:
```js
module.exports = {
  // Run the filters in order
  filters: ['authenticate', 'admin'],

  // The main function is only reached if filters are passed
  main: async function($) {
    return await $.app.db('project').create($.params.data)
  }
}
```