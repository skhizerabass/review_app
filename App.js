/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from 'app/redux/store';
import AppWrapper from './AppWrapper';


const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  )
}
export default App;
