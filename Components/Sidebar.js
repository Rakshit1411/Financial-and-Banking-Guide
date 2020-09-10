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
import SpendingsScreen from '../SpendingsScreen'
import SavingsAndInvestmentsScreen from '../SavingsAndInvestmentsScreen'
import AsyncStorage from '@react-native-community/async-storage';
import InvestmentsNavigator from '../navigators/InvestmentsNavigator'


import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import BudgetScreen from '../BudgetScreen'
import NotificationCentreScreen from '../NotificationCentreScreen'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';

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
            <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
              <View style={styles.drawerContent}>
                <View style={styles.userInfoSelection}>
                  <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                      source = {{
                        uri: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png'
                      }}
                      size={50}
                    />
                    <View style={{flexDirection: 'column', marginLeft: 15}}>
                      <Title style={styles.title}>{this.state.user}</Title>
                      <Caption style={styles.caption}>userid</Caption>
                    </View>
                  </View>
                </View>
                <DrawerItemList {...props} />
              </View>
              <DrawerItem style={styles.bottomDrawerSection} label="Logout" onPress={this._logout} />
            </DrawerContentScrollView>
            </View>
          )
        }}
          >
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="My Spendings" component={SpendingsScreen} />
          <Drawer.Screen name="Savings And Investments" component={InvestmentsNavigator} />
          <Drawer.Screen name="Notification Centre" component={NotificationCentreScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSelection: {
    paddingLeft: 20
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 35
  },
  bottomDrawerSection: {
    marginTop: 475,
    borderTopColor: 'black',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});
