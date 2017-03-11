import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  View,
  Text,
  MapView
} from 'react-native';
import { setState } from 'src/state';

class Map extends React.Component {
  render() {
    return (
      <MapView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      </MapView>
    );
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
