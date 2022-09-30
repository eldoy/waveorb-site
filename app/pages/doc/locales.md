## Locales

Locales are the language translations of your app. Each translation lives in a YAML file with the language ISO code as file name.

To add a translation create a file in `app/locales`, for example `es.yml`. Add keys and values to it:
```yaml
pages:
  home:
    hello: hola
  about:
    bye: adios
    number: numero %s %s
```

Using the `$.t` function, you can look up the values of the translations:
```js
// Will return 'hola'
$.t('pages.home.hello')

// Will return 'adios'
$.t('pages.about.bye')

// Interpolation, will return 'numero 5 3'
$.t('pages.about.number', 5, 3)
```

There are several ways to set your language:

1. In the config file.
2. Via a cookie.
3. Via a parameter.
4. Via the URL.
5. Via the WAVEORB_LANG environment variable.

The default language is English `en`. To change the default language, add an entry in `app/config/env.yml` with value `lang: es`. Now `es` will be the default language.

You can also set the language via a cookie. If you're using [haka,](https://github.com/eldoy/haka) you can set the language in the browser via the `cookie` function: `window.cookie('lang', 'es')`. Now the language will be `es` until you close the browser.

To check the current language, you can use `window.cookie('lang')` in the browser, or `$.req.cookie('lang')` on the server. The short cut for this on the server is `$.lang`.

Using the Waveorb client, you can set the language via the `lang` parameter like this: `await action('someAction', { lang: 'en' })`

The most common way to set the language is via the URL. If you prefix your URL with the language like this: `/es/about` or just `/es/`, then the language will be set to `es`.

Finally, you can use the `WAVEORB_LANG` environment variable to set the default language of your app:
```bash
# Set the default language for your app
export WAVEORB_LANG=en
```

If you're using systemd on your server to run your Waveorb app, like when you use the `waveorb install` command, then this must be set in the systemd service file:
```md
Environment=WAVEORB_LANG=en
```

### Route config
The route config contains options for your page routes. To make route translations be more flexible, you can use the routemap option. The routes in the routemap will take presedence over the routes on disk.

The route config goes in the `app/config/routes.yml` file:
```yaml
# Map '/' to 'pages/index.js' English (en)
get#/: en@index

# Map '/es/' to 'pages/index.js' Spanish (es)
get#/es/: es@index

# Map '/about' to 'pages/about.js' English (en)
get#/about: en@about

# Map '/es/sobre' to 'pages/about.js' Spanish (es)
get#/es/sobre: es@about
```

### The $.link function

To make links work properly based on the current language, use the `$.link` function. It takes the name of the page:
```js
`<a href="${$.link('index')}>`
`<a href="${$.link('about')}>`
```

The HTML above will give you this:
```html
<!-- If language is 'en' -->
<a href="/">
<a href="/about">

<!-- If language is 'es' -->
<a href="/es/">
<a href="/es/sobre">
```

You can force the language like this:
```js
`<a href="${$.link('es@index')}>`
```

If your link is dynamic, use this syntax:
```js
`<a href="${$.link('es@_day/_month/', '05', '12')}>`
```

which will give you this:
```html
<a href="/es/05/12">
```

The links can also include parameters and hash:
```js
`<a href="${$.link('es@index?page=hello')}>`
`<a href="${$.link('es@index#about')}>`
`<a href="${$.link('es@index?page=hello&_id=1#about')}>`
```

### Default translations

Here are the built in default error messages for English `en`. They can be overridden by adding them to your locales in `app/locales/en.yml`:
```yml
validation:
  error: validation error
  field: field error
  unique: has been taken
  exist: does not exist
  required: is required
  eq: must be equal to %s
  ne: must not be equal to %s
  gt: must be greater than %s
  lt: must be less than %s
  gte: must be greater than or equal to %s
  lte: must be less than or equal to %s
  in: must be one of %s
  nin: must not be one of %s
  length: length must be %s
  min: minimum length is %s
  max: maximum length is %s
  match: "must match '%s'"
  is: must be %s
  isnt: must not be %s
  boolean: boolean
  string: string
  number: number
  integer: integer
  decimal: decimal
  date: date
  id: id
  object: object
  array: array
  email: email
  url: URL
  undefined: undefined
  null: 'null'
```

Copy this to your other locale files in `app/locales` and translate them to make them work with your language.

<div class="nav">
  <div><a href="/doc/layouts">&larr; Layouts</a></div>
  <div><a href="/doc/mail">Mail &rarr;</a></div>
</div>