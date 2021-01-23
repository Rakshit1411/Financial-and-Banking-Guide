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
import ProductCard from './Components/SavingsAndInvestments/ProductCard';
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


      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>


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
