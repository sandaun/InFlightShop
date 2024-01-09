import React from 'react';
import {Provider} from 'react-redux';
import store from './src/app/store';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  </Provider>
);

export default App;
