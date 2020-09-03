import React, {Component} from 'react';
import { View, Modal } from 'react-native';
import Sidebar from './Sidebar'
import { DrawerActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Octicons";
import IconF from "react-native-vector-icons/FontAwesome";
import { Container, Header, Content, Button, Text, Left, Body, Right, Title, Form, Item, Input, Label } from 'native-base';
import BudgetScreen from '../BudgetScreen'
export default function Headbar({ navigation, title, openAddBudgetModal}){

Icon.loadFont();
let rightIcon;
var modalVisible=true;
if(title=='My Monthly Budget Plan'){
  rightIcon='plus'
}
else{
  rightIcon='refresh'
}
return (
  <View>
<Header>
<Left>
<Button transparent onPress={() => navigation.openDrawer()}>
<Icon
  name="three-bars"
  color="#aaa"
  size={25}
/>
</Button>
</Left>
<Body style={{ alignSelf: 'center' }} >
<Title><Text>{ title }</Text></Title>
</Body>
<Right>
<IconF
  name={rightIcon}
  color="#aaa"
  size={25}
  onPress={()=>{if(rightIcon=="plus"){openAddBudgetModal(true)}}}
/>
</Right>
</Header>

</View>
);
}
