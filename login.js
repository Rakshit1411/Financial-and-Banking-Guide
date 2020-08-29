import React, {Component} from 'react';
import { View } from 'react-native';
import Headbar from './Components/Headbar';
import { Container, Header, Content, Button, Text, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
export default class Login extends Component {
render() {
  const navigate = this.props.navigation;
  const title = 'Login';
return (

<Container>
<Headbar navigation={ navigate } title={ title }/>
<Content>
<Form>
<Item floatingLabel>
<Label><Text>Username</Text></Label>
<Input />
</Item>
<Item floatingLabel last>
<Label><Text>Password</Text></Label>
<Input />
</Item>
</Form>
</Content>
</Container>

);
}
}
