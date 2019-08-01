const express = require('express');

const app = express();
const port = 3003;
const path = require('path');

const connection = require('./db/index');

const expressStaticGzip = require("express-static-gzip");

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

// app.post()

// app.delete

// app.put

app.listen(port, () => console.log(`Server listening on port ${port}!`));
