const { Client } = require('pg');
const client = new Client({
  host: 'ec2-13-57-14-89.us-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'munch',
  user: 'postgres',
  password: 'password'
});

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

module.exports = client;
