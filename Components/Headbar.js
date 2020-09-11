import React, {Component} from 'react';
import { View, Modal } from 'react-native';
import Sidebar from './Sidebar'
import { DrawerActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Octicons";
import IconF from "react-native-vector-icons/FontAwesome";
import { Container, Header, Content, Button, Text, Left, Body, Right, Title, Form, Item, Input, Label } from 'native-base';
import BudgetScreen from '../BudgetScreen'
import {notificationManager} from '../src/services/LocalPushIOSController';

export default function Headbar({ navigation, title, openAddBudgetModal}){

Icon.loadFont();
let rightIcon;
let localNotify = notificationManager;
localNotify.configure()
var modalVisible=true;
if(title=='My Budget Plan'){
  rightIcon='plus'
}
else{
  rightIcon='refresh'
}
return (
  <View>
<Header  style={{backgroundColor:'#43658b'}}>
<Left>
<Button transparent onPress={() => { localNotify.showNotification(1,"Budget Updates","Your new Budget has been predicted for you",{},{}); navigation.openDrawer();}}>
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
  onPress={()=>{if(rightIcon=="plus"){openAddBudgetModal(true)}}}
/>
</Right>
</Header>

</View>
);
}
