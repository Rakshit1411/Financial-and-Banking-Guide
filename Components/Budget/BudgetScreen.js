import React, {Component} from 'react';
import { TouchableOpacity,RefreshControl,View,Modal, StyleSheet,TouchableHighlight,TouchableWithoutFeedback,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import Headbar from '../Headbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import cloneDeep from 'lodash/cloneDeep';
import { ProgressBar, Colors,Card,Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class BudgetScreen extends Component {

  constructor(props) {
   super(props);
   this.newBudgetdetails={
     category: '',
     amount: '',
     progressValue: 0,
     progressColor:Colors.green800,
     id:'',
   }
    this.state = {
      addBudgetModal: false,
      newBudgetdetails: this.newBudgetdetails,
      budgetsList:[],refreshing: false,showAlert: false,selectedItem:'',
     };
  }

showAlert(item){
  console.log('item',item);
  this.setState({
    showAlert: true,selectedItem: item,
  });
};

hideAlert = () => {
  this.setState({
    showAlert: false,selectedItem: '',
  });
};
getBudget(){
  var url = "http://192.168.1.54:8080/";
  // console.log('TESTING: '+this.state.parentNavigator)
  AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
      axios.post(url+"budget/getRemainingBudget",{phoneNumber:phoneNumber})
        .then(response => {
          console.log('here',response.data);
            if (response.data) {
              var budgetsList = this.state.budgetsList;
              this.setState({budgetsList:[]});
              for(var i=0;i<response.data.length;i++){
                if(response.data[i]["amountSpent"]==undefined){
                  response.data[i]["amountSpent"]='0';
                }
                var budget = {
                  category: response.data[i]["category"],
                  amount: response.data[i]["amountThreshold"],
                  progressValue: response.data[i]["amountSpent"],
                  id: response.data[i]["id"],
                  progressColor:Colors.green800,
                };
                this.setState({newBudgetdetails:budget});
                this.setState({refreshing: false});

                this.addNewBudget();
              }
            }
        })
        .catch(error => {
            console.log('Error while fetching the transactions from sms');
        });


    }
  )
}
  componentDidMount() {
      this.setState({ budgetsList: [] });
      this.getBudget();
    }
calc(x,y){
  return x/y;
}
  renderItem(item){
    const backgroundColor = "#ff6659";
    console.log('in render');
    return (
      <Text style={{backgroundColor:'#ff6659'}}>{item.amount}</Text>
    );
  };

  _renderItem = ({item, index}) => {
    img_uri={uri:item.image}
    console.log(img_uri)

         return (
           <TouchableWithoutFeedback>
           <View style={{alignItems: 'center',flex:1,margin:10}}>
             <Card style={{height:'80%',width:'100%',margin:7}}>
             <ImageBackground source={img_uri} style={styles.image}>

                 <Card.Content>
                   <Paragraph style={{color:'white',marginTop:2,textAlign:'center',fontSize:20,paddingTop:10}}>{item.category}</Paragraph>
                   <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8,paddingBottom:10}}>Rs. {item.amount}</Title>
                 </Card.Content>
                 </ImageBackground>
             </Card>
             </View>
             </TouchableWithoutFeedback>
         );
     }

  addNewBudget(){
    const {budgetsList} = this.state;

    const {newBudgetdetails} = this.state;

    var progressValueRatio=this.calc(newBudgetdetails.amount-newBudgetdetails.progressValue,newBudgetdetails.amount);
    console.log('hrre',progressValueRatio);
    var progressColor;
    if(progressValueRatio>=0.5){
      progressColor=Colors.green800;
    }
    else if(progressValueRatio<0.5 && progressValueRatio>0.3){
      progressColor=Colors.yellow800;
    }
    else{
      progressColor=Colors.red800;
    }
    budgetsList.push({category: newBudgetdetails.category,amount:newBudgetdetails.amount,progressValue:
    newBudgetdetails.amount-newBudgetdetails.progressValue,progressColor:progressColor,barProgress:progressValueRatio,
  id:newBudgetdetails.id});
    this.setState({ budgetsList: budgetsList.slice(0)});
    console.log(this.state.budgetsList);

  }

  _onPressCarousel = () => {
    // here handle carousel press
    console.log('here')
}
_onRefresh = () => {
    this.setState({refreshing: true});
    this.getBudget();
  }
removeBudget(id){
  var url = "http://192.168.1.54:8080/";
  // console.log('TESTING: '+this.state.parentNavigator)
      axios.post(url+"budget/delete",{id:id})
        .then(response => {
          console.log('here',response.data);
            if (response.data) {
              console.log(response.data);
            }
        })
        .catch(error => {
            console.log('Error while fetching the transactions from sms');
        });
}
deleteItemById(){
    console.log('hereeeee',this.state);
  const filteredData = this.state.budgetsList.filter(item => item.category !== this.state.selectedItem.category);
  var toBeDeleted = this.state.selectedItem.id;
  this.state.selectedItem = '';
  this.setState({ budgetsList: filteredData });
  this.removeBudget(toBeDeleted);
}
render() {

  const navigate = this.props.navigation;
  const title = 'My Budget Plan';
const {showAlert} = this.state;
  return (

    <Container style={{backgroundColor:'#0A1045'}}>
    <Headbar navigation={ navigate } title={ title }/>
    <ScrollView >

    <SafeAreaView style={styles.container}>
    {
       this.state.budgetsList.length == 0
       ? <Text style={{color:'white',alignSelf:'center',fontSize:40,textAlign:'center',padding:20,marginTop:'40%'}}>You have not created any budget for the month. Create Now</Text>
       : (
         <Text >Loading</Text>
       )
     }
      <FlatList
        data={this.state.budgetsList}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        renderItem={(item) => (
          <TouchableOpacity
            onLongPress={this.showAlert.bind(this,item.item)}
          >
          <View style={{backgroundColor:'#0A1045'}}>
            <Text style={{margin:0,color:'white',alignSelf:'center',fontSize:16,padding:5}}>{item.item.category}</Text>
            <View style={{backgroundColor:'white',padding:10}}>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{color:'black',marginBottom:10,paddingBottom:10,flex:1,fontSize:22}}>{item.item.category}</Text>
              </View>
              <ProgressBar progress={item.item.barProgress} color={item.item.progressColor} style={{width:'100%',transform: [{ scaleX: 1.0 }, { scaleY: 5 }]}}/>
              {item.item.progressValue!=0?<Text style={{color:'grey',textAlign:'right', alignSelf: 'stretch',marginTop:10,flex:1}}>Rs.{item.item.progressValue} left of Rs.{item.item.amount}</Text>:<Text style={{color:'grey',textAlign:'right', alignSelf: 'stretch',marginTop:10,flex:1}}>Budget Exceeded</Text>}

            </View>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.category}

      />

    </SafeAreaView>


</ScrollView>

<Button large warning rounded block style={{margin:10}}
onPress={() => this.props.navigation.navigate('New Budget',{  addBudget: item => this.setState(prevState => ({ budgetsList: prevState.budgetsList.concat([item]) })),})}>
  <Text >Create a new Budget</Text>
</Button>
<AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Action Required"
          message="Do you want to delete this budget"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
            this.deleteItemById();
          }}
        />

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
