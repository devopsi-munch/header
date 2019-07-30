const express = require('express')

const app = express();
const port = 3003;
const path = require('path');

const Business = require('./db/Business.js');


const expressStaticGzip = require("express-static-gzip");


// app.use('/', express.static(path.resolve(__dirname, '..', 'client', 'dist')));
// app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use('/:id', expressStaticGzip(path.resolve(__dirname, '..', 'client', 'dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders(res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));

app.get('/header/:id', (req, res) => {
  console.log('getting: ', req.params.id)
  const query = `SELECT * FROM all_listing_data WHERE listingid=${req.params.id}`
  Business.execute(query, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
      // console.log(docs);
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
