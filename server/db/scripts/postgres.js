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

const listingDataGen = counter => `${counter},${makeRestaurantName()},true,${faker.random.number({ min: 1, max: 4 })}\n`;
const reviewDataGen = (counter) => {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = ['2015', '2016', '2017', '2018', '2019'];
  
}

const stream = fs.createWriteStream('postgresDataListing3.csv');

const dataGen = (writer, encoding, cb) => {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      // let data = `${i},${makeRestaurantName()},true,${faker.random.number({ min: 1, max: 4 })}\n`;
      let data = listingDataGen(i);
      if (i === 10000000) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i < 10000000 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
};

dataGen(stream, 'utf8', () => {console.log('success'); });

// const makeRow = (option, count) => {

// }



// counter = 0;
// const reviewsDataGen = () => {
//   writer.pipe(fs.createWriteStream('postgresReviews.csv'));
//   for (var i = 0; i < 10000000; i++) {
//     for (var j = 0; j < 60; j++) {
//       writer.write({
//         REVIEWID: counter++,
//         RATING: 1,
//         LISTINGID: i,

//       })
//     }
//   }
// }

// listingDataGen();
// reviewsDataGen();
// categoriesDataGen();
