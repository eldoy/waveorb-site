## Getting started

Installing Waveorb requires [NodeJS](https:/nodejs.org). Here we will create an app called `hello`, you can call it whatever you want. The `create` command will pull the latest template from [here.](https://github.com/eldoy/waveorb-templates)

```bash
# Install waveorb
npm i -g waveorb

# Create an app, here called 'hello'
waveorb create hello

# Go to your new app
cd hello

# Install nodemon
npm i -g nodemon

# Start the development server
npm run dev
```
Nodemon is used to automatically restart the server when you save a file.

Open [http://localhost:5000](http://localhost:5000) in a new tab to view your app.

### App structure

Now open your app folder in your favorite editor and have a look. Most of the folders can be deleted depending on your needs.

* `app/assets` - javascript, css and images
* `app/config` - config, settings and options
* `app/layouts` - page and mail layouts
* `app/pages` - HTML and markdown pages

There are also other special folders you can add:
* `app/actions` - server API actions
* `app/filters` - filters for server actions
* `app/locales` - language translations
* `app/mail` - mail views
* `app/middleware` - server middleware
* `app/plugins` - app libs and functions

The default installation comes with scripts and [scss](https://sass-lang.com) installed by default. Check out the `package.json` file and set it up how you like it.