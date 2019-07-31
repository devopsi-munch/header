const fs = require('fs');
const faker = require('faker');

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const listingDataGen = () => `${makeRestaurantName()},${faker.random.boolean()},${faker.random.number({ min: 1, max: 4 })}\n`;

const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const year = ['2015', '2016', '2017', '2018', '2019']; 
const categories = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Cafe', 'Restaurant', 'Shoppe', 'Diner'];

const reviewDataGen = (reviewid, listingID) => `${faker.random.number({ min: 1, max: 5 })},${year[faker.random.number({ min: 0, max: 4 })]}-${month[faker.random.number({min:0, max:11})]}-${faker.random.number({min: 1, max: 28}).toString()},${listingID}\n`;

const categoriesDataGen = counter => `${categories[faker.random.number({ min: 0, max: 8 })]},${counter}\n`;

const dataGen = (writer, rows, dataOption, encoding, cb) => {
  let i = 0;
  let j = 0;
  write();
  function write() {
    let ok = true;
    do {
      const data = dataOption(i, j);
      i++;
      if (i % 60 === 0) {
        j++
      }
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

dataGen(fs.createWriteStream('./data/reviews3.csv'), 600000000, reviewDataGen, 'utf8', () => {console.log('success'); });
dataGen(fs.createWriteStream('./data/listings3.csv'), 10000000, listingDataGen, 'utf8', () => {console.log('success'); });
dataGen(fs.createWriteStream('./data/categories3.csv'), 10000000, categoriesDataGen, 'utf8', () => {console.log('success'); });
