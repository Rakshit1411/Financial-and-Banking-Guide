import { Button, ScrollView, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Icon, Container, Header, Content, Left } from 'native-base'
import { Dimensions } from 'react-native';
import Headbar from './Components/Headbar';
import Area from './charts/Area';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import FusionCharts from "react-native-fusioncharts";
import { chartData } from './Components/chart_components/DATA'
import LineChart from './charts/LineChart'
import Column2dChart from './charts/Column2dChart'
import SimpleGauge from './charts/SimpleGauge'
// Preparing the chart data

// Create a JSON object to store the chart configurations

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
        style={styles.card}
      >
      <LineChart
            width='100%'
            height='350'
            xAxisName='Date'
            dataFormat='json'
            yAxisName='Amount'
            numberSuffix='k'
            theme='fusion'
            caption='Everyday Transactions'
            subCaption='Testing'
            data={chartData}
          />
      </Card>
      <Card
        style={styles.card}
      >
      <Column2dChart
            width='100%'
            height='350'
            xAxisName='x-axis'
            dataFormat='json'
            yAxisName='y-axis'
            numberSuffix='k'
            theme='fusion'
            caption='Column2dChart Component'
            subCaption='Testing'
            data={chartData}
          />

          </Card>
      <Card
        style={styles.card}
      >
      <SimpleGauge width='100%'
			height='350'
			plottooltext='<b>$percentValue</b> of web servers run on $label servers'
			dataFormat='json'
			showlegend='1'
			showpercentvalues='1'
			theme='fusion'
			caption='Transactions By Category'
			legendposition='Bottom'
			usedataplotcolorforlabels='1'
			data={chartData}/>
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
  card: {
    shadowColor: '#000',
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2
  },
});
export default DashboardScreen;
