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


export default class SavingsAndInvestmentsScreen extends Component {
  constructor(props) {
   super(props);
   const articles=[]
   articles[0]=['https://www.incharge.org/financial-literacy/budgeting-saving/how-to-make-a-budget/','https://www.investopedia.com/financial-edge/1109/6-reasons-why-you-need-a-budget.aspx']
   articles[1]=['https://www.paisabazaar.com/hsbc-bank/fixed-deposits/','https://www.hsbc.co.in/premier/features/product-offerings/']
   articles[2]=['https://www.moneynuggets.co.uk/important-to-set-financial-goals/#:~:text=Short%2Dterm%20financial%20goals%20are,re%20on%20the%20right%20path','https://www.investopedia.com/articles/personal-finance/100516/setting-financial-goals/']
   this.state = {
     articles:articles,
     modalVisibility:false,
    };
  }
  setModalVisible(vis){
    console.log(this.state.modalVisibility)

    this.setState({ modalVisibility: vis });
    console.log(this.state.modalVisibility)
  }
  goToProducts(){
    this.setState({ modalVisibility: false });
    this.props.navigation.navigate('HSBC Products')
  }
render() {
  const navigate = this.props.navigation;
  const spendingsScreen = SpendingsScreen
  const title = 'Savings and Investments  ';
  const data=[{title:'new payment reminder',description:'Your account will be deducted with Rs. 10000 for your monthly rent to Mr. XYZ',id:'AUTO_PAYMENT'},{title:'Budget recommendation',description:'Click to get the new recommendation details',id:'AUTO_BUDGET'}];
  return (
  <Container>
  <Headbar navigation={ navigate } title={ title }/>
<ScrollView>
  <Content>
  <SafeAreaView style={styles.container}>
  <Card style={styles.card}>
    <CardImage style={styles.card}
      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7CTNYo4gfC0DSdkC53mqV15Bs2RG-2R7J3Q&usqp=CAU'}}
      title='Save it, its yours !!'
    />
    <CardTitle
      title="Control Expenses, Save More"
      subtitle="Plan, control and track your expenses with our monthly smart budget generator."
     />
    <CardContent text="We will help you create a monthly budget plan using your profile data and your transaction pattern, so that you can track your spendings and save more money." />
    <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {navigate.navigate('Helpful Articles',{articles:this.state.articles[0]})}}
        title="Helpful Articles"
        color="red"
        titleStyle={{fontSize:10}}
      />
      <CardButton
        onPress={() => {navigate.navigate('My Spendings', { screen: 'My Budget' });}}
        title="Setup a new monthly budget"
        color="blue"
        titleStyle={{fontSize:10}}
      />
    </CardAction>
  </Card>
  <Card style={styles.card}>
    <CardImage style={styles.card}
      source={{uri: 'https://www.discover.com/online-banking/banking-topics/wp-content/uploads/2017/10/How-Does-Savings-Account-Interest-Work-Heres-Your-Guide_0-MARQUEE.jpg'}}
      title='Earn from the Bank !!'
    />
    <CardTitle
      title="Earn from your savings via Interests"
     />
    <CardContent text="HSBC offers various options to save your money and earn more interest than the usual, that you earn from your savings account." />
    <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {navigate.navigate('Helpful Articles',{articles:this.state.articles[1]})}}
        title="Helpful Articles"
        color="red"
        titleStyle={{fontSize:10}}
      />
      <CardButton
        onPress={() => {navigate.navigate('HSBC Products')}}
        title="Explore HSBC products"
        color="blue"
        titleStyle={{fontSize:10}}
      />
    </CardAction>
  </Card>
  <Card style={styles.card}>
    <CardImage style={styles.card}
      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKtz5dAe6VXSgcnP59e3UtxA9ZUlVKLlPEEg&usqp=CAU'}}
      title=''
    />
    <CardTitle
      title="Create your goals and events"
     />
    <CardContent text="Set your goals(buying house, electronics etc.) and events (Wedding, Education etc.) before hand to
      save more so that you meet your goal on time." />
    <CardAction
      separator={true}
      inColumn={false}>
      <CardButton
        onPress={() => {navigate.navigate('Helpful Articles',{articles:this.state.articles[2]})}}
        title="Helpful Articles"
        color="red"
        titleStyle={{fontSize:10}}
      />
      <CardButton
        onPress={this.setModalVisible.bind(this,true)}
        title="Set a goal or Event"
        color="blue"
        titleStyle={{fontSize:10}}
      />
    </CardAction>
  </Card>
  </SafeAreaView >
  </Content>



</ScrollView>

  <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalVisibility}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Goal or Event</Text>
          <View>
            <Text style={{margin:5}}>Set Amount Limit</Text>
            <TextInput style={{margin:5,width:200}} placeholder="Amount"/>
            <Text style={{margin:5}}>Whats the goal or event</Text>
            <TextInput style={{margin:5,width:200}} placeholder="type the event/goal name"
              />
          </View>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "green", zIndex:-999 }} onPress={this.goToProducts.bind(this)}>
            <Text style={styles.textStyle}>Create</Text>
          </TouchableHighlight>

          <Text style={{color:'black',zIndex:-999}} onPress={
            this.setModalVisible.bind(this,false)
          }>Cancel</Text>
        </View>
      </View>
    </Modal>
  </View>
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
  card: {shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.5,
   shadowRadius: 4,
   elevation: 5,
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
   }
});
