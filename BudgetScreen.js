import React, {Component} from 'react';
import { View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView } from 'react-native';
import Headbar from './Components/Headbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import CustomList from './Components/CustomList'


export default class BudgetScreen extends Component {

  constructor(props) {
   super(props);
   this.newBudgetdetails={
     category: '',
     amount: '',
     date: '',
   }
    this.state = {
      addBudgetModal: false,
      newBudgetdetails: this.newBudgetdetails,
      budgetsList:[{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      }]
     };
  }

  renderItem(item){
    const backgroundColor = "#ff6659";

    return (
      <Item
        item={item}
        style={{ backgroundColor }}
      />
    );
  };
  setModalVisible(vis){
    console.log('new vis flag',vis);
    this.setState({ addBudgetModal: vis });
  }
  addNewBudget(){
    console.log("need to do an api call to save the data",this.state);
    this.state.budgetsList.push(this.state.newBudgetdetails);
    console.log("after adding data",this.state);
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
    <Text>Create a budget</Text>


    <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.newBudgetdetails}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={(item) => item.id}
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
              <TextInput style={{margin:5,width:200,size:150}} autoFocus='true' placeholder="Amount"
                onChangeText={text => this.state.newBudgetdetails.amount=text}/>
              <Text style={{margin:5}}>Category</Text>

              <DropDownPicker
                style={{margin:5,width:200,flex: 1, zIndex: 999}}
                items={categories}
                defaultIndex={0}
                containerStyle={{height: 40}}
                onChangeItem={item => this.state.newBudgetdetails.category=item.value}
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
