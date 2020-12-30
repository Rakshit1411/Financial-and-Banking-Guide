import React, {Component} from 'react';
import { View, Modal } from 'react-native';
import Sidebar from './Sidebar'
import { DrawerActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Octicons";
import IconF from "react-native-vector-icons/FontAwesome";
import { Container, Header, Content, Button, Text, Left, Body, Right, Title, Form, Item, Input, Label } from 'native-base';
import BudgetScreen from './Budget/BudgetScreen'
import {notificationManager} from '../src/services/LocalPushIOSController';
// import Sms from '../src/services/readSms/Sms'
export default function Headbar({ navigation, title, openAddBudgetModal, sendSms}){

Icon.loadFont();
let rightIcon;
// let localNotify = notificationManager;
// localNotify.configure()
//localNotify.showNotification(1,"Alert"," Unhealty transaction pattern identified",{},{});
var modalVisible=true;
if(title=='My Budget Plan'){
  rightIcon='plus'
}
else{
  rightIcon='refresh'
}
return (
  <View>
<Header  style={{backgroundColor:'#0A1045'}}>
<Left>
<Button transparent onPress={() => {  navigation.openDrawer();}}>
<Icon
  name="three-bars"
  color="white"
  size={25}
/>
</Button>
</Left>
<Body style={{ alignSelf: 'center' }} >
<Title style={{color:'white'}}><Text style={{color:'white'}}>{ title }</Text></Title>
</Body>
<Right>
<IconF
  name={rightIcon}
  color="white"
  size={25}
/>
</Right>
</Header>

</View>
);
}
