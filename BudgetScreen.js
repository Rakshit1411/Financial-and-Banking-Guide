import React, {Component} from 'react';
import { View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView } from 'react-native';
import Headbar from './Components/Headbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import CustomList from './Components/CustomList'
import cloneDeep from 'lodash/cloneDeep';
import { ProgressBar, Colors } from 'react-native-paper';


export default class BudgetScreen extends Component {

  constructor(props) {
   super(props);
   this.newBudgetdetails={
     category: '',
     amount: '',
     date: '',
     categoryId:'',
     progressValue: 0.4,
     progressColor:Colors.green800,
   }
    this.state = {
      addBudgetModal: false,
      newBudgetdetails: this.newBudgetdetails,
      budgetsList:[]
     };
  }
  componentDidMount() {
      this.setState({ budgetsList: [] })
    }

  renderItem(item){
    const backgroundColor = "#ff6659";
    console.log('in render');
    return (
      <Text style={{backgroundColor:'#ff6659'}}>{item.amount}</Text>
    );
  };
  setModalVisible(vis){
    console.log('new vis flag',vis);
    this.setState({ addBudgetModal: vis });
  }


  addNewBudget(){
    const {budgetsList} = this.state;

    const {newBudgetdetails} = this.state;
    var progressValue=Math.random();
    console.log(progressValue);
    var progressColor;
    if(progressValue>=0.5){
      progressColor=Colors.green800;
    }
    else if(progressValue<0.5 && progressValue>0.3){
      progressColor=Colors.yellow800;
    }
    else{
      progressColor=Colors.red800;
    }
    budgetsList.push({category: newBudgetdetails.category,amount:newBudgetdetails.amount,progressValue:
    progressValue,progressColor:progressColor});

    this.setState({ budgetsList: budgetsList.slice(0)});
    console.log(this.state.budgetsList);
    this.setModalVisible(false);
  }

render() {
  const categories = [
      { value: 1, label: 'Travel' },
      { value: 2, label: 'Shopping' },
      { value: 3, label: 'Entertainment' },
      { value: 4, label: 'Medical' },
      { value: 5, label: 'Rent' },
    ];
  const navigate = this.props.navigation;
  const title = 'My Budget Plan';

  return (

    <Container>
    <Headbar navigation={ navigate } title={ title } openAddBudgetModal={this.setModalVisible.bind(this)}/>
    <SafeAreaView style={styles.container}>
      <FlatList style={{margin:7}}
        data={this.state.budgetsList}
        renderItem={(item) => (
          <View style={{backgroundColor:'#eeeeee'}}>
            <Text style={{margin:0,color:'grey',alignSelf:'center',fontSize:16,padding:5}}>{item.item.category}</Text>
            <View style={{backgroundColor:'white',padding:10}}>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{color:'black',marginBottom:10,paddingBottom:10,flex:1,fontSize:22}}>{item.item.category}</Text>
              </View>
              <ProgressBar progress={item.item.progressValue} color={item.item.progressColor} style={{width:'100%',transform: [{ scaleX: 1.0 }, { scaleY: 5 }]}}/>
              <Text style={{color:'grey',textAlign:'right', alignSelf: 'stretch',marginTop:10,flex:1}}>Rs. xx left of Rs.{item.item.amount}</Text>

            </View>
          </View>
        )}
        keyExtractor={(item) => item.amount}

      />
    </SafeAreaView>








    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.addBudgetModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Set Budget</Text>
            <View>
              <Text style={{margin:5}}>Set Amount Limit</Text>
              <TextInput style={{margin:5,width:200}} placeholder="Amount"
                onChangeText={text => this.state.newBudgetdetails.amount=text}/>
              <Text style={{margin:5}}>Category</Text>

              <DropDownPicker
                style={{margin:5,width:200,flex: 1, zIndex: 999}}
                items={categories}
                defaultIndex={0}
                containerStyle={{height: 40}}
                onChangeItem={item => (this.state.newBudgetdetails.category=item.label)}
              />
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "green", zIndex:-999 }}
              onPress={this.addNewBudget.bind(this)}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableHighlight>

            <Text style={{color:'black',zIndex:-999}} onPress={() => {
              this.setModalVisible(false);
            }}>Cancel</Text>
          </View>
        </View>
      </Modal>
    </View>
    </Container>

  );
}
}


const styles = StyleSheet.create({
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
