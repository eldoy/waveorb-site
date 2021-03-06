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

* __app/assets__ - javascript, css and images
* __app/config__ - config, settings and options
* __app/layouts__ - page and mail layouts
* __app/pages__ - HTML and markdown pages

There are also other special folders you can add:
* __app/actions__ - server API actions
* __app/filters__ - filters for server actions
* __app/locales__ - language translations
* __app/mail__ - mail views
* __app/middleware__ - server middleware
* __app/plugins__ - app libs and functions

The default installation comes with scripts and [scss](https://sass-lang.com) installed by default. Open the `package.json` file and fill in your app's fields.