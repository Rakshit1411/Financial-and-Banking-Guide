import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Button, ScrollView, View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import { Dimensions } from 'react-native';
import { Root } from "native-base";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from './login'
import DrawerNavigator from './DrawerNavigator'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends Component{
  constructor(props)
  {
    super(props);
    this._retrieveData();
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value != null) {
        this.props.navigation.navigate('DrawerNavigator');
      }
      else
      {
        this.props.navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };
  render()
  {
    return(
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


    const App = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      LoginScreen: LoginScreen,
      DrawerNavigator: DrawerNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  );
    export default createAppContainer(App);
