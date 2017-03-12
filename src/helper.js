function getUserLocation(callback) {
  navigator.geolocation.getCurrentPosition(
    position => callback(position.coords),
    e => {
      callback({latitude: 37.0902, longitude: -95.7129}); // center of USA
    },
    { enableHighAccuracy: true }
  );
}

const colors = {
  q: '#000505',
  w: '#3B3355',
  e: '#5D5D81',
  r: '#BFCDE0',
  t: '#FEFCFD',
};

const table = {
  '1': require('src/assets/tables/1.png'),
  '2': require('src/assets/tables/2.png'),
  '3': require('src/assets/tables/3.png'),
  '4': require('src/assets/tables/4.png'),
  '5': require('src/assets/tables/5.png')
};

export {
  getUserLocation,
  colors,
  table
};
