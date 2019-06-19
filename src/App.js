/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import Header from './components/Header';
import Movies from './components/Movies';


const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{ flex: 1, marginBottom: 70 }}>
        <Header title = "Popular Movies"/>
        <Movies />
      </View>
    </Provider>
  );
}

export default App;
