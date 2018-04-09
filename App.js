/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import SearchPage from './searchPage';
import SearchResults from './SearchResults';

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
});

export default App;
