import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView
} from 'react-native';
import { setState } from 'src/state';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class List extends React.Component {
  render() {
    let { restaurants } = this.props.state
    return (
      <View style={{ flex: 1 }}>
        <ListView
          style={{ flex: 1 }}
          dataSource={ds.cloneWithRows(restaurants)}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </View>
    );
  }

  componentDidMount() {
    fetch('https://brokentableapi.herokuapp.com/restaurants')
      .then(res => res.json())
      .then(restaurants => {
        this.props.setState({ restaurants: restaurants.sf_rest.sf_rest_items })
      })
      .catch(e => console.log('error', e));
  }

  renderRow(restaurant) {
    let { name } = restaurant;
    return (
      <View>
        <Text>{name}</Text>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
