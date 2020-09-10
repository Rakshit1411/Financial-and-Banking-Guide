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


export default class HSBCProducts extends Component {
  constructor(props) {
   super(props);
  }
render() {
  const navigate = this.props.navigation;
  const title = 'HSBC Products';
  return (
  <Container>
  <Headbar navigation={ navigate } title={ title }/>
  <Content>
  <Text style={{margin:20,marginBottom:5,fontSize:18}}>You have saved <Text style={{margin:20,fontSize:22,fontWeight:'bold',color:'red'}}>Rs.1,50,000</Text> in the last <Text style={{margin:20,fontSize:18,fontWeight:'bold',color:'red'}}>3</Text> months
  with all your money in your savings account.</Text>
  <Text style={{margin:20,marginTop:0,fontSize:18}}>You earned an interest of <Text style={{margin:20,fontSize:22,fontWeight:'bold',color:'red'}}>Rs.3,750 </Text>on your saved amount at an interest rate of <Text style={{margin:20,fontSize:22,fontWeight:'bold',color:'red'}}>2.5%</Text></Text>
  <Text style={{margin:20,marginTop:0,fontSize:15,color:'red'}}>Invest your money in any of the below HSBC products to earn more interest on your savings.</Text>
  <Card style={styles.card}>


    <Text style={{backgroundColor:'red',padding:10,color:'white',alignSelf:'stretch',fontWeight:'bold'}} >Fixed Deposit</Text>
    <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>WHERE MONEY IS SAVED</Text>
    <Text style={{padding:10,paddingTop:0,fontSize:15,color:'black'}}>HSBC Fixed Deposit Account</Text>
    <CardAction
      separator={true}
      inColumn={false}/>
      <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>BENEFITS</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The minimum tenure for this account is 7 days</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The maximum tenure for this account is 4 years</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The minimum deposit amount is Rs. 10,000</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• It provides a 0.50% additional IR to the senior citizens</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The facility of crediting interest earned to other accounts</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Premature withdrawal is permitted</Text>
      <CardAction
        separator={true}
        inColumn={false}/>
        <Text style={{padding:10,paddingBottom:4,fontSize:10,backgroundColor:'#eeeeee',alignSelf:'stretch'}}>INSIGHTS</Text>
        <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black',backgroundColor:'#eeeeee',alignSelf:'stretch'}}>With your Rs.1,50,000 savings amount, you can earn Rs.4650 at Interest Rate of 3.01%, instead of 2.5%.</Text>
    <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {}}
        title="Apply Now"
        color="red"
        titleStyle={{fontSize:10}}
      />
    </CardAction>
    <CardAction
      separator={true}
      inColumn={true}/>
  </Card>
  <Card style={styles.card}>


    <Text style={{backgroundColor:'red',padding:10,color:'white',alignSelf:'stretch',fontWeight:'bold'}} >Fixed Deposit</Text>
    <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>WHERE MONEY IS SAVED</Text>
    <Text style={{padding:10,paddingTop:0,fontSize:15,color:'black'}}>HSBC Fixed Deposit Account</Text>
    <CardAction
      separator={true}
      inColumn={false}/>
      <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>BENEFITS</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The minimum tenure for this account is 7 days</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The maximum tenure for this account is 4 years</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The minimum deposit amount is Rs. 10,000</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• It provides a 0.50% additional IR to the senior citizens</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• The facility of crediting interest earned to other accounts</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Premature withdrawal is permitted</Text>
      <CardAction
        separator={true}
        inColumn={false}/>
        <Text style={{padding:10,paddingBottom:4,fontSize:10,backgroundColor:'#eeeeee',alignSelf:'stretch'}}>INSIGHTS</Text>
        <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black',backgroundColor:'#eeeeee',alignSelf:'stretch'}}>With your Rs.1,50,000 savings amount, you can earn Rs.4650 at Interest Rate of 3.01%, instead of 2.5%.</Text>
    <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {}}
        title="Apply Now"
        color="red"
        titleStyle={{fontSize:10}}
      />
    </CardAction>
    <CardAction
      separator={true}
      inColumn={true}/>
  </Card>
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
  card: {shadowColor: '#000', margin: 30 , marginTop:15  ,  borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,}
});
