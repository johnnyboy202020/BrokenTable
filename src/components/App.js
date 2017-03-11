import React from 'react';
import { Provider } from 'react-redux';
import {
  Navigator,
  View,
  Text
} from 'react-native';
import { store } from 'src/state';
import Home from 'src/containers/Home';
import Map from 'src/containers/Map';

const ROUTES = {
  Home,
  Map
};

const initialRouteStack = [
  { title: 'Home' },
  { title: 'Map' },
];

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRouteStack={initialRouteStack}
          initialRoute={initialRouteStack[1]}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return <Component navigator={navigator} />
          }}
        />
      </Provider>
    );
  }
}
