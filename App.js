import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from 'src/navigation';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  )

}

export default App;