import React, {Component} from 'react';
import { View } from 'react-native';
import Headbar from './Components/Headbar';
import { Container, Header, Content, Button, Text, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import CustomList from './Components/CustomList'
export default class Login extends Component {
render() {
  const navigate = this.props.navigation;
  const title = 'Notifications';
  const data=[{title:'new payment reminder',description:'Your account will be deducted with Rs. 10000 for your monthly rent to Mr. XYZ',id:'AUTO_PAYMENT'},{title:'Budget recommendation',description:'Click to get the new recommendation details',id:'AUTO_BUDGET'}];
  return (

  <Container>
  <Headbar navigation={ navigate } title={ title }/>
  <Content>
  <CustomList data={data}/>
  </Content>
  </Container>

  );
}
}
