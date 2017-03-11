function getUserLocation(callback) {
  navigator.geolocation.getCurrentPosition(
    position => callback(position.coords),
    e => {
      callback({latitude: 37.0902, longitude: -95.7129}); // center of USA
      console.log('getUserLocation error', e)
    },
    { enableHighAccuracy: true }
  );
}

export {
  getUserLocation
};
