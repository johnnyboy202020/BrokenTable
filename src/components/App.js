import React from 'react';
import { Provider } from 'react-redux';
import {
  Navigator,
  View,
  Text
} from 'react-native';
import { store } from 'src/state';
import Home from 'src/containers/Home';

const ROUTES = {
  Home
};

const initialRouteStack = [
  { title: 'Home' }
];

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRouteStack={initialRouteStack}
          initialRoute={ROUTES[0]}
          renderScene={(route, navigator) => {
            let Component = ROUTES[route.title];
            return <Component navigator={navigator} />
          }}
        />
      </Provider>
    );
  }
}
