import React, {Component} from 'react';
import { View,Modal, StyleSheet,TouchableHighlight,Picker,TextInput,Text,FlatList, SafeAreaView,ScrollView,ImageBackground } from 'react-native';
import Headbar from './Components/Headbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container, Header, Content, Button, Left, Body, Right, Icon, Title, Form, Item, Input, Label } from 'native-base';
import CustomList from './Components/CustomList'
import cloneDeep from 'lodash/cloneDeep';
import { ProgressBar, Colors,Card,Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';


export default class BudgetScreen extends Component {

  constructor(props) {
   super(props);
   const recommendedBudgetsList = [
       { amount: 1000, category: 'Food & Groceries' , image:'https://image.freepik.com/free-photo/various-groceries-dark-concrete-background-food-delivery-concept-food-donations_74580-2279.jpg'},
       { amount: 2000, category: 'Shopping' , image: 'https://image.freepik.com/free-photo/empty-shopping-trolley-dark-toned-background-with-some-copy-space_94863-1091.jpg'},
       { amount: 3000, category: 'Travel & Holidays', image:'https://www.telegraph.co.uk/content/dam/Travel/2018/February/maldives-GettyImages-580492633.jpg' },
       { amount: 600, category: 'Transport & Car', image:'https://i.pinimg.com/originals/a3/b8/9c/a3b89c48ce54ae7affdf5ffda0d3e22a.jpg' },
       { amount: 5000, category: 'Bar & Restraunts', image:'https://cdn.vox-cdn.com/thumbor/_i-ohWZpFlmxBPmOXGf-k3k1FAY=/0x0:1800x1200/1200x800/filters:focal(756x456:1044x744)/cdn.vox-cdn.com/uploads/chorus_image/image/66688524/PrettyRickey_SpilledMilk_149.0.jpg'},
       { amount: 2000, category: 'Leisure & Entertainment', image:'https://www.straight.com/files/v3/styles/gs_standard/public/images/18/04/dark-1850120_1920.jpg?itok=TZGCM4Pk' },
       { amount: 20000, category: 'Media & Electronics', image:'https://videohive.img.customer.envatousercontent.com/files/692cd03b-e30f-427a-a2d0-537c3877c852/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=83f30bc01e4f97d289808dacadaca4ec' },
       { amount: 8000, category: 'Education', image:'https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-childhood-dreams-simple-fresh-black-education-poster-banner-image_152811.jpg'},
       { amount: 12000, category: 'Insurance & Finances', image:'https://cdn.pixabay.com/photo/2015/05/10/21/28/accounting-761599_1280.jpg'},
       { amount: 1000, category: 'Healthcare & Drug Stores', image:'https://us.123rf.com/450wm/alicjane/alicjane1701/alicjane170100421/69905025-blue-pills-in-a-bottle-medicines-painkiller-medications-on-a-black-background.jpg?ver=6' },
       { amount: 1500, category: 'Household & Utilities', image: 'https://images.unsplash.com/photo-1512538235597-5b932dd9de4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
       { amount: 700, category: 'Sports', image:'https://c0.wallpaperflare.com/preview/18/189/150/barbell-building-challenge-dark.jpg' },
     ];
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
      budgetsList:[],
      recommendedBudgetsList:recommendedBudgetsList
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

  _renderItem = ({item, index}) => {
    img_uri={uri:item.image}
    console.log(img_uri)

         return (
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
         );
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
      { value: 1, label: 'Food & Groceries' , image:'https://image.freepik.com/free-photo/various-groceries-dark-concrete-background-food-delivery-concept-food-donations_74580-2279.jpg'},
      { value: 2, label: 'Shopping' , image: 'https://image.freepik.com/free-photo/empty-shopping-trolley-dark-toned-background-with-some-copy-space_94863-1091.jpg'},
      { value: 3, label: 'Travel & Holidays', image:'https://www.telegraph.co.uk/content/dam/Travel/2018/February/maldives-GettyImages-580492633.jpg' },
      { value: 4, label: 'Transport & Car', image:'https://allenthewriterblog.files.wordpress.com/2018/05/inside-a-new-york-city-taxi.jpg?w=800' },
      { value: 5, label: 'Bar & Restraunts', image:'https://cdn.vox-cdn.com/thumbor/_i-ohWZpFlmxBPmOXGf-k3k1FAY=/0x0:1800x1200/1200x800/filters:focal(756x456:1044x744)/cdn.vox-cdn.com/uploads/chorus_image/image/66688524/PrettyRickey_SpilledMilk_149.0.jpg'},
      { value: 6, label: 'Leisure & Entertainment', image:'https://www.straight.com/files/v3/styles/gs_standard/public/images/18/04/dark-1850120_1920.jpg?itok=TZGCM4Pk' },
      { value: 7, label: 'Media & Electronics', image:'https://videohive.img.customer.envatousercontent.com/files/692cd03b-e30f-427a-a2d0-537c3877c852/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=83f30bc01e4f97d289808dacadaca4ec' },
      { value: 8, label: 'Education', image:'https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-childhood-dreams-simple-fresh-black-education-poster-banner-image_152811.jpg'},
      { value: 9, label: 'Insurance & Finances', image:'https://cdn.pixabay.com/photo/2015/05/10/21/28/accounting-761599_1280.jpg'},
      { value: 10, label: 'Healthcare & Drug Stores', image:'https://us.123rf.com/450wm/alicjane/alicjane1701/alicjane170100421/69905025-blue-pills-in-a-bottle-medicines-painkiller-medications-on-a-black-background.jpg?ver=6' },
      { value: 11, label: 'Household & Utilities', image: 'https://images.unsplash.com/photo-1512538235597-5b932dd9de4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
      { value: 12, label: 'Sports', image:'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
    ];
  const navigate = this.props.navigation;
  const title = 'My Budget Plan';

  return (

    <Container>
    <Headbar navigation={ navigate } title={ title } openAddBudgetModal={this.setModalVisible.bind(this)}/>
        <ScrollView>
    <View style={{backgroundColor:'#eeeeee'}}>
      <Text style={{margin:0,color:'grey',alignSelf:'center',fontSize:16,padding:5}}>Budget Recommendation (October)</Text>
    </View>
    <Carousel layout={'tinder'}
      ref={(c) => { this._carousel = c; }}
      data={this.state.recommendedBudgetsList}
      renderItem={this._renderItem}
      sliderWidth={410}
      itemWidth={410}
      windowSize={1}

    />


    <SafeAreaView style={styles.container}>
      <FlatList
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


</ScrollView>





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