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
import AsyncStorage from '@react-native-community/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import BudgetScreen from '../BudgetScreen'

export default class Sidebar extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      user: ''
    };
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      this.setState({user: await AsyncStorage.getItem('isLoggedIn')});
    } catch (error) {
      console.log(error);
    }
  };
 
  _logout = async() => {
    await AsyncStorage.clear();
    this.props.Navigation.navigate('AuthLoading');
  }

  render() {
    const Drawer = this.props.Drawer;
    //const navigation = this.props.Navigation;
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
             <DrawerItemList {...props} />
             <DrawerItem label="Logout" onPress={this._logout} />
             <DrawerItem label={this.state.user} />
            </DrawerContentScrollView>
          )
        }}>
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="My Monthly Budget Plan" component={BudgetScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

  