## Database

You can use any database with Waveorb. Just [use a plugin](/doc/plugins.html) and add it to the app object, or connect directly from within your server actions.

We've made two ready made solutions based on [MongoDB](https://mongodb.com) and [LevelDB.](https://github.com/google/leveldb) MongoDB is a schema free document store, and LevelDB is a disk based server free solution. If you don't have a lot of database transactions then LevelDB works fine, use MongoDB if you need to scale.

They both have the same API so you can switch between them or use them together without changing your code. Both of them uses [cuids](https://github.com/ericelliott/cuid) as unique ids for their records.

### MongoDB

This library is meant for sites with high traffic demands running on multiple machines. Make sure you have a [MongoDB server](https://docs.mongodb.com/manual/installation/) running before setting it up.

First install the `mongowave` library:
```bash
npm i mongowave
```

Then add a plugin for the `mongowave` library:
```js
const mongowave = require('mongowave')

// Add the db client to the app object so we can use it in our app
module.exports = async function(app) {
  // Connect to db with default options
  app.db = await mongowave({
    url: 'mongodb://localhost:27017',
    name: 'mongowave'
  })
}
```

This is how you use it:
```js
/* Insert document */
// Returns the inserted id: { id: '507f191e810c19729de860ea' }
// Takes only 1 argument: query
const result = await db('project').create({ name: 'hello' })

/* Update document (updates multiple if query matches) */
// Returns the number of updated documents: { n: 1 }
// Takes 2 arguments: query, values
const result = await db('project').update({ id: '507f191e810c19729de860ea' }, { name: 'bye' })

/* Delete document (deletes multiple if query matches) */
// Returns the number of deleted documents: { n: 1 }
// Takes 1 argument: query
const result = await db('project').delete({ id: '507f191e810c19729de860ea' })

/* Find document */
// Returns an array of matching documents
// Takes 2 arguments: query, options

// Find all
const result = await db('project').find()

// Find all with name 'bye'
const result = await db('project').find({ name: 'bye' })

// Find with sorting on 'name' field descending, use 1 for ascending
const result = await db('project').find({}, { sort: { name: -1 } })

// Find only 2
const result = await db('project').find({}, { limit: 2 })

// Find but skip 2
const result = await db('project').find({}, { skip: 2 })

// Find all but don't include the 'name' field in the result
const result = await db('project').find({}, { fields: { name: false } })

// Find all with 'level' field greater than 5
const result = await db('project').find({ level: { $gt: 5 }})

// All of the mongodb query operators work:
// https://docs.mongodb.com/manual/reference/operator/query/

/* Get document */
// Returns the first matching document
// Takes 2 arguments: query, options
const result = await db('project').get({ name: 'bye' })

/* Count documents */
// Returns the count of the matching query
// Takes 2 arguments: query, options
const result = await db('project').count({ name: 'bye' })

/* Use the mongodb client base directly */
db.base.collection('project').findOne({ _id: insert._id })

/* The mongodb client */
db.client
```

### LevelDB
This library is meant for sites with low to medium traffic demands running on a single machine.

It does not require installing a separate database server and is portable, moving your data is just zipping up the database folder and copying it somewhere else.

To set it up, first install the `wavedb` library.
```bash
npm i wavedb
```

Then add a plugin for the `wavedb` library:
```js
const wavedb = require('wavedb')

// Add the db client to the app object so we can use it in our app
module.exports = async function(app) {
  app.db = wavedb()
}
```

This is how to use it:
```js
// Create document, 'user' is the name of the model/collection
const result = await db('user').create({ email: 'hello@waveorb.com' })

// Returns an object with the id
{ id: 'ck2a5xf2c0000okk3dbvz4n3i' }

// Update documents, changes all matches
const result = await db('user').update({ email: 'hello@waveorb.com' }, { email: 'vidar@waveorb.com' })

// Returns the number of changed documents
{ n: 1 }

// Delete documents, deletes all matches
const result = await db('user').delete({ email: 'hello@waveorb.com' })

// Returns the number of deleted documents
{ n: 1 }

// Get a single document
const result = await db('user').get({ email: 'hello@waveorb.com' })

// Returns the document as a javascript object
{ id: 'ck2a5xf2c0000okk3dbvz4n3i', email: 'hello@waveorb.com' }

// Get multiple documents
const result = await db('user').find({ email: 'hello@waveorb.com' })

// Returns an array of the documents
[{ id: 'ck2a5xf2c0000okk3dbvz4n3i', email: 'hello@waveorb.com' }]

// Count documents
const result = await db('user').count({ email: 'hello@waveorb.com' })

// Returns the count as an integer
2

// Clear collection. WARNING: will wipe all your data for this collection
await db('user').clear()

// Close connections manually, useful for testing
await db.close()
```

### Other solutions

Any other solution with a NodeJS API works. If you need more advanced querying capabilities then an SQL server might be a good solution. To include them in your app, just follow the install and plugin procedures as outlined above.

Serverless solutions such as [Firebase](firebase.google.com) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) will also work nicely with Waveorb.

<div class="nav">
  <div><a href="/doc/haka.html">&larr; Haka</a></div>
  <div><a href="/doc/command-line.html">Command line &rarr;</a></div>
</div>