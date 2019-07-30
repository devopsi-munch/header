const express = require('express');

const app = express();
const port = 3003;
const path = require('path');

const Business = require('./db/Business.js');

app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/header/:id', (req, res) => {
  console.log('getting: ', req.params.id);
  const query = `SELECT * FROM all_listing_data WHERE listingid=${req.params.id}`;
  Business.execute(query, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
