import React, {Component} from 'react';
import { TouchableWithoutFeedback,Image,View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import { ProgressBar, Colors,Card,Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Headbar from './Components/Headbar';
import CustomList from './Components/CustomList'
export default class NotificationCentreScreen extends Component {
  constructor(props) {
   super(props);
   const transactionsList = [
       {title:'Alert', amount: 200000,date:'09-09-2020',merchant:'ALERT - Some unhealthy transaction pattern has been analyzed from your transactions. Click to know more', category: 'Online Gaming' , image: 'https://image.flaticon.com/icons/png/512/68/68921.png'},
       {title:'New Budget', amount: 1000,date:'08-09-2020',merchant:'Your Budget for this month has been predicted', category: 'Food & Groceries' , image:'https://image.flaticon.com/icons/png/512/128/128940.png'},
       {title:'Next Payment', amount: 2000,date:'08-09-2020',merchant:'Your payment for Spotify is scheduled for 13th September 2020. ', category: 'Shopping' , image: 'https://image.flaticon.com/icons/png/512/68/68921.png'},

     ];
    this.state = {
      transactionsList:transactionsList
     };
  }
  onClickAction(item){
    console.log(this.props.navigation.navigate('Message Details',{'details':item}));

  }
render() {
  const navigate = this.props.navigation;
  const title = 'My Messages';
  return (

  <Container>
  <Headbar navigation={ navigate } title={ title }/>
  <Content style={{backgroundColor:'white'}}>
  <SafeAreaView style={{...styles.container}}>
    <FlatList
      data={this.state.transactionsList}
      renderItem={(item) => (
        <TouchableWithoutFeedback onPress={ () => this.onClickAction(item)}>
        <View style={{backgroundColor:'white'}}>
          <Text style={{margin:0,color:'white',alignSelf:'center',fontSize:16,height:7}}></Text>
          {item.item.category==="Online Gaming"?<View style={{backgroundColor:'red',padding:5,flexDirection: 'row',marginLeft:5,marginRight:5,shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
      		borderRadius: 6,
          elevation: 2}}>

            <View style={{justifyContent: 'space-between' }}>
              <Text style={{color:'white',marginBottom:10,paddingBottom:10,marginLeft:15,marginTop:10,fontSize:16}}>{item.item.merchant}</Text>
            </View>

          </View>: <View style={{backgroundColor:'#43658b',padding:5,flexDirection: 'row',marginLeft:5,marginRight:5,shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
      		borderRadius: 6,
          elevation: 2}}>

            <View style={{justifyContent: 'space-between' }}>
              <Text style={{color:'white',marginBottom:10,paddingBottom:10,marginLeft:15,marginTop:10,fontSize:16}}>{item.item.merchant}</Text>
            </View>

          </View>
}

        </View>
        </TouchableWithoutFeedback>

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
