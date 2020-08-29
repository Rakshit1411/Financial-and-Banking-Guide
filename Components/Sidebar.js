import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Button, ScrollView, View, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
import { Root } from "native-base";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../DashboardScreen'
import SettingsScreen from '../SettingsScreen'
import LoginScreen from '../login'





export default class Sidebar extends Component {


  render() {
const Drawer = this.props.Drawer;
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Dashboard">
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}
