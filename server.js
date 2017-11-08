'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

//Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());

// API endpoints
// TODO: REMOVE THIS TEST ROUTE LATER
app.get('/test', (req, res) => res.send('hello boogs'));

// Endpoint to retreive an array of book objects from database
// TODO: ADD A $.GET TO BOOKS.JS TO LISTEN FOR THIS SEND(RESULTS.ROWS)
app.get('/api/v1/books', (req, res) => {
  client.query(`
    SELECT book_id, title, author, image_url, isbn
    FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error)
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

// Starting a UNIX-Socket for connections on this port
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
