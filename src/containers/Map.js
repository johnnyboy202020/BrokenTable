import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import MapView from 'react-native-maps';
import { setState } from 'src/state';
import { getUserLocation } from 'src/helper';
import { colors, table } from 'src/helper';

class Map extends React.Component {
  render() {
    if (!this.props.state.userLocation) {
      return null;
    }
    let { modalVisible, selectedRestaurant, userLocation, popped } = this.props.state;

    if (popped) {
      this.mapview.animateToRegion({
        latitude: selectedRestaurant.lat,
        longitude: selectedRestaurant.lng,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001
      });
      this.props.setState({ popped: false });
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => this.mapview = ref}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          showsUserLocation={true}
          followUserLocation={true}
          initialRegion={{
            latitude: this.props.state.userLocation.latitude,
            longitude: this.props.state.userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta:0.01
          }}
          >
          {this.getAnnotations(this.props.state.selectedAnnotations)}
        </MapView>
        <View style={{ marginTop: -70, paddingBottom: 10, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => this.props.setState({ selectedAnnotations: 'restaurants' })}
              >
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.t, marginLeft: 10, height: 50, width: 50, borderRadius: 25, borderWidth: 3, borderColor: colors.r }}>
                <Image
                  style={{ height: 31, width: 31 }}
                  source={require('src/assets/restaurant.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.setState({ selectedAnnotations: 'crimes' })}
              >
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.t, marginLeft: 10, height: 50, width: 50, borderRadius: 25, borderWidth: 3, borderColor: colors.r }}>
                <Image
                  style={{ height: 31, width: 31 }}
                  source={require('src/assets/handcuffs.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.setState({ selectedAnnotations: 'crime_restaurants' })}
              >
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.t, marginLeft: 10, height: 50, width: 50, borderRadius: 25, borderWidth: 3, borderColor: colors.r }}>
                <Image
                  style={{ height: 31, width: 31 }}
                  source={require('src/assets/glove.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity onPress={() => this.props.navigator.push({ title: 'List', map: this.map })}>
            <View style={{ marginRight: 10, alignSelf: 'flex-end', backgroundColor: colors.e, justifyContent: 'center', alignItems: 'center', height: 50, width: 50, borderWidth: 3, borderColor: colors.w, borderRadius: 25 }}>
              <Image
                style={{ height: 27, width: 27, tintColor: colors.t }}
                source={require('src/assets/list.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          >
          <TouchableWithoutFeedback onPress={() => {
            this.props.setState({ modalVisible: false })
          }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: colors.t, padding: 10, width: 300, borderRadius: 5 }}>
                <Image
                  style={{ width: 280, height: 200 }}
                  source={{ uri: selectedRestaurant.image_url }}
                />
                <Text style={{ fontWeight: '500', fontSize: 20 }}>{selectedRestaurant.name}</Text>
                <Text>{`${this.getDistance(userLocation.latitude, userLocation.longitude, selectedRestaurant.lat, selectedRestaurant.lng).toFixed(2)} miles away, ${'$'.repeat(selectedRestaurant.price)}`}</Text>
                <Image
                  style={{ height: 70, width: 70, tintColor: colors.q }}
                  source={table[6 - selectedRestaurant.crime_ranking]}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }

  componentDidMount() {
    fetch('https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/sorted_crime_restaurants')
      .then(res => res.json())
      .then(crime_restaurants => {
        this.props.setState({ crime_restaurants, selectedAnnotations: 'crime_restaurants' })
      })
      .catch(e => console.log('error', e));
    fetch('https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/restaurants')
      .then(res => res.json())
      .then(restaurants => {
        this.props.setState({ restaurants })
      })
      .catch(e => console.log('error', e));
    fetch('https://sjdlzi8nw0.execute-api.us-east-1.amazonaws.com/dev/crimes')
      .then(res => res.json())
      .then(crimes => {
        this.props.setState({ crimes })
      })
      .catch(e => console.log('error', e));

    getUserLocation(userLocation => this.props.setState({ userLocation }));
  }

  // componentWillReceiveProps(props) {
  //   let { selectedRestaurant, popped } = this.props.state;
  //
  // }

  getAnnotations = (type) => {
    if (!type) {
      return [];
    }

    let image, coords;

    switch (type) {
      case 'crime_restaurants':
        image = require('src/assets/glove.png');
        break;
      case 'restaurants':
        image = require('src/assets/restaurant.png');
        break;
      case 'crimes':
        image = require('src/assets/handcuffs.png');
        break;
      default:
        image = require('src/assets/glove.png');
    }

    let annotations = this.props.state[type].slice(0, 100).map((restaurant, i) => {
      if (type != 'crimes') {
        coords = {
          latitude: restaurant.lat,
          longitude: restaurant.lng
        }
      } else {
        coords = {
          latitude: restaurant.location.coordinates[1],
          longitude: restaurant.location.coordinates[0]
        }
      }
      return (
        <MapView.Marker
          key={i}
          coordinate={coords}
          >
          <TouchableOpacity
            onPress={() => {
              if (type == 'crimes') {
                return null;
              }
              this.props.setState({
                modalVisible: true,
                selectedRestaurant: restaurant
              });
            }}
            >
            <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: colors.t, borderWidth: 2, borderColor: colors.r, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={image}
                style={{ height: 20, width: 20 }}
              />
            </View>
          </TouchableOpacity>
        </MapView.Marker>
      );
    });

    return annotations
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
    console.log('LAT1, LON1, LAT2, LON2', lat1, lon1, lat2, lon2)
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    d = d*0.6;
    // console.log('d', d);
    return d;
  }

  deg2rad = deg => deg * (Math.PI/180)
}

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    setState: state => dispatch(setState(state))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
