## Environment

### App environments
By default when developing locally, Waveorb apps runs with `NODE_ENV=development`. Once the app has been deployed, it changes to `NODE_ENV=production`. The `NODE_ENV` variable can be accessed through `process.env.NODE_ENV`, and can be used to set different ports, hosts or other variables in your app.
```js
var host = process.env.NODE_ENV === 'production'
  ? 'https://example.com'
  : 'http://localhost:5000'
```

### Env variables
The default location for your configuration is in `app/config`. Here you can add JSON, YAML or Javascript files returning objects with your app settings.

For example you can add a file in `app/config/env.yml` like this:
```yaml
lang: es
```
This sets the default language to Spanish `es`, but the file can contain any values you want. These files can be infixed with the app environment value and be picked up instead. Add a file called `app/config/env.production.yml` and it will be loaded instead if `NODE_ENV=production`.

This is useful if you need to set up different variables for each environment like the address of your database server, passwords and similar.

### HTML embedded variables
Instead of hard coding variables into your HTML you can use the `$.env` function. It works on the app object and lets you insert any property on it in your HTML:
```js
`<div>${$.env('app.config.payment.public_key')}</div>`
```

### Built in variables
Waveorb has a few built in environment variables you can use:

* __WAVEORB_PORT__ - sets the app server port, default: _5000_
* __WAVEORB_HOST__ - sets the app server host, default: _http://localhost_
* __WAVEORB_LANG__ - set the default language, default: _en_
* __WAVEORB_SSL_CERT__ - set the location of the SSL certificate
* __WAVEORB_SSL_KEY__ - set the location of the SSL private key

Use them by exporting them to your system:
```bash
# Set the app server port to 4000
export WAVEORB_PORT=4000
```
and then accessing them in your app, here with fallback:
```js
var port = process.env.WAVEORB_PORT || 5000
```

<div class="nav">
  <div><a href="/doc/seo-and-marketing">&larr; SEO and marketing</a></div>
  <div><a href="/doc/libraries">Libraries &rarr;</a></div>
</div>