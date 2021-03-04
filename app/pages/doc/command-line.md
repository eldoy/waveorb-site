## Command line
When you run `npm i -g waveorb` you get the `waveorb` command available in your terminal. Run it without arguments or do `waveorb help` and you'll see a list of available commands:
```md
boot       Boot a VPS server
install    Install VPS server
update     Update VPS server
create     Create new app
deploy     Deploy app to VPS
serve      Start app server
build      Build app to dist
sitemap    Create sitemap
ping       Ping search engines
generate   Generate templates
translate  Translate locales
get        Download app server
cmd        Run command line console
help       Display this help text
```

Let's go through each of these and explain what they do.

### Boot
This tool installs a Debian 10 server on a [Vultr VPS](https://vultr.com) with Nginx, node, npm, letsencrypt, zsh, firewall (ufw), mongodb and Waveorb.

Static files are handled by Nginx, which has support for asset caching, brotli compression, https and http2. All processes are handled by `systemd`.

To set it up, create a file called `sverd.json` in your root folder. Add your SSH public key to your Vultr account and replace the `ssh` field with your ssh script id. Finally, replace `api` in the config file with your Vultr API key.
```js
{
  "domain": "waveorb.com",
  "label": "waveorb",
  "hostname": "waveorb",
  "api": "VULTR_API_KEY",
  "os": 352,
  "region": 7,
  "plan": 201,
  "ssh": "5ba4f7cab05d7",
  "desc": "Waveorb server",
  "names": "waveorb.com www.waveorb.com",
  "dir": "/var/www/waveorb",
  "exec": "server-linux",
  "pass": "http://localhost",
  "port": 5000,
  "cert": "/etc/letsencrypt/live/waveorb.com/fullchain.pem",
  "key": "/etc/letsencrypt/live/waveorb.com/privkey.pem",
  "certopt": "--dry-run",
  "email": "hello@waveorb.com",
  "domains": [
    "waveorb.com",
    "www.waveorb.com"
  ]
}
```

After running `waveorb boot`, the IP address of your VPS server will be stored in your `sverd.json` file. It is used later for the other Waveorb commands. Remember to not check in this file into public git repositories, the API key is secret.

You can always log into the VPS server and manage it manually with `ssh root@123.321.12.21`, just replace the IP address with your own.

### Install

Run `waveorb install` for each app you want to install on the VPS server. This can only be done after `waveorb boot` has been run. It uses the same `sverd.config` file as above.

For each app you install, make sure you set a different port number or your backend service will fail.

### Update

The `waveorb update` command simply updates the software on the VPS server.

### Create

`waveorb create` creates a new app skeleton for you by downloading the [waveorb templates](https://github.com/eldoy/waveorb-templates) and copying them to your hard drive. It takes two parameters:
```bash
# Specify the name
waveorb create myapp

# Specify the template name, the default name is 'default'
waveorb create myapp default
```
The default application is a fully working app with pages, layouts, actions, uploads, login, payment and much more. Read through the source code to learn more. Remove the things you don't need.

### Deploy
The `waveorb deploy` command copies `app`, `dist`, `package.json` and `package-lock.json` files to the VPS server. It then runs `npm install` and restarts the app.

### Serve
`waveorb serve` starts the development server from [waveorb core.](https://github.com/eldoy/waveorb-core) It can be used with `nodemon` if you want to restart it automatically when you save a file:
```bash
# Install nodemon
npm i -g nodemon

# Start the development server
nodemon -e js,json,yml -x waveorb serve
```

### Build
Running `waveorb build` will build static HTML pages of your app and copy your assets to the `dist` folder. It saves the response from a running app server based on the configuration in the `build.js` file, so make sure your [server is running](/doc/getting-started) at the host you specify.
```js
module.exports = async function() {
  return {
    // Specify the host, can be remote
    host: 'http://localhost:5000',

    // Specify the URLs you want to build
    urls: [
      '/',
      '/about.html',
      '/docs.html'
    ]
  }
}
```

When using the `waveorb build` command, a special header called `x-waveorb-build` will be set to `true` inside you application. This allows you to set up variables that need a special value at build time.
```js
const host = $.req.headers['x-waveorb-build']
  ? 'https://speria.no/api'
  : 'http://localhost:5000'
```

Here the value of `host` will be `http://localhost:5000` when you're not building for example in development mode. When building, the value of `host` will be `https://speria.no/api`.
```html
<script>window.api = waveorb('${ host }')</script>
```

### Sitemap
Running `waveorb sitemap` will generate the sitemap you have defined in `app/config/sitemap.yml` and copy it to the `app/assets` folder. Read [more about sitemaps here.](/doc/seo-and-marketing.html#sitemap)

### Ping
The `waveorb ping` command will ping Google and Bing and let them know about your sitemap changes:
```bash
waveorb ping https://example.com/sitemap.xml
```

### Generate
The `waveorb generate` command will generate actions and pages for a model. Let's say you want to create templates and actions for a model called `project`, then you run `waveorb generate model project`, and all the necessary files will be created for you automatically for that model.

### Translate
The `waveorb translate` command lets you translate YAML files using the Google Translate API from the command line.

Add your [Google Translate API credentials](https://cloud.google.com/translate/docs) to `$HOME/.google/credentials.json` for example.

Then add the following to your `.bashrc` or `.zshrc`:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.google/credentials.json"
```

Use it like this:
```bash
# Anatomy
waveorb translate [input] [output] [from] [to]

# Example
waveorb translate en.yml no.yml en no
```
The example translates the `en.yml` file from English to Norwegian and writes the result into the `no.yml` file. All languages on [Google Translate](https://translate.google.com) are supported.

### Get
`waveorb get` downloads a pre-built binary of Waveorb. A binary can be run without installing NodeJS and is perfect for deployment. The binaries are [hosted here,](https://github.com/eldoy/waveorb-bin) one for each operating system type. It is what is being used on the VPS server for deployment.

### Cmd
Waveorb comes with its own command line (REPL). It is running the full NodeJS environment, and can be started with `waveorb cmd`. It comes with built in `action()` and `upload()` functions and supports top level await:
```bash
# Start the command line
waveorb cmd

# Specify host, default is http://localhost:5000
waveorb cmd https://waveorb.com
```

```js
// Fetch some data from the host
const result = await action('projectList')

// Do something with the data
console.log(result)

// Upload files, multiple files are possible
const files = ['app/files/file1.jpg', 'app/files/file2.jpg']
const urls = await upload('upload', {}, { files })
```

Hit `Ctrl + d` or `Ctrl + c` twice to exit.
