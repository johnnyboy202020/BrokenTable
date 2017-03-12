'use strict';

module.exports.endpoint = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
    }),
  };

  callback(null, response);
};

var restaurants = require('./data/sf_restaurants.json');

module.exports.restaurants = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  }
  callback(null, response);
}

// crimes
var crimes = require('./data/crimes.json');

module.exports.crimes = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(crimes)
  }
  callback(null, response);
}

// unsorted
var crime_restaurants = require('./data/crime_restaurants.json');
module.exports.unsorted_crime_restaurants = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(crime_restaurants)
  };
  callback(null, response);
}

// sorted crime restaurants
module.exports.sorted_crime_restaurants = (event, context, callback) => {
  crime_restaurants.sort((a, b) => b.crimes_nearby - a.crimes_nearby);
  const response = {
    statusCode: 200,
    body: JSON.stringify(crime_restaurants)
  }
  callback(null, response);
}



// endpoints:

// resutrants

// crimes

// unsorted_crime_restaurants

// sorted_crime_restaurants


// sorted_crime_restaurants

// unsorted_crime_restaurants

//
//

//
// module.exports.restaurants = (event, context, callback) => {
//   // let { limit, page, sort_by_rank } = req.query;
//
//   // limit = limit === undefined ? 100 : limit;
//   // page = page === undefined ? 0 : page;
//   // sort_by_rank = sort_by_rank === undefined ? false : sort_by_rank;
//   // let limit = 100
//
//   // var sliced_items = restaurants.slice(limit*page, limit*page+limit);
//
//   // sort by ranking
//   // if (sort_by_rank) {
//       // sliced_items.sort((a, b) => a.ranking - b.ranking);
//   // }
//
//   // console.log('sliced_items.length', sliced_items.length);
//
//   restaurants = ['a', 'b'];
//
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify(restaurants);
//   };
//
//   callback(null, response);
// }
