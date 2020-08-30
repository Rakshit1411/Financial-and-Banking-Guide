import { Button, ScrollView, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Icon, Container, Header, Content, Left } from 'native-base'
import { Dimensions } from 'react-native';
import Headbar from './Components/Headbar';
import Area from './charts/Area';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
  ContributionGraph
} from 'react-native-chart-kit';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const barData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const ChartPoints = ({ x, y, color }) =>
  data.map((item, index) => (
   <Circle
     key={index}
     cx={x(moment(item.date))}
     cy={y(item.score)}
     r={6}
     stroke={color}
     fill="white"
     onPress={() =>
       this.setState({
         tooltipX: moment(item.date),
         tooltipY: item.score,
         tooltipIndex: index,
       })
     }
  />
));
const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const screenWidth = Dimensions.get("window").width;

class DashboardScreen extends Component
{
	render(){

    const navigate = this.props.navigation;
    const title='Dashboard';
		return (
      <Container>
      <Headbar navigation={ navigate } title={ title }/>
      <ScrollView>
      <ScrollView horizontal={true}>
      <Card style={{margin:5,backgroundColor: '#f44336',padding:5}}>
      <Card.Content>
        <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>Account Balance</Paragraph>
        <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Rs. 30000</Title>
      </Card.Content>
      </Card>
      <Card style={{margin:5,backgroundColor: 'green',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>My Budget Status</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Good</Title>
        </Card.Content>
      </Card>
      <Card style={{margin:5,backgroundColor: '#ff1744',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>Savings Last Month</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Rs. 10000</Title>
        </Card.Content>
      </Card>
      </ScrollView>
      <Card
        style={{shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 2,
   shadowRadius: 2,
   elevation: 2,}}
      ><Area />
      </Card>
      <Card
        style={{shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 2,
   shadowRadius: 2,
   elevation: 2,}}
      ><Area />
      </Card>
      </ScrollView>
      </Container>

		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  Purple: {

    // Define your HEX color code here.
    color: '#ffffff',

  },
});
export default DashboardScreen;
