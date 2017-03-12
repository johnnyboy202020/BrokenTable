import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import { setState } from 'src/state';
import { getUserLocation } from 'src/helper';
import { colors } from 'src/helper';

class Map extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          showsUserLocation={true}
          followUserLocation={true}
          annotation={this.getAnnotations(this.props.state.selectedAnnotations)}
        />
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
          <TouchableOpacity onPress={() => this.props.navigator.push({ title: 'List' })}>
            <View style={{ marginRight: 10, alignSelf: 'flex-end', backgroundColor: colors.e, justifyContent: 'center', alignItems: 'center', height: 50, width: 50, borderWidth: 3, borderColor: colors.w, borderRadius: 25 }}>
              <Image
                style={{ height: 27, width: 27, tintColor: colors.t }}
                source={require('src/assets/list.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  componentDidMount() {
    fetch('https://brokentableapi.herokuapp.com/crime_restaurants')
      .then(res => res.json())
      .then(crime_restaurants => {
        this.props.setState({ crime_restaurants, selectedAnnotations: 'crime_restaurants' })
      })
      .catch(e => console.log('error', e));
    fetch('https://brokentableapi.herokuapp.com/restaurants')
      .then(res => res.json())
      .then(restaurants => {
        this.props.setState({ restaurants })
      })
      .catch(e => console.log('error', e));
    fetch('https://brokentableapi.herokuapp.com/crimes')
      .then(res => res.json())
      .then(crimes => {
        this.props.setState({ crimes })
      })
      .catch(e => console.log('error', e));

    getUserLocation(userLocation => this.props.setState({ userLocation }));
  }

  getAnnotations = (type) => {
    console.log('TYPE', type)
    if (!type) {
      return [];
    }

    let image;
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

    let annotations = this.props.state[type].slice(0, 100).map(data => {
      return {
        latitude: data.lat,
        longitude: data.lng
      };
    });

    console.log('annotations', annotations)

    return annotations
  }
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
