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

export {
  getUserLocation,
  colors
};
