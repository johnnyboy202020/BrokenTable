import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
import { setState } from 'src/state';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

import { colors, table } from 'src/helper';

class List extends React.Component {
  state = {
    input: ''
  }

  render() {
    let { crime_restaurants } = this.props.state
    return (
      <View style={{ flex: 1, backgroundColor: colors.t }}>
        <View style={{ height: 15, backgroundColor: colors.r }} />
        <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.r }}>
          <TextInput
            placeholderTextColor={colors.r}
            style={{ color: colors.t, backgroundColor: colors.w, height: 40, margin: 10, padding: 10, borderRadius: 3 }}
            placeholder="Search"
            onChangeText={input => this.setState({ input: input.trim().toLowerCase() })}
          />
        </View>
        <ListView
          onScroll={Keyboard.dismiss}
          scrollEventThrottle={500}
          style={{ flex: 1 }}
          dataSource={ds.cloneWithRows(crime_restaurants.filter(data => data.name.toLowerCase().indexOf(this.state.input) != -1))}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          enableEmptySections={true}
          removeClippedSubviews={false}
        />
        <TouchableOpacity onPress={this.props.navigator.pop}>
          <View style={{ marginRight: 10, alignSelf: 'flex-end', marginTop: -60, backgroundColor: colors.e, justifyContent: 'center', alignItems: 'center', height: 50, width: 50, borderWidth: 3, borderColor: colors.w, borderRadius: 25 }}>
            <Image
              style={{ height: 30, width: 30, tintColor: colors.t }}
              source={require('src/assets/map.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderRow = restaurant => {
    let { name, lat, lng, ranking, image_url, price } = restaurant;
    // console.log('LATITUDE, LONGITUDE', latitude, longitude)
    let { userLocation } = this.props.state;
    let { latitude, longitude } = userLocation;

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setState({ selectedRestaurant: restaurant, selectedAnnotations: 'crime_restaurants' });
          setTimeout(() => this.props.setState({ popped: true }), 200);
          this.props.navigator.pop();
        }}
        >
        <View
          style={{ backgroundColor: colors.t, padding: 20, flexDirection: 'row' }}
          >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 23, fontWeight: '500' }}>{name}</Text>
            <Text>{`${this.getDistance(latitude, longitude, lat, lng).toFixed(2)} miles away, ${'$'.repeat(price)}`}</Text>
            {/* <Text>{"reserve"}</Text> */}
            <Image
              style={{ height: 50, width: 50, tintColor: colors.q }}
              source={table[ranking]}
            />
          </View>
          <View>
            <Image
              style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 4, borderColor: colors.e, justifyContent: 'center', alignItems: 'center' }}
              source={{ uri: image_url }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator = (s, r) => {
    return (
      <View
        key={r}
        style={{ backgroundColor: colors.r, height: 1, marginLeft: 40, marginRight: 40 }}
      />
    );
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
    // console.log('LAT1, LON1, LAT2, LON2', lat1, lon1, lat2, lon2)
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
