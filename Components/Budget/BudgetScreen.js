import React, {Component} from 'react';
import { RefreshControl,View,Modal, StyleSheet,TouchableHighlight,TouchableWithoutFeedback,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import Headbar from '../Headbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import cloneDeep from 'lodash/cloneDeep';
import { ProgressBar, Colors,Card,Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class BudgetScreen extends Component {

  constructor(props) {
   super(props);
   console.log("Conteructor");
   this.newBudgetdetails={
     category: '',
     amount: '',
     progressValue: 0,
     progressColor:Colors.green800,
   }
    this.state = {
      addBudgetModal: false,
      newBudgetdetails: this.newBudgetdetails,
      budgetsList:[],refreshing: false,
     };
  }
getBudget(){
  var url = "http://192.168.1.54:8080/";
  // console.log('TESTING: '+this.state.parentNavigator)
  AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
      axios.post(url+"budget/getRemainingBudget",{phoneNumber:phoneNumber})
        .then(response => {
          console.log('here',response.data);
            if (response.data) {
              var budgetsList = this.state.budgetsList;
              for(var i=0;i<response.data.length;i++){
                if(response.data[i]["amountSpent"]==undefined){
                  response.data[i]["amountSpent"]='0';
                }
                var budget = {
                  category: response.data[i]["category"],
                  amount: response.data[i]["amountThreshold"],
                  progressValue: response.data[i]["amountSpent"],
                  progressColor:Colors.green800,
                };
                this.setState({newBudgetdetails:budget});
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
    newBudgetdetails.amount-newBudgetdetails.progressValue,progressColor:progressColor,barProgress:progressValueRatio});
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
render() {

  const navigate = this.props.navigation;
  const title = 'My Budget Plan';

  return (

    <Container style={{backgroundColor:'#0A1045'}}>
    <Headbar navigation={ navigate } title={ title }/>
    <ScrollView >


    <Carousel layout={'tinder'}
      ref={(c) => { this._carousel = c; }}
      data={{}}
      renderItem={this._renderItem}
      sliderWidth={410}
      itemWidth={410}
      windowSize={1}
      style={{backgroundColor:'#0A1045'}}

    />


    <SafeAreaView style={styles.container}>
    {
       this.state.budgetsList.length == 0
       ? <Text style={{color:'white',alignSelf:'center',fontSize:40,textAlign:'center',padding:20,marginTop:'40%'}}>You have not created any budget for the month. Create Now</Text>
       : (
         <Text >Test</Text>
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
        )}
        keyExtractor={(item) => item.amount}

      />

    </SafeAreaView>


</ScrollView>

<Button large warning rounded block style={{margin:10}}
onPress={() => this.props.navigation.navigate('New Budget',{  addBudget: item => this.setState(prevState => ({ budgetsList: prevState.budgetsList.concat([item]) })),})}>
  <Text >Create a new Budget</Text>
</Button>


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
