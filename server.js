'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const fs = require('fs');
const bodyParser = require('body-parser').urlencoded({extended: true});

//Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());

client.query(`
  SELECT author FROM books;`)
  .then(results => {
    if(!results.rows.length) loadBooks();
  })
  .catch(loadDb);

// API endpoints

app.get('/api/v1/books', (req, res) => {
  client.query(`
    SELECT book_id, title, author, image_url, isbn
    FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/books/:id', (req, res) => {
  client.query(`
    SELECT *
    FROM books
    WHERE book_id=${req.params.id};`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.put('/api/v1/books/:id', bodyParser, (req, res) => {
  let {title, author, isbn, image_url, description} = req.body;
  client.query(`
    UPDATE books
    SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5
    WHERE book_id=$6;
    `,
    [title, author, isbn, image_url, description, req.params.id])
    .then(() => res.sendStatus(200))
    .catch(console.error);
});

app.delete('/api/v1/books/:id', (req, res) => {
  client.query(`
    DELETE FROM books
    WHERE book_id=${req.params.id};`)
    .then(() => res.sendStatus(204))
    .catch(console.error);
});

app.get('/admin', (req, res) => {
  res.send(TOKEN === req.query.token);
});

app.post('/api/v1/books', bodyParser, (req, res) => {
  let {title, author, isbn, image_url, description} = req.body;
  client.query(`
    INSERT INTO books
    (title, author, isbn, image_url, description)
    VALUES($1, $2, $3, $4, $5);`,
    [title, author, isbn, image_url, description])
    .then(() => res.sendStatus(201))
    .catch(console.error);
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

// Starting a UNIX-Socket for connections on this port
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

// Database Auto Loaders
function loadBooks() {
  fs.readFile('data/books.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO books
        (title, author, isbn, image_url, description)
        VALUES($1, $2, $3, $4, $5);`,
        [ele.title, ele.author, ele.isbn, ele.image_url, ele.description]
      )
        .catch(console.error);
    })
  });
}

function loadDb() {
  client.query(`
    CREATE TABLE IF NOT EXISTS books(
      book_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      isbn VARCHAR(21) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      description TEXT
    );`)
    .then(loadBooks)
    .catch(console.error);
}
