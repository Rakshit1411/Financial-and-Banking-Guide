import React, {Component} from 'react';
import { View } from 'react-native';
import Sidebar from './Sidebar'
import { DrawerActions } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Octicons";
import { Container, Header, Content, Button, Text, Left, Body, Right, Title, Form, Item, Input, Label } from 'native-base';
export default function Headbar({ navigation, title }){

Icon.loadFont();
return (
  <View>
<Header>
<Left>
<Button transparent onPress={() => navigation.openDrawer()}>
<Icon
  name="three-bars"
  color="#ccc"
  size={25}
/>
</Button>
</Left>
<Body style={{ alignSelf: 'center' }} >
<Title><Text>{ title }</Text></Title>
</Body>
<Right />
</Header>
</View>
);
}
