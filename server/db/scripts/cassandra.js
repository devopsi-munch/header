const fs = require('fs');
const faker = require('faker');

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const listingDataGen = counter => `${counter},${makeRestaurantName()},${faker.random.boolean()},${faker.random.number({ min: 1, max: 4 })}`;

const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const year = ['2015', '2016', '2017', '2018', '2019']; 
const categories = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Cafe', 'Restaurant', 'Shoppe', 'Diner'];

const reviewDataGen = (reviewID, listingID) => {
  return `${reviewID},${year[faker.random.number({ min: 0, max: 4 })]}-${month[faker.random.number({min:0, max:11})]}-${faker.random.number({min: 1, max: 28}).toString()},${faker.random.number({ min: 1, max: 5 })}`;
};

const categoriesDataGen = counter => `${counter},${categories[faker.random.number({ min: 0, max: 8 })]}`;

const stream = fs.createWriteStream('./data/all_listing_data.csv');
const rows = 10000;

const dataGen = (writer, encoding, cb) => {
  let i = 0;
  let j = 0;
  let restaurant = listingDataGen(i);
  let category = categoriesDataGen(i);
  write();
  function write() {
    let ok = true;
    do {   
      // let data = reviewDataGen(i, j);
      const data = `${restaurant},${reviewDataGen(j, i)},${category}\n`;
      j++;
      if (j % 60 === 0) {
        i++
        restaurant = listingDataGen(i);
        category = categoriesDataGen(i);
      }
      if (j === rows) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (j < rows && ok);
    if (j > 0) {
      writer.once('drain', write);
    }
  }
};

dataGen(stream, 'utf8', () => {console.log('success'); });
