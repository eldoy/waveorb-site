## Getting started

Installing Waveorb requires [NodeJS](https:/nodejs.org) 10 or higher. Here we will create an app called `myapp`, you can call it whatever you want.

```bash
# Install waveorb
npm i -g waveorb

# Create an app, here called 'myapp'
waveorb create myapp

# Go to your new app
cd myapp

# Initialize npm
npm init

# Initialize git
git init

# Install nodemon
npm i -g nodemon

# Start the development server
nodemon -e js,mjs,json,yml -i dist -x waveorb serve

# If you're not using nodemon, no auto-restart on change
waveorb serve
```
Nodemon is used to automatically restart the server when you save a file. If you have set up npm, you can add a script to the `package.json` file:
```json
"scripts": {
  "serve": "nodemon -e js,mjs,json,yml -i dist -x waveorb serve"
}
```
From now you can start the development server with: `npm run serve`

Open [http://localhost:5000](http://localhost:5000) in a new tab to view your app.

### App structure

Now open the `myapp` folder in your favorite editor and have a look. Most of the folders can be deleted depending on your needs.

* `app/actions` - server API actions
* `app/assets` - external javascript and css
* `app/config` - config, settings and options
* `app/filters` - filters for server actions
* `app/layouts` - page and mail layouts
* `app/locales` - language translations
* `app/mail` - mail views
* `app/middleware` - server middleware
* `app/pages` - HTML pages, layout content
* `app/plugins` - app libs and functions

Each folder contains a `README.md` file that explains what it is for.
