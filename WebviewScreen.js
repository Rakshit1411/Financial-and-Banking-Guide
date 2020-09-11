import React, {Component} from 'react';
import { Image,View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import Headbar from './Components/Headbar';
import CustomList from './Components/CustomList'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import SpendingsScreen from './SpendingsScreen.js'
import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsScreen';
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
