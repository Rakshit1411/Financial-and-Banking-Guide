import React, {Component} from 'react';
import { Alert,RefreshControl,Image,View,Modal, StyleSheet,TouchableHighlight,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground, TouchableWithoutFeedback} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import { ProgressBar, Colors,Card,Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Headbar from '../Headbar';
import CustomList from '../CustomList'
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from 'react-native-option-picker';

import axios from 'axios';

export default class NewBudget extends Component {
  constructor(props) {
   super(props);

    this.state = {
      category:'Entertainment',
      amount:'',
     };
  }

addBudget(){
  var url = "http://"+SERVER_URL+":8080/";
  // console.log('TESTING: '+this.state.parentNavigator)
  AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
      axios.post(url+"budget/add",{category: this.state.category,amount:this.state.amount,phoneNumber:phoneNumber})
        .then(response => {
          console.log('here'+response);
            if (response.data=="SUCCESS") {
              var item = {category: this.state.category,amount:this.state.amount,progressValue:
              this.state.amount,barProgress:1,progressColor:'green'};
              this.props.route.params.addBudget(item);
              this.props.navigation.navigate("Budget Screen");
            }
            else if(response.data=="DUPLICATE"){
              Alert.alert(
                '','Budget already created for this category');
              //this.props.navigation.navigate("Budget Screen");
            }
        })
        .catch(error => {
            console.log('Error while fetching the transactions from sms');
        });


    }
  )
}
_onPress(elem){
  console.log(this);
  this.setState({category:JSON.stringify(elem)})
}
render() {
  return (

  <Container style={{backgroundColor:'#0A1045'}}>
  <TextInput
    style={styles.amountStyle}
    placeholder="Enter Amount"
    placeholderTextColor='rgba(0,0,0,0.7)'
    returnKeyType = "go"
    value={this.state.amount}
    onChangeText = {(text)=>this.setState({amount: text})}
    autoCapitalize="none"
    keyboardType="numeric"
  />
  <Picker
      data={[{id:"0",title:"Entertainment",selected:true},{id:"1",title:"Finance"},{id:"2",title:"Lifestyle"},{id:"3",title:"Travel & Local"},{id:"4",title:"Shopping"},{id:"5",title:"Medical"},{id:"6",title:"Food & Drink"},{id:"7",title:"Gaming"},{id:"8",title:"Business"},{id:"9",title:"Other"}]}
      optionStyle={styles.optionStyle}
          selectedOptionStyle={styles.selectedOptionStyle}
          optionTextStyle={styles.optionTextStyle}
          selectedOptionTextStyle={styles.selectedOptionTextStyle}
      onPress={(elem) => (this.setState({category:elem['title']}))}
  />
  <Button large warning rounded block style={{margin:10}}
  onPress={() => this.addBudget()}>
    <Text >Add Budget</Text>
  </Button>

  </Container>

  );
}
}
const styles = StyleSheet.create({
  amountStyle:{
    alignSelf:'center',
    color:'black',
    fontSize:30,
    textAlign:'center',
    backgroundColor:'#f0ad4e',
    borderRadius:20,
    paddingLeft:20,
    paddingRight:20,
    margin:10
  },
  optionStyle: {
      margin: 5,
      width: 100,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: '#E9EFFE',
      fontFamily: 'Helevica Neue',
    },
    selectedOptionStyle: {
      margin: 5,
      width: 100,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: '#f0ad4e',
      fontFamily: 'Helevica Neue',
    },
    optionTextStyle: {
      color: '#497DF9',
    },
    selectedOptionTextStyle: {
      color: '#0A1045',
    },
});
