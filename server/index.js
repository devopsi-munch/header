require('newrelic');
const express = require('express');

const app = express();
const port = 3003;
const path = require('path');

const connection = require('./db/index');

const expressStaticGzip = require("express-static-gzip");

app.use(express.json());

app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/header/:id', (req, res) => {
  console.log('getting: ', req.params.id);
  const listing = req.params.id;
  connection.query(`SELECT * FROM listings, categories, reviews WHERE listings.listingid=${listing} and categories.listingid=${listing} and reviews.listingid=${listing}`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/header', (req, res) => {
  const { title, claimed, price, category } = req.body;
  console.log(title, claimed, price, category); 
  connection.query(`insert into listings (title, claimed, price) values ('${title}', ${claimed}, ${price}) RETURNING listingid`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const { listingid } = data.rows[0];
      connection.query(`insert into categories (category, listingid) values ('${category}', ${listingid})`, (err, data) => {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          console.log(data);
          // res.send(data);
          res.sendStatus(200);
        }
      });
    }
  });
});

// app.delete

// app.put

app.listen(port, () => console.log(`Server listening on port ${port}!`));
