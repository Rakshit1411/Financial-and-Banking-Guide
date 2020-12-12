import React, {Component} from 'react';
import { TouchableWithoutFeedback,StyleSheet,Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import { FAB,Card} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Headbar from './Components/Headbar';
import CustomList from './Components/CustomList'

export default class MessageDetails extends Component {
  constructor(props) {
   super(props);

     console.log(this.props.route.params.details)
     this.state={
       details:this.props.route.params.details.item
     }
  }
render() {
  const navigate = this.props.navigation;
  const title = this.props.route.params.details.item.title;
  return (

  <Container>
  <Headbar navigation={ navigate } title={ title }/>
  <Content style={{backgroundColor:'white'}}>
  <Text style={{fontSize:26,margin:20,color:'red'}}>Unhealthy Transaction Pattern Identified</Text>

  <Text style={{fontSize:20,margin:20,marginTop:0,color:'#0A1045'}}>From your transactions pattern, we have analysed that
  you started spending, on an average, <Text style={{fontSize:25,color:'#0A1045',fontWeight:'bold'}}>Rs.5000 every day, from the last 2 months,</Text> to the same merchant <Text style={{fontSize:25,color:'#0A1045',fontWeight:'bold'}}>'Online Rummy Play'</Text>,
  and we found out that these transactions are related to <Text style={{fontSize:25,color:'#0A1045',fontWeight:'bold'}}>gambling</Text></Text>
  <Text style={{fontSize:20,margin:20,color:'#0A1045'}}>If this keeps on going, you will end up in a <Text style={{fontSize:25,color:'#0A1045',fontWeight:'bold'}}>financial crisis within next 10 days</Text>.
  </Text>
  <Text style={{fontSize:20,margin:20,color:'#0A1045'}}>Please contact with us as soon as possible to know more about it and how to get out of it, using out <Text style={{fontSize:25,color:'#0A1045'}}>messaging service.</Text></Text>

  <FAB
  style={styles.fab}
  large
  icon="chat"
  color="white"
  onPress={() => navigate.navigate('Chat Screen')}
/>
  </Content>
  </Container>

  );
}
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top:650,
    backgroundColor:"#0A1045"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  card: {
    shadowColor: '#000',
    margin: 20,
    marginTop: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 10,
    elevation: 2,backgroundColor: '#f8edeb',height:400
  },
  cardTitle: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    fontSize:22,
    color: 'black'
  },
})
