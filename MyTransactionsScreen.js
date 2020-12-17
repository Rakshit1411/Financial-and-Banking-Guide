import React, {Component} from 'react';
import { Image,View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import { ProgressBar, Colors,Card,Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Headbar from './Components/Headbar';
import CustomList from './Components/CustomList'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class MyTransactionScreen extends Component {
  constructor(props) {
   super(props);

    this.state = {
      transactionsList:[],
      categories:{}
     };
  }

getCategories(){
  var url = "http://192.168.1.54:8080/";
  axios.post(url+"category/getAllCategories",{})
    .then(response => {
      console.log('here'+response);
        if (response) {
            this.setState({categories: response.data});
        }
    })
    .catch(error => {
        console.log('Error while fetching the transactions from sms');
    });

}

componentDidMount(){
    //this.setState({loader:true});
    var url = "http://192.168.1.54:8080/";
    AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
      axios.post(url+"graph/getAllTransactions", {'phoneNumber':phoneNumber})
            .then(response => {
              console.log('here'+response);
                if (response) {
                    console.log(response);
                    //send_response = response;
                    this.getCategories();
                    console.log('Transactions fetched successfully');
                    this.setState({transactionsList:response.data.transactionsList});

                }
            })
            .catch(error => {
                console.log('Error while fetching the transactions from sms');
            });
      }
    )
  }
checkCategoryImage(category){
  console.log(category);
  console.log(this.state.categories[category]);
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
  return this.state.categories[category];
}

render() {
  const navigate = this.props.navigation;
  const title = 'Transactions';
  const data=[{title:'new payment reminder',description:'Your account will be deducted with Rs. 10000 for your monthly rent to Mr. XYZ',id:'AUTO_PAYMENT'},{title:'Budget recommendation',description:'Click to get the new recommendation details',id:'AUTO_BUDGET'}];
  return (

  <Container>
  <Headbar navigation={ navigate } title={ title }/>
  <Content style={{backgroundColor:'#0A1045'}}>
  <SafeAreaView style={{...styles.container}}>
    <FlatList
      data={this.state.transactionsList}
      renderItem={(item) => (
        <View style={{backgroundColor:'#0A1045'}}>
          <Text style={{margin:0,color:'grey',alignSelf:'center',fontSize:16,height:7}}></Text>
          <View style={{backgroundColor:'white',padding:5,flexDirection: 'row',marginLeft:5,marginRight:5,shadowColor: '#000',

          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
      		borderRadius: 6,
          elevation: 2}}>
          <Image source = {{uri:this.checkCategoryImage(item.item.paidToCategory)}}
           style = {{ width: 50, height: 50,flexDirection: 'column' ,marginTop:10}}
           />
            <View style={{flex:1, flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{color:'black',marginBottom:10,paddingBottom:10,marginLeft:15,marginTop:10,flex:1,fontSize:16}}>{item.item.paidTo}</Text>
              <Text style={{color:'grey',marginLeft:15,marginTop:10,fontSize:10}}>{item.item.date}</Text>
            </View>
            <Text style={{color:'grey',textAlign:'right', alignSelf: 'stretch',marginTop:10,flex:1,marginRight:10,fontSize:20}}>Rs.{item.item.amount}</Text>

          </View>


        </View>
      )}
      keyExtractor={(item) => item.amount}

    />
  </SafeAreaView>
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
});
