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
import RNUrlPreview from 'react-native-url-preview';


export default class HelpfulArticles extends Component {
  constructor(props) {
   super(props);
   console.log('here',this.props.route.params.articles)
  }
render() {
  const navigate = this.props.navigation;
  const title = 'Helpful Articles ';
  const articles = this.props.route.params.articles
  return (
  <Container>
  <Headbar navigation={ navigate } title={ title }/>
  <Content>
  <RNUrlPreview text={articles[0]}/>
  <RNUrlPreview text={articles[1]}/>
  </Content>
  </Container>

  );
}
}
const styles = StyleSheet.create({
  image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,height:'30%',width:'60%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 50
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    margin:5,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  cellStyle: {
    flex: 1,
    margin: 10,
  },
  item: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius:10
  },
  title: {
    fontSize: 16,
  },
  card: {shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.5,
   shadowRadius: 4,
   elevation: 5,}
});
