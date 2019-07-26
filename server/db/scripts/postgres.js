const fs = require('fs');
// const csvWriter = require('csv-write-stream');
// const writer = csvWriter();
const faker = require('faker');
// var counter = 0;

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const listingDataGen = counter => `${counter},${makeRestaurantName()},${faker.random.boolean()},${faker.random.number({ min: 1, max: 4 })}\n`;

const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const year = ['2015', '2016', '2017', '2018', '2019']; 
const categories = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Cafe', 'Restaurant', 'Shoppe', 'Diner'];

const reviewDataGen = (reviewID, listingID) => {
  return `${reviewID},${faker.random.number({ min: 1, max: 5 })},${year[faker.random.number({ min: 0, max: 4 })]}-${month[faker.random.number({min:0, max:11})]}-${faker.random.number({min: 1, max: 28}).toString()},${listingID}\n`;
};

const categoriesDataGen = counter => `${counter},${categories[faker.random.number({ min: 0, max: 8 })]},${counter}`;

const stream = fs.createWriteStream('./data/categories2.csv');
const rows = 10000;

const dataGen = (writer, encoding, cb) => {
  let i = 0;
  // let j = 0;
  write();
  function write() {
    let ok = true;
    do {
      // let data = listingDataGen(i);
      // let data = `${i},${makeRestaurantName()},true,${faker.random.number({ min: 1, max: 4 })}\n`;
      // let data = reviewDataGen(i, j);
      let data = categoriesDataGen(i);
      i++;
      // if (i % 60 === 0) {
      //   j++
      // }
      if (i === rows) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i < rows && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
};

dataGen(stream, 'utf8', () => {console.log('success'); });
