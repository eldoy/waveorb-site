# About

## Our mission

Waveorb aims to provide everything you need for creating, deploying and maintaining modern web apps. The platform has been developed from real world needs and uses standard but cutting edge technologies to make sure your app stays at the top of the game.

The web development world today is terribly fragmented, where you have to piece together your own often unreliable software stack to make your idea become reality. Waveorb libraries have been written from the ground up using pure Javascript all with the same goal. Every part fits perfectly together bringing a smooth and reliable experience.

All our libraries are focused on speed and performance using only the latest technologies. The initial bundle size using only the web client is only around 1KB compressed, and zero KB if you don't need a backend. Can't get much better than that, right?

## Open source

Waveorb is open source, totally free and MIT licensed. Use it for whatever you want without paying anything. The code is hosted on [Github](https://github.com/eldoy/waveorb) where anyone can read the source code, report issues and contribute. The platform is installed via [npm](https://npmjs.com), the standard package manager for [NodeJS.](https://nodejs.org)

At the moment Waveorb consists of many smaller libraries and can be used for frontend, backend or deployment, as standalone apps or integrated into or alongside existing apps. If it's running Javascript your can use it. It is extremely versatile.

## Speedy HTML

You can use any frontend library for your app. [React,](https://reactjs.org) [Vue,](https://vuejs.org) [Svelte](https://svelte.dev) or just vanilla HTML and JS, it's up to you. Just drop the waveorb client into a [Wordpress](https://wordpress.org) or [Wix](https://www.wix.com) site if you need some extra interactivity or need to save some data.

The default frontend is [Presang,](https://github.com/eldoy/presang) which is specially developed for ease of use, speed and simplicity. Presang apps are very simple in that they are just plain javascript functions returning HTML as text strings. It's based on standard ES6 string templates (backtick strings). No complicated setup with VDOM, Babel, Webpack or polyfills is needed.

## Maintainability and SEO

As other frontend libraries evolve, they change their APIs, making your app hard to maintain. In some cases libraries are even abandoned, forcing you to rewrite your app if you want to keep it up to date, which takes time and is costly. With Waveorb it's much easier, the app you made today will only get better as browser technologies evolve.

Since we're running Javascript on the server, Waveorb is isomorphic, meaning you can share code between the server and the browser. You have complete control over what you do on the server, and what you do in the browser. The frontend can be run with server side rendering, or be built ahead of time as Jamstack compatible static pages. This also makes search engines happy, Waveorb is perfect for SEO.

In case you're wondering, you can still create components and build your app just like with other frontend frameworks, it's very flexible. [Give it a try](/doc/pages.html) and let us know what you think.

## Advanced JSON API Server

The Waveorb backend engine is a next-gen app server. Creating advanced, secure and performant APIs has never been easier. Waveorb takes away a lot of the pain of designing JSON APIs by not encouraging the REST pattern. Instead it uses an approach more similar to remote procedure calls (RPC). The backend delivers static content and HTML when it sees a GET request, and uses POST to deliver JSON data.

This technique simplifies the URLs as instead of naming your REST end-point `/posts/1234`, you can now name the route `getPost` and pass the id as a parameter instead. It feels almost like calling a regular javascript function, except it's over the Internet.

## Scalable logic

Use of websockets are exactly the same as AJAX, just change `http` to `ws` in front of the client URL. There's built-in support for pubsub if you need to scale your app beyond two app servers.

The data you send from the browser to the server are sent through filters and validations before they reach your action. Combine them intelligently to set up specialized microservices that do only what they need to do.

The app server can be distributed as a single binary, making it easy to deploy and share, you don't even need Node installed to run your app.

## Database solutions

You can use whichever database engine you want with Waveorb, just add it as a plugin. We like [MongoDB](https://www.mongodb.com) so we've created [a client](https://github.com/eldoy/mongowave) for it.

We've also created [a client for LevelDB,](https://github.com/eldoy/wavedb) in case you don't need a separate database server. The two clients both have the exact same API so you can switch without changing any of your queries. Convenient, right?

## Web client

To communicate with the server, Waveorb comes with a [web client.](https://github.com/eldoy/waveorb-client) It supports normal AJAX requests and does uploads with progress support and automatic creation of file input fields.

When using websockets, the client has support for promises, and automatically reconnects when disconnected. It's easy to set up subscriptions for your data as websockets can send data from the server on a live connection.

The web client is of course isomorphic, so it works from the command line as well as in the browser. The browser build is just a single file which you can include on any existing web site if you just need a few backend APIs or a file upload.

## Server deployment

The Waveorb CLI is included when you install Waveorb via npm. It has everything you need to manage your app. Create, build and deploy your app from the command line. You can boot a VPS host with support for free SSL certificates (via [Let's Encrypt](https://letsencrypt.org)), HTTP2, Brotli compression, MongoDB, zsh, SSH and more. You can even host multiple apps on the same VPS host.

Have a look at [sverd](https://github.com/eldoy/sverd) to learn more. 100% performance rating guaranteed.

The command line interface lets you communicate with all of your servers from the terminal. There's no need to log into the server anymore, you can control everything right from your own computer.

Of course you can host your app wherever you want, a Waveorb app is just a standard Node app. Check out our source code for the CLI, the scripts there can easily be adapted to run on any Linux VPS or even with docker.

## ...and much more

You can use all of the packages on npm to build your app, but we've also made a lot of extra libraries. We've created

* [a frontend DOM manipulation library](https://github.com/eldoy/haka)
* [an email library](https://github.com/eldoy/wmail)
* [a payment library](https://github.com/eldoy/wpay)
* [a web server](https://github.com/eldoy/sirloin)
* [a static file server](https://github.com/eldoy/hangersteak)
* [an upload and download client](https://github.com/eldoy/dugg)

and [many more.](/doc/libraries.html) They can all be used in your app via the plugin system, or as part of your scripts and external resources.

You can also write your own libraries and include them in your app, the Node ecosystem is infinitely powerful.

## Join us!

We are using Waveorb for everything and are loving it. It's so much fun making apps with Waveorb, and so easy to learn. If you have feedback or find issues, send us an email on [hello@waveorb.com](mailto:hello@waveorb.com) or report your [issues on Github.](https://github.com/eldoy/waveorb/issues)

Now head over to [the documentation.](/docs.html) We are looking forward to see what you can create with Waveorb. Enjoy!
