import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from 'src/screens/landing';
import Login from 'src/screens/login';
import Register from 'src/screens/register';
import ForgotPassword from 'src/screens/forgot-password';

const Stack = createStackNavigator();

function Guest() {
  return (
    <Stack.Navigator initialRouteName="Landing" headerMode="none">
      <Stack.Screen name="Landing" component={Landing} options={{title: "Home"}}/>
      <Stack.Screen name="Login" component={Login} options={{title: ""}}/>
      <Stack.Screen name="Register" component={Register} options={{title: ""}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: ""}}/>
    </Stack.Navigator>
  );
}

export default Guest;