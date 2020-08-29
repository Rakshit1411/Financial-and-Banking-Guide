import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Button, ScrollView, View, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
import { Root } from "native-base";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from './DashboardScreen'
import SettingsScreen from './SettingsScreen'
import LoginScreen from './login'
import Headbar from './Components/Headbar'
import Sidebar from './Components/Sidebar'




export default class App extends Component {

  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Root>
      <Sidebar Drawer={Drawer}/>
      </Root>
    )
  }
}
