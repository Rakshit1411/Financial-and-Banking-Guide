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
import { WebView } from 'react-native-webview';
// import WebviewScreen from './WebviewScreen'

export default class HSBCProducts extends Component {
  constructor(props) {
   super(props);
   this.state = {
     savings: 1000,
     duration: 1,
     interestGained: 200,
     primaryBank: 'HSBC',
     primaryBankInterestRate: 2.5,
     products: [],
   }
  }
componentDidMount(){
  var url = "http://"+SERVER_URL+":8080/insights/general";
  AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
    console.log(phoneNumber);
    axios.post(url, {'phoneNumber':phoneNumber})
          .then(response => {
            console.log('here'+response);
              if (response && response.data!="FAILED") {
                  console.log(response.data);
                  this.setState({savings:response.data.savings, duration:response.data.duration,interestGained:response.data.interestGained,
                    primaryBank:response.data.primaryBank,primaryBankInterestRate:response.data.primaryBankInterestRate})
              }
              else if(response && response.data=="FAILED"){
                console.log("FAILED to get general insights")
              }
          })
          .catch(error => {
              console.log('Error while fetching the transactions from sms');
          });
  })

}

render() {
  const navigate = this.props.navigation;
  const title = 'Banking Products';
  return (
  <Container>
  <Headbar navigation={ navigate } title={ title }/>
  <Content style={{backgroundColor:'white'}}>
  <Text style={{margin:20,marginBottom:5,fontSize:18,color:'black'}}>You have saved <Text style={{margin:20,fontSize:22,fontWeight:'bold',color:'#0A1045'}}>Rs.{this.state.savings}</Text> in the last <Text style={{margin:20,fontSize:18,fontWeight:'bold',color:'#0A1045'}}>{this.state.duration}</Text> months
  with all your money in your savings account.</Text>
  <Text style={{margin:20,marginTop:0,fontSize:18,color:'black'}}>You earned an interest of <Text style={{margin:20,fontSize:22,fontWeight:'bold',color:'#0A1045'}}>Rs.{this.state.interestGained} </Text>on your saved amount at an interest rate of <Text style={{margin:20,fontSize:22,fontWeight:'bold',color:'#0A1045'}}>{this.state.primaryBankInterestRate}%</Text></Text>
  <Text style={{margin:20,marginTop:0,fontSize:15,color:'grey'}}>Invest your money in any of the below products to earn more interest on your savings.</Text>


  <Card style={styles.card}>
    <Text style={{backgroundColor:'#0A1045',padding:10,color:'white',alignSelf:'stretch',fontWeight:'bold'}} >Fixed Deposit</Text>
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

  <Card style={styles.card}>


    <Text style={{backgroundColor:'#0A1045',padding:10,color:'white',alignSelf:'stretch',fontWeight:'bold'}} >Mutual Funds</Text>
    <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>WHERE MONEY IS INVESTED</Text>
    <Text style={{padding:10,paddingTop:0,fontSize:15,color:'black'}}>Indian Mutual Funds</Text>
    <CardAction
      separator={true}
      inColumn={false}/>
      <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>BENEFITS</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• New opportunities: Fund Managers of mutual funds identify and enhance opportunities for your investments to grow with the help of critical information from leading economists and analysts</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Diversified risks: Mutual funds help you to diversify your overall investment risk by spreading the investment across multiple asset classes</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Easy access to your money: As most of the mutual funds can be bought and sold on any dealing day (which normally means weekdays), you can get easy access to your money at short notice (ranging between 3 to 10 days)</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Transparency: The mutual fund sector is regulated to safeguard the investor’s interests</Text>
      <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {navigate.navigate('Webview Screen',{url:'https://www.apps.asiapacific.hsbc.com/1/2/inm2/investment-apply'})}}
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


    <Text style={{backgroundColor:'#0A1045',padding:10,color:'white',alignSelf:'stretch',fontWeight:'bold'}} >Demat Account</Text>
    <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>WHERE MONEY IS SAVED</Text>
    <Text style={{padding:10,paddingTop:0,fontSize:15,color:'black'}}>HSBC Demat Account</Text>
    <CardAction
      separator={true}
      inColumn={false}/>
      <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>BENEFITS</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• You can purchase, hold and sell shares in electronic form</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Get transaction statements as and when you transact on Monthly basis & your Holding statement on a yearly basis, showing current portfolio of shares</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• As an NRI, you can easily dematerialise your portfolio of shares in India with us</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• You can save time with quick transfers</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Now, stop worrying about bad deliveries, forgeries and duplicate share certificates</Text>
      <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {navigate.navigate('Webview Screen',{url:'https://www.apps.asiapacific.hsbc.com/1/2/inm2/join-premier?WABFormEntryCommand=cmd_init&personal_detail.campaign_id=INM_pws_Contact_new_down&WT.ac=INM_premier_Contant_new'})}}
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
    <Text style={{backgroundColor:'#0A1045',padding:10,color:'white',alignSelf:'stretch',fontWeight:'bold'}} >Term Insurance</Text>
    <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>WHERE MONEY IS SAVED</Text>
    <Text style={{padding:10,paddingTop:0,fontSize:15,color:'black'}}>iSelect+ Term Plan</Text>
    <CardAction
      separator={true}
      inColumn={false}/>
      <Text style={{padding:10,paddingBottom:4,fontSize:10,color:'#78909c'}}>BENEFITS</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• In case of death or on diagnosis of Terminal Illness, whichever happens earlier, the Sum Assured on Death is payable provided the policy is in-force at the time of the event. Policy terminates upon payment of the benefit.</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Minimum Age at Entry: 18 years</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Policy Term (subject to Maximum Maturity Age)	: 5 years* except for Decreasing Coverage Option where it is 10 years</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Sum Assured: INR2,500,000 except for Decreasing Coverage Option where it is INR5,000,000 For Optional In-Built Covers/Riders – INR2,500,000</Text>
      <Text style={{padding:10,paddingTop:0,fontSize:12,color:'black'}}>• Premium: Varies depending on the chosen Plan Option, Sum Assured, Policy Term, PPT, Premium Payment Mode and other options available under the plan</Text>
      <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={()=>{navigate.navigate('Webview Screen',{url:'https://www.canarahsbclife.com/index.html'})}}
        title="Apply Now"
        color="red"
        titleStyle={{fontSize:10}}
      />
      <CardButton
        onPress={()=>{navigate.navigate('Webview Screen',{url:'https://www.canarahsbclife.com/allplan.html'})}}
        title="Check out more plans"
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
  card: {shadowColor: '#000', margin: 20 , marginTop:5, borderWidth:1, borderColor:'black',
    borderRadius: 10,
    borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,}
});
