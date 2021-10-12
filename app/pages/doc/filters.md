## Filters

The filters are run before your server actions. They are async Javascript functions that can be used to check login status, do logging or other setup. They can also return data directly to bypass the server actions.

For example, add a file in `app/filters/authenticate.js` with the following content:
```js
module.exports = async function($) {
  // Check for token in cookies
  const token = $.req.cookie('token')

  // Find session in database
  const session = await $.db('session').get({ token })
  if (session && session.user_id) {
    // Put data in '$' and use it in the server action later
    $.user = await $.db('user').get({ _id: session.userId })
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
module.exports = async function($) {
  // Run the filters in order
  await $.filters(['authenticate', 'admin'])

  // The rest of the function is only reached if filters are passed
  return await $.db('project').create($.params.data)
}
```

<div class="nav">
  <div><a href="/doc/config">&larr; Config</a></div>
  <div><a href="/doc/layouts">Layouts &rarr;</a></div>
</div>