
// TODO change to serverless

var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log('home');
  res.json({home: 'home'});
})



// pagination

// limit paramater
// page paramter


// sort_by_rank true/false parameter

// http://localhost:4000/restaurants?limit=50&page=5&sort_by_rank=true



// find true rankings

var restaurants = require('./data/sf_restaurants.json');

app.get('/restaurants', function(req, res) {
  let { limit, page, sort_by_rank } = req.query;

  limit = limit === undefined ? 100 : limit;
  page = page === undefined ? 0 : page;
  sort_by_rank = sort_by_rank === undefined ? false : sort_by_rank;

  var sliced_items = restaurants.slice(limit*page, limit*page+limit);

  // sort by ranking
  if (sort_by_rank) {
      sliced_items.sort((a, b) => a.ranking - b.ranking);
  }

  console.log('sliced_items.length', sliced_items.length);

  res.json(sliced_items);

});

var crimes = require('./data/crimes.json');

app.get('/crimes', function(req, res) {
  res.json(crimes);
})

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// a and b are lat and lon for first
// x and y are lat and lon for second
function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  d = d*0.6;
  return d;
}


// example query:
// http://localhost:4000/closecrimes?lat=37.773972&lon=-122.431297


// select_limit is default 10,
// but also pass an argument to select_limit: i.e.
// ?select_limit=10
app.get('/closecrimes', function(req, res) {
  var query = req.query;
  let { lat, lon, select_limit } = query;
  console.log('select_limit', select_limit);

  if (select_limit === 'undefined') {
    select_limit = 10;
  }

  var selected_crimes = [];

  // distance in miles, and will select crimes whose distance is under the limit
  var distance_limit = 3;

  let crimes_length = crimes.length;

  for (let crime of crimes) {
    let { coordinates } = crime.location;
    let crime_lat = coordinates[1];
    let crime_lon = coordinates[0];

    let d = distance(crime_lat, crime_lon, lat, lon);

    if (d < distance_limit) {
      selected_crimes.push(crime);
    }

    if (selected_crimes.length > select_limit) {
      break;
    }
  }

  console.log('query', query);

  res.json(selected_crimes);
});


// return crimes and restaurants near each other



// make a list of restaurants with the most crimes near other


var crime_restaurants = [];

// don't hardcode but grab the true value later;
let max_crimes_nearby = 375;
// for each restaurant, loop through all crimes, counting those within a 0.1 mile radius.
// make a new object with the restaurant, and crimes_nearby count

for (var restaurant of restaurants) {
  var crimes_nearby = 0;
  var nearby_limit = 1;

  let { lat, lng } = restaurant;

  for (var crime of crimes) {
    let { coordinates } = crime.location;
    let crime_lat = coordinates[1];
    let crime_lon = coordinates[0];

    let d = distance(lat, lng, crime_lat, crime_lon);

    if (d < nearby_limit) {
      crimes_nearby++;
    }
  }

  // let crime_ranking_dividend = crimes_nearby / 5;


  let crime_ranking = Math.floor((crimes_nearby / max_crimes_nearby)*5);

  crime_ranking = crime_ranking < 1 ? 1 : crime_ranking;


  restaurant.crimes_nearby = crimes_nearby;
  restaurant.crime_ranking = crime_ranking;

  crime_restaurants.push(restaurant);
}


// SCRIPT:

// highest chance to find a broken table?

// what if I wanted to find a broken table?

// ok, hmm. in what cases would I find a broken table?

// ah maybe in a bar fight?

// how do I find bar fights!

// all right, how about places with the most crimes

// so we created the crime_restaurants endpoint that adds a count of the crimes_nearby for each restaurant


// fs.writeFile('sf_restaurants.json', JSON.stringify(all_items), "utf8")
fs.writeFile('./data/crime_restaurants.json', JSON.stringify(crime_restaurants));


// sort by most crimes_nearby
// highest crimes by default

// want to just do ranking itself by this parameter?


app.get('/crime_restaurants', function(req, res) {
  var crime_restaurants = require('./data/crime_restaurants.json');

  crime_restaurants.sort((a, b) => b.crimes_nearby - a.crimes_nearby);

  res.json(crime_restaurants);
})

// GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/endpoint
// GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/restaurants
// GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/crimes
// GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/unsorted_crime_restaurants
// GET - https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/sorted_crime_restaurants


// make an optimized trip of the highest ranking

// make an endpoint that returns the restaurant info based on rid


app.listen(process.env.PORT || '4000', function() {
  console.log(`Express server listening on port ${this.address().port} in ${app.settings.env} mode`)
})
