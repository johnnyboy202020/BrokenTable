import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  MapView,
  TouchableOpacity,
  Image
} from 'react-native';
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
        />
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => this.props.navigator.push({ title: 'List' })}>
            <View style={{ marginRight: 10, alignSelf: 'flex-end', marginTop: -60, backgroundColor: colors.e, justifyContent: 'center', alignItems: 'center', height: 50, width: 50, borderWidth: 3, borderColor: colors.w, borderRadius: 25 }}>
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
      .then(restaurants => {
        this.props.setState({ restaurants })
      })
      .catch(e => console.log('error', e));

    getUserLocation(userLocation => this.props.setState({ userLocation }));
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
