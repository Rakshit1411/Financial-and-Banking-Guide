import React, {Component} from 'react';
import { Image,View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import RNUrlPreview from 'react-native-url-preview';
import { WebView } from 'react-native-webview';
// import WebviewScreen from './WebviewScreen'

export default class ProductCard extends Component {
  constructor(props) {
   super(props);
  }
render() {
  return (
  <Container style={{height: '100%'}}>
  <Content style={{backgroundColor:'white'}}>
  <Card style={styles.card}>
    <Text style={{backgroundColor:'#0A1045',padding:10,color:'white',alignSelf:'stretch',fontWeight:'bold'}} >HSBC</Text>
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
        <Text style={{padding:10,paddingBottom:4,fontSize:14,backgroundColor:'#eeeeee',alignSelf:'stretch'}}>INSIGHTS</Text>
        <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black',backgroundColor:'#eeeeee',alignSelf:'stretch'}}>With your Rs.1,50,000 savings amount, you can earn Rs.4650 at Interest Rate of 3.01%, instead of 2.5%.</Text>
    <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {navigate.navigate('Webview Screen',{url:'https://www.paisabazaar.com/hsbc-bank/fixed-deposits/'})}}
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
  card: {shadowColor: '#000', margin: 20 ,borderWidth:1, borderColor:'black',
    borderRadius: 10,
    borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,}
});
