const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'munch',
});
// postgres://YourUserName:YourPassword@localhost:5432/YourDatabase
//    host: 'localhost', // server name or IP address;
//     port: 5432,
//     database: 'myDatabase',
//     user: 'myUser',
//     password: 'myPassword'

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

module.exports = client;
