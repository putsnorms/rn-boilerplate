/**
 * @format
 */

import {
  AppRegistry,
  AsyncStorage
} from 'react-native';
import App from './App';
import axios from 'axios';
import {name as appName} from './app.json';

global.axios = axios

axios.defaults.baseURL = 'http://laravel-boilerplate-api.test/api/'

axios.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem('_token_')

  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }

  return request
})

AppRegistry.registerComponent(appName, () => App);
