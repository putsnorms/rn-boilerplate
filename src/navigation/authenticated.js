import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {DrawerContent} from './drawer-content';
import Dashboard from 'src/screens/dashboard';
import Profile from 'src/screens/profile';
import EditProfile from 'src/screens/edit-profile';
import Search from 'src/screens/search';
import ChangePassword from 'src/screens/change-password';
import Settings from 'src/screens/settings';
import GooglePlaces from 'src/components/helper/GooglePlaces';

const Stack = createStackNavigator();

function DashboardNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Dashboard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="GooglePlaces" component={GooglePlaces} />
    </Stack.Navigator>
  );
}

function SettingsNavigation() {
  return (
    <Stack.Navigator initialRouteName="Settings" headerMode="none">
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function Authenticated() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="DashboardNavigation"
        component={DashboardNavigation}
        options={{
          drawerLabel: 'Home'
        }}
      />

      <Drawer.Screen
        name="SettingsNavigation"
        component={SettingsNavigation}
        options={{
          drawerLabel: 'Settings'
        }}
      />
    </Drawer.Navigator>
  );
}

export default Authenticated;