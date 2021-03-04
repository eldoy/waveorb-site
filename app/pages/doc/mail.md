## Mail

For sending mail we made the [wmail](https://github.com/eldoy/wmail) library, which uses [Mailgun](https://mailgun.com) to deliver emails. You can set up any email sending library from [the plugins](/doc/plugins.html) if you don't want to use this one.

Emails usually have two formats, HTML and text. To set it up, first install the `wmail` library:
```bash
npm i wmail
```

Then add a plugin for the `wmail` library:
```js
const mailer = require('wmail')

// This config can also be added to app/config/mail.yml
const config = {
  domain: 'waveorb.com',
  key: 'key-your-mailgun-key'
}

// Default options
const options = {
  subject: 'Contact',
  reply: 'hello@waveorb.com',
  from: 'hello@waveorb.com',
  to: 'hello@waveorb.com'
}

// Add the mailer to the app object so we can use it in our app
module.exports = async function(app) {
  app.mailer = mailer({ app, ...config, options })
}
```
After that add a layout. The layouts will be used for all of your emails.

### Mail layouts

Similar to the page layouts, mail layouts contain the header and footer of your mail views. Usually they contain the signature and things you want included with every outgoing email.

Add an HTML layout by creating a new file in `app/layouts/html.js`:
```js
module.exports = async function(mail, $, data) {
  return /* html */`
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>${ mail.options.subject || 'Waveorb support' }</title>
        <style>
          <!-- Styles have go here or inline for mails-->
          body {
            background-color: gold;
          }
        </style>
      </head>
      <body>
        <div class="content">${ mail.html.content }</div>
      </body>
    </html>
  `
}
```

Also add the text layout version in `app/layouts/text.js`:
```js
module.exports = async function(mail, $, data) {
  // Using an array with join works too, it just has to return a string
  return [
    `${mail.text.content}\n`,
    `Best regards Vidar`
  ].join('\n')
}
```

### Mail views

The mail views are the content of your email. They contain options, text and HTML. Mail views must export an async function, which can take any parameters you want.

This file is stored in `app/mail/support-mail.js`:
```js
module.exports = async function($, data) {
  return {
    // Wmail options
    options: {
      subject: 'Waveorb support'
    },
    // HTML version
    html: {
      // The name of the layout to use in app/layouts
      layout: 'html',
      // The content property of the data parameter
      content: `<div>You sent this:\n ${ data.message }</div>`
    },
    // Text version, without HTML
    text: {
      layout: 'text',
      content: `You sent this:\n ${ data.message }`
    }
  }
}
```

### Sending the mail

From inside your app server action, send the email like this:
```js
main: async function($) {
  // Gather parameters sent from the client
  const { email, subject, message } = $.params.data

  /** Possible options
   * to: 'Vidar Eldøy <vidar@eldoy.com>',
   * from: 'Vidar Eldøy <vidar@eldoy.com>',
   * cc: 'cc@eldoy.com',
   * bcc: 'bcc@eldoy.com',
   * subject: 'hello',
   * html: '<h1>Helloæøå</h1>',
   * text: 'Helloæøå',
   * reply: 'vidar@eldoy.com',
   * attachment: [file]
  */
  const options = { subject, from: email }

  // The data to send to the mail function and layout
  const data  = { message }

  // Send the email and return the result
  return await $.app.mailer('support-mail', options, $, data)
}
```

You can add attachments like this:
```js
// The path to your file on disk
const path = require('path')
const filepath = path.join(__dirname, 'assets', 'img', 'waveorb.png')
const file = fs.createReadStream(filepath)

const options = {
  to: 'Waveorb <hello@waveorb.com>',
  attachment: [file]
}
const data = { key: 'hello' }
const result = await $.app.mailer('mail-name', options, $, data)
```

Happy sending!