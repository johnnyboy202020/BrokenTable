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
  Image
} from 'react-native';
import { setState } from 'src/state';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class List extends React.Component {
  render() {
    let { restaurants } = this.props.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 15, backgroundColor: '#A8DCD1' }} />
        <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A8DCD1' }}>
          <TextInput
            style={{ backgroundColor: '#65DEF1', height: 40, margin: 10, padding: 10, borderRadius: 3 }}
            placeholder="Search"
          />
        </View>
        <ListView
          style={{ flex: 1 }}
          dataSource={ds.cloneWithRows(restaurants)}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
        <TouchableOpacity onPress={this.props.navigator.pop}>
          <View style={{ marginRight: 10, alignSelf: 'flex-end', marginTop: -60, backgroundColor: '#F17F29', justifyContent: 'center', alignItems: 'center', height: 50, width: 50, borderWidth: 3, borderColor: '#F96900', borderRadius: 25 }}>
            <Image
              style={{ height: 30, width: 30, tintColor: '#DCE2C8' }}
              source={require('src/assets/map.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderRow = restaurant => {
    let { name, latitude, longitude } = restaurant;
    let { userLocation } = this.props.state;

    return (
      <TouchableOpacity>
        <View
          style={{ height: 120, backgroundColor: '#DCE2C8', borderBottomWidth: 0.5, borderTopWidth: 0.5 }}
          >
          <Text style={{ fontSize: 24, fontWeight: '500' }}>{name}</Text>
          <Text>{this.getDistance(userLocation.latitude, userLocation.longitude, latitude, longitude).toFixed(2)}</Text>
          <Text>{"reserve"}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
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
    console.log('d', d);
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
