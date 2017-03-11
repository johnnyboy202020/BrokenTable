import React from 'react';
import { Provider } from 'react-redux';
import {
  Navigator,
  View,
  Text
} from 'react-native';
import { store } from 'src/state';
import List from 'src/containers/List';
import Map from 'src/containers/Map';

const ROUTES = {
  List,
  Map
};

const initialRouteStack = [
  { title: 'Map' },
  { title: 'List' },
];

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRouteStack={initialRouteStack}
          initialRoute={initialRouteStack[0]}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return <Component navigator={navigator} />
          }}
          configureScene={this.configureScene}
        />
      </Provider>
    );
  }

  configureScene = route => {
    console.log('ROUTE', route)

    switch (route.title) {
      case 'Map':
      case 'List':
        return {
          ...Navigator.SceneConfigs.VerticalUpSwipeJump,
          gestures: null
        }
      default:
        return Navigator.SceneConfigs.PushFromRight
    }
  }
}
