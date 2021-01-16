import React, {Component} from 'react';
import { RefreshControl,Image,View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground, TouchableWithoutFeedback} from 'react-native';
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
   console.log('testing',this.props.sideNavigation);
    this.state = {
      transactionsList:[],
      categories:{},refreshing: false,sideNavigation:'',
      // parentNavigator:props.navigation.parentNavigator,
     };
  }

getCategories(){
  var url = "http://35.208.8.124:8080/";
  // console.log('TESTING: '+this.state.parentNavigator)
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

getAllTransactions(){
  var url = "http://35.208.8.124:8080/";
  AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
    axios.post(url+"graph/getAllTransactions", {'phoneNumber':phoneNumber})
          .then(response => {
            console.log('here'+response);
              if (response) {
                  //console.log(response);
                  //send_response = response;
                  this.getCategories();
                  console.log('Transactions fetched successfully');
                  this.setState({transactionsList:response.data.transactionsList});
this.setState({refreshing: false});
              }
          })
          .catch(error => {
              console.log('Error while fetching the transactions from sms');
          });
    }
  )
}

componentDidMount(){
    //this.setState({loader:true});

    this.setState({sideNavigation: AsyncStorage.getItem('sideNavigation')});
    console.log('navigation is set now',AsyncStorage.getItem('sideNavigation'));
    console.log('navigatonjjr',this.props.navigation);
    this.getAllTransactions();
  }
checkCategoryImage(category){
  //console.log(category);
  //console.log(this.state.categories[category]);
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
  return this.state.categories[category];
}
_onRefresh = () => {
    this.setState({refreshing: true});
    this.getAllTransactions();
  }
render() {
  const navigate = this.props.navigation;
  const title = 'Transactions';
  const data=[{title:'new payment reminder',description:'Your account will be deducted with Rs. 10000 for your monthly rent to Mr. XYZ',id:'AUTO_PAYMENT'},{title:'Budget recommendation',description:'Click to get the new recommendation details',id:'AUTO_BUDGET'}];
  return (

  <Container>
  <Headbar navigation={ this.state.sideNavigation } title={ title }/>
  <SafeAreaView style={{...styles.container}}>
    <FlatList
      data={this.state.transactionsList}
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      renderItem={(item) => (
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Transactions Details',{transaction:item,categoryImage:this.checkCategoryImage(item.item.paidToCategory),categories:this.state.categories})}>
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
            {
               item.item.type=="Credited"
               ? <Text style={{color:'green',textAlign:'right', alignSelf: 'stretch',marginTop:10,flex:1,marginRight:10,fontSize:20}}>Rs.{item.item.amount}</Text>
               : (
                 <Text style={{color:'red',textAlign:'right', alignSelf: 'stretch',marginTop:10,flex:1,marginRight:10,fontSize:20}}>Rs.{item.item.amount}</Text>
               )
             }
          </View>


        </View>
        </TouchableWithoutFeedback>
      )}
      keyExtractor={(item) => item.id}

    />
  </SafeAreaView>
  </Container>

  );
}
}
const styles = StyleSheet.create({
  container:{
    marginBottom:56
  },
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
