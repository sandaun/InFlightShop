import React from 'react';
import {Provider} from 'react-redux';
import store from './src/app/store';
import HomeScreen from './src/screens/HomeScreen';

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;
