import React, {Component} from 'react';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import Headbar from './Components/Headbar';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebviewScreen extends Component {
  constructor(props) {
   super(props);
   console.log('here',this.props.route.params.url)
  }
render() {
  const navigate = this.props.navigation;
  const url = this.props.route.params.url
  return (
    <Container>
    <Headbar navigation={ navigate } />
    <View style={{height:'100%'}}>
       <WebView
       source = {{ uri: url }}
       />
    </View>
    </Container>
  );
}
}
