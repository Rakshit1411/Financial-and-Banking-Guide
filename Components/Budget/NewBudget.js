import React, {Component} from 'react';
import { RefreshControl,Image,View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import { ProgressBar, Colors,Card,Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Headbar from '../Headbar';
import CustomList from '../CustomList'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class NewBudget extends Component {
  constructor(props) {
   super(props);

    this.state = {
      categories:[],
      // parentNavigator:props.navigation.parentNavigator,
     };
  }

getCategories(){
  var url = "http://192.168.1.54:8080/";

    axios.post(url+"category/getAllCategories")
          .then(response => {
            console.log('here'+response);
              if (response) {
                  //console.log(response);
                  //send_response = response;
                  console.log('Categories fetched successfully');
                  this.setState({categories:response.data});
              }
          })
          .catch(error => {
              console.log('Error while fetching the Categories');
          });
}

componentDidMount(){
    //this.setState({loader:true});
    console.log('navigator',this.props.navigation);
     this.getCategories();
  }

render() {
  return (

  <Container>
  <SafeAreaView >

  </SafeAreaView>
  </Container>

  );
}
}
const styles = StyleSheet.create({

});
